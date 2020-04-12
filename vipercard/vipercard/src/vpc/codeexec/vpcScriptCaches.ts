
/* auto */ import { getParsingObjects } from './../codeparse/vpcVisitor';
/* auto */ import { CodeLimits, CountNumericId, checkThrow } from './../vpcutils/vpcUtils';
/* auto */ import { VpcCodeProcessor, VpcParsedCodeCollection } from './../codepreparse/vpcTopPreparse';
/* auto */ import { VpcParsed } from './../codeparse/vpcTokens';
/* auto */ import { ChvRuleFnType, VpcCodeLine, VpcCodeLineReference } from './../codepreparse/vpcPreparseCommon';
/* auto */ import { VpcChvParser } from './../codeparse/vpcParser';
/* auto */ import { O, bool } from './../../ui512/utils/util512Base';
/* auto */ import { assertTrue } from './../../ui512/utils/util512AssertCustom';
/* auto */ import { Util512, assertEq } from './../../ui512/utils/util512';
/* auto */ import { BridgedLRUMap } from './../../bridge/bridgeJsLru';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */


/**
 * Redesigning exceptions for code errors.
 * Different ways code can fail:
 *      1) error during lexing
 *      2) error during preprocessing/rewrites
 *      3) error during parsing
 *      4) error during command execution
 *      5) error during syntax execution
 *      (i.e. runtime error in an if )
 */



/**
 * cache the CST from a parsed line of code, for better perf.
 * it can be re-evaluated by calling visit() again.
 *
 * the cache is across all code in the stack, so
 * the line "put 1 into x" in the script of one button can re-use the CST
 * for the line "put 1 into x" in the script of another button
 *
 * the cache is an LRU so that it doesn't have unbounded memory usage
 */
export class VpcCacheParsedCST {
    cache = new BridgedLRUMap<string, VpcParsed>(CodeLimits.CacheThisManyParsedLines);
    parser: VpcChvParser;
    static ensureNotChanged = true;
    constructor() {
        this.parser = getParsingObjects()[1];
    }

    /**
     * get the CST object for a line of code, using the cache if possible
     */
    getParsedLine(ln: VpcCodeLine) {
        let rule = ln.getParseRule();
        assertEq(bool(rule), bool(ln.allImages), '4>|');
        if (rule && ln.allImages) {
            assertTrue(ln.excerptToParse.length > 0, '4=|ln readyToParse is empty', ln.offset);
            let key = ln.allImages;
            let foundInCache = this.cache.get(key);
            if (foundInCache !== undefined) {
                /* we can use the cached cst */
                return foundInCache;
            } else {
                /* call the parser to get a new cst */
                let cst = this.callParser(ln, rule);
                checkThrow(cst !== null && cst !== undefined, '4<|parse results null', ln.offset);
                this.cache.set(key, cst);
                return cst;
            }
        } else {
            /* this line doesn't use the parser (a line like "end repeat") */
            return undefined;
        }
    }

    /**
     * call the parser to get a new cst
     */
    protected callParser(ln: VpcCodeLine, firstRule: ChvRuleFnType) {
        let parsed: VpcParsed;
        try {
            /* setting input again is documented to reset the parser state */
            this.parser.input = ln.excerptToParse;
            this.parser.errors.length = 0;
            /* eslint-disable-next-line ban/ban */
            parsed = firstRule.apply(this.parser, []);
            if (VpcCacheParsedCST.ensureNotChanged) {
                Util512.freezeRecurse(parsed);
            }
        } catch (e) {
            /* don't expect error to be thrown here, but am checking this case out of caution */
            let err = e.message.toString().substr(0, CodeLimits.LimitChevErrStringLen);
            throw makeVpcScriptErr('4;|parse error: ' + err);
        }

        if (this.parser.errors.length) {
            let err = this.parser.errors[0].toString().substr(0, CodeLimits.LimitChevErrStringLen);
            throw makeVpcScriptErr('4:|parse error: ' + err);
        }

        return parsed;
    }
}

/**
 * for efficiency, let's cache the entire script once we've processed it.
 * note that this isn't keyed by element id. if two elements have exactly
 * the same script, they'll share an entry here.
 * 
 * this also helps simplify the case where a script deletes objects at runtime,
 * it can even delete itself with no issues.
 */
export class VpcCacheParsedAST {
    cache = new BridgedLRUMap<string, VpcParsedCodeCollection>(CodeLimits.CacheThisManyScripts);
    constructor(protected idGen: CountNumericId) {}
    getParsedCodeCollection(code: string, velIdForErrMsg: string): VpcParsedCodeCollection | VpcScriptSyntaxError {
        assertTrue(!code.match(/^\s*$/), '');
        let found = this.cache.get(code);
        if (found) {
            return found;
        } else {
            let got = VpcCodeProcessor.go(code, velIdForErrMsg, this.idGen);
            if (!(got instanceof VpcParsedCodeCollection)) {
                return got;
            }

            this.cache.set(code, got);
            if (VpcCacheParsedCST.ensureNotChanged) {
                Util512.freezeRecurse(got);
            }

            return got;
        }
    }

    findHandlerOrThrowIfVelScriptHasSyntaxError(
        code: string,
        handlername: string,
        velIdForErrMsg: string
    ): O<[VpcParsedCodeCollection, VpcCodeLineReference] | Error> {
        return this.findHandlerOrThrowIfVelScriptHasSyntaxErrorImpl(code, handlername, velIdForErrMsg)
    }

    protected findHandlerOrThrowIfVelScriptHasSyntaxErrorImpl(
        code: string,
        handlername: string,
        velIdForErrMsg: string
    ): O<[VpcParsedCodeCollection, VpcCodeLineReference]> {
        if (code.match(/^\s*$/)) {
            return undefined;
        }

        let ret = this.getParsedCodeCollection(code, velIdForErrMsg);
        let retAsErr = ret as VpcScriptErrorBase;
        let retAsCode = ret as VpcParsedCodeCollection;
        if (retAsCode instanceof VpcParsedCodeCollection) {
            /* check in the cached map of handlers */
            let handler = retAsCode.handlers.find(handlername);
            if (handler) {
                return [retAsCode, handler];
            }
        } else if (retAsErr instanceof VpcScriptErrorBase) {
            let err = makeVpcScriptErr('JV|$compilation error$');
            markUI512Err(err, true, false, true, retAsErr);
            throw err;
        } else {
            throw makeVpcScriptErr('JU|VpcCodeOfOneVel did not return expected type ' + ret);
        }

        return undefined;
    }
}
