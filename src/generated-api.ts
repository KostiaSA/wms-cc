
import { executeSql } from "./utils/executeSql";
import { stringAsSql } from "./utils/stringAsSql";
import { Moment } from "moment";

export interface IResult_wms_android_Логин {
    error: string;
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
            if (typeof (row.tsdKey) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'tsdKey'");
            if (typeof row.tsdKey != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'tsdKey' должно быть числом");
            if (typeof (row.FullUserName) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'FullUserName'");
            if (typeof row.FullUserName != "string") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'FullUserName' должно быть строкой");
            if (typeof (row.KadrId) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'KadrId'");
            if (typeof row.KadrId != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'KadrId' должно быть числом");
            if (typeof (row.PodrId) == "undefined") throw new Error("результат выполнения '_wms_android_Логин': не заполнена колонка 'PodrId'");
            if (typeof row.PodrId != "number") throw new Error("результат выполнения '_wms_android_Логин': значение в колонке 'PodrId' должно быть числом");
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Главное_меню_Список_Новых_Заданий {
    error: string;
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
            if (typeof (row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "string") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': значение в колонке 'Тип' должно быть строкой");
            if (typeof (row.Новых) == "undefined") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': не заполнена колонка 'Новых'");
            if (typeof row.Новых != "number") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': значение в колонке 'Новых' должно быть числом");
            if (typeof (row.ВРаботе) == "undefined") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': не заполнена колонка 'ВРаботе'");
            if (typeof row.ВРаботе != "number") throw new Error("результат выполнения '_wms_android_Главное_меню_Список_Новых_Заданий': значение в колонке 'ВРаботе' должно быть числом");
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_Доступы {
    error: string;
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
            if (typeof (row.UserGroup) == "undefined") throw new Error("результат выполнения '_wms_android_Доступы': не заполнена колонка 'UserGroup'");
            if (typeof row.UserGroup != "string") throw new Error("результат выполнения '_wms_android_Доступы': значение в колонке 'UserGroup' должно быть строкой");
            if (typeof (row.TableName) == "undefined") throw new Error("результат выполнения '_wms_android_Доступы': не заполнена колонка 'TableName'");
            if (typeof row.TableName != "string") throw new Error("результат выполнения '_wms_android_Доступы': значение в колонке 'TableName' должно быть строкой");
            if (typeof (row.Access) == "undefined") throw new Error("результат выполнения '_wms_android_Доступы': не заполнена колонка 'Access'");
            if (typeof row.Access != "string") throw new Error("результат выполнения '_wms_android_Доступы': значение в колонке 'Access' должно быть строкой");
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_ПИК_получить_задание {
    error: string;
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
            if (typeof (row.taskId) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_получить_задание': не заполнена колонка 'taskId'");
            if (typeof row.taskId != "number") throw new Error("результат выполнения '_wms_android_ПИК_получить_задание': значение в колонке 'taskId' должно быть числом");
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Информация_о_задании {
    error: string;
    РучнаяПогрузка: number;
    СрочнаяОтгрузка: number;
    ВремяНачалаПлан: Moment;
    ВремяОкончанияПлан: Moment;
    Автомобиль: string;
    Водитель: string;
    Подразделение2: string;
    Сотрудник: string;
    ЕстьСпецификация: number;
    ПропускУпакРазрешен: number;
    НазваниеЗадания: string;
    Откуда: string;
    Куда: string;
    Паллета: string;
    Зона: string;
    ЗаявкаНомер: string;
    ЗаявкаДата: string;
    ЗаявкаПримечание: string;
    Объединенная: number;
    Тип: number;
    ДоговорКлюч: number;
    ДоговорПодразделение: number;
    Клиент: number;
    ПовторнаяОтгрузка: number;
    ЗавершенноеЗадание: number;
    РучнойВводКоличества: number
}

export async function _wms_android_Информация_о_задании(taskId: number): Promise<IResult_wms_android_Информация_о_задании> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_Информация_о_задании': параметр 'taskId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Информация_о_задании " + taskId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof (row.РучнаяПогрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'РучнаяПогрузка'");
            if (typeof row.РучнаяПогрузка != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'РучнаяПогрузка' должно быть числом");
            if (typeof (row.СрочнаяОтгрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'СрочнаяОтгрузка'");
            if (typeof row.СрочнаяОтгрузка != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'СрочнаяОтгрузка' должно быть числом");
            if (typeof (row.ВремяНачалаПлан) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяНачалаПлан'");
            if (!row.ВремяНачалаПлан.constructor || row.ВремяНачалаПлан.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяНачалаПлан' должно быть датой");
            if (typeof (row.ВремяОкончанияПлан) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяОкончанияПлан'");
            if (!row.ВремяОкончанияПлан.constructor || row.ВремяОкончанияПлан.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяОкончанияПлан' должно быть датой");
            if (typeof (row.Автомобиль) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Автомобиль'");
            if (typeof row.Автомобиль != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Автомобиль' должно быть строкой");
            if (typeof (row.Водитель) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Водитель'");
            if (typeof row.Водитель != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Водитель' должно быть строкой");
            if (typeof (row.Подразделение2) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Подразделение2'");
            if (typeof row.Подразделение2 != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Подразделение2' должно быть строкой");
            if (typeof (row.Сотрудник) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Сотрудник'");
            if (typeof row.Сотрудник != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Сотрудник' должно быть строкой");
            if (typeof (row.ЕстьСпецификация) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЕстьСпецификация'");
            if (typeof row.ЕстьСпецификация != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЕстьСпецификация' должно быть числом");
            if (typeof (row.ПропускУпакРазрешен) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПропускУпакРазрешен'");
            if (typeof row.ПропускУпакРазрешен != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПропускУпакРазрешен' должно быть числом");
            if (typeof (row.НазваниеЗадания) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'НазваниеЗадания'");
            if (typeof row.НазваниеЗадания != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'НазваниеЗадания' должно быть строкой");
            if (typeof (row.Откуда) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Откуда'");
            if (typeof row.Откуда != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Откуда' должно быть строкой");
            if (typeof (row.Куда) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Куда'");
            if (typeof row.Куда != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Куда' должно быть строкой");
            if (typeof (row.Паллета) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Паллета'");
            if (typeof row.Паллета != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Паллета' должно быть строкой");
            if (typeof (row.Зона) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Зона'");
            if (typeof row.Зона != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Зона' должно быть строкой");
            if (typeof (row.ЗаявкаНомер) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаНомер'");
            if (typeof row.ЗаявкаНомер != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаНомер' должно быть строкой");
            if (typeof (row.ЗаявкаДата) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаДата'");
            if (typeof row.ЗаявкаДата != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаДата' должно быть строкой");
            if (typeof (row.ЗаявкаПримечание) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаПримечание'");
            if (typeof row.ЗаявкаПримечание != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаПримечание' должно быть строкой");
            if (typeof (row.Объединенная) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Объединенная'");
            if (typeof row.Объединенная != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Объединенная' должно быть числом");
            if (typeof (row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Тип' должно быть числом");
            if (typeof (row.ДоговорКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорКлюч'");
            if (typeof row.ДоговорКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорКлюч' должно быть числом");
            if (typeof (row.ДоговорПодразделение) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПодразделение'");
            if (typeof row.ДоговорПодразделение != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПодразделение' должно быть числом");
            if (typeof (row.Клиент) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Клиент'");
            if (typeof row.Клиент != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Клиент' должно быть числом");
            if (typeof (row.ПовторнаяОтгрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПовторнаяОтгрузка'");
            if (typeof row.ПовторнаяОтгрузка != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПовторнаяОтгрузка' должно быть числом");
            if (typeof (row.ЗавершенноеЗадание) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗавершенноеЗадание'");
            if (typeof row.ЗавершенноеЗадание != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗавершенноеЗадание' должно быть числом");
            if (typeof (row.РучнойВводКоличества) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'РучнойВводКоличества'");
            if (typeof row.РучнойВводКоличества != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'РучнойВводКоличества' должно быть числом");
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Взять_задание_в_работу_ПИК {
    error: string;
    Ok: string
}

export async function _wms_android_Взять_задание_в_работу_ПИК(TaskId: number, KadrId: number): Promise<IResult_wms_android_Взять_задание_в_работу_ПИК> {
    if (typeof TaskId != "number") throw new Error("вызов '_wms_android_Взять_задание_в_работу_ПИК': параметр 'TaskId' должен быть числом");
    if (typeof KadrId != "number") throw new Error("вызов '_wms_android_Взять_задание_в_работу_ПИК': параметр 'KadrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Взять_задание_в_работу_ПИК " + TaskId.toString() + "," + KadrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Взять_задание_в_работу_ПИК: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Взять_задание_в_работу_ПИК: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof (row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_Взять_задание_в_работу_ПИК': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "string") throw new Error("результат выполнения '_wms_android_Взять_задание_в_работу_ПИК': значение в колонке 'Ok' должно быть строкой");
        }
    }

    return lastRecordset[0];

}
