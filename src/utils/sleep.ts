import {ReactNode} from "react";
import {getRandomString} from "./getRandomString";
import {appState} from "../AppState";

export async function sleep(durationMs:number): Promise<void> {
    return new Promise<void>(
        (resolve: () => void, reject: (error: string) => void) => {
            setTimeout(resolve,durationMs);
        });
}
