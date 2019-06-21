import * as  React from "react";
import { escapeHtml } from "./escapeHtml";
import { ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, ЦВЕТ_ТЕКСТА_ЯЧЕЙКА, ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ, ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ } from "../const";

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

    let res: string[] = [];
    res.push("<span style='color:" + ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ + "'>" + a[1] + "</span>")
    if (a[2])
        res.push("<span style='color:" + ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ + "'>" + a[2] + "</span>");
    res.push("<span style='color:" + ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ + "'>" + a[0] + "</span>")
    // a[0] = "<span style='color:" + ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ + "'>" + a[0] + "</span>";
    // a[1] = "<span style='color:" + ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ + "'>" + a[1] + "</span>";
    // if (a[2])
    //     a[2] = "<span style='color:" + ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ + "'>" + a[2] + "</span>";
    return res.join("<br/>");
}

export function agGridMultiRowCellRendererForTMC_for_table_cell(str: string): any {
    if (!str)
        return null;
    let a: string[] = str.split("\r");
    if (a.length == 1)
        return <span style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}>{a[0]}</span>;

    let res: any[] = [];
    res.push(<span key={1} style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}>{a[1]}</span>);
    res.push(<br key={2} />);
    if (a[2]) {
        res.push(<span key={3} style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>{a[2]}</span>);
        res.push(<br key={4} />);
    }
    res.push(<span key={5} style={{ color: ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ }}>{a[0]}</span>);
    return res;
}
