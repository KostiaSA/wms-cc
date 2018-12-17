import {getRandomString} from "./utils/getRandomString";
import {Guid} from "./utils/guid";
import {XJSON_stringify} from "./utils/xjson";
import * as React from "react";
import {IZebraApi} from "./zebra/ZebraApi";
import {AppWindow, IAppPageProps} from "./pages/AppWindow";
import {ComponentType} from "react";
import {LoginPage} from "./pages/LoginPage";
import {playSound} from "./utils/playSound";
import {showSnack} from "./ui/showSnack";
import {PlaySound} from "./sounds/PlaySound";
import {registerBuhtaObject} from "./registerBuhtaObject";


// import {IAppPage} from "./zebra-ui/AppWindow";
declare var zebra: IZebraApi;

export interface IOpenedPage {
    props: IAppPageProps;
    content: ComponentType<IAppPageProps>;
}

export interface BarcodeWithType {
    barcode: string;
    barcodeType: string;
}

export class AppState {
    tsdKey: number = -1;
    kadrId: number = -1;
    podrId: number = -1;
    userName: string = "";

    activePageId: string[] = [];
    // infoPage: IAppPage;
    // loginPage: IAppPage;
    // taskPage: IAppPage;
    // mainMenuPage: IAppPage;
    windowId: string;
    pages: IOpenedPage[] = [];

    errorMessageVisible: boolean = false;
    errorMessageMode: string = "";
    errorMessageText: string = "";

    //barcodesQueue: string[] = [];
    barcodesQueue: { [pageId: string]: BarcodeWithType[] } = {};
    barcodesPaused: boolean = false;

    appWindow: AppWindow | undefined;

    //snack: SnackbarProps | null = null;

    forceUpdate() {
        this.appWindow!.forceUpdate();
    }

    constructor() {
        this.windowId = getRandomString(10);

        this.pages.push({props: {pageId: LoginPage.PAGE_ID}, content: LoginPage});
        this.activePageId.push(LoginPage.PAGE_ID);


    }


    // openPage(page: IOpenedPage) {
    //     if (!page.props.pageId)
    //         throw  "openPage(): не заполнен props.pageId";
    //
    //     let pageIndex = this.pages.map((p: IOpenedPage) => p.props.pageId).indexOf(page.props.pageId);
    //     if (pageIndex == -1) {
    //         // нет такой, добавляем
    //         this.pages.push(page);
    //         this.activePageId.unshift(page.props.pageId);
    //     } else {
    //         // передвигаем в топ
    //         this.activePageId.splice(pageIndex, 1);
    //         this.activePageId.unshift(page.props.pageId);
    //     }
    //     this.forceUpdate();
    // }

    openPage<AppPageProps extends IAppPageProps>(content: ComponentType<AppPageProps>, props: AppPageProps) {
        let page: IOpenedPage = {
            props, content
        } as any;

        if (!page.props.pageId)
            throw  "openPage(): не заполнен props.pageId";

        let pageIndex = this.pages.map((p: IOpenedPage) => p.props.pageId).indexOf(page.props.pageId);
        if (pageIndex == -1) {
            // нет такой, добавляем
            this.pages.push(page);
            this.activePageId.unshift(page.props.pageId);
        } else {
            // передвигаем в топ
            this.activePageId.splice(pageIndex, 1);
            this.activePageId.unshift(page.props.pageId);
        }
        this.forceUpdate();
    }

    closeActivePage() {
        this.activePageId.shift();
        this.forceUpdate();
    }

    closeAndDestroyActivePage() {
        if (!this.activePageId[0])
            throw "closeAndDestroyActivePage():!this.activePageId[0]";

        // удаляем
        let pageIndex = this.pages.map((p: IOpenedPage) => p.props.pageId).indexOf(this.activePageId[0]);
        this.pages.splice(pageIndex, 1);

        this.closeActivePage();
    }

    // switchToPageByBottomBarIndex(bottomBarIndex: number) {
    //     this.pages.forEach((page: IAppPage) => {
    //         if (page.bottomBarIndex == bottomBarIndex)
    //             this.activePage[0] = page;
    //     })
    // }

    onReadBarcodeHandler(barcode: string, barcodeType: string) {
        barcode = atob(barcode);
        let pageId = this.activePageId[0];

        if (pageId) {
            let page = this.pages.find((p: IOpenedPage) => p.props.pageId == pageId);
            if (page!.props.disableBarcodes) {
                PlaySound.штрих_коды_здесь_недопустимы();
            } else {
                if (!this.barcodesQueue[pageId])
                    this.barcodesQueue[pageId] = [];
                this.barcodesQueue[pageId].push({barcode, barcodeType});
                console.log("получен штрих-код", barcode, barcodeType);
            }
        }
    };

    pushTestBarcode(barcode: string, barcodeType: string) {
        let pageId = this.activePageId[0];
        if (pageId) {
            let page = this.pages.find((p: IOpenedPage) => p.props.pageId == pageId);
            if (page!.props.disableBarcodes) {
                PlaySound.штрих_коды_здесь_недопустимы();
            } else {
                if (!this.barcodesQueue[pageId])
                    this.barcodesQueue[pageId] = [];
                this.barcodesQueue[pageId].push({barcode, barcodeType});
                console.log("получен штрих-код", barcode, barcodeType);
            }
        }
    };

    getNextBarcodeFromQueue(pageId: string): BarcodeWithType | null {
        if (this.activePageId[0] !== pageId || !this.barcodesQueue[pageId] || this.barcodesQueue[pageId].length == 0)
            return null;
        else
            return this.barcodesQueue[pageId].shift()!;
    }


//    public desktop: Desktop;


// get userId(): string {
//
//     let userIdStr= localStorage.getItem("buhta-userId");
//     if (userIdStr)
//         return XJSON_parse(userIdStr);
//     else
//         throwError("нет userId");
//     throw "fake";
// }
//
// get sessionIdAsStr(): string {
//     return guidToHex(this.sessionId);
// }
//

// private cachedSessionId: Guid;
//
// get sessionId(): Guid {
//     if (!this.cachedSessionId) {
//         let sessionIdStr = localStorage.getItem("buhta-sessionId");
//         if (sessionIdStr) {
//             this.cachedSessionId = XJSON_parse(sessionIdStr);
//         }
//         else {
//             this.cachedSessionId = newGuid();
//             localStorage.setItem("buhta-sessionId", XJSON_stringify(this.cachedSessionId));
//         }
//     }
//     return this.cachedSessionId;
// }

    isLoggedIn()
        :
        boolean {
        return this.authToken !== "none";
    }

    get authToken()
        :
        string {
        return localStorage.getItem("buhta-authToken") || "none";
    }

    get login()
        :
        string {
        return localStorage.getItem("buhta-login") || "";
    }

    setAuthToken(token
                     :
                     string, login
                     :
                     string, userId
                     :
                     Guid
    ) {
        localStorage.setItem("buhta-authToken", token);
        localStorage.setItem("buhta-login", login);
        localStorage.setItem("buhta-userId", XJSON_stringify(userId));
    }

    clearAuthToken() {
        localStorage.setItem("buhta-authToken", "none");
    }

    async start() {
        //registerSqlDataTypes();
        //registerSchemaObjectTypes();
    }
}

//export const appState = store(new AppState());
export const appState = new AppState();
(window as any).appSate = appState;
registerBuhtaObject();