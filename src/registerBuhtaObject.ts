


import {appState} from "./AppState";
import {playSound} from "./utils/playSound";
import {PlaySound} from "./sounds/PlaySound";

export function registerBuhtaObject() {
    (window as any).buhta={
        appState,
        playSound,
        PlaySound,

    };
}
