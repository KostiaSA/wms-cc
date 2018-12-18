export function getSubcontoTextColorClass(subcontoType: string): string {
    if (subcontoType == "Яч")
        return "text-color-subconto-cell";
    else if (subcontoType == "PAL")
        return "text-color-subconto-pallete";
    else if (subcontoType == "ТМЦ")
        return "text-color-subconto-tovar";
    else if (subcontoType == "Пар")
        return "text-color-subconto-part";
    else if (subcontoType == "box")
        return "text-color-subconto-box";
    else if (subcontoType == "")
        return "";
    else
        throw "getSubcontoTextColorClass(): subcontoType==" + subcontoType;
}