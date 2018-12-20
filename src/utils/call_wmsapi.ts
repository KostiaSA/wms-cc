import {XJSON_clone, XJSON_parse} from "./xjson";
import * as moment from "moment";
import {appState} from "../AppState";


export async function call_wmsapi<Response>(procName: string, params: any): Promise<Response> {
    params.tsdKey = appState.tsdKey;

    return new Promise<any>(
        (resolve: (obj: any) => void, reject: (error: string) => void) => {

            var xhr = new XMLHttpRequest();
            let url = "wmsapi";
            xhr.open("POST", url, true);
            xhr.setRequestHeader('Content-type', "application/json;charset=UTF-8");


            xhr.onload = function () {
                let ansBody = JSON.parse((this as XMLHttpRequest).responseText);

                // for (let r = 0; r < ansBody.recordsets.length; r++) {
                //     let rs = ansBody.recordsets[r];
                //     let cols = ansBody.recordsets_columns[r];
                //     for (let c = 0; c < cols.length; c++) {
                //         let col = cols[c];
                //         if (col.type == "datetime" || col.type == "smalldatetime") {
                //             rs.forEach((row: any) => {
                //                 row[col.name] = (moment as any)(row[col.name]);
                //             });
                //         }
                //     }
                //
                // }

                resolve(ansBody);
            };

            xhr.onerror = function (ev: Event) {
                reject("нет связи с сервером");
            };

            let fullReq = {
                procName,
                params
            };

            xhr.send(JSON.stringify(fullReq));

        });


}
