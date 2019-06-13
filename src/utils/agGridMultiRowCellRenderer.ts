import { escapeHtml } from "./escapeHtml";
import { ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, ЦВЕТ_ТЕКСТА_ЯЧЕЙКА, ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ, ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ } from "../const";

export function agGridMultiRowCellRenderer(param: any) {
    let a: string[] = param.value.split("\r");
    a = a.map((s: string) => escapeHtml(s));
    return a.join("<br/>");
}


export function agGridMultiRowCellRendererForCellPallete(param: any) {
    let a: string[] = param.value.split("\r");
    a = a.map((s: string) => escapeHtml(s));
    a[0] = "<span style='color:" + ЦВЕТ_ТЕКСТА_ПАЛЛЕТА + "'>" + a[0] + "</span>";
    a[1] = "<span style='color:" + ЦВЕТ_ТЕКСТА_ЯЧЕЙКА + "'>" + a[1] + "</span>";
    return a.join("<br/>");
}

export function agGridMultiRowCellRendererForTMC(param: any) {
    if (!param || !param.value)
        return "";
    let a: string[] = param.value.split("\r");
    if (a.length == 1)
        return "<span style='color:" + ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ + "'>" + a[0] + "</span>"
    a = a.map((s: string) => escapeHtml(s));
    a[0] = "<span style='color:" + ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ + "'>" + a[0] + "</span>";
    a[1] = "<span style='color:" + ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ + "'>" + a[1] + "</span>";
    return a.join("<br/>");
}
