import {appState} from "../AppState";

declare var zebra: IZebraApi;

//zebra=(document as any).zebra;


export interface IZebraApi {
    showToast(toast: string): void;

    playSound(soundFile: string): void;

    vibrate(durationMs: number): void;

    hasVibrator(): boolean;

    onReadBarcode: (barcode: string, type: string) => void;

    getDeviceId(): string;  // Zebra-MC33-734923798234
    getDeviceNum(): string; // номер из настройки BuhtaSetup

    textToSpeech(text: string, volume: string, speed: string, tone:string): void;

    reloadWebView():void;
}


let i = setInterval(() => {
    //console.log("zebra setInterval setInterval setInterval Ok");
    if (zebraOk()) {
        zebra.onReadBarcode = (barcode: string, barcodeType: string): void => {
            appState.onReadBarcodeHandler(barcode, barcodeType);
        };
        clearInterval(i);
        console.log("zebra interface Ok")
    }
}, 1000);


export function zebraOk(): boolean {
    return typeof zebra !== "undefined";
}


export function zebraShowToast(toast: string) {
    if (zebraOk()) {
        zebra.showToast(toast);
    }
}

export function zebraVibrate(durationMs: number) {
    if (zebraOk()) {
        zebra.vibrate(durationMs);
    }
}

export function zebraHasVibrator(): boolean {
    if (zebraOk()) {
        return zebra.hasVibrator();
    } else {
        return false;
    }
}

export function zebraGetDeviceId() {
    if (zebraOk()) {
        return zebra.getDeviceId();
    } else {
        return "emulator";
    }
}

export function zebraGetDeviceNum() {
    if (zebraOk()) {
        return zebra.getDeviceNum();
    } else {
        return "";
    }
}

export function zebraReloadWebView() {
    if (zebraOk()) {
        return zebra.reloadWebView();
    }
}

export function zebraTextToSpeech(text: string, volume: number=-1, speed: number=-1, tone=-1) {
    if (zebraOk()) {
        // todo взять из настроек пользователя
        if (volume==-1)
            volume=1;
        if (speed==-1)
            speed=1.4;
        if (tone==-1)
            tone=1;

        return zebra.textToSpeech(text, volume.toString(), speed.toString(), tone.toString());
    } else {
        return "";
    }
}
