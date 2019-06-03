
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
    let recordsets = await executeSql("_wms_android_Логин " + stringAsSql(userName) + "," + stringAsSql(password) + "," + stringAsSql(deviceId) + "," + stringAsSql(deviceNum));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Логин: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Логин: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.tsdKey) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'tsdKey'");
            if (typeof row.tsdKey != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'tsdKey' должно быть числом");
            if (typeof(row.FullUserName) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'FullUserName'");
            if (typeof row.FullUserName != "string") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'FullUserName' должно быть строкой");
            if (typeof(row.KadrId) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'KadrId'");
            if (typeof row.KadrId != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'KadrId' должно быть числом");
            if (typeof(row.PodrId) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'PodrId'");
            if (typeof row.PodrId != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'PodrId' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Главное_меню_Список_Новых_Заданий {
    error:string;
    Тип: string;
    Новых: number;
    ВРаботе: number
}

export async function _wms_android_Главное_меню_Список_Новых_Заданий(KadrId: number, PodrId: number): Promise<IResult_wms_android_Главное_меню_Список_Новых_Заданий[]> {
    if (typeof KadrId != "number") throw new Error("вызов '_wms_android_Главное_меню_Список_Новых_Заданий': параметр 'KadrId' должен быть числом");
    if (typeof PodrId != "number") throw new Error("вызов '_wms_android_Главное_меню_Список_Новых_Заданий': параметр 'PodrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Главное_меню_Список_Новых_Заданий " + KadrId.toString() + "," + PodrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "string") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': значение в колонке 'Тип' должно быть строкой");
            if (typeof(row.Новых) == "undefined") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': не заполнена колонка 'Новых'");
            if (typeof row.Новых != "number") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': значение в колонке 'Новых' должно быть числом");
            if (typeof(row.ВРаботе) == "undefined") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': не заполнена колонка 'ВРаботе'");
            if (typeof row.ВРаботе != "number") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': значение в колонке 'ВРаботе' должно быть числом");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_Доступы {
    error:string;
    UserGroup: string;
    TableName: string;
    Access: string
}

export async function _wms_android_Доступы(login: string): Promise<IResult_wms_android_Доступы[]> {
    if (typeof login != "string") throw new Error("вызов '_wms_android_Доступы': параметр 'login' должен быть строкой");
    let recordsets = await executeSql("_wms_android_Доступы " + stringAsSql(login));
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.UserGroup) == "undefined") throw new Error("результат выполнения '_wms_android_Доступы': не заполнена колонка 'UserGroup'");
            if (typeof row.UserGroup != "string") throw new Error("результат выполнения '_wms_android_Доступы': значение в колонке 'UserGroup' должно быть строкой");
            if (typeof(row.TableName) == "undefined") throw new Error("результат выполнения '_wms_android_Доступы': не заполнена колонка 'TableName'");
            if (typeof row.TableName != "string") throw new Error("результат выполнения '_wms_android_Доступы': значение в колонке 'TableName' должно быть строкой");
            if (typeof(row.Access) == "undefined") throw new Error("результат выполнения '_wms_android_Доступы': не заполнена колонка 'Access'");
            if (typeof row.Access != "string") throw new Error("результат выполнения '_wms_android_Доступы': значение в колонке 'Access' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_ПИК_получить_задание {
    error:string;
    taskId: number
}

export async function _wms_android_ПИК_получить_задание(KadrId: number): Promise<IResult_wms_android_ПИК_получить_задание> {
    if (typeof KadrId != "number") throw new Error("вызов '_wms_android_ПИК_получить_задание': параметр 'KadrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_получить_задание " + KadrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_получить_задание: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_получить_задание: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.taskId) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_получить_задание': не заполнена колонка 'taskId'");
            if (typeof row.taskId != "number") throw new Error("результат выполнения '_wms_android_ПИК_получить_задание': значение в колонке 'taskId' должно быть числом");            
        }
    }

    return lastRecordset[0];

}
