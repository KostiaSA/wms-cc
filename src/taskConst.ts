import { _wms_android_РАЗГР_выбрать_задание_список } from "./generated-api";

export type TaskType =
    "РАЗГР" |
    "ПИК" |
    "ПЕРЕМ" |
    "ИНВ" |
    "ПОГР" |
    "ОСТ" |
    "КОМП" |
    "КОРР" |
    "ПЕРЕБ" |
    "УПАК" |
    "ПОДП" |
    "КРОСС" |
    "СОРТ" |
    "ОВХ" |
    "ФАС" |
    "ОПТИМ" |
    "РАЗМ" |
    "ВЫП" |
    "РАСКЛ" |
    "ДОПЫ" |
    "ОПТИМ";

export interface ITaskConst {
    тип: number;
    headerBackground?: string;
    показыватьЗаявкуВИнфо?: boolean;
    показыватьАвтомобильВИнфо?: boolean;
    показыватьЗонуВИнфо?: boolean;
    показыватьОткудаКудаВИнфо?: boolean;
    показыватьПаллетуВИнфо?: boolean;
    выбрать_задание_api?: (kadrId: number) => Promise<any>;

}

let taskConst: { [task: string]: ITaskConst } = {};

export function getTaskConst(taskType: TaskType | number): ITaskConst {
    if (typeof taskType == "number") {
        for (let t in taskConst) {
            if (taskConst[t].тип == taskType) {
                return taskConst[t];
            }
        }
        throw new Error("getTaskConst(): не надено задание с номером " + taskType);
    }
    else {

        let ret = taskConst[taskType];
        if (!ret)
            throw new Error("getTaskConst(): не надено задание с типом " + taskType);
        return ret;
    }
}


taskConst["РАЗГР"] = {
    тип: 1,
    headerBackground: "lightcyan",
    показыватьЗаявкуВИнфо: true,
    показыватьАвтомобильВИнфо: true,
    показыватьЗонуВИнфо: true,
    выбрать_задание_api: _wms_android_РАЗГР_выбрать_задание_список
}

taskConst["ПИК"] = {
    тип: 2,
    headerBackground: "#e1ffe1",
    показыватьЗаявкуВИнфо: true

}