
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
            if (typeof(row.РучнаяПогрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'РучнаяПогрузка'");
            if (typeof row.РучнаяПогрузка != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'РучнаяПогрузка' должно быть числом");
            if (typeof(row.СрочнаяОтгрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'СрочнаяОтгрузка'");
            if (typeof row.СрочнаяОтгрузка != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'СрочнаяОтгрузка' должно быть числом");
            if (typeof(row.ВремяНачалаПлан) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяНачалаПлан'");
            if (!row.ВремяНачалаПлан.constructor || row.ВремяНачалаПлан.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяНачалаПлан' должно быть датой");
            if (typeof(row.ВремяОкончанияПлан) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ВремяОкончанияПлан'");
            if (!row.ВремяОкончанияПлан.constructor || row.ВремяОкончанияПлан.constructor.name != "Moment") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ВремяОкончанияПлан' должно быть датой");
            if (typeof(row.Автомобиль) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Автомобиль'");
            if (typeof row.Автомобиль != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Автомобиль' должно быть строкой");
            if (typeof(row.Водитель) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Водитель'");
            if (typeof row.Водитель != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Водитель' должно быть строкой");
            if (typeof(row.Подразделение2) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Подразделение2'");
            if (typeof row.Подразделение2 != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Подразделение2' должно быть строкой");
            if (typeof(row.Сотрудник) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Сотрудник'");
            if (typeof row.Сотрудник != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Сотрудник' должно быть строкой");
            if (typeof(row.ЕстьСпецификация) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЕстьСпецификация'");
            if (typeof row.ЕстьСпецификация != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЕстьСпецификация' должно быть числом");
            if (typeof(row.ПропускУпакРазрешен) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПропускУпакРазрешен'");
            if (typeof row.ПропускУпакРазрешен != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПропускУпакРазрешен' должно быть числом");
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
            if (typeof(row.ЗаявкаНомер) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаНомер'");
            if (typeof row.ЗаявкаНомер != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаНомер' должно быть строкой");
            if (typeof(row.ЗаявкаДата) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаДата'");
            if (typeof row.ЗаявкаДата != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаДата' должно быть строкой");
            if (typeof(row.ЗаявкаПримечание) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗаявкаПримечание'");
            if (typeof row.ЗаявкаПримечание != "string") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗаявкаПримечание' должно быть строкой");
            if (typeof(row.Объединенная) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Объединенная'");
            if (typeof row.Объединенная != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Объединенная' должно быть числом");
            if (typeof(row.Тип) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Тип'");
            if (typeof row.Тип != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Тип' должно быть числом");
            if (typeof(row.ДоговорКлюч) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорКлюч'");
            if (typeof row.ДоговорКлюч != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорКлюч' должно быть числом");
            if (typeof(row.ДоговорПодразделение) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ДоговорПодразделение'");
            if (typeof row.ДоговорПодразделение != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ДоговорПодразделение' должно быть числом");
            if (typeof(row.Клиент) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'Клиент'");
            if (typeof row.Клиент != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'Клиент' должно быть числом");
            if (typeof(row.ПовторнаяОтгрузка) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ПовторнаяОтгрузка'");
            if (typeof row.ПовторнаяОтгрузка != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ПовторнаяОтгрузка' должно быть числом");
            if (typeof(row.ЗавершенноеЗадание) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'ЗавершенноеЗадание'");
            if (typeof row.ЗавершенноеЗадание != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'ЗавершенноеЗадание' должно быть числом");
            if (typeof(row.РучнойВводКоличества) == "undefined") throw new Error("результат выполнения '_wms_android_Информация_о_задании': не заполнена колонка 'РучнойВводКоличества'");
            if (typeof row.РучнойВводКоличества != "number") throw new Error("результат выполнения '_wms_android_Информация_о_задании': значение в колонке 'РучнойВводКоличества' должно быть числом");            
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

export interface IResult_wms_android_тестовые_штрихкоды {
    error:string;
    Объект: string;
    ШтрихКод: string;
    Цвет: string
}

export async function _wms_android_тестовые_штрихкоды(taskId: number, palleteFrom: number): Promise<IResult_wms_android_тестовые_штрихкоды[]> {
    if (typeof taskId != "number") throw new Error("вызов '_wms_android_тестовые_штрихкоды': параметр 'taskId' должен быть числом");
    if (typeof palleteFrom != "number") throw new Error("вызов '_wms_android_тестовые_штрихкоды': параметр 'palleteFrom' должен быть числом");
    let recordsets = await executeSql("_wms_android_тестовые_штрихкоды " + taskId.toString() + "," + palleteFrom.toString());
    let lastRecordset = recordsets[recordsets.length - 1];
    if (!lastRecordset) return { error: "_wms_android_тестовые_штрихкоды: не вернула результатов" } as any;

    for (let row of lastRecordset) {
        if (!row.error) {
            if (typeof(row.Объект) == "undefined") throw new Error("результат выполнения '_wms_android_тестовые_штрихкоды': не заполнена колонка 'Объект'");
            if (typeof row.Объект != "string") throw new Error("результат выполнения '_wms_android_тестовые_штрихкоды': значение в колонке 'Объект' должно быть строкой");
            if (typeof(row.ШтрихКод) == "undefined") throw new Error("результат выполнения '_wms_android_тестовые_штрихкоды': не заполнена колонка 'ШтрихКод'");
            if (typeof row.ШтрихКод != "string") throw new Error("результат выполнения '_wms_android_тестовые_штрихкоды': значение в колонке 'ШтрихКод' должно быть строкой");
            if (typeof(row.Цвет) == "undefined") throw new Error("результат выполнения '_wms_android_тестовые_штрихкоды': не заполнена колонка 'Цвет'");
            if (typeof row.Цвет != "string") throw new Error("результат выполнения '_wms_android_тестовые_штрихкоды': значение в колонке 'Цвет' должно быть строкой");            
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
    ТМЦ: number
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
        }
    }

    return lastRecordset[0];

}

export interface IResult_wms_android_Получить_Партию_по_штрих_коду {
    error:string;
    Партия: number;
    ТМЦ: number
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
    Товар_с_паллеты_подобран: number;
    Паллета_откуда_опустела: number;
    Нужен_вызов_процедуры_Ok: number;
    Заявка_14700: number
}

export async function _wms_android_ПИК_обработка_шк_товара(mode: number, taskId: number, tmcId: number, partId: number, SkladKol: number, barcode: string, currentFromPalleteId: number, currentIntoPalleteId: number, isZamena: number, clientID: number, requestEdit_Value: number, otherParty: number, changePalOld: number, changePartOld: number, userID: number, newKol_ответ_юзера: number): Promise<IResult_wms_android_ПИК_обработка_шк_товара> {
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
    if (typeof requestEdit_Value != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'requestEdit_Value' должен быть числом");
    if (typeof otherParty != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'otherParty' должен быть числом");
    if (typeof changePalOld != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'changePalOld' должен быть числом");
    if (typeof changePartOld != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'changePartOld' должен быть числом");
    if (typeof userID != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'userID' должен быть числом");
    if (typeof newKol_ответ_юзера != "number") throw new Error("вызов '_wms_android_ПИК_обработка_шк_товара': параметр 'newKol_ответ_юзера' должен быть числом");
    let recordsets = await executeSql("_wms_android_ПИК_обработка_шк_товара " + mode.toString() + "," + taskId.toString() + "," + tmcId.toString() + "," + partId.toString() + "," + SkladKol.toString() + "," + stringAsSql(barcode) + "," + currentFromPalleteId.toString() + "," + currentIntoPalleteId.toString() + "," + isZamena.toString() + "," + clientID.toString() + "," + requestEdit_Value.toString() + "," + otherParty.toString() + "," + changePalOld.toString() + "," + changePartOld.toString() + "," + userID.toString() + "," + newKol_ответ_юзера.toString());
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
