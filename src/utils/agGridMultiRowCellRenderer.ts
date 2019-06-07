import { escapeHtml } from "./escapeHtml";

export function agGridMultiRowCellRenderer(param: any) {
    let a: string[] = param.value.split("\r");
    a = a.map((s: string) => escapeHtml(s));
    return a.join("<br/>");
}
