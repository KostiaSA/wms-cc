import { IResult_wms_android_Паллета_инфо } from "../generated-api";

export function isNormalPallete(pal: IResult_wms_android_Паллета_инфо): boolean {
    return pal.Организация == 0 && pal.Сотрудник == 0 && pal.Заглушка == 0 && pal.Виртуальная == 0 && pal.ЭтоБрак == 0 && pal.ЭтоДоВыяснения == 0;

}