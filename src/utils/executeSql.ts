import { XJSON_clone, XJSON_parse } from "./xjson";
import * as moment from "moment";
import { appState } from '../AppState';

interface IExecuteSqlReq {
    tsdKey: number,
    userName: string,
    sqlBatch: string

}

export async function executeSql(sql: string): Promise<any[]> {

    return new Promise<any>(
        (resolve: (obj: any) => void, reject: (error: string) => void) => {

            console.log(sql);
            var xhr = new XMLHttpRequest();
            let url = "executeSql";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");


            xhr.onload = function () {
                appState.sqlWaitPanelVisible = false;
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
                appState.sqlWaitPanelVisible = false;
                appState.appWindow.forceUpdate();
                reject("нет связи с сервером");
            };

            let fullReq: IExecuteSqlReq = {
                tsdKey: appState.tsdKey || -1,  // -1 в случае логина
                userName: appState.userName || "login",
                sqlBatch: sql
            };

            appState.sqlWaitPanelVisible = true;
            appState.appWindow.forceUpdate();
            xhr.send(JSON.stringify(fullReq));

        });


}
