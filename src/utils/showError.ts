import {appState} from "../AppState";
import {playSound} from "./playSound";

export function showError(mode: string, error: any) {
    appState.barcodesPaused = true;
    appState.errorMessageVisible = true;
    appState.errorMessageMode = mode;
    appState.errorMessageText = error.message || error;
    appState.forceUpdate();
    playSound("error");
}