import {Moment} from "moment";

export function dateTimeAsSql(value: Moment): string {
        return "CONVERT(DATE,'" + value.format("YYYYMMDD") + "')";

}