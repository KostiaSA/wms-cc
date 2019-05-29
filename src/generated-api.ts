
import { executeSql } from "./utils/executeSql";
import { stringAsSql } from "./utils/stringAsSql";

export interface IResult_wms_android_Логин {
    error:string;
    tsdKey: number;
    FullUserName: string;
    KadrId: number;
    PodrId: number
}

export async function _wms_android_Логин(userName: string, password: string, deviceId: string, deviceNum: string): Promise<IResult_wms_android_Логин> {
    if (typeof userName != "string") throw new Error("вызов '_wms_android_Логин': параметр 'userName' должен быть строкой");
    if (typeof password != "string") throw new Error("вызов '_wms_android_Логин': параметр 'password' должен быть строкой");
    if (typeof deviceId != "string") throw new Error("вызов '_wms_android_Логин': параметр 'deviceId' должен быть строкой");
    if (typeof deviceNum != "string") throw new Error("вызов '_wms_android_Логин': параметр 'deviceNum' должен быть строкой");
    // let recordsets = await executeSql("_wms_android_Логин " + stringAsSql(userName) + "," + stringAsSql(password) + "," + stringAsSql(deviceId) + "," + stringAsSql(deviceNum));
    let recordsets = await executeSql("_wms_android_Логин " + stringAsSql(userName) + "," + stringAsSql(password) + "," + stringAsSql(deviceId) + "," + stringAsSql(deviceNum));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Логин: не вернула результатов" } as any;

    if (lastRecordset.length > 1) return { error: "_wms_android_Логин: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;

    for (let row of lastRecordset) {
        if (!row.error) {
            if (!row.tsdKey) throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'tsdKey'");
            if (typeof row.tsdKey != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'tsdKey' должно быть числом");
            if (!row.FullUserName) throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'FullUserName'");
            if (typeof row.FullUserName != "string") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'FullUserName' должно быть строкой");
            if (!row.KadrId) throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'KadrId'");
            if (typeof row.KadrId != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'KadrId' должно быть числом");
            if (!row.PodrId) throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'PodrId'");
            if (typeof row.PodrId != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'PodrId' должно быть числом");            
        }
    }

    return lastRecordset[0];

}
