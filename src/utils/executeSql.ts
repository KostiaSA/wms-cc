import { XJSON_clone, XJSON_parse } from "./xjson";
import * as moment from "moment";
import { appState } from '../AppState';
import { sleep } from "./sleep";
import { zebraGetDeviceId } from '../zebra/ZebraApi';

interface IExecuteSqlReq {
    tsdKey: number,
    userName: string,
    deviceId: string,
    sqlBatch: string,
}

export async function executeSql(sql: string): Promise<any[]> {

    await appState.checkPing();

    while (appState.sqlWaitPanelVisible || appState.pingWaitPanelVisible) {
        await sleep(10);
    }

    return new Promise<any>(
        (resolve: (obj: any) => void, reject: (error: string) => void) => {

            console.log(sql);
            var xhr = new XMLHttpRequest();
            // timeout не работает, суки, всегда 120 sec
            //xhr.timeout = 0; xhr.ontimeout = () => { console.log("Timed out!!!"); }
            let url = "executeSql";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {

                appState.sqlWaitPanelVisible = false;
                if (appState.appWindow)
                    appState.appWindow.forceUpdate();


                if (this.status != 200) {
                    reject(this.statusText + " " + this.status);
                    return
                }
                let ansBody = XJSON_parse((this as XMLHttpRequest).responseText) as any;
                if (ansBody.error)
                    reject(ansBody.error);
                else {

                    for (let r = 0; r < ansBody.recordsets.length; r++) {
                        let rs = ansBody.recordsets[r];
                        let cols = ansBody.recordsets_columns[r];
                        for (let c = 0; c < cols.length; c++) {
                            let col = cols[c];
                            if (col.type == "datetime" || col.type == "smalldatetime") {
                                rs.forEach((row: any) => {
                                    row[col.name] = (moment as any)(row[col.name].toString().toUpperCase().replace("Z", ""));
                                });
                            }
                        }

                    }
                    resolve(ansBody.recordsets);
                }
            };

            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == 4) {
            //         if (xhr.status != 200) {
            //             reject("ошибка сервера " + xhr.status);
            //         }
            //     }
            // };

            xhr.onerror = function (ev: Event) {
                console.log("xhr.onerror", ev);

                appState.sqlWaitPanelVisible = false;
                if (appState.appWindow)
                    appState.appWindow.forceUpdate();

                reject("нет связи с сервером");
            };

            let fullReq: IExecuteSqlReq = {
                tsdKey: appState.tsdKey || -1,  // -1 в случае логина
                userName: appState.userName || "login",
                deviceId: zebraGetDeviceId(),
                sqlBatch: sql,
            };


            appState.sqlWaitPanelVisible = true;
            if (appState.appWindow)
                appState.appWindow.forceUpdate();

            xhr.send(JSON.stringify(fullReq));

        });


}


export async function ping(): Promise<boolean> {

    return new Promise<any>(
        (resolve: (obj: any) => void, reject: (error: string) => void) => {

            //console.log("ping");

            var xhr = new XMLHttpRequest();
            let url = "executeSql";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");

            xhr.onload = function () {

                if (this.status != 200) {
                    //reject(this.statusText + " " + this.status);
                    resolve(false);
                    return
                }
                let ansBody = XJSON_parse((this as XMLHttpRequest).responseText) as any;
                if (ansBody.pong != "Ok")
                    resolve(false);
                else {
                    resolve(true);
                }
            };

            // xhr.onreadystatechange = function () {
            //     if (xhr.readyState == 4) {
            //         if (xhr.status != 200) {
            //             reject("ошибка сервера " + xhr.status);
            //         }
            //     }
            // };

            xhr.onerror = function (ev: Event) {
                console.log("ping xhr.onerror", ev);
                //reject("нет связи с сервером");
                resolve(false);

            };

            let fullReq: IExecuteSqlReq = {
                tsdKey: appState.tsdKey || -1,
                userName: appState.userName || "?",
                sqlBatch: "ping",
                deviceId: zebraGetDeviceId()
            };
            xhr.send(JSON.stringify(fullReq));

        });


}
