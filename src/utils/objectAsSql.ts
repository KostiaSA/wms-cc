import {stringAsSql} from "./stringAsSql";
import {isString} from "./isString";
import {isDate} from "./isDate";
import {isNumber} from "util";

export function objectAsSql(obj: any):string {
    if (isString(obj))
        return stringAsSql(obj);
    else
    if (isDate(obj))
        return stringAsSql(obj);
    else
    if (isNumber(obj))
        return obj.toString();
    else
        throw "objectAsSql(): неизвестный тип obj"

}
