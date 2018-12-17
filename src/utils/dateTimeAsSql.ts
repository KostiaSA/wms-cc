import {Moment} from "moment";

export function dateTimeAsSql(value: Moment): string {
    return "CONVERT(DATETIME2,'" + value.format("YYYYMMDD HH:mm:ss.SSS") + "')";

}