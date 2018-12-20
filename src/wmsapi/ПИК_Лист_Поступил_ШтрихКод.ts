import {I_wmsapi_ans, I_wmsapi_req} from "./wmsapi";
import {I_ПИК_Лист_Взять_ПаллетуКоробку_в_подбор_ans} from "./ПИК_Лист_Взять_ПаллетуКоробку_в_подбор";

export const ПИК_Лист_Поступил_ШтрихКод_proc = "ПИК_Лист_Поступил_ШтрихКод";

export interface I_ПИК_Лист_Поступил_ШтрихКод_req extends I_wmsapi_req {
    taskId: number;
    barcode: string;
    barcodeType: string;
    fromType: string;
    fromId: number;
    intoType: string;
    intoId: number;
}

export interface I_ПИК_Лист_Поступил_ШтрихКод_ans extends I_wmsapi_ans, I_ПИК_Лист_Взять_ПаллетуКоробку_в_подбор_ans {
    неизвестный_штрих_код?: boolean;
    не_выбрана_паллета_откуда?:boolean;
    не_выбрана_паллета_куда?:boolean;
    штрихкод_не_подходит?:boolean;

    паллета_куда?: {
        intoType: string,
        intoId: number,
        intoName: string,
    },
    паллета_откуда?: {
        fromType: string,
        fromId: number,
        fromName: string,
    }

}
