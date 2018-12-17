import {executeSql} from "./executeSql";
import {appState} from "../AppState";
import {objectAsSql} from "./objectAsSql";

export async function executeSqlStoredProc(procName: string, ...params: any[]): Promise<any[][]> {

    if (appState.tsdKey == -1)
        throw "executeSqlStoredProc('" + procName + "'): appState.tsdKey==-1";

    let ps = [appState.tsdKey, ...params];

    return await executeSql(procName + " " + ps.map((p: any) => objectAsSql(p)).join(","));

}

export async function executeSqlStoredProc_FirstRecordset(procName: string, ...params: any[]): Promise<any[]> {

    let recordsets = await executeSqlStoredProc(procName, ...params);

    if (!recordsets[0])
        throw "executeSqlStoredProc_FirstRecordset('" + procName + "'): нет результата";

    return recordsets[0];

}

export async function executeSqlStoredProc_FirstRow(procName: string, ...params: any[]): Promise<any> {

    let recordset = await executeSqlStoredProc_FirstRecordset(procName, ...params);

    if (!recordset[0])
        throw "executeSqlStoredProc_FirstRow('" + procName + "'): нет результата";

    return recordset[0];

}

export async function executeSqlStoredProc_FirstRowOrNull(procName: string, ...params: any[]): Promise<any> {

    let recordset = await executeSqlStoredProc_FirstRecordset(procName, ...params);

    if (!recordset[0])
        return null;
    else
        return recordset[0];

}

export async function executeSqlStoredProc_FirstValue(procName: string, ...params: any[]): Promise<any> {

    let row = await executeSqlStoredProc_FirstRow(procName, ...params);

    return row[Object.keys(row)[0]];

}