import {GridOptions, ColDef} from "ag-grid-community";
import {isString} from "./isString";

export function createGridOptionsFromSqlRowsets(recordsets: any[]): GridOptions {

    let gridOptions: GridOptions;
    gridOptions = eval("(" + recordsets[0][0]["gridOptions"] + ")");

    if (!gridOptions.overlayLoadingTemplate)
        gridOptions.overlayLoadingTemplate = '<i class="fa fa-spinner fa-spin ag-overlay-loading-center" style="color:darkgray;font-size:28px;border:0px"></i>';

    if (!gridOptions.overlayNoRowsTemplate)
        gridOptions.overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";


    if (!Array.isArray(gridOptions.columnDefs))
        throw "createGridOptionsFromSqlRowsets(): нет свойства 'columnDefs'";

    if (gridOptions.columnDefs.length == 0)
        throw "createGridOptionsFromSqlRowsets(): нет колонок в 'columnDefs'";

    let errors:string[] = [];

    gridOptions.columnDefs.forEach((col: ColDef) => {
        if (!isString(col.field))
            errors.push("у колонки '" + col.headerName + "' нет свойства 'field'");
        if (!isString(col.headerName))
            errors.push("у колонки '" + col.field + "' нет свойства 'headerName'");
    });
    if (errors.length>0)
        throw  errors.join(", ");


    gridOptions.rowData = recordsets[1];

    if (!gridOptions.rowData)
        throw  "в SQL-процедуре нет второго SELECT-а с данными списка ";

    if (gridOptions.rowData.length>0){
        let row=gridOptions.rowData[0];

        gridOptions.columnDefs.forEach((col: ColDef) => {
            if (Object.keys(row).indexOf(col.field!)==-1)
                errors.push("в SELECT-е с данными нет колонки '" + col.field + "'");
        });

        if (Object.keys(row).indexOf("Ключ")==-1)
            errors.push("в SELECT-е с данными нет колонки 'Ключ'");
    }


    if (errors.length>0)
        throw  errors.join(", ");

    return gridOptions;

}