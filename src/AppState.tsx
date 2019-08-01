import { getRandomString } from "./utils/getRandomString";
import { Guid } from "./utils/guid";
import { XJSON_stringify } from "./utils/xjson";
import * as React from "react";
import { IZebraApi } from "./zebra/ZebraApi";
import { AppWindow, IAppPageProps } from "./pages/AppWindow";
import { ComponentType } from "react";
import { LoginPage } from "./pages/LoginPage";
import { playSound } from "./utils/playSound";
import { showSnack } from "./ui/showSnack";
import { PlaySound } from "./sounds/PlaySound";
import { registerBuhtaObject } from "./registerBuhtaObject";
//import {showErrorMessage} from "./modals/ErrorMessageModal";
import { showAppError } from "./modals/ErrorMessagePage";
import { IResult_wms_android_Доступы, IResult_wms_android_Главное_меню_Список_Новых_Заданий, _wms_android_Получить_настройки_ТСД, _wms_android_Сохранить_настройки_ТСД, IResult_wms_android_Список_настроек_WMS } from "./generated-api";
import { sleep } from "./utils/sleep";
import { ping } from "./utils/executeSql";


// import {IAppPage} from "./zebra-ui/AppWindow";
declare var zebra: IZebraApi;

export type НастройкиТСД = "zoom" | "???";

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
    настройкиWMS: IResult_wms_android_Список_настроек_WMS[] = [];
    доступы: IResult_wms_android_Доступы[] = [];
    новыеЗадания: IResult_wms_android_Главное_меню_Список_Новых_Заданий[] = [];

    activePageId: string[] = [];
    windowId: string;
    pages: IOpenedPage[] = [];
    modals: IOpenedPage[] = [];

    errorMessageVisible: boolean = false;
    errorMessageMode: string = "";
    errorMessageText: string = "";

    //barcodesQueue: string[] = [];
    barcodesQueue: { [pageId: string]: BarcodeWithType[] } = {};
    barcodesPaused: boolean = false;

    appWindow: AppWindow | undefined;

    //snack: SnackbarProps | null = null;

    sqlWaitPanelVisible: boolean = false;
    pingWaitPanelVisible: boolean = false;

    private _настройки_ТСД: { [параметр: string]: any } = {};

    async зарузить_настройки_ТСД() {
        this._настройки_ТСД["zoom"] = 1;

        let res = await _wms_android_Получить_настройки_ТСД(this.kadrId);
        for (let row of res) {
            this._настройки_ТСД[row.Параметр] = JSON.parse(row.Значение);
        }
    }

    async сохранить_настройки_ТСД(параметр: НастройкиТСД, значение: any) {
        this._настройки_ТСД[параметр] = значение;
        await _wms_android_Сохранить_настройки_ТСД(this.kadrId, параметр, JSON.stringify(значение));

    }

    настройки_ТСД(параметр: НастройкиТСД): any {
        if (typeof this._настройки_ТСД[параметр] == "undefined") {
            if (параметр == "zoom")
                return 1.1;
            throw new Error("нет такой настройки ТСД: " + параметр);
        }

        return this._настройки_ТСД[параметр];
    }

    настройки_WMS(параметр: string): string {

        let item = this.настройкиWMS.find((i: IResult_wms_android_Список_настроек_WMS) => i.Значение.toUpperCase() == параметр.toUpperCase());

        if (!item)
            throw new Error("нет такой настройки WMS: " + параметр);

        return item.Параметр;
    }

    get zoom() {
        return this.настройки_ТСД("zoom");
    }

    forceUpdate() {
        this.appWindow!.forceUpdate();
    }

    constructor() {
        this.windowId = getRandomString(10);

        this.pages.push({ props: { pageId: LoginPage.PAGE_ID }, content: LoginPage });
        this.activePageId.push(LoginPage.PAGE_ID);

        setInterval(() => {
            this.checkPing();
        }, 15000);

    }

    async checkPing() {
        let oldVisible = this.pingWaitPanelVisible;
        let pinkOk = await ping();
        if (pinkOk) {
            this.pingWaitPanelVisible = false;
            if (this.appWindow && oldVisible != this.pingWaitPanelVisible)
                this.appWindow.forceUpdate();
        }
        else {
            appState.pingWaitPanelVisible = true;
            if (this.appWindow && oldVisible != this.pingWaitPanelVisible)
                appState.appWindow.forceUpdate();
        }
    }



    openModal<AppPageProps extends IAppPageProps>(content: any /*ComponentType<AppPageProps>*/, props: AppPageProps) {
        let page: IOpenedPage = {
            props, content
        } as any;

        if (!page.props.pageId)
            throw "openModal(): не заполнен props.pageId";

        this.modals.unshift(page);
        this.forceUpdate();
    }

    closeActiveModal() {
        this.modals.shift();
        this.forceUpdate();
    }

    getActivePageId(): string {
        if (this.modals.length > 0)
            return this.modals.slice(-1)[0].props.pageId;
        else if (this.pages.length > 0)
            return this.pages.slice(-1)[0].props.pageId;
        else
            return "";

    }

    modalResult: any;

    setModalResult<R>(res: R) {
        if (typeof (this.modalResult) != "undefined")
            throw new Error("internal error in setModalResult(): this.modalResult) != 'undefined'");
        this.modalResult = res;
        this.closeActiveModal()
    }

    async getModalResult<AppPageProps extends IAppPageProps, R>(content: any, props: AppPageProps): Promise<R> {
        this.modalResult = undefined;
        this.openModal(content, props);
        return new Promise<any>(
            async (resolve: (res: any) => void, reject: (error: string) => void) => {
                while (typeof (this.modalResult) == "undefined")
                    await sleep(10);
                let this_modalResult = this.modalResult;
                this.modalResult = undefined;
                resolve(this_modalResult);
            });
    }


    openPage<AppPageProps extends IAppPageProps>(content: any /*ComponentType<AppPageProps>*/, props: AppPageProps) {
        let page: IOpenedPage = {
            props, content
        } as any;

        if (!page.props.pageId)
            throw "openPage(): не заполнен props.pageId";

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
        this.closeAndDestroyActivePage();
        //setTimeout(() => { this.closeAndDestroyActivePage(); }, 10);

        // this.activePageId.shift();
        // this.forceUpdate();
    }

    private closeAndDestroyActivePage() {
        if (!this.activePageId[0])
            throw "closeAndDestroyActivePage():!this.activePageId[0]";

        // удаляем
        let pageIndex = this.pages.map((p: IOpenedPage) => p.props.pageId).indexOf(this.activePageId[0]);
        this.pages.splice(pageIndex, 1);

        this.activePageId.shift();
        this.forceUpdate();
    }

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
                this.barcodesQueue[pageId].push({ barcode, barcodeType });
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
                this.barcodesQueue[pageId].push({ barcode, barcodeType });
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

    isUsersHasAccessToRasdel(rasdel: string): boolean {

        if (rasdel == "НАСТРОЙКА_ТСД")
            return true;

        rasdel = rasdel.toUpperCase();
        if (!rasdel.startsWith("MOBILE_"))
            rasdel = "MOBILE_" + rasdel;

        if (rasdel == "MOBILE_ИНФО")
            return true;

        // сначала перебираем доступы конкретного юзера
        for (let acc of this.доступы) {
            if (acc.UserGroup == this.login && acc.TableName == rasdel) {
                return acc.Access == "Полный";
            }
        }

        // сначала перебираем доступы в группах юзера
        for (let acc of this.доступы) {
            if (acc.TableName == rasdel) {
                if (acc.Access == "Полный")
                    return true;
            }
        }
        return false;
    }

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

    isLoggedIn(): boolean {
        return this.authToken !== "none";
    }

    get authToken(): string {
        return localStorage.getItem("buhta-authToken") || "none";
    }

    get login(): string {
        return localStorage.getItem("buhta-login") || "";
    }

    setAuthToken(token: string, login: string, userId: Guid) {
        localStorage.setItem("buhta-authToken", token);
        localStorage.setItem("buhta-login", login);
        localStorage.setItem("buhta-userId", XJSON_stringify(userId));
    }

    clearAuthToken() {
        localStorage.setItem("buhta-authToken", "none");
    }

    // async start() {
    //     //registerSqlDataTypes();
    //     //registerSchemaObjectTypes();
    // }
}


export const appState = new AppState();

(window as any).appSate = appState;

registerBuhtaObject();

window.onerror = function (event: Event | string, source?: string, fileno?: number, columnNumber?: number, error?: Error) {

    // react сам перехватывает ошибки и спамит "Script error."
    if (event.toString() == "Script error.")
        return;

    console.error(event);
    showAppError(event);

    var suppressErrorAlert = true;
    return suppressErrorAlert;
};

window.addEventListener("unhandledrejection", function (promiseRejectionEvent) {
    console.error(promiseRejectionEvent.reason.toString());
    showAppError(promiseRejectionEvent.reason.toString());
});