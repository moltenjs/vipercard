
/* auto */ import { assertTrueWarn } from '../../ui512/utils/utilsAssert.js';
/* auto */ import { Util512, setRoot } from '../../ui512/utils/utilsUI512.js';
/* auto */ import { ScreenConsts, toShortcutString, ui512TranslateModifiers } from '../../ui512/utils/utilsDrawConstants.js';
/* auto */ import { KeyDownEventDetails, KeyUpEventDetails, MouseDownEventDetails, MouseMoveEventDetails, MouseUpEventDetails } from '../../ui512/menu/ui512Events.js';
/* auto */ import { UI512FullRoot } from '../../ui512/root/rootUI512.js';

let mainVPCStartCanvasStarted = false;

function mainVPCStartCanvas(fnMakeGolly: any) {
    if (mainVPCStartCanvasStarted) {
        return;
    }

    mainVPCStartCanvasStarted = true;
    let gollyParams = {
        eatallkeyevents: true,
        customsizing: true,
        trackFrameTime: false,
        fnaddtodom: (container: any, d: any) => {
            container.insertBefore(d, window.document.getElementById('elemMessageBelow'));
        },
    };

    let browserOSInfo = Util512.getBrowserOS(window.navigator.userAgent);
    let root = new UI512FullRoot();
    let gly: any = fnMakeGolly(gollyParams);
    gly.desiredFrameTime = 60;
    root.init(gly.domElement);
    gly.draw = () => {
        root.drawFrame(gly.frameCount, gly.milliseconds);
    };

    gly.onresize = () => {
        mainOnResize(root, gly);
    };

    gly.keydown = (
        keyCode: string,
        keyChar: string,
        repeated: boolean,
        ctrlKey: boolean,
        shiftKey: boolean,
        altKey: boolean,
        metaKey: boolean
    ) => {
        let mods = ui512TranslateModifiers(browserOSInfo, ctrlKey, shiftKey, altKey, metaKey);
        let details = new KeyDownEventDetails(gly.milliseconds, keyCode, keyChar, repeated, mods);
        root.event(details);

        // let "paste" through, stop everything else
        if (details.readableShortcut !== 'Cmd+V') {
            details.setHandled();
        }

        return !details.handled();
    };

    gly.keyup = (
        keyCode: string,
        keyChar: string,
        ctrlKey: boolean,
        shiftKey: boolean,
        altKey: boolean,
        metaKey: boolean
    ) => {
        let mods = ui512TranslateModifiers(browserOSInfo, ctrlKey, shiftKey, altKey, metaKey);
        let details = new KeyUpEventDetails(gly.milliseconds, keyCode, keyChar, false, mods);
        root.event(details);

        // let "paste" through, stop everything else
        let readableShortcut = toShortcutString(details.mods, details.keyCode);
        if (readableShortcut !== 'Cmd+V') {
            details.setHandled();
        }

        return !details.handled();
    };

    gly.mousemove = (
        mouseX: number,
        mouseY: number,
        button: number,
        buttons: number,
        prevMouseX: number,
        prevMouseY: number
    ) => {
        let details = new MouseMoveEventDetails(gly.milliseconds, mouseX, mouseY, prevMouseX, prevMouseY);
        root.event(details);
        if (buttons !== root.mouseButtonsExpected) {
            root.sendMissedEvents(buttons);
        }

        return !details.handled();
    };

    gly.mouseup = (
        mouseX: number,
        mouseY: number,
        button: number,
        buttons: number,
        ctrlKey: boolean,
        shiftKey: boolean,
        altKey: boolean,
        metaKey: boolean
    ) => {
        let mods = ui512TranslateModifiers(browserOSInfo, ctrlKey, shiftKey, altKey, metaKey);
        let details = new MouseUpEventDetails(gly.milliseconds, mouseX, mouseY, button, mods);
        root.event(details);
        root.mouseButtonsExpected = buttons;
        return !details.handled();
    };

    gly.mousedown = (
        mouseX: number,
        mouseY: number,
        button: number,
        buttons: number,
        ctrlKey: boolean,
        shiftKey: boolean,
        altKey: boolean,
        metaKey: boolean
    ) => {
        let mods = ui512TranslateModifiers(browserOSInfo, ctrlKey, shiftKey, altKey, metaKey);
        let details = new MouseDownEventDetails(gly.milliseconds, mouseX, mouseY, button, mods);
        root.event(details);
        root.mouseButtonsExpected = buttons;
        return !details.handled();
    };

    setRoot(root)
    mainOnResize(root, gly);
}

function mainOnResize(root: UI512FullRoot, gly: any) {
    // on high-dpi screens, automatically show bigger pixels, with no blurring

    let availW = window.innerWidth;
    let availH = window.innerHeight;
    let canFitW = Math.max(1, Math.trunc(availW / ScreenConsts.screenwidth));
    let canFitH = Math.max(1, Math.trunc(availH / ScreenConsts.screenheight));
    let canFitTotal = Math.min(canFitW, canFitH);
    if (!Util512.isValidNumber(canFitTotal)) {
        assertTrueWarn(false, `3?|invalid canFitW=${canFitW} canFitW=${canFitW}`);
        return;
    }

    let elemMessageBelow = window.document.getElementById('elemMessageBelow');
    if (elemMessageBelow) {
        if (Math.abs(window.devicePixelRatio - Math.round(window.devicePixelRatio)) > 0.01) {
            elemMessageBelow.innerText = 'Please set your browser zoom level to 100% for the sharpest graphics...';
        } else {
            elemMessageBelow.innerText = '';
        }
    }

    if (canFitTotal !== root.scaleMouseCoords) {
        let domElement = gly.domElement;
        gly.width = ScreenConsts.screenwidth; // sets both priv['domElement']['width'] and priv['width']
        gly.height = ScreenConsts.screenheight; // sets both priv['domElement']['height'] and priv['height']
        domElement.style.width = ScreenConsts.screenwidth * canFitTotal + 'px';
        domElement.style.height = ScreenConsts.screenheight * canFitTotal + 'px';
        root.scaleMouseCoords = canFitTotal;
        root.rawResize(ScreenConsts.screenwidth, ScreenConsts.screenheight);
    }
}

// expose this function globally
(window as any).mainVPCStartCanvas = mainVPCStartCanvas;
