
export function getUpakKolStr(kol: number, kolInBox: number, edIzm: string) {
    if (kolInBox < 1)
        kolInBox = 1;
    if (kolInBox == 1) {
        return kol.toString() + " " + edIzm;
    }

    let str = Math.trunc(kol / kolInBox).toString() + " упак";
    if (str == "0 упак")
        return kol.toString() + " " + edIzm;
    else {
        if (kol % kolInBox == 0)
            return str;
        else
            return str + " + " + (kol % kolInBox).toString() + " " + edIzm;
    }


}