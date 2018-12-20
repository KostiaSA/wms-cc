import {I_wmsapi_ans, I_wmsapi_req} from "./wmsapi";

export const ПИК_Лист_Взять_ПаллетуКоробку_в_подбор_proc = "ПИК_Лист_Взять_ПаллетуКоробку_в_подбор";

export interface I_ПИК_Лист_Взять_ПаллетуКоробку_в_подбор_req extends I_wmsapi_req {
    taskId: number;
    subcontoType: string;
    subcontoId: number;
}

export interface I_ПИК_Лист_Взять_ПаллетуКоробку_в_подбор_ans extends I_wmsapi_ans {
    "паллета_коробка_взята_в_подбор": {
        palboxType: string;
        palboxId: number;
        palboxName: string;
    };
}
