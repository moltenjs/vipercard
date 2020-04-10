
/* auto */ import { cast } from './../../ui512/utils/util512';
/* auto */ import { addDefaultListeners } from './../../ui512/textedit/ui512TextEvents';
/* auto */ import { UI512Presenter } from './../../ui512/presentation/ui512Presenter';
/* auto */ import { MenuPositioning } from './../../ui512/menu/ui512MenuPositioning';
/* auto */ import { UI512EventType } from './../../ui512/draw/ui512Interfaces';
/* auto */ import { MenuItemClickedDetails, MouseUpEventDetails } from './../../ui512/menu/ui512Events';
/* auto */ import { UI512ElButton } from './../../ui512/elements/ui512ElementButton';
/* auto */ import { UI512Application } from './../../ui512/elements/ui512ElementApp';
/* auto */ import { TestUtilsCanvas } from './../testUtils/testUtilsCanvas';
/* auto */ import { TestDrawUI512Menus } from './../util512ui/testUI512MenuRender';

/* (c) 2019 moltenform(Ben Fisher) */
/* Released under the GPLv3 license */


/**
 * UI512DemoMenus
 *
 * A "demo" project showing a menubar.
 *
 * 1) tests use this project to compare against a known good screenshot,
 * to make sure rendering has not changed
 * 2) you can start this project in _rootUI512.ts_ to confirm that manually
 * interacting with the menus has the expected behavior
 */
export class UI512DemoMenus extends UI512Presenter {
    test = new TestDrawUI512Menus();
    init() {
        super.init();
        addDefaultListeners(this.listeners);

        let clientRect = this.getStandardWindowBounds();
        this.app = new UI512Application(clientRect, this);
        this.inited = true;
        this.test.addElements(this, '(background)', clientRect);
        this.test.uiContext = true;

        let grp = this.app.getGroup('grp');
        let btn1 = new UI512ElButton('btn1');
        grp.addElement(this.app, btn1);
        btn1.set('labeltext', 'abc');
        btn1.setDimensions(300, 300, 90, 25);

        let btnDldImage = new UI512ElButton('btnDldImage');
        grp.addElement(this.app, btnDldImage);
        btnDldImage.set('labeltext', 'dld test');
        btnDldImage.setDimensions(clientRect[0] + 20, clientRect[1] + 100, 65, 15);

        let btnRunTest = new UI512ElButton('btnRunTest');
        grp.addElement(this.app, btnRunTest);
        btnRunTest.set('labeltext', 'run test');
        btnRunTest.setDimensions(clientRect[0] + 20, clientRect[1] + 150, 65, 15);

        this.invalidateAll();
        this.listenEvent(UI512EventType.MouseUp, UI512DemoMenus.respondMouseUp);
        this.listenEvent(UI512EventType.MenuItemClicked, UI512DemoMenus.respondMenuItemClick);
        this.rebuildFieldScrollbars();
    }

    protected static respondMenuItemClick(pr: UI512DemoMenus, d: MenuItemClickedDetails) {
        console.log('clicked on menuitem ' + d.id);
        let idsInList = 'mnuOptFirst|mnuOptSecond|mnuOptThird'.split('|');
        let [grpBar, grpItems] = MenuPositioning.getMenuGroups(pr.app);
        if (idsInList.indexOf(d.id) !== -1) {
            for (let idInList of idsInList) {
                let item = grpItems.getEl(idInList);
                item.set('checkmark', d.id === item.id);
            }
        }
    }

    protected static respondMouseUp(pr: UI512DemoMenus, d: MouseUpEventDetails) {
        if (d.elClick && d.button === 0) {
            if (d.elClick.id === 'btn1') {
                let btn1 = cast(UI512ElButton, d.elClick, );
                btn1.set('labeltext', 'changed');
            } else if (d.elClick.id === 'btnDldImage') {
        TestUtilsCanvas.RenderAndCompareImages(true, () => pr.test.testDrawMenus());

            } else if (d.elClick.id === 'btnRunTest') {
        TestUtilsCanvas.RenderAndCompareImages(false, () => pr.test.testDrawMenus());
            }
        }
    }
}
