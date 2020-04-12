
/* auto */ import { Util512Higher } from './../../ui512/utils/util512Higher';
/* auto */ import { fitIntoInclusive } from './../../ui512/utils/util512';
/* auto */ import { UI512EventType } from './../../ui512/draw/ui512Interfaces';
/* auto */ import { UI512PaintDispatchShapes } from './../../ui512/draw/ui512DrawPaintDispatch';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */

/**
 * SortType for the "sort" command
 * text sorting (default), compares text, not case sensitive.
 * numeric sorting, interpret as numbers, e.g. 10 sorts after 2.
 * international sorting, compares text using current locale.
 */
export enum SortType {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Text,
    Numeric,
    International
}

/**
 * PropAdjective for properties, e.g.
 * get the long name of cd btn "btn1"
 */
export enum PropAdjective {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Empty,
    Abbrev,
    Long,
    Short,
    __AlternateForm__Abbreviated = Abbrev,
    __AlternateForm__Abbr = Abbrev
}

/**
 * ordinal or position, i.e. "go to third card"
 */
export enum OrdinalOrPosition {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Last,
    Middle,
    Any,
    First,
    Second,
    Third,
    Fourth,
    Fifth,
    Sixth,
    Seventh,
    Eighth,
    Ninth,
    Tenth,
    Next,
    Previous,
    This,
    __AlternateForm__Mid = Middle,
    __AlternateForm__Prev = Previous
}

/**
 * a 'chunk' is a way to specify a contiguous span of text, e.g.
 * word 3 to 4 of "a b c d e"
 * these are the types of chunks currently supported.
 */
export enum VpcGranularity {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Chars,
    Words,
    Items,
    Lines,
    __AlternateForm__Char = Chars,
    __AlternateForm__Character = Chars,
    __AlternateForm__Characters = Chars,
    __AlternateForm__Word = Words,
    __AlternateForm__Item = Items,
    __AlternateForm__Line = Lines
}

/**
 * preposition, e.g. put "a" after cd fld "fld1"
 */
export enum VpcChunkPreposition {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Into,
    Before,
    After
}

/**
 * type of vpc element
 */
export enum VpcElType {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Unknown,
    Btn,
    Fld,
    Card,
    Bg,
    Stack,
    Product,
    __AlternateForm__Button = Btn,
    __AlternateForm__Field = Fld,
    __AlternateForm__Cd = Card,
    __AlternateForm__Background = Bg,
    __AlternateForm__Bkgnd = Bg
}

/**
 * show type in UI
 */
export function vpcElTypeShowInUI(tp: VpcElType) {
    switch (tp) {
        case VpcElType.Btn:
            return 'button';
        case VpcElType.Fld:
            return 'field';
        case VpcElType.Card:
            return 'card';
        case VpcElType.Bg:
            return 'bkgnd';
        case VpcElType.Stack:
            return 'stack';
        case VpcElType.Product:
            return '';
        default:
            throw makeVpcScriptErr(`4k|can't get name of el type ${tp}`);
    }
}

/**
 * string name of the type, to show in UI
 */
export function vpcElTypeToString(type: VpcElType, veryShort: boolean) {
    if (veryShort) {
        if (type === VpcElType.Unknown) {
            return '';
        } else if (type === VpcElType.Btn) {
            return 'cd btn';
        } else if (type === VpcElType.Fld) {
            return 'cd fld';
        } else if (type === VpcElType.Card) {
            return 'card';
        } else if (type === VpcElType.Bg) {
            return 'bg';
        } else if (type === VpcElType.Stack) {
            return 'stack';
        } else if (type === VpcElType.Product) {
            return '';
        } else {
            throw makeVpcScriptErr('KB|unknown VpcElType' + type);
        }
    } else {
        if (type === VpcElType.Unknown) {
            return '';
        } else if (type === VpcElType.Btn) {
            return 'button';
        } else if (type === VpcElType.Fld) {
            return 'field';
        } else if (type === VpcElType.Card) {
            return 'card';
        } else if (type === VpcElType.Bg) {
            return 'background';
        } else if (type === VpcElType.Stack) {
            return 'stack';
        } else if (type === VpcElType.Product) {
            return '';
        } else {
            throw makeVpcScriptErr('KA|unknown VpcElType' + type);
        }
    }
}

/**
 * speed of visual effect
 */
export enum VpcVisualEffectSpeed {
    __isUI512Enum = 1,
    normal,
    slow,
    fast,
    verynormal,
    veryslow,
    veryfast,
    __AlternateForm__veryslowly = veryslow,
    __AlternateForm__slowly = slow
}

/**
 * note: for simplicity we use "barn" and not "barn door",
 * and "venetian" and not "venetian blinds"
 */
export enum VpcVisualEffectType {
    __isUI512Enum = 1,
    barn,
    cut,
    plain,
    dissolve,
    venetian,
    checkerboard,
    iris,
    scroll,
    wipe,
    zoom,
    shrink,
    stretch,
    push
}

/**
 * the direction of the effect
 */
export enum VpcVisualEffectTypeDirection {
    __isUI512Enum = 1,
    open,
    close,
    left,
    right,
    up,
    down,
    top,
    bottom,
    center
}

/**
 * the direction of the effect
 */
export enum VpcVisualEffectTypeDestination {
    __isUI512Enum = 1,
    card,
    black,
    white,
    gray,
    inverse,
    __AlternateForm__cd = card,
    __AlternateForm__grey = gray
}

/**
 * specify a visual effect
 */
export class VpcVisualEffectSpec {
    constructor(
        public sp: VpcVisualEffectSpeed,
        public typ: VpcVisualEffectType,
        public dir: VpcVisualEffectTypeDirection,
        public dest: VpcVisualEffectTypeDestination
    ) {}
}

/**
 * a tool
 * you can use __first and __last to iterate all tools
 */
export enum VpcTool {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Browse,
    Button,
    Field,
    Select,
    Brush,
    Bucket,
    Stamp,
    Pencil,
    Line,
    Lasso,
    Eraser,
    Rect,
    Oval,
    Roundrect,
    Curve,
    Spray,
    __first = Browse,
    __last = Spray,
    __AlternateForm__Spray_can = Spray,
    __AlternateForm__Round_rect = Roundrect
}

/**
 * a tool category
 * not used by scripts, but used by UI implementation,
 * since say the "pencil" tool and "brush" tool do basically the same thing,
 * they can share the same code
 */
export enum VpcToolCtg {
    __isUI512Enum = 1,
    CtgBrowse,
    CtgEdit,
    CtgShape,
    CtgRectSelect,
    CtgLasso,
    CtgSmear,
    CtgBucket,
    CtgCurve,
    CtgStamp
}

/**
 * from tool to tool category
 */
export function getToolCategory(tl: VpcTool): VpcToolCtg {
    switch (tl) {
        case VpcTool.Browse:
            return VpcToolCtg.CtgBrowse;
        case VpcTool.Button:
            return VpcToolCtg.CtgEdit;
        case VpcTool.Field:
            return VpcToolCtg.CtgEdit;
        case VpcTool.Select:
            return VpcToolCtg.CtgRectSelect;
        case VpcTool.Brush:
            return VpcToolCtg.CtgSmear;
        case VpcTool.Bucket:
            return VpcToolCtg.CtgBucket;
        case VpcTool.Stamp:
            return VpcToolCtg.CtgStamp;
        case VpcTool.Pencil:
            return VpcToolCtg.CtgSmear;
        case VpcTool.Line:
            return VpcToolCtg.CtgShape;
        case VpcTool.Lasso:
            return VpcToolCtg.CtgLasso;
        case VpcTool.Eraser:
            return VpcToolCtg.CtgSmear;
        case VpcTool.Rect:
            return VpcToolCtg.CtgShape;
        case VpcTool.Oval:
            return VpcToolCtg.CtgShape;
        case VpcTool.Roundrect:
            return VpcToolCtg.CtgShape;
        case VpcTool.Spray:
            return VpcToolCtg.CtgSmear;
        case VpcTool.Curve:
            return VpcToolCtg.CtgCurve;
        default:
            throw makeVpcScriptErr(`4/|unknown tool ${tl}`);
    }
}

/**
 * from tool to UI512PaintDispatchShapes
 */
export function toolToDispatchShapes(tl: VpcTool) {
    if (tl === VpcTool.Line) {
        return UI512PaintDispatchShapes.ShapeLine;
    } else if (tl === VpcTool.Rect) {
        return UI512PaintDispatchShapes.ShapeRectangle;
    } else if (tl === VpcTool.Oval) {
        return UI512PaintDispatchShapes.ShapeEllipse;
    } else if (tl === VpcTool.Roundrect) {
        return UI512PaintDispatchShapes.ShapeRoundRect;
    } else if (tl === VpcTool.Brush) {
        return UI512PaintDispatchShapes.SmearSmallBrush;
    } else if (tl === VpcTool.Pencil) {
        return UI512PaintDispatchShapes.SmearPencil;
    } else if (tl === VpcTool.Eraser) {
        return UI512PaintDispatchShapes.SmearRectangle;
    } else if (tl === VpcTool.Spray) {
        return UI512PaintDispatchShapes.SmearSpraycan;
    } else if (tl === VpcTool.Curve) {
        return UI512PaintDispatchShapes.ShapeCurve;
    } else if (tl === VpcTool.Bucket) {
        return UI512PaintDispatchShapes.Bucket;
    } else {
        throw makeVpcScriptErr('K9|toPaintOntoCanvasShapes unsupported tool ' + tl);
    }
}

/**
 * for backwards compatibility: the original tool numbers
 */
export function originalToolNumberToTool(n: number): VpcTool {
    switch (n) {
        case 1:
            return VpcTool.Browse;
        case 2:
            return VpcTool.Button;
        case 3:
            return VpcTool.Field;
        case 4:
            return VpcTool.Select;
        case 5:
            return VpcTool.Lasso;
        case 6:
            return VpcTool.Pencil;
        case 7:
            return VpcTool.Brush;
        case 8:
            return VpcTool.Eraser;
        case 9:
            return VpcTool.Line;
        case 10:
            return VpcTool.Spray;
        case 11:
            return VpcTool.Rect;
        case 12:
            return VpcTool.Roundrect;
        case 13:
            return VpcTool.Bucket;
        case 14:
            return VpcTool.Oval;
        case 15:
            return VpcTool.Curve;
        /* 16: text tool, not yet implemented */
        /* 17: regular polygon tool, not yet implemented */
        /* 18: polygon tool, not yet implemented */
        default:
            throw makeVpcScriptErr(`unknown or unsupported tool ${n}`);
    }
}

/**
 * built-in messages sent to scripts.
 */
export enum VpcBuiltinMsg {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Openbackground,
    Opencard,
    Openstack,
    Closebackground,
    Closecard,
    Mousedoubleclick,
    Mousedown,
    Mouseenter,
    Mouseleave,
    Mouseup,
    Mousewithin,
    Idle,
    Afterkeydown,
    Afterkeyup,
    Openfield,
    Closefield,
    Exitfield,
    SendCode,
    __Custom
}

/**
 * what we support for the wait command, e.g. "wait 100 ms"
 */
export enum MapTermToMilliseconds {
    __isUI512Enum = 1,
    __UI512EnumCapitalize,
    Tick = 16,
    Ticks = 16,
    Milliseconds = 1,
    Ms = 1,
    Second = 1000,
    Seconds = 1000
}

/**
 * event details type tp message type
 * note that Idle can become either on mousewithin or on idle depending on context
 */
export function getMsgFromEvtType(tp: UI512EventType) {
    switch (tp) {
        case UI512EventType.KeyUp:
            return VpcBuiltinMsg.Afterkeyup;
        case UI512EventType.KeyDown:
            return VpcBuiltinMsg.Afterkeydown;
        case UI512EventType.MouseDown:
            return VpcBuiltinMsg.Mousedown;
        case UI512EventType.MouseDownDouble:
            return VpcBuiltinMsg.Mousedoubleclick;
        case UI512EventType.MouseUp:
            return VpcBuiltinMsg.Mouseup;
        case UI512EventType.Idle:
            return VpcBuiltinMsg.Mousewithin;
        case UI512EventType.MouseEnter:
            return VpcBuiltinMsg.Mouseenter;
        case UI512EventType.MouseLeave:
            return VpcBuiltinMsg.Mouseleave;
        default:
            throw makeVpcScriptErr(`4.|unknown event type ${tp}`);
    }
}

/**
 * levels of operations when evaluating an expression
 */
export enum VpcOpCtg {
    __isUI512Enum = 1,
    OpLogicalOrAnd,
    OpStringConcat,
    OpStringWithin,
    OpEqualityGreaterLessOrContains,
    OpPlusMinus,
    OpMultDivideExpDivMod
}

/**
 * evaulate an OrdinalOrPosition
 */
export function getPositionFromOrdinalOrPosition(rel: OrdinalOrPosition, current: number, min: number, max: number): number {
    let getPositionUnbounded = () => {
        switch (rel) {
            case OrdinalOrPosition.Last:
                return max;
            case OrdinalOrPosition.Middle:
                /* confirmed in emulator that this rounds to highest */
                return Math.ceil((min + max) / 2);
            case OrdinalOrPosition.Any:
                return Util512Higher.getRandIntInclusiveWeak(min, max);
            case OrdinalOrPosition.First:
                return min;
            case OrdinalOrPosition.Second:
                return min + 1;
            case OrdinalOrPosition.Third:
                return min + 2;
            case OrdinalOrPosition.Fourth:
                return min + 3;
            case OrdinalOrPosition.Fifth:
                return min + 4;
            case OrdinalOrPosition.Sixth:
                return min + 5;
            case OrdinalOrPosition.Seventh:
                return min + 6;
            case OrdinalOrPosition.Eighth:
                return min + 7;
            case OrdinalOrPosition.Ninth:
                return min + 8;
            case OrdinalOrPosition.Tenth:
                return min + 9;
            case OrdinalOrPosition.Next: {
                /* cycle back to the beginning */
                let tmp = current + 1;
                return tmp > max ? min : tmp;
            }
            case OrdinalOrPosition.Previous: {
                /* cycle back to the end */
                let tmp = current - 1;
                return tmp < min ? max : tmp;
            }
            case OrdinalOrPosition.This:
                return current;
            default:
                throw makeVpcScriptErr(`4-|unknown ordinal ${rel}`);
        }
    };

    let ret = getPositionUnbounded();
    return fitIntoInclusive(ret, min, max);
}
