
import { executeSql } from "./utils/executeSql";
import { stringAsSql } from "./utils/stringAsSql";
import { Moment } from "moment";

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

export interface IResult_wms_android_Информация_о_задании {
    error:string;
    Ключ: number;
    РучнаяПогрузка: boolean;
    СрочнаяОтгрузка: boolean;
    ВремяНачалаПлан: Moment;
    ВремяОкончанияПлан: Moment;
    Автомобиль: string;
    Водитель: string;
    Подразделение2: string;
    Сотрудник: string;
    ЕстьСпецификация: boolean;
    ПропускУпакРазрешен: boolean;
    НазваниеЗадания: string;
    Откуда: string;
    Куда: string;
    Паллета: string;
    Зона: string;
    ЗонаКлюч: number;
    ЗаявкаНомер: string;
    ЗаявкаДата: string;
    ЗаявкаПримечание: string;
    Объединенная: boolean;
    Тип: number;
    ДоговорКлюч: number;
    ДоговорПодразделениеКлюч: number;
    КлиентКлюч: number;
    КлиентПаллетаКлюч: number;
    ПовторнаяОтгрузка: boolean;
    ЗавершенноеЗадание: boolean;
    РучнойВводКоличества: boolean;
    isCrossDoc: boolean;
    isBrak: boolean;
    isReturn: boolean;
    СозданИзДопМеню: boolean;
    ВремяНачалаФакт: Moment;
    ВремяОкончанияФакт: Moment;
    Сверка: string;
    ПроцентОтклоненияВесовогоТовара: number;
    УдаленныйРегион: boolean;
    ВыводитьЭтикеткуА4: boolean;
    ЗапрашиватьГабаритыПаллеты: boolean;
    КоличествоМестBOX: number;
    ГрузоотправительКлюч: number;
    ДокументОтгрузкиКлюч: number;
    ДоговорПеремещенияКлюч: number;
    КорневойДоговорОтгрузкиКлюч: number;
    ДоговорПризнак1: boolean;
    ДоговорПризнак2: boolean;
    ДоговорПризнак3: boolean;
    ДоговорПризнак4: boolean;
    ДоговорПризнак5: boolean;
    ДоговорПризнак6: boolean;
    ДоговорПризнак7: boolean;
    ДоговорПризнак8: boolean;
    ДоговорПризнак9: boolean;
    ДоговорПризнак10: boolean;
    ДоговорПризнак11: boolean;
    ДоговорПризнак12: boolean;
    ДоговорПризнак13: boolean;
    ДоговорПризнак14: boolean
}

export async function _wms_android_Информация_о_задании(taskId: number): Promise<IResult_wms_android_Информация_о_задании> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_Информация_о_задании': параметр 'taskId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Информация_о_задании " + taskId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.РучнаяПогрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'РучнаяПогрузка'");
            if (typeof row.РучнаяПогрузка != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'РучнаяПогрузка' должно быть true/false");
            if (typeof(row.СрочнаяОтгрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'СрочнаяОтгрузка'");
            if (typeof row.СрочнаяОтгрузка != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'СрочнаяОтгрузка' должно быть true/false");
            if (typeof(row.ВремяНачалаПлан) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяНачалаПлан'");
            if (!row.ВремяНачалаПлан.constructor || row.ВремяНачалаПлан.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяНачалаПлан' должно быть датой (Moment)");
            if (typeof(row.ВремяОкончанияПлан) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяОкончанияПлан'");
            if (!row.ВремяОкончанияПлан.constructor || row.ВремяОкончанияПлан.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяОкончанияПлан' должно быть датой (Moment)");
            if (typeof(row.Автомобиль) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Автомобиль'");
            if (typeof row.Автомобиль != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Автомобиль' должно быть строкой");
            if (typeof(row.Водитель) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Водитель'");
            if (typeof row.Водитель != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Водитель' должно быть строкой");
            if (typeof(row.Подразделение2) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Подразделение2'");
            if (typeof row.Подразделение2 != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Подразделение2' должно быть строкой");
            if (typeof(row.Сотрудник) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Сотрудник'");
            if (typeof row.Сотрудник != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Сотрудник' должно быть строкой");
            if (typeof(row.ЕстьСпецификация) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЕстьСпецификация'");
            if (typeof row.ЕстьСпецификация != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЕстьСпецификация' должно быть true/false");
            if (typeof(row.ПропускУпакРазрешен) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПропускУпакРазрешен'");
            if (typeof row.ПропускУпакРазрешен != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПропускУпакРазрешен' должно быть true/false");
            if (typeof(row.НазваниеЗадания) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'НазваниеЗадания'");
            if (typeof row.НазваниеЗадания != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'НазваниеЗадания' должно быть строкой");
            if (typeof(row.Откуда) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Откуда'");
            if (typeof row.Откуда != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Откуда' должно быть строкой");
            if (typeof(row.Куда) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Куда'");
            if (typeof row.Куда != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Куда' должно быть строкой");
            if (typeof(row.Паллета) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Паллета'");
            if (typeof row.Паллета != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Паллета' должно быть строкой");
            if (typeof(row.Зона) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Зона'");
            if (typeof row.Зона != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Зона' должно быть строкой");
            if (typeof(row.ЗонаКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗонаКлюч'");
            if (typeof row.ЗонаКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗонаКлюч' должно быть числом");
            if (typeof(row.ЗаявкаНомер) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаНомер'");
            if (typeof row.ЗаявкаНомер != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаНомер' должно быть строкой");
            if (typeof(row.ЗаявкаДата) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаДата'");
            if (typeof row.ЗаявкаДата != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаДата' должно быть строкой");
            if (typeof(row.ЗаявкаПримечание) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаПримечание'");
            if (typeof row.ЗаявкаПримечание != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаПримечание' должно быть строкой");
            if (typeof(row.Объединенная) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Объединенная'");
            if (typeof row.Объединенная != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Объединенная' должно быть true/false");
            if (typeof(row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Тип' должно быть числом");
            if (typeof(row.ДоговорКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорКлюч'");
            if (typeof row.ДоговорКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорКлюч' должно быть числом");
            if (typeof(row.ДоговорПодразделениеКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПодразделениеКлюч'");
            if (typeof row.ДоговорПодразделениеКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПодразделениеКлюч' должно быть числом");
            if (typeof(row.КлиентКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'КлиентКлюч'");
            if (typeof row.КлиентКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'КлиентКлюч' должно быть числом");
            if (typeof(row.КлиентПаллетаКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'КлиентПаллетаКлюч'");
            if (typeof row.КлиентПаллетаКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'КлиентПаллетаКлюч' должно быть числом");
            if (typeof(row.ПовторнаяОтгрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПовторнаяОтгрузка'");
            if (typeof row.ПовторнаяОтгрузка != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПовторнаяОтгрузка' должно быть true/false");
            if (typeof(row.ЗавершенноеЗадание) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗавершенноеЗадание'");
            if (typeof row.ЗавершенноеЗадание != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗавершенноеЗадание' должно быть true/false");
            if (typeof(row.РучнойВводКоличества) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'РучнойВводКоличества'");
            if (typeof row.РучнойВводКоличества != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'РучнойВводКоличества' должно быть true/false");
            if (typeof(row.isCrossDoc) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'isCrossDoc'");
            if (typeof row.isCrossDoc != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'isCrossDoc' должно быть true/false");
            if (typeof(row.isBrak) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'isBrak'");
            if (typeof row.isBrak != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'isBrak' должно быть true/false");
            if (typeof(row.isReturn) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'isReturn'");
            if (typeof row.isReturn != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'isReturn' должно быть true/false");
            if (typeof(row.СозданИзДопМеню) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'СозданИзДопМеню'");
            if (typeof row.СозданИзДопМеню != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'СозданИзДопМеню' должно быть true/false");
            if (typeof(row.ВремяНачалаФакт) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяНачалаФакт'");
            if (!row.ВремяНачалаФакт.constructor || row.ВремяНачалаФакт.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяНачалаФакт' должно быть датой (Moment)");
            if (typeof(row.ВремяОкончанияФакт) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяОкончанияФакт'");
            if (!row.ВремяОкончанияФакт.constructor || row.ВремяОкончанияФакт.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяОкончанияФакт' должно быть датой (Moment)");
            if (typeof(row.Сверка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Сверка'");
            if (typeof row.Сверка != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Сверка' должно быть строкой");
            if (typeof(row.ПроцентОтклоненияВесовогоТовара) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПроцентОтклоненияВесовогоТовара'");
            if (typeof row.ПроцентОтклоненияВесовогоТовара != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПроцентОтклоненияВесовогоТовара' должно быть числом");
            if (typeof(row.УдаленныйРегион) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'УдаленныйРегион'");
            if (typeof row.УдаленныйРегион != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'УдаленныйРегион' должно быть true/false");
            if (typeof(row.ВыводитьЭтикеткуА4) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВыводитьЭтикеткуА4'");
            if (typeof row.ВыводитьЭтикеткуА4 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВыводитьЭтикеткуА4' должно быть true/false");
            if (typeof(row.ЗапрашиватьГабаритыПаллеты) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗапрашиватьГабаритыПаллеты'");
            if (typeof row.ЗапрашиватьГабаритыПаллеты != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗапрашиватьГабаритыПаллеты' должно быть true/false");
            if (typeof(row.КоличествоМестBOX) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'КоличествоМестBOX'");
            if (typeof row.КоличествоМестBOX != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'КоличествоМестBOX' должно быть числом");
            if (typeof(row.ГрузоотправительКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ГрузоотправительКлюч'");
            if (typeof row.ГрузоотправительКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ГрузоотправительКлюч' должно быть числом");
            if (typeof(row.ДокументОтгрузкиКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДокументОтгрузкиКлюч'");
            if (typeof row.ДокументОтгрузкиКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДокументОтгрузкиКлюч' должно быть числом");
            if (typeof(row.ДоговорПеремещенияКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПеремещенияКлюч'");
            if (typeof row.ДоговорПеремещенияКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПеремещенияКлюч' должно быть числом");
            if (typeof(row.КорневойДоговорОтгрузкиКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'КорневойДоговорОтгрузкиКлюч'");
            if (typeof row.КорневойДоговорОтгрузкиКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'КорневойДоговорОтгрузкиКлюч' должно быть числом");
            if (typeof(row.ДоговорПризнак1) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак1'");
            if (typeof row.ДоговорПризнак1 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак1' должно быть true/false");
            if (typeof(row.ДоговорПризнак2) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак2'");
            if (typeof row.ДоговорПризнак2 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак2' должно быть true/false");
            if (typeof(row.ДоговорПризнак3) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак3'");
            if (typeof row.ДоговорПризнак3 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак3' должно быть true/false");
            if (typeof(row.ДоговорПризнак4) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак4'");
            if (typeof row.ДоговорПризнак4 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак4' должно быть true/false");
            if (typeof(row.ДоговорПризнак5) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак5'");
            if (typeof row.ДоговорПризнак5 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак5' должно быть true/false");
            if (typeof(row.ДоговорПризнак6) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак6'");
            if (typeof row.ДоговорПризнак6 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак6' должно быть true/false");
            if (typeof(row.ДоговорПризнак7) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак7'");
            if (typeof row.ДоговорПризнак7 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак7' должно быть true/false");
            if (typeof(row.ДоговорПризнак8) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак8'");
            if (typeof row.ДоговорПризнак8 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак8' должно быть true/false");
            if (typeof(row.ДоговорПризнак9) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак9'");
            if (typeof row.ДоговорПризнак9 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак9' должно быть true/false");
            if (typeof(row.ДоговорПризнак10) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак10'");
            if (typeof row.ДоговорПризнак10 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак10' должно быть true/false");
            if (typeof(row.ДоговорПризнак11) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак11'");
            if (typeof row.ДоговорПризнак11 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак11' должно быть true/false");
            if (typeof(row.ДоговорПризнак12) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак12'");
            if (typeof row.ДоговорПризнак12 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак12' должно быть true/false");
            if (typeof(row.ДоговорПризнак13) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак13'");
            if (typeof row.ДоговорПризнак13 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак13' должно быть true/false");
            if (typeof(row.ДоговорПризнак14) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПризнак14'");
            if (typeof row.ДоговорПризнак14 != "boolean") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПризнак14' должно быть true/false");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Взять_задание_в_работу_ПИК {
    error:string;
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
            if (typeof(row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_Взять_задание_в_работу_ПИК': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "string") throw new Error("результат выполнения '_wms_android_Взять_задание_в_работу_ПИК': значение в колонке 'Ok' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Тестовые_штрихкоды {
    error:string;
    Объект: string;
    ШтрихКод: string;
    Цвет: string
}

export async function _wms_android_Тестовые_штрихкоды(taskId: number, palleteFrom: number): Promise<IResult_wms_android_Тестовые_штрихкоды[]> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_Тестовые_штрихкоды': параметр 'taskId' должен быть числом");
    if (typeof palleteFrom != "number") throw new Error("вызов '_wms_android_Тестовые_штрихкоды': параметр 'palleteFrom' должен быть числом");
    let recordsets = await executeSql("_wms_android_Тестовые_штрихкоды " + taskId.toString() + "," + palleteFrom.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Тестовые_штрихкоды: не вернула результатов" } as any;

    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Объект) == "undefined") throw new Error("результат выполнения '_wms_android_Тестовые_штрихкоды': не заполнена колонка 'Объект'");
            if (typeof row.Объект != "string") throw new Error("результат выполнения '_wms_android_Тестовые_штрихкоды': значение в колонке 'Объект' должно быть строкой");
            if (typeof(row.ШтрихКод) == "undefined") throw new Error("результат выполнения '_wms_android_Тестовые_штрихкоды': не заполнена колонка 'ШтрихКод'");
            if (typeof row.ШтрихКод != "string") throw new Error("результат выполнения '_wms_android_Тестовые_штрихкоды': значение в колонке 'ШтрихКод' должно быть строкой");
            if (typeof(row.Цвет) == "undefined") throw new Error("результат выполнения '_wms_android_Тестовые_штрихкоды': не заполнена колонка 'Цвет'");
            if (typeof row.Цвет != "string") throw new Error("результат выполнения '_wms_android_Тестовые_штрихкоды': значение в колонке 'Цвет' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_Проверка_блокировки_пересоздания_ПИКов {
    error:string;
    Заблокировано: number
}

export async function _wms_android_Проверка_блокировки_пересоздания_ПИКов(dogId: number): Promise<IResult_wms_android_Проверка_блокировки_пересоздания_ПИКов> {
    if (typeof dogId != "number") throw new Error("вызов '_wms_android_Проверка_блокировки_пересоздания_ПИКов': параметр 'dogId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Проверка_блокировки_пересоздания_ПИКов " + dogId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Проверка_блокировки_пересоздания_ПИКов: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Проверка_блокировки_пересоздания_ПИКов: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Заблокировано) == "undefined") throw new Error("результат выполнения '_wms_android_Проверка_блокировки_пересоздания_ПИКов': не заполнена колонка 'Заблокировано'");
            if (typeof row.Заблокировано != "number") throw new Error("результат выполнения '_wms_android_Проверка_блокировки_пересоздания_ПИКов': значение в колонке 'Заблокировано' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Штрихкод_запрещен {
    error:string;
    Запрещен: number
}

export async function _wms_android_Штрихкод_запрещен(barcode: string): Promise<IResult_wms_android_Штрихкод_запрещен> {
    if (typeof barcode != "string") throw new Error("вызов '_wms_android_Штрихкод_запрещен': параметр 'barcode' должен быть строкой");
    let recordsets = await executeSql("_wms_android_Штрихкод_запрещен " + stringAsSql(barcode));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Штрихкод_запрещен: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Штрихкод_запрещен: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Запрещен) == "undefined") throw new Error("результат выполнения '_wms_android_Штрихкод_запрещен': не заполнена колонка 'Запрещен'");
            if (typeof row.Запрещен != "number") throw new Error("результат выполнения '_wms_android_Штрихкод_запрещен': значение в колонке 'Запрещен' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_Подобран {
    error:string;
    Подобран: number
}

export async function _wms_android_ПИК_Подобран(taskId: number): Promise<IResult_wms_android_ПИК_Подобран> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_Подобран': параметр 'taskId' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_Подобран " + taskId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_Подобран: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_Подобран: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Подобран) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_Подобран': не заполнена колонка 'Подобран'");
            if (typeof row.Подобран != "number") throw new Error("результат выполнения '_wms_android_ПИК_Подобран': значение в колонке 'Подобран' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_все_паллеты_завершены {
    error:string;
    Завершены: number
}

export async function _wms_android_ПИК_все_паллеты_завершены(taskId: number): Promise<IResult_wms_android_ПИК_все_паллеты_завершены> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_все_паллеты_завершены': параметр 'taskId' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_все_паллеты_завершены " + taskId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_все_паллеты_завершены: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_все_паллеты_завершены: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Завершены) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_все_паллеты_завершены': не заполнена колонка 'Завершены'");
            if (typeof row.Завершены != "number") throw new Error("результат выполнения '_wms_android_ПИК_все_паллеты_завершены': значение в колонке 'Завершены' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Получить_ТМЦ_по_штрих_коду {
    error:string;
    ТМЦ: number;
    Количество: number
}

export async function _wms_android_Получить_ТМЦ_по_штрих_коду(barcode: string, clientId: number): Promise<IResult_wms_android_Получить_ТМЦ_по_штрих_коду> {
    if (typeof barcode != "string") throw new Error("вызов '_wms_android_Получить_ТМЦ_по_штрих_коду': параметр 'barcode' должен быть строкой");
    if (typeof clientId != "number") throw new Error("вызов '_wms_android_Получить_ТМЦ_по_штрих_коду': параметр 'clientId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Получить_ТМЦ_по_штрих_коду " + stringAsSql(barcode) + "," + clientId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Получить_ТМЦ_по_штрих_коду: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Получить_ТМЦ_по_штрих_коду: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.ТМЦ) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_ТМЦ_по_штрих_коду': не заполнена колонка 'ТМЦ'");
            if (typeof row.ТМЦ != "number") throw new Error("результат выполнения '_wms_android_Получить_ТМЦ_по_штрих_коду': значение в колонке 'ТМЦ' должно быть числом");
            if (typeof(row.Количество) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_ТМЦ_по_штрих_коду': не заполнена колонка 'Количество'");
            if (typeof row.Количество != "number") throw new Error("результат выполнения '_wms_android_Получить_ТМЦ_по_штрих_коду': значение в колонке 'Количество' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Получить_Партию_по_штрих_коду {
    error:string;
    Партия: number;
    ТМЦ: number;
    Количество: number
}

export async function _wms_android_Получить_Партию_по_штрих_коду(barcode: string, clientId: number): Promise<IResult_wms_android_Получить_Партию_по_штрих_коду> {
    if (typeof barcode != "string") throw new Error("вызов '_wms_android_Получить_Партию_по_штрих_коду': параметр 'barcode' должен быть строкой");
    if (typeof clientId != "number") throw new Error("вызов '_wms_android_Получить_Партию_по_штрих_коду': параметр 'clientId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Получить_Партию_по_штрих_коду " + stringAsSql(barcode) + "," + clientId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Получить_Партию_по_штрих_коду: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Получить_Партию_по_штрих_коду: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Партия) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_Партию_по_штрих_коду': не заполнена колонка 'Партия'");
            if (typeof row.Партия != "number") throw new Error("результат выполнения '_wms_android_Получить_Партию_по_штрих_коду': значение в колонке 'Партия' должно быть числом");
            if (typeof(row.ТМЦ) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_Партию_по_штрих_коду': не заполнена колонка 'ТМЦ'");
            if (typeof row.ТМЦ != "number") throw new Error("результат выполнения '_wms_android_Получить_Партию_по_штрих_коду': значение в колонке 'ТМЦ' должно быть числом");
            if (typeof(row.Количество) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_Партию_по_штрих_коду': не заполнена колонка 'Количество'");
            if (typeof row.Количество != "number") throw new Error("результат выполнения '_wms_android_Получить_Партию_по_штрих_коду': значение в колонке 'Количество' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_обработка_шк_паллеты {
    error:string;
    ПаллетаОткуда: number;
    ПаллетаКуда: number;
    ПаллетаБеретсяЦеликом: number
}

export async function _wms_android_ПИК_обработка_шк_паллеты(taskId: number, palleteId: number, isReplace: number, currentFromPalleteId: number, currentIntoPalleteId: number): Promise<IResult_wms_android_ПИК_обработка_шк_паллеты> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_паллеты': параметр 'taskId' должен быть числом");
    if (typeof palleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_паллеты': параметр 'palleteId' должен быть числом");
    if (typeof isReplace != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_паллеты': параметр 'isReplace' должен быть числом");
    if (typeof currentFromPalleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_паллеты': параметр 'currentFromPalleteId' должен быть числом");
    if (typeof currentIntoPalleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_паллеты': параметр 'currentIntoPalleteId' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_обработка_шк_паллеты " + taskId.toString() + "," + palleteId.toString() + "," + isReplace.toString() + "," + currentFromPalleteId.toString() + "," + currentIntoPalleteId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_обработка_шк_паллеты: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_обработка_шк_паллеты: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.ПаллетаОткуда) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_паллеты': не заполнена колонка 'ПаллетаОткуда'");
            if (typeof row.ПаллетаОткуда != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_паллеты': значение в колонке 'ПаллетаОткуда' должно быть числом");
            if (typeof(row.ПаллетаКуда) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_паллеты': не заполнена колонка 'ПаллетаКуда'");
            if (typeof row.ПаллетаКуда != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_паллеты': значение в колонке 'ПаллетаКуда' должно быть числом");
            if (typeof(row.ПаллетаБеретсяЦеликом) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_паллеты': не заполнена колонка 'ПаллетаБеретсяЦеликом'");
            if (typeof row.ПаллетаБеретсяЦеликом != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_паллеты': значение в колонке 'ПаллетаБеретсяЦеликом' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Название_ячейки_где_паллета {
    error:string;
    НазваниеЯчейки: string
}

export async function _wms_android_Название_ячейки_где_паллета(palleteId: number): Promise<IResult_wms_android_Название_ячейки_где_паллета> {
    if (typeof palleteId != "number") throw new Error("вызов '_wms_android_Название_ячейки_где_паллета': параметр 'palleteId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Название_ячейки_где_паллета " + palleteId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Название_ячейки_где_паллета: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Название_ячейки_где_паллета: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.НазваниеЯчейки) == "undefined") throw new Error("результат выполнения '_wms_android_Название_ячейки_где_паллета': не заполнена колонка 'НазваниеЯчейки'");
            if (typeof row.НазваниеЯчейки != "string") throw new Error("результат выполнения '_wms_android_Название_ячейки_где_паллета': значение в колонке 'НазваниеЯчейки' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Название_паллеты {
    error:string;
    НазваниеПаллеты: string
}

export async function _wms_android_Название_паллеты(palleteId: number): Promise<IResult_wms_android_Название_паллеты> {
    if (typeof palleteId != "number") throw new Error("вызов '_wms_android_Название_паллеты': параметр 'palleteId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Название_паллеты " + palleteId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Название_паллеты: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Название_паллеты: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.НазваниеПаллеты) == "undefined") throw new Error("результат выполнения '_wms_android_Название_паллеты': не заполнена колонка 'НазваниеПаллеты'");
            if (typeof row.НазваниеПаллеты != "string") throw new Error("результат выполнения '_wms_android_Название_паллеты': значение в колонке 'НазваниеПаллеты' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_список_паллет {
    error:string;
    ПаллетаКлюч: number;
    ТМЦ: string;
    Ячейка: string;
    Паллета: string;
    ЯчейкаПаллета: string;
    ЯчейкаКлюч: number;
    ВзятоВзять: string;
    КолЕдИзм: string
}

export async function _wms_android_ПИК_список_паллет(taskId: number, palleteInto: number, palleteFrom: number): Promise<IResult_wms_android_ПИК_список_паллет[]> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_список_паллет': параметр 'taskId' должен быть числом");
    if (typeof palleteInto != "number") throw new Error("вызов '_wms_android_ПИК_список_паллет': параметр 'palleteInto' должен быть числом");
    if (typeof palleteFrom != "number") throw new Error("вызов '_wms_android_ПИК_список_паллет': параметр 'palleteFrom' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_список_паллет " + taskId.toString() + "," + palleteInto.toString() + "," + palleteFrom.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.ПаллетаКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'ПаллетаКлюч'");
            if (typeof row.ПаллетаКлюч != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'ПаллетаКлюч' должно быть числом");
            if (typeof(row.ТМЦ) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'ТМЦ'");
            if (typeof row.ТМЦ != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'ТМЦ' должно быть строкой");
            if (typeof(row.Ячейка) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'Ячейка'");
            if (typeof row.Ячейка != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'Ячейка' должно быть строкой");
            if (typeof(row.Паллета) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'Паллета'");
            if (typeof row.Паллета != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'Паллета' должно быть строкой");
            if (typeof(row.ЯчейкаПаллета) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'ЯчейкаПаллета'");
            if (typeof row.ЯчейкаПаллета != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'ЯчейкаПаллета' должно быть строкой");
            if (typeof(row.ЯчейкаКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'ЯчейкаКлюч'");
            if (typeof row.ЯчейкаКлюч != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'ЯчейкаКлюч' должно быть числом");
            if (typeof(row.ВзятоВзять) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'ВзятоВзять'");
            if (typeof row.ВзятоВзять != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'ВзятоВзять' должно быть строкой");
            if (typeof(row.КолЕдИзм) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': не заполнена колонка 'КолЕдИзм'");
            if (typeof row.КолЕдИзм != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_паллет': значение в колонке 'КолЕдИзм' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_Сохранить_настройки_ТСД {
    error:string;
    Ok: string
}

export async function _wms_android_Сохранить_настройки_ТСД(kadrId: number, параметр: string, значение: string): Promise<IResult_wms_android_Сохранить_настройки_ТСД> {
    if (typeof kadrId != "number") throw new Error("вызов '_wms_android_Сохранить_настройки_ТСД': параметр 'kadrId' должен быть числом");
    if (typeof параметр != "string") throw new Error("вызов '_wms_android_Сохранить_настройки_ТСД': параметр 'параметр' должен быть строкой");
    if (typeof значение != "string") throw new Error("вызов '_wms_android_Сохранить_настройки_ТСД': параметр 'значение' должен быть строкой");
    let recordsets = await executeSql("_wms_android_Сохранить_настройки_ТСД " + kadrId.toString() + "," + stringAsSql(параметр) + "," + stringAsSql(значение));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Сохранить_настройки_ТСД: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Сохранить_настройки_ТСД: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_Сохранить_настройки_ТСД': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "string") throw new Error("результат выполнения '_wms_android_Сохранить_настройки_ТСД': значение в колонке 'Ok' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Получить_настройки_ТСД {
    error:string;
    Параметр: string;
    Значение: string
}

export async function _wms_android_Получить_настройки_ТСД(kadrId: number): Promise<IResult_wms_android_Получить_настройки_ТСД[]> {
    if (typeof kadrId != "number") throw new Error("вызов '_wms_android_Получить_настройки_ТСД': параметр 'kadrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Получить_настройки_ТСД " + kadrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Параметр) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_настройки_ТСД': не заполнена колонка 'Параметр'");
            if (typeof row.Параметр != "string") throw new Error("результат выполнения '_wms_android_Получить_настройки_ТСД': значение в колонке 'Параметр' должно быть строкой");
            if (typeof(row.Значение) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_настройки_ТСД': не заполнена колонка 'Значение'");
            if (typeof row.Значение != "string") throw new Error("результат выполнения '_wms_android_Получить_настройки_ТСД': значение в колонке 'Значение' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_ПИК_обработка_шк_партии {
    error:string;
    НоваяПаллетаОткуда: number;
    otherParty: number;
    tmcId: number;
    partId: number
}

export async function _wms_android_ПИК_обработка_шк_партии(taskId: number, partId: number, isBrak: number, barcode: string, currentFromPalleteId: number, currentIntoPalleteId: number): Promise<IResult_wms_android_ПИК_обработка_шк_партии> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_партии': параметр 'taskId' должен быть числом");
    if (typeof partId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_партии': параметр 'partId' должен быть числом");
    if (typeof isBrak != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_партии': параметр 'isBrak' должен быть числом");
    if (typeof barcode != "string") throw new Error("вызов '_wms_android_ПИК_обработка_шк_партии': параметр 'barcode' должен быть строкой");
    if (typeof currentFromPalleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_партии': параметр 'currentFromPalleteId' должен быть числом");
    if (typeof currentIntoPalleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_партии': параметр 'currentIntoPalleteId' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_обработка_шк_партии " + taskId.toString() + "," + partId.toString() + "," + isBrak.toString() + "," + stringAsSql(barcode) + "," + currentFromPalleteId.toString() + "," + currentIntoPalleteId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_обработка_шк_партии: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_обработка_шк_партии: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.НоваяПаллетаОткуда) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': не заполнена колонка 'НоваяПаллетаОткуда'");
            if (typeof row.НоваяПаллетаОткуда != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': значение в колонке 'НоваяПаллетаОткуда' должно быть числом");
            if (typeof(row.otherParty) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': не заполнена колонка 'otherParty'");
            if (typeof row.otherParty != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': значение в колонке 'otherParty' должно быть числом");
            if (typeof(row.tmcId) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': не заполнена колонка 'tmcId'");
            if (typeof row.tmcId != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': значение в колонке 'tmcId' должно быть числом");
            if (typeof(row.partId) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': не заполнена колонка 'partId'");
            if (typeof row.partId != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_партии': значение в колонке 'partId' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_обработка_шк_товара {
    error:string;
    Нужен_запрос_количества_Ok: number;
    запрос_количества_TMCID: number;
    запрос_количества_NewKol: number;
    запрос_количества_MaxKol: number;
    запрос_количества_PartID: number;
    запрос_количества_ЯчейкаОткуда: number;
    запрос_количества_НазваниеТовара: string;
    запрос_количества_НазваниеПартии: string;
    запрос_количества_ВсегоКоличество: number;
    запрос_количества_Ввод_количества_в_раскладке: number;
    Товар_с_паллеты_подобран: number;
    Паллета_откуда_опустела: number;
    Нужен_вызов_процедуры_Ok: number;
    Заявка_14700: number
}

export async function _wms_android_ПИК_обработка_шк_товара(mode: number, taskId: number, tmcId: number, partId: number, SkladKol: number, barcode: string, currentFromPalleteId: number, currentIntoPalleteId: number, isZamena: number, clientID: number, requestEdit_Value: boolean, otherParty: number, changePalOld: number, changePartOld: number, userID: number, newKol_ответ_юзера: number): Promise<IResult_wms_android_ПИК_обработка_шк_товара> {
    if (typeof mode != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'mode' должен быть числом");
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'taskId' должен быть числом");
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'tmcId' должен быть числом");
    if (typeof partId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'partId' должен быть числом");
    if (typeof SkladKol != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'SkladKol' должен быть числом");
    if (typeof barcode != "string") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'barcode' должен быть строкой");
    if (typeof currentFromPalleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'currentFromPalleteId' должен быть числом");
    if (typeof currentIntoPalleteId != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'currentIntoPalleteId' должен быть числом");
    if (typeof isZamena != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'isZamena' должен быть числом");
    if (typeof clientID != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'clientID' должен быть числом");
    if (typeof requestEdit_Value != "boolean") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'requestEdit_Value' должен быть boolean");
    if (typeof otherParty != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'otherParty' должен быть числом");
    if (typeof changePalOld != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'changePalOld' должен быть числом");
    if (typeof changePartOld != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'changePartOld' должен быть числом");
    if (typeof userID != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'userID' должен быть числом");
    if (typeof newKol_ответ_юзера != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'newKol_ответ_юзера' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_обработка_шк_товара " + mode.toString() + "," + taskId.toString() + "," + tmcId.toString() + "," + partId.toString() + "," + SkladKol.toString() + "," + stringAsSql(barcode) + "," + currentFromPalleteId.toString() + "," + currentIntoPalleteId.toString() + "," + isZamena.toString() + "," + clientID.toString() + "," + (requestEdit_Value?1:0) + "," + otherParty.toString() + "," + changePalOld.toString() + "," + changePartOld.toString() + "," + userID.toString() + "," + newKol_ответ_юзера.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_обработка_шк_товара: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_обработка_шк_товара: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Нужен_запрос_количества_Ok) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'Нужен_запрос_количества_Ok'");
            if (typeof row.Нужен_запрос_количества_Ok != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'Нужен_запрос_количества_Ok' должно быть числом");
            if (typeof(row.запрос_количества_TMCID) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_TMCID'");
            if (typeof row.запрос_количества_TMCID != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_TMCID' должно быть числом");
            if (typeof(row.запрос_количества_NewKol) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_NewKol'");
            if (typeof row.запрос_количества_NewKol != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_NewKol' должно быть числом");
            if (typeof(row.запрос_количества_MaxKol) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_MaxKol'");
            if (typeof row.запрос_количества_MaxKol != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_MaxKol' должно быть числом");
            if (typeof(row.запрос_количества_PartID) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_PartID'");
            if (typeof row.запрос_количества_PartID != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_PartID' должно быть числом");
            if (typeof(row.запрос_количества_ЯчейкаОткуда) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_ЯчейкаОткуда'");
            if (typeof row.запрос_количества_ЯчейкаОткуда != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_ЯчейкаОткуда' должно быть числом");
            if (typeof(row.запрос_количества_НазваниеТовара) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_НазваниеТовара'");
            if (typeof row.запрос_количества_НазваниеТовара != "string") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_НазваниеТовара' должно быть строкой");
            if (typeof(row.запрос_количества_НазваниеПартии) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_НазваниеПартии'");
            if (typeof row.запрос_количества_НазваниеПартии != "string") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_НазваниеПартии' должно быть строкой");
            if (typeof(row.запрос_количества_ВсегоКоличество) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_ВсегоКоличество'");
            if (typeof row.запрос_количества_ВсегоКоличество != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_ВсегоКоличество' должно быть числом");
            if (typeof(row.запрос_количества_Ввод_количества_в_раскладке) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'запрос_количества_Ввод_количества_в_раскладке'");
            if (typeof row.запрос_количества_Ввод_количества_в_раскладке != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'запрос_количества_Ввод_количества_в_раскладке' должно быть числом");
            if (typeof(row.Товар_с_паллеты_подобран) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'Товар_с_паллеты_подобран'");
            if (typeof row.Товар_с_паллеты_подобран != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'Товар_с_паллеты_подобран' должно быть числом");
            if (typeof(row.Паллета_откуда_опустела) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'Паллета_откуда_опустела'");
            if (typeof row.Паллета_откуда_опустела != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'Паллета_откуда_опустела' должно быть числом");
            if (typeof(row.Нужен_вызов_процедуры_Ok) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'Нужен_вызов_процедуры_Ok'");
            if (typeof row.Нужен_вызов_процедуры_Ok != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'Нужен_вызов_процедуры_Ok' должно быть числом");
            if (typeof(row.Заявка_14700) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': не заполнена колонка 'Заявка_14700'");
            if (typeof row.Заявка_14700 != "number") throw new Error("результат выполнения '_wms_android_ПИК_обработка_шк_товара': значение в колонке 'Заявка_14700' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_список_товара_на_паллете {
    error:string;
    Ключ: number;
    InternalRecordID: number;
    TMCKey: number;
    PartKey: number;
    ТМЦ: string;
    ТМЦ2: string;
    Партия: string;
    ЖесткостьКоробкиПодбор: number;
    ГруппаПодбор: number;
    ВесПроизводителяПодбор: number;
    В_заявке: number;
    Взять: string;
    ПИК: number;
    Шт: number;
    М: number;
    Key: number;
    ОснПартия: number;
    Кол_Ед_Изм: number
}

export async function _wms_android_ПИК_список_товара_на_паллете(taskId: number, palFrom: number, isReplace: number, changeTMCID: number): Promise<IResult_wms_android_ПИК_список_товара_на_паллете[]> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_список_товара_на_паллете': параметр 'taskId' должен быть числом");
    if (typeof palFrom != "number") throw new Error("вызов '_wms_android_ПИК_список_товара_на_паллете': параметр 'palFrom' должен быть числом");
    if (typeof isReplace != "number") throw new Error("вызов '_wms_android_ПИК_список_товара_на_паллете': параметр 'isReplace' должен быть числом");
    if (typeof changeTMCID != "number") throw new Error("вызов '_wms_android_ПИК_список_товара_на_паллете': параметр 'changeTMCID' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_список_товара_на_паллете " + taskId.toString() + "," + palFrom.toString() + "," + isReplace.toString() + "," + changeTMCID.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.InternalRecordID) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'InternalRecordID'");
            if (typeof row.InternalRecordID != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'InternalRecordID' должно быть числом");
            if (typeof(row.TMCKey) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'TMCKey'");
            if (typeof row.TMCKey != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'TMCKey' должно быть числом");
            if (typeof(row.PartKey) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'PartKey'");
            if (typeof row.PartKey != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'PartKey' должно быть числом");
            if (typeof(row.ТМЦ) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ТМЦ'");
            if (typeof row.ТМЦ != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ТМЦ' должно быть строкой");
            if (typeof(row.ТМЦ2) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ТМЦ2'");
            if (typeof row.ТМЦ2 != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ТМЦ2' должно быть строкой");
            if (typeof(row.Партия) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'Партия'");
            if (typeof row.Партия != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'Партия' должно быть строкой");
            if (typeof(row.ЖесткостьКоробкиПодбор) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ЖесткостьКоробкиПодбор'");
            if (typeof row.ЖесткостьКоробкиПодбор != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ЖесткостьКоробкиПодбор' должно быть числом");
            if (typeof(row.ГруппаПодбор) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ГруппаПодбор'");
            if (typeof row.ГруппаПодбор != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ГруппаПодбор' должно быть числом");
            if (typeof(row.ВесПроизводителяПодбор) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ВесПроизводителяПодбор'");
            if (typeof row.ВесПроизводителяПодбор != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ВесПроизводителяПодбор' должно быть числом");
            if (typeof(row.В_заявке) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'В_заявке'");
            if (typeof row.В_заявке != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'В_заявке' должно быть числом");
            if (typeof(row.Взять) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'Взять'");
            if (typeof row.Взять != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'Взять' должно быть строкой");
            if (typeof(row.ПИК) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ПИК'");
            if (typeof row.ПИК != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ПИК' должно быть числом");
            if (typeof(row.Шт) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'Шт'");
            if (typeof row.Шт != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'Шт' должно быть числом");
            if (typeof(row.М) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'М'");
            if (typeof row.М != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'М' должно быть числом");
            if (typeof(row.Key) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'Key'");
            if (typeof row.Key != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'Key' должно быть числом");
            if (typeof(row.ОснПартия) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'ОснПартия'");
            if (typeof row.ОснПартия != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'ОснПартия' должно быть числом");
            if (typeof(row.Кол_Ед_Изм) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': не заполнена колонка 'Кол_Ед_Изм'");
            if (typeof row.Кол_Ед_Изм != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_товара_на_паллете': значение в колонке 'Кол_Ед_Изм' должно быть числом");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_ПИК_запрос_количества_info {
    error:string;
    UnitLabel_Caption: string;
    BoxLabel_Caption: string;
    MestPanel_Visible: number;
    KolEdit_SetFocus: number;
    MestEdit_SetFocus: number;
    MestEdit_Value: number;
    KolEdit_Value: number;
    InTaskLabel_Caption: string;
    InTaskLabelKol_Caption: string;
    UpTypeEdit_ComboItems_Text: string;
    UpTypeEdit_Value: string;
    PlaceID: number;
    DopF: number;
    ShtH: number;
    InUp: number;
    InUp2: number;
    bSimpleWeight: number;
    ClearEdit_Value: number;
    ClearPanel_Visible: number;
    InBox: number;
    TotalPanel_Visible: number;
    TotalLabel_Caption: string;
    cBoxWeight: number
}

export async function _wms_android_ПИК_запрос_количества_info(taskId: number, Kol_overflow: number, Количество: number, ТМЦ: number, ПартияПИК: number, Ввод_количества_в_раскладке: number, ВсегоКоличество: number, КоличествоПИК: number, ЯчейкаОткудаПИК: number): Promise<IResult_wms_android_ПИК_запрос_количества_info> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'taskId' должен быть числом");
    if (typeof Kol_overflow != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'Kol_overflow' должен быть числом");
    if (typeof Количество != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'Количество' должен быть числом");
    if (typeof ТМЦ != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'ТМЦ' должен быть числом");
    if (typeof ПартияПИК != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'ПартияПИК' должен быть числом");
    if (typeof Ввод_количества_в_раскладке != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'Ввод_количества_в_раскладке' должен быть числом");
    if (typeof ВсегоКоличество != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'ВсегоКоличество' должен быть числом");
    if (typeof КоличествоПИК != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'КоличествоПИК' должен быть числом");
    if (typeof ЯчейкаОткудаПИК != "number") throw new Error("вызов '_wms_android_ПИК_запрос_количества_info': параметр 'ЯчейкаОткудаПИК' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_запрос_количества_info " + taskId.toString() + "," + Kol_overflow.toString() + "," + Количество.toString() + "," + ТМЦ.toString() + "," + ПартияПИК.toString() + "," + Ввод_количества_в_раскладке.toString() + "," + ВсегоКоличество.toString() + "," + КоличествоПИК.toString() + "," + ЯчейкаОткудаПИК.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ПИК_запрос_количества_info: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ПИК_запрос_количества_info: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.UnitLabel_Caption) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'UnitLabel_Caption'");
            if (typeof row.UnitLabel_Caption != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'UnitLabel_Caption' должно быть строкой");
            if (typeof(row.BoxLabel_Caption) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'BoxLabel_Caption'");
            if (typeof row.BoxLabel_Caption != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'BoxLabel_Caption' должно быть строкой");
            if (typeof(row.MestPanel_Visible) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'MestPanel_Visible'");
            if (typeof row.MestPanel_Visible != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'MestPanel_Visible' должно быть числом");
            if (typeof(row.KolEdit_SetFocus) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'KolEdit_SetFocus'");
            if (typeof row.KolEdit_SetFocus != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'KolEdit_SetFocus' должно быть числом");
            if (typeof(row.MestEdit_SetFocus) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'MestEdit_SetFocus'");
            if (typeof row.MestEdit_SetFocus != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'MestEdit_SetFocus' должно быть числом");
            if (typeof(row.MestEdit_Value) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'MestEdit_Value'");
            if (typeof row.MestEdit_Value != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'MestEdit_Value' должно быть числом");
            if (typeof(row.KolEdit_Value) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'KolEdit_Value'");
            if (typeof row.KolEdit_Value != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'KolEdit_Value' должно быть числом");
            if (typeof(row.InTaskLabel_Caption) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'InTaskLabel_Caption'");
            if (typeof row.InTaskLabel_Caption != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'InTaskLabel_Caption' должно быть строкой");
            if (typeof(row.InTaskLabelKol_Caption) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'InTaskLabelKol_Caption'");
            if (typeof row.InTaskLabelKol_Caption != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'InTaskLabelKol_Caption' должно быть строкой");
            if (typeof(row.UpTypeEdit_ComboItems_Text) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'UpTypeEdit_ComboItems_Text'");
            if (typeof row.UpTypeEdit_ComboItems_Text != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'UpTypeEdit_ComboItems_Text' должно быть строкой");
            if (typeof(row.UpTypeEdit_Value) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'UpTypeEdit_Value'");
            if (typeof row.UpTypeEdit_Value != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'UpTypeEdit_Value' должно быть строкой");
            if (typeof(row.PlaceID) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'PlaceID'");
            if (typeof row.PlaceID != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'PlaceID' должно быть числом");
            if (typeof(row.DopF) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'DopF'");
            if (typeof row.DopF != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'DopF' должно быть числом");
            if (typeof(row.ShtH) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'ShtH'");
            if (typeof row.ShtH != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'ShtH' должно быть числом");
            if (typeof(row.InUp) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'InUp'");
            if (typeof row.InUp != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'InUp' должно быть числом");
            if (typeof(row.InUp2) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'InUp2'");
            if (typeof row.InUp2 != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'InUp2' должно быть числом");
            if (typeof(row.bSimpleWeight) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'bSimpleWeight'");
            if (typeof row.bSimpleWeight != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'bSimpleWeight' должно быть числом");
            if (typeof(row.ClearEdit_Value) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'ClearEdit_Value'");
            if (typeof row.ClearEdit_Value != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'ClearEdit_Value' должно быть числом");
            if (typeof(row.ClearPanel_Visible) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'ClearPanel_Visible'");
            if (typeof row.ClearPanel_Visible != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'ClearPanel_Visible' должно быть числом");
            if (typeof(row.InBox) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'InBox'");
            if (typeof row.InBox != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'InBox' должно быть числом");
            if (typeof(row.TotalPanel_Visible) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'TotalPanel_Visible'");
            if (typeof row.TotalPanel_Visible != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'TotalPanel_Visible' должно быть числом");
            if (typeof(row.TotalLabel_Caption) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'TotalLabel_Caption'");
            if (typeof row.TotalLabel_Caption != "string") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'TotalLabel_Caption' должно быть строкой");
            if (typeof(row.cBoxWeight) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': не заполнена колонка 'cBoxWeight'");
            if (typeof row.cBoxWeight != "number") throw new Error("результат выполнения '_wms_android_ПИК_запрос_количества_info': значение в колонке 'cBoxWeight' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ПИК_список_партий_на_паллете {
    error:string;
    TMCKey: number;
    PartKey: number;
    Кол: number;
    Кор: number;
    Партия: string;
    Кол_во: string;
    ЕстьПИК: number;
    ТМЦ_Вид_2: number;
    НазваниеТМЦ: string;
    НазваниеПаллеты: string
}

export async function _wms_android_ПИК_список_партий_на_паллете(Паллета: number, ТМЦ: number, ПИК: number): Promise<IResult_wms_android_ПИК_список_партий_на_паллете[]> {
    if (typeof Паллета != "number") throw new Error("вызов '_wms_android_ПИК_список_партий_на_паллете': параметр 'Паллета' должен быть числом");
    if (typeof ТМЦ != "number") throw new Error("вызов '_wms_android_ПИК_список_партий_на_паллете': параметр 'ТМЦ' должен быть числом");
    if (typeof ПИК != "number") throw new Error("вызов '_wms_android_ПИК_список_партий_на_паллете': параметр 'ПИК' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_список_партий_на_паллете " + Паллета.toString() + "," + ТМЦ.toString() + "," + ПИК.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.TMCKey) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'TMCKey'");
            if (typeof row.TMCKey != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'TMCKey' должно быть числом");
            if (typeof(row.PartKey) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'PartKey'");
            if (typeof row.PartKey != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'PartKey' должно быть числом");
            if (typeof(row.Кол) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'Кол'");
            if (typeof row.Кол != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'Кол' должно быть числом");
            if (typeof(row.Кор) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'Кор'");
            if (typeof row.Кор != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'Кор' должно быть числом");
            if (typeof(row.Партия) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'Партия'");
            if (typeof row.Партия != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'Партия' должно быть строкой");
            if (typeof(row.Кол_во) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'Кол_во'");
            if (typeof row.Кол_во != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'Кол_во' должно быть строкой");
            if (typeof(row.ЕстьПИК) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'ЕстьПИК'");
            if (typeof row.ЕстьПИК != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'ЕстьПИК' должно быть числом");
            if (typeof(row.ТМЦ_Вид_2) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'ТМЦ_Вид_2'");
            if (typeof row.ТМЦ_Вид_2 != "number") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'ТМЦ_Вид_2' должно быть числом");
            if (typeof(row.НазваниеТМЦ) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'НазваниеТМЦ'");
            if (typeof row.НазваниеТМЦ != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'НазваниеТМЦ' должно быть строкой");
            if (typeof(row.НазваниеПаллеты) == "undefined") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': не заполнена колонка 'НазваниеПаллеты'");
            if (typeof row.НазваниеПаллеты != "string") throw new Error("результат выполнения '_wms_android_ПИК_список_партий_на_паллете': значение в колонке 'НазваниеПаллеты' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_Получить_Партию_с_паллеты {
    error:string;
    Партия: number
}

export async function _wms_android_Получить_Партию_с_паллеты(Паллета: number, Товар: number, ПИК: number): Promise<IResult_wms_android_Получить_Партию_с_паллеты> {
    if (typeof Паллета != "number") throw new Error("вызов '_wms_android_Получить_Партию_с_паллеты': параметр 'Паллета' должен быть числом");
    if (typeof Товар != "number") throw new Error("вызов '_wms_android_Получить_Партию_с_паллеты': параметр 'Товар' должен быть числом");
    if (typeof ПИК != "number") throw new Error("вызов '_wms_android_Получить_Партию_с_паллеты': параметр 'ПИК' должен быть числом");
    let recordsets = await executeSql("_wms_android_Получить_Партию_с_паллеты " + Паллета.toString() + "," + Товар.toString() + "," + ПИК.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Получить_Партию_с_паллеты: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Получить_Партию_с_паллеты: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Партия) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_Партию_с_паллеты': не заполнена колонка 'Партия'");
            if (typeof row.Партия != "number") throw new Error("результат выполнения '_wms_android_Получить_Партию_с_паллеты': значение в колонке 'Партия' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Логин_инфо {
    error:string;
    Компания: string;
    ВремяСервера: Moment;
    ВерсияСервера: string;
    ИмяСервера: string;
    БазаДанных: string
}

export async function _wms_android_Логин_инфо(): Promise<IResult_wms_android_Логин_инфо> {

    let recordsets = await executeSql("_wms_android_Логин_инфо " + "");
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Логин_инфо: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Логин_инфо: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Компания) == "undefined") throw new Error("результат выполнения '_wms_android_Логин_инфо': не заполнена колонка 'Компания'");
            if (typeof row.Компания != "string") throw new Error("результат выполнения '_wms_android_Логин_инфо': значение в колонке 'Компания' должно быть строкой");
            if (typeof(row.ВремяСервера) == "undefined") throw new Error("результат выполнения '_wms_android_Логин_инфо': не заполнена колонка 'ВремяСервера'");
            if (!row.ВремяСервера.constructor || row.ВремяСервера.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Логин_инфо': значение в колонке 'ВремяСервера' должно быть датой (Moment)");
            if (typeof(row.ВерсияСервера) == "undefined") throw new Error("результат выполнения '_wms_android_Логин_инфо': не заполнена колонка 'ВерсияСервера'");
            if (typeof row.ВерсияСервера != "string") throw new Error("результат выполнения '_wms_android_Логин_инфо': значение в колонке 'ВерсияСервера' должно быть строкой");
            if (typeof(row.ИмяСервера) == "undefined") throw new Error("результат выполнения '_wms_android_Логин_инфо': не заполнена колонка 'ИмяСервера'");
            if (typeof row.ИмяСервера != "string") throw new Error("результат выполнения '_wms_android_Логин_инфо': значение в колонке 'ИмяСервера' должно быть строкой");
            if (typeof(row.БазаДанных) == "undefined") throw new Error("результат выполнения '_wms_android_Логин_инфо': не заполнена колонка 'БазаДанных'");
            if (typeof row.БазаДанных != "string") throw new Error("результат выполнения '_wms_android_Логин_инфо': значение в колонке 'БазаДанных' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_получить_задание {
    error:string;
    taskId: number
}

export async function _wms_android_РАЗГР_получить_задание(KadrId: number): Promise<IResult_wms_android_РАЗГР_получить_задание> {
    if (typeof KadrId != "number") throw new Error("вызов '_wms_android_РАЗГР_получить_задание': параметр 'KadrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_получить_задание " + KadrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_получить_задание: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_получить_задание: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.taskId) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_получить_задание': не заполнена колонка 'taskId'");
            if (typeof row.taskId != "number") throw new Error("результат выполнения '_wms_android_РАЗГР_получить_задание': значение в колонке 'taskId' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Взять_задание_в_работу_РАЗГР {
    error:string;
    Ok: string
}

export async function _wms_android_Взять_задание_в_работу_РАЗГР(TaskId: number, KadrId: number): Promise<IResult_wms_android_Взять_задание_в_работу_РАЗГР> {
    if (typeof TaskId != "number") throw new Error("вызов '_wms_android_Взять_задание_в_работу_РАЗГР': параметр 'TaskId' должен быть числом");
    if (typeof KadrId != "number") throw new Error("вызов '_wms_android_Взять_задание_в_работу_РАЗГР': параметр 'KadrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Взять_задание_в_работу_РАЗГР " + TaskId.toString() + "," + KadrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Взять_задание_в_работу_РАЗГР: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Взять_задание_в_работу_РАЗГР: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_Взять_задание_в_работу_РАЗГР': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "string") throw new Error("результат выполнения '_wms_android_Взять_задание_в_работу_РАЗГР': значение в колонке 'Ok' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Паллета_инфо {
    error:string;
    Ключ: number;
    Название: string;
    Тип: number;
    Владелец: number;
    Глубина: number;
    Ширина: number;
    Высота: number;
    Организация: number;
    Сотрудник: number;
    ЭтоДоВыяснения: boolean;
    ПИК: number;
    ЭтоБрак: boolean;
    Заглушка: boolean;
    Виртуальная: boolean;
    _Кроссдокинг: boolean;
    _Неперемещаемая: boolean;
    _Вес: number;
    _Напечатано: number;
    _Паллета: number
}

export async function _wms_android_Паллета_инфо(palleteId: number): Promise<IResult_wms_android_Паллета_инфо> {
    if (typeof palleteId != "number") throw new Error("вызов '_wms_android_Паллета_инфо': параметр 'palleteId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Паллета_инфо " + palleteId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Паллета_инфо: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Паллета_инфо: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.Название) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Название'");
            if (typeof row.Название != "string") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Название' должно быть строкой");
            if (typeof(row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Тип' должно быть числом");
            if (typeof(row.Владелец) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Владелец'");
            if (typeof row.Владелец != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Владелец' должно быть числом");
            if (typeof(row.Глубина) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Глубина'");
            if (typeof row.Глубина != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Глубина' должно быть числом");
            if (typeof(row.Ширина) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Ширина'");
            if (typeof row.Ширина != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Ширина' должно быть числом");
            if (typeof(row.Высота) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Высота'");
            if (typeof row.Высота != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Высота' должно быть числом");
            if (typeof(row.Организация) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Организация'");
            if (typeof row.Организация != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Организация' должно быть числом");
            if (typeof(row.Сотрудник) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Сотрудник'");
            if (typeof row.Сотрудник != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Сотрудник' должно быть числом");
            if (typeof(row.ЭтоДоВыяснения) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'ЭтоДоВыяснения'");
            if (typeof row.ЭтоДоВыяснения != "boolean") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'ЭтоДоВыяснения' должно быть true/false");
            if (typeof(row.ПИК) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'ПИК'");
            if (typeof row.ПИК != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'ПИК' должно быть числом");
            if (typeof(row.ЭтоБрак) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'ЭтоБрак'");
            if (typeof row.ЭтоБрак != "boolean") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'ЭтоБрак' должно быть true/false");
            if (typeof(row.Заглушка) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Заглушка'");
            if (typeof row.Заглушка != "boolean") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Заглушка' должно быть true/false");
            if (typeof(row.Виртуальная) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка 'Виртуальная'");
            if (typeof row.Виртуальная != "boolean") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке 'Виртуальная' должно быть true/false");
            if (typeof(row._Кроссдокинг) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка '_Кроссдокинг'");
            if (typeof row._Кроссдокинг != "boolean") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке '_Кроссдокинг' должно быть true/false");
            if (typeof(row._Неперемещаемая) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка '_Неперемещаемая'");
            if (typeof row._Неперемещаемая != "boolean") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке '_Неперемещаемая' должно быть true/false");
            if (typeof(row._Вес) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка '_Вес'");
            if (typeof row._Вес != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке '_Вес' должно быть числом");
            if (typeof(row._Напечатано) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка '_Напечатано'");
            if (typeof row._Напечатано != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке '_Напечатано' должно быть числом");
            if (typeof(row._Паллета) == "undefined") throw new Error("результат выполнения '_wms_android_Паллета_инфо': не заполнена колонка '_Паллета'");
            if (typeof row._Паллета != "number") throw new Error("результат выполнения '_wms_android_Паллета_инфо': значение в колонке '_Паллета' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_Создать_партию_из_штрих_кода {
    error:string;
    Партия: number
}

export async function _wms_android_РАЗГР_Создать_партию_из_штрих_кода(BarCode: string, DogID: number, ClientID: number, TMC: number, ReleaseDate: Moment, ExpiredDate: Moment, PartNum: string): Promise<IResult_wms_android_РАЗГР_Создать_партию_из_штрих_кода> {
    if (typeof BarCode != "string") throw new Error("вызов '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': параметр 'BarCode' должен быть строкой");
    if (typeof DogID != "number") throw new Error("вызов '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': параметр 'DogID' должен быть числом");
    if (typeof ClientID != "number") throw new Error("вызов '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': параметр 'ClientID' должен быть числом");
    if (typeof TMC != "number") throw new Error("вызов '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': параметр 'TMC' должен быть числом");
    if (!ReleaseDate.constructor || ReleaseDate.constructor.name != "Moment") throw new Error("параметр 'ReleaseDate' должен быть датой (Moment)");
    if (!ExpiredDate.constructor || ExpiredDate.constructor.name != "Moment") throw new Error("параметр 'ExpiredDate' должен быть датой (Moment)");
    if (typeof PartNum != "string") throw new Error("вызов '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': параметр 'PartNum' должен быть строкой");
    let recordsets = await executeSql("_wms_android_РАЗГР_Создать_партию_из_штрих_кода " + stringAsSql(BarCode) + "," + DogID.toString() + "," + ClientID.toString() + "," + TMC.toString() + "," + ReleaseDate.format('YYYYMMDD HH:mm:ss') + "," + ExpiredDate.format('YYYYMMDD HH:mm:ss') + "," + stringAsSql(PartNum));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_Создать_партию_из_штрих_кода: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_Создать_партию_из_штрих_кода: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Партия) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': не заполнена колонка 'Партия'");
            if (typeof row.Партия != "number") throw new Error("результат выполнения '_wms_android_РАЗГР_Создать_партию_из_штрих_кода': значение в колонке 'Партия' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки {
    error:string;
    Паллета: number
}

export async function _wms_android_Получить_паллету_по_шк_беспаллетной_ячейки(BarCode: string): Promise<IResult_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки> {
    if (typeof BarCode != "string") throw new Error("вызов '_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки': параметр 'BarCode' должен быть строкой");
    let recordsets = await executeSql("_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки " + stringAsSql(BarCode));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Паллета) == "undefined") throw new Error("результат выполнения '_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки': не заполнена колонка 'Паллета'");
            if (typeof row.Паллета != "number") throw new Error("результат выполнения '_wms_android_Получить_паллету_по_шк_беспаллетной_ячейки': значение в колонке 'Паллета' должно быть числом");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_ТМЦ_инфо {
    error:string;
    Ключ: number;
    Номер: string;
    Название: string;
    НомерНазвание: string;
    Поставщик: number;
    Вес: number;
    ДлинаБрутто: number;
    ШиринаБрутто: number;
    ОбъемБрутто: number;
    ВысотаБрутто: number;
    КолВУпак: number;
    ТипТовара: string;
    ТипОтбора: string;
    Партионный: string;
    КарточкаНовойПартии: string;
    КарточкаНовогоБрака: string;
    ЕдИзм: string;
    ЕдИзм2: string;
    СписокУпаковок: string;
    СрокГодностиДни: number;
    СрокГодностиМес: number;
    Весовой: boolean
}

export async function _wms_android_ТМЦ_инфо(tmcId: number): Promise<IResult_wms_android_ТМЦ_инфо> {
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_ТМЦ_инфо': параметр 'tmcId' должен быть числом");
    let recordsets = await executeSql("_wms_android_ТМЦ_инфо " + tmcId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_ТМЦ_инфо: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_ТМЦ_инфо: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.Номер) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Номер'");
            if (typeof row.Номер != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Номер' должно быть строкой");
            if (typeof(row.Название) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Название'");
            if (typeof row.Название != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Название' должно быть строкой");
            if (typeof(row.НомерНазвание) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'НомерНазвание'");
            if (typeof row.НомерНазвание != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'НомерНазвание' должно быть строкой");
            if (typeof(row.Поставщик) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Поставщик'");
            if (typeof row.Поставщик != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Поставщик' должно быть числом");
            if (typeof(row.Вес) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Вес'");
            if (typeof row.Вес != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Вес' должно быть числом");
            if (typeof(row.ДлинаБрутто) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ДлинаБрутто'");
            if (typeof row.ДлинаБрутто != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ДлинаБрутто' должно быть числом");
            if (typeof(row.ШиринаБрутто) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ШиринаБрутто'");
            if (typeof row.ШиринаБрутто != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ШиринаБрутто' должно быть числом");
            if (typeof(row.ОбъемБрутто) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ОбъемБрутто'");
            if (typeof row.ОбъемБрутто != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ОбъемБрутто' должно быть числом");
            if (typeof(row.ВысотаБрутто) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ВысотаБрутто'");
            if (typeof row.ВысотаБрутто != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ВысотаБрутто' должно быть числом");
            if (typeof(row.КолВУпак) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'КолВУпак'");
            if (typeof row.КолВУпак != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'КолВУпак' должно быть числом");
            if (typeof(row.ТипТовара) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ТипТовара'");
            if (typeof row.ТипТовара != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ТипТовара' должно быть строкой");
            if (typeof(row.ТипОтбора) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ТипОтбора'");
            if (typeof row.ТипОтбора != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ТипОтбора' должно быть строкой");
            if (typeof(row.Партионный) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Партионный'");
            if (typeof row.Партионный != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Партионный' должно быть строкой");
            if (typeof(row.КарточкаНовойПартии) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'КарточкаНовойПартии'");
            if (typeof row.КарточкаНовойПартии != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'КарточкаНовойПартии' должно быть строкой");
            if (typeof(row.КарточкаНовогоБрака) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'КарточкаНовогоБрака'");
            if (typeof row.КарточкаНовогоБрака != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'КарточкаНовогоБрака' должно быть строкой");
            if (typeof(row.ЕдИзм) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ЕдИзм'");
            if (typeof row.ЕдИзм != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ЕдИзм' должно быть строкой");
            if (typeof(row.ЕдИзм2) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'ЕдИзм2'");
            if (typeof row.ЕдИзм2 != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'ЕдИзм2' должно быть строкой");
            if (typeof(row.СписокУпаковок) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'СписокУпаковок'");
            if (typeof row.СписокУпаковок != "string") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'СписокУпаковок' должно быть строкой");
            if (typeof(row.СрокГодностиДни) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'СрокГодностиДни'");
            if (typeof row.СрокГодностиДни != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'СрокГодностиДни' должно быть числом");
            if (typeof(row.СрокГодностиМес) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'СрокГодностиМес'");
            if (typeof row.СрокГодностиМес != "number") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'СрокГодностиМес' должно быть числом");
            if (typeof(row.Весовой) == "undefined") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': не заполнена колонка 'Весовой'");
            if (typeof row.Весовой != "boolean") throw new Error("результат выполнения '_wms_android_ТМЦ_инфо': значение в колонке 'Весовой' должно быть true/false");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Список_настроек_WMS {
    error:string;
    Параметр: string;
    Тип: string;
    Значение: string
}

export async function _wms_android_Список_настроек_WMS(): Promise<IResult_wms_android_Список_настроек_WMS[]> {

    let recordsets = await executeSql("_wms_android_Список_настроек_WMS " + "");
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Список_настроек_WMS: не вернула результатов" } as any;

    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Параметр) == "undefined") throw new Error("результат выполнения '_wms_android_Список_настроек_WMS': не заполнена колонка 'Параметр'");
            if (typeof row.Параметр != "string") throw new Error("результат выполнения '_wms_android_Список_настроек_WMS': значение в колонке 'Параметр' должно быть строкой");
            if (typeof(row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Список_настроек_WMS': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "string") throw new Error("результат выполнения '_wms_android_Список_настроек_WMS': значение в колонке 'Тип' должно быть строкой");
            if (typeof(row.Значение) == "undefined") throw new Error("результат выполнения '_wms_android_Список_настроек_WMS': не заполнена колонка 'Значение'");
            if (typeof row.Значение != "string") throw new Error("результат выполнения '_wms_android_Список_настроек_WMS': значение в колонке 'Значение' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_РАЗГР_Проверить_способ_хранения {
    error:string;
    Ok: string
}

export async function _wms_android_РАЗГР_Проверить_способ_хранения(ТМЦ: number, Паллета: number, Задание: number): Promise<IResult_wms_android_РАЗГР_Проверить_способ_хранения> {
    if (typeof ТМЦ != "number") throw new Error("вызов '_wms_android_РАЗГР_Проверить_способ_хранения': параметр 'ТМЦ' должен быть числом");
    if (typeof Паллета != "number") throw new Error("вызов '_wms_android_РАЗГР_Проверить_способ_хранения': параметр 'Паллета' должен быть числом");
    if (typeof Задание != "number") throw new Error("вызов '_wms_android_РАЗГР_Проверить_способ_хранения': параметр 'Задание' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_Проверить_способ_хранения " + ТМЦ.toString() + "," + Паллета.toString() + "," + Задание.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_Проверить_способ_хранения: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_Проверить_способ_хранения: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_Проверить_способ_хранения': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_Проверить_способ_хранения': значение в колонке 'Ok' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Партия_ТМЦ_инфо {
    error:string;
    Ключ: number;
    Номер: string;
    Название: string;
    НомерНазвание: string;
    ДоговорПрихода: number;
    Брак: string
}

export async function _wms_android_Партия_ТМЦ_инфо(partId: number): Promise<IResult_wms_android_Партия_ТМЦ_инфо> {
    if (typeof partId != "number") throw new Error("вызов '_wms_android_Партия_ТМЦ_инфо': параметр 'partId' должен быть числом");
    let recordsets = await executeSql("_wms_android_Партия_ТМЦ_инфо " + partId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Партия_ТМЦ_инфо: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Партия_ТМЦ_инфо: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.Номер) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': не заполнена колонка 'Номер'");
            if (typeof row.Номер != "string") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': значение в колонке 'Номер' должно быть строкой");
            if (typeof(row.Название) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': не заполнена колонка 'Название'");
            if (typeof row.Название != "string") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': значение в колонке 'Название' должно быть строкой");
            if (typeof(row.НомерНазвание) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': не заполнена колонка 'НомерНазвание'");
            if (typeof row.НомерНазвание != "string") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': значение в колонке 'НомерНазвание' должно быть строкой");
            if (typeof(row.ДоговорПрихода) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': не заполнена колонка 'ДоговорПрихода'");
            if (typeof row.ДоговорПрихода != "number") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': значение в колонке 'ДоговорПрихода' должно быть числом");
            if (typeof(row.Брак) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': не заполнена колонка 'Брак'");
            if (typeof row.Брак != "string") throw new Error("результат выполнения '_wms_android_Партия_ТМЦ_инфо': значение в колонке 'Брак' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_Проверить_товар_на_других_паллетах {
    error:string;
    ПаллетаНазвание: string
}

export async function _wms_android_РАЗГР_Проверить_товар_на_других_паллетах(currPalleteId: number, tmcId: number, taskId: number): Promise<IResult_wms_android_РАЗГР_Проверить_товар_на_других_паллетах> {
    if (typeof currPalleteId != "number") throw new Error("вызов '_wms_android_РАЗГР_Проверить_товар_на_других_паллетах': параметр 'currPalleteId' должен быть числом");
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_РАЗГР_Проверить_товар_на_других_паллетах': параметр 'tmcId' должен быть числом");
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_РАЗГР_Проверить_товар_на_других_паллетах': параметр 'taskId' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_Проверить_товар_на_других_паллетах " + currPalleteId.toString() + "," + tmcId.toString() + "," + taskId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_Проверить_товар_на_других_паллетах: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_Проверить_товар_на_других_паллетах: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.ПаллетаНазвание) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_Проверить_товар_на_других_паллетах': не заполнена колонка 'ПаллетаНазвание'");
            if (typeof row.ПаллетаНазвание != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_Проверить_товар_на_других_паллетах': значение в колонке 'ПаллетаНазвание' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_Сверка_с_заявкой {
    error:string;
    Результат: string
}

export async function _wms_android_РАЗГР_Сверка_с_заявкой(taskId: number, tmcId: number, partId: number, kol: number): Promise<IResult_wms_android_РАЗГР_Сверка_с_заявкой> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_РАЗГР_Сверка_с_заявкой': параметр 'taskId' должен быть числом");
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_РАЗГР_Сверка_с_заявкой': параметр 'tmcId' должен быть числом");
    if (typeof partId != "number") throw new Error("вызов '_wms_android_РАЗГР_Сверка_с_заявкой': параметр 'partId' должен быть числом");
    if (typeof kol != "number") throw new Error("вызов '_wms_android_РАЗГР_Сверка_с_заявкой': параметр 'kol' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_Сверка_с_заявкой " + taskId.toString() + "," + tmcId.toString() + "," + partId.toString() + "," + kol.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_Сверка_с_заявкой: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_Сверка_с_заявкой: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Результат) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_Сверка_с_заявкой': не заполнена колонка 'Результат'");
            if (typeof row.Результат != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_Сверка_с_заявкой': значение в колонке 'Результат' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_INSERT_скл_Комплектация {
    error:string;
    Ok: boolean
}

export async function _wms_android_РАЗГР_INSERT_скл_Комплектация(tmcId: number, clientPalleteID: number, curPal: number, newKol: number, userID: number, partID: number, taskID: number, isReturn: boolean, ДоговорПрихода: number): Promise<IResult_wms_android_РАЗГР_INSERT_скл_Комплектация> {
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'tmcId' должен быть числом");
    if (typeof clientPalleteID != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'clientPalleteID' должен быть числом");
    if (typeof curPal != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'curPal' должен быть числом");
    if (typeof newKol != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'newKol' должен быть числом");
    if (typeof userID != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'userID' должен быть числом");
    if (typeof partID != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'partID' должен быть числом");
    if (typeof taskID != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'taskID' должен быть числом");
    if (typeof isReturn != "boolean") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'isReturn' должен быть boolean");
    if (typeof ДоговорПрихода != "number") throw new Error("вызов '_wms_android_РАЗГР_INSERT_скл_Комплектация': параметр 'ДоговорПрихода' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_INSERT_скл_Комплектация " + tmcId.toString() + "," + clientPalleteID.toString() + "," + curPal.toString() + "," + newKol.toString() + "," + userID.toString() + "," + partID.toString() + "," + taskID.toString() + "," + (isReturn?1:0) + "," + ДоговорПрихода.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_INSERT_скл_Комплектация: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_INSERT_скл_Комплектация: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_INSERT_скл_Комплектация': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "boolean") throw new Error("результат выполнения '_wms_android_РАЗГР_INSERT_скл_Комплектация': значение в колонке 'Ok' должно быть true/false");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_Сверка_с_заявкой_полная {
    error:string;
    Результат: string
}

export async function _wms_android_РАЗГР_Сверка_с_заявкой_полная(taskId: number, tmcId: number): Promise<IResult_wms_android_РАЗГР_Сверка_с_заявкой_полная> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_РАЗГР_Сверка_с_заявкой_полная': параметр 'taskId' должен быть числом");
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_РАЗГР_Сверка_с_заявкой_полная': параметр 'tmcId' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_Сверка_с_заявкой_полная " + taskId.toString() + "," + tmcId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_Сверка_с_заявкой_полная: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_Сверка_с_заявкой_полная: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Результат) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_Сверка_с_заявкой_полная': не заполнена колонка 'Результат'");
            if (typeof row.Результат != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_Сверка_с_заявкой_полная': значение в колонке 'Результат' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_список_партий_по_договору {
    error:string;
    Ключ: number;
    Партия: string
}

export async function _wms_android_РАЗГР_список_партий_по_договору(prihodDogId: number, tmcId: number): Promise<IResult_wms_android_РАЗГР_список_партий_по_договору[]> {
    if (typeof prihodDogId != "number") throw new Error("вызов '_wms_android_РАЗГР_список_партий_по_договору': параметр 'prihodDogId' должен быть числом");
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_РАЗГР_список_партий_по_договору': параметр 'tmcId' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_список_партий_по_договору " + prihodDogId.toString() + "," + tmcId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_список_партий_по_договору': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_РАЗГР_список_партий_по_договору': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.Партия) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_список_партий_по_договору': не заполнена колонка 'Партия'");
            if (typeof row.Партия != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_список_партий_по_договору': значение в колонке 'Партия' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_РАЗГР_выбрать_задание_список {
    error:string;
    Ключ: number;
    Задание: string;
    Статус: string
}

export async function _wms_android_РАЗГР_выбрать_задание_список(kadrId: number): Promise<IResult_wms_android_РАЗГР_выбрать_задание_список[]> {
    if (typeof kadrId != "number") throw new Error("вызов '_wms_android_РАЗГР_выбрать_задание_список': параметр 'kadrId' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_выбрать_задание_список " + kadrId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];


    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ключ) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_выбрать_задание_список': не заполнена колонка 'Ключ'");
            if (typeof row.Ключ != "number") throw new Error("результат выполнения '_wms_android_РАЗГР_выбрать_задание_список': значение в колонке 'Ключ' должно быть числом");
            if (typeof(row.Задание) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_выбрать_задание_список': не заполнена колонка 'Задание'");
            if (typeof row.Задание != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_выбрать_задание_список': значение в колонке 'Задание' должно быть строкой");
            if (typeof(row.Статус) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_выбрать_задание_список': не заполнена колонка 'Статус'");
            if (typeof row.Статус != "string") throw new Error("результат выполнения '_wms_android_РАЗГР_выбрать_задание_список': значение в колонке 'Статус' должно быть строкой");            
        }
    }

    return lastRecordset;

}

export interface IResult_wms_android_cypress_Очистка_общая {
    error:string;
    Ok: string
}

export async function _wms_android_cypress_Очистка_общая(dbname: string): Promise<IResult_wms_android_cypress_Очистка_общая> {
    if (typeof dbname != "string") throw new Error("вызов '_wms_android_cypress_Очистка_общая': параметр 'dbname' должен быть строкой");
    let recordsets = await executeSql("_wms_android_cypress_Очистка_общая " + stringAsSql(dbname));
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_cypress_Очистка_общая: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_cypress_Очистка_общая: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Ok) == "undefined") throw new Error("результат выполнения '_wms_android_cypress_Очистка_общая': не заполнена колонка 'Ok'");
            if (typeof row.Ok != "string") throw new Error("результат выполнения '_wms_android_cypress_Очистка_общая': значение в колонке 'Ok' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Партия_штуки_в_упаковки {
    error:string;
    Упаковки: string
}

export async function _wms_android_Партия_штуки_в_упаковки(tmcId: number, partId: number, kol: number): Promise<IResult_wms_android_Партия_штуки_в_упаковки> {
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_Партия_штуки_в_упаковки': параметр 'tmcId' должен быть числом");
    if (typeof partId != "number") throw new Error("вызов '_wms_android_Партия_штуки_в_упаковки': параметр 'partId' должен быть числом");
    if (typeof kol != "number") throw new Error("вызов '_wms_android_Партия_штуки_в_упаковки': параметр 'kol' должен быть числом");
    let recordsets = await executeSql("_wms_android_Партия_штуки_в_упаковки " + tmcId.toString() + "," + partId.toString() + "," + kol.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_Партия_штуки_в_упаковки: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_Партия_штуки_в_упаковки: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Упаковки) == "undefined") throw new Error("результат выполнения '_wms_android_Партия_штуки_в_упаковки': не заполнена колонка 'Упаковки'");
            if (typeof row.Упаковки != "string") throw new Error("результат выполнения '_wms_android_Партия_штуки_в_упаковки': значение в колонке 'Упаковки' должно быть строкой");            
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_РАЗГР_осталось_принять_ТМЦ {
    error:string;
    Количество: number
}

export async function _wms_android_РАЗГР_осталось_принять_ТМЦ(taskId: number, dogId: number, tmcId: number): Promise<IResult_wms_android_РАЗГР_осталось_принять_ТМЦ> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_РАЗГР_осталось_принять_ТМЦ': параметр 'taskId' должен быть числом");
    if (typeof dogId != "number") throw new Error("вызов '_wms_android_РАЗГР_осталось_принять_ТМЦ': параметр 'dogId' должен быть числом");
    if (typeof tmcId != "number") throw new Error("вызов '_wms_android_РАЗГР_осталось_принять_ТМЦ': параметр 'tmcId' должен быть числом");
    let recordsets = await executeSql("_wms_android_РАЗГР_осталось_принять_ТМЦ " + taskId.toString() + "," + dogId.toString() + "," + tmcId.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_РАЗГР_осталось_принять_ТМЦ: не вернула результатов" } as any;
    if (lastRecordset.length > 1) return { error: "_wms_android_РАЗГР_осталось_принять_ТМЦ: вернула " + lastRecordset.length + " записей вместо 1-ой" } as any;
    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Количество) == "undefined") throw new Error("результат выполнения '_wms_android_РАЗГР_осталось_принять_ТМЦ': не заполнена колонка 'Количество'");
            if (typeof row.Количество != "number") throw new Error("результат выполнения '_wms_android_РАЗГР_осталось_принять_ТМЦ': значение в колонке 'Количество' должно быть числом");            
        }
    }

    return lastRecordset[0];

}
