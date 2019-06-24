import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState, BarcodeWithType } from '../AppState';
import { CSSProperties, ReactNode } from 'react';
import { getTaskConst } from '../taskConst';
import { BuhtaButton } from '../ui/BuhtaButton';
import { showError } from "../modals/ErrorMessagePage";
import { IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании, _wms_android_Проверка_блокировки_пересоздания_ПИКов, _wms_android_Штрихкод_запрещен, _wms_android_ПИК_Подобран, _wms_android_ПИК_все_паллеты_завершены, _wms_android_Получить_ТМЦ_по_штрих_коду, _wms_android_Получить_Партию_по_штрих_коду, _wms_android_ПИК_обработка_шк_паллеты, _wms_android_Название_паллеты, _wms_android_Название_ячейки_где_паллета, IResult_wms_android_ПИК_список_паллет, _wms_android_ПИК_список_паллет, _wms_android_ПИК_обработка_шк_партии, _wms_android_ПИК_обработка_шк_товара, IResult_wms_android_ПИК_список_товара_на_паллете, _wms_android_ПИК_список_товара_на_паллете } from "../generated-api";
import classNames from "classnames";
import { getSubcontoTextColorClass } from '../utils/getSubcontoTextColorClass';
import { TestBarcodesPage } from "./TestBarcodesPage";
import { PlaySound } from "../sounds/PlaySound";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { replaceAll } from '../utils/replaceAll';
import { escapeHtml } from '../utils/escapeHtml';
import { agGridMultiRowCellRendererForCellPallete, agGridMultiRowCellRendererForTMC, agGridMultiRowCellRendererForTMC_for_table_cell } from '../utils/agGridMultiRowCellRenderer';
import { showInfo } from "../modals/InfoMessagePage";
import { ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ЯЧЕЙКА, ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, ЦВЕТ_ФОНА_ПИК_СПИСОК_ТОВАРА_НА_ПАЛЛЕТЕ } from "../const";
import { playSound_ButtonClick } from "../utils/playSound";

export interface IПИК_PageProps extends IAppPageProps {
    taskId: number;
}

export function show_ПИК(taskId: number) {
    appState.openPage<IПИК_PageProps>(ПИК_Page, { pageId: "ПИК_" + taskId, taskId: taskId });
}



export class ПИК_Page extends React.Component<IПИК_PageProps> {
    task: IResult_wms_android_Информация_о_задании;

    fromType: string = "";
    fromId: number = 0;
    fromName: string = "не выбрано";
    fromCellName: string = "";

    intoType: string = "";
    intoId: number = 0;
    intoName: string = "не выбрано";

    isReplaceMode: number = 0;
    isЗапросКоличестваMode: number = 0;
    otherParty: number = 0;
    changeTMCID: number = 0;

    partId: number = 0;
    tmcId: number = 0;

    barcodeProcessorHandler: any;

    async barcodeProcessor() {
        if (!this.props.visible) return;

        let barcode = appState.getNextBarcodeFromQueue(this.props.pageId);
        if (!barcode) return;
        let barcodePrefix = barcode.barcode.substr(0, 3).toUpperCase();

        if (this.task.ЗавершенноеЗадание != 0) {
            showError("ПИК уже завершен.");
            return;
        }


        let res = await _wms_android_Проверка_блокировки_пересоздания_ПИКов(this.task.ДоговорКлюч);
        if (res.Заблокировано != 0) {
            showError("Выполняется пересоздание ПИКов по договору. Подождите.");
            return;
        }

        let res2 = await _wms_android_Штрихкод_запрещен(barcode.barcode);
        if (res2.Запрещен == 1) {
            showError("Запрещенный штрих-код.");
            return;
        }

        if (barcodePrefix != "BOX" && barcodePrefix != "PAL") {
            let res3 = await _wms_android_ПИК_Подобран(this.props.taskId);
            if (res3.Подобран == 1) {
                let res4 = await _wms_android_ПИК_все_паллеты_завершены(this.props.taskId);
                if (res4.Завершены == 1)
                    showError("ПИК подобран. Завершайте задание!");
                else
                    showError("ПИК подобран. Завершайте паллеты!");
                return;
            }
        }

        let tmcId = (await _wms_android_Получить_ТМЦ_по_штрих_коду(barcode.barcode, this.task.Клиент)).ТМЦ;
        let partId = 0;
        if (tmcId == 0) {
            partId = (await _wms_android_Получить_Партию_по_штрих_коду(barcode.barcode, this.task.Клиент)).Партия;
        }

        // todo _скл_Получить_Партию_по_длине


        if (partId > 0 || barcodePrefix == "PAR" || barcodePrefix == "BRA") {
            let isBrak: number = barcodePrefix == "BRA" ? 1 : 0;
            let partResult = await _wms_android_ПИК_обработка_шк_партии(this.props.taskId, partId, isBrak, barcode.barcode, this.fromId, this.intoId);

            if (!partResult.error) {
                if (this.intoId == 0) {
                    showError("Не выбрана паллета КУДА! Отсканируйте штрих-код паллеты.");
                    return;
                }

                if (partResult.НоваяПаллетаОткуда > 0) {
                    PlaySound.паллета_откуда(barcode.barcode);
                    this.fromId = partResult.НоваяПаллетаОткуда;
                    this.fromType = "PAL";
                    this.fromName = (await _wms_android_Название_паллеты(partResult.НоваяПаллетаОткуда)).НазваниеПаллеты;
                    this.fromCellName = (await _wms_android_Название_ячейки_где_паллета(partResult.НоваяПаллетаОткуда)).НазваниеЯчейки;
                    if (this.fromName == this.fromCellName)
                        this.fromCellName = "";
                    this.forceUpdate();
                    setTimeout(this.loadTovarsGridData.bind(this), 1)
                }

                this.tmcId = partResult.tmcId;
                this.partId = partResult.partId;
                this.otherParty = partResult.otherParty;
                await this.processTovarBarcode(barcode);
                return;
            }
            else {
                showError(partResult.error);
                return;

            }

        }

        if (tmcId > 0 || partId > 0) {
            if (this.fromId == 0) {
                showError("Не выбрана паллета ОТКУДА! Отсканируйте штрих-код паллеты.");
                return;
            }
            if (this.intoId == 0) {
                showError("Не выбрана паллета КУДА! Отсканируйте штрих-код паллеты.");
                return;
            }
        }

        // if ((PartID <> 0) or(TMCID <> 0)) and(FromPalleteEdit.Value = 0) and(IntoPalleteEdit.Value = 0) 
        // {
        // bmWarning('Отсканируйте штрих-код паллеты');
        // Exit;
        // }



        if (barcodePrefix == "PAL") {
            let palleteId = Number.parseInt(barcode.barcode.toUpperCase().replace("PAL", ""));
            let palResult = await _wms_android_ПИК_обработка_шк_паллеты(this.props.taskId, palleteId, this.isReplaceMode, this.fromId, this.intoId);
            //console.log("PAL", palResult);
            if (palResult.ПаллетаОткуда > 0) {
                PlaySound.паллета_откуда(barcode.barcode);
                this.fromId = palleteId;
                this.fromType = "PAL";
                this.fromName = (await _wms_android_Название_паллеты(palleteId)).НазваниеПаллеты;
                this.fromCellName = (await _wms_android_Название_ячейки_где_паллета(palleteId)).НазваниеЯчейки;
                if (this.fromName == this.fromCellName)
                    this.fromCellName = "";
                this.forceUpdate();
                setTimeout(this.loadTovarsGridData.bind(this), 1)
            }
            if (palResult.ПаллетаКуда > 0) {
                PlaySound.паллета_куда(barcode.barcode);
                this.intoId = palleteId;
                this.intoType = "PAL";
                this.intoName = (await _wms_android_Название_паллеты(palleteId)).НазваниеПаллеты;
                this.forceUpdate();
            }
            return;
        }

        if (barcodePrefix == "BOX") {
            showError("Коробки пока не обрабатываются!");
            return;
        }

        console.log("пик-получен-штрих", barcode.barcode);
        await this.processTovarBarcode(barcode);

    }

    async processTovarBarcode(barcode: BarcodeWithType) {

        let res = await _wms_android_ПИК_обработка_шк_товара(
            0,
            this.props.taskId,
            this.tmcId,
            this.partId,
            -1, // todo SkladKol
            barcode.barcode,
            this.fromId,
            this.intoId,
            this.isReplaceMode,
            this.task.Клиент,
            this.isЗапросКоличестваMode,
            this.otherParty,
            0, // todo @ChangePalOld
            0, // todo @ChangePartOld
            appState.kadrId,
            0
        );

        if (res.error) {
            PlaySound.ошибка("");
            await showError(res.error);
            return
        }

        if (res.Нужен_запрос_количества_Ok = 1) {
            console.log("Нужен_запрос_количества_Ok", res);
            return
        }
        else {
            await PlaySound.товар_подобран("");
            setTimeout(this.loadTovarsGridData.bind(this), 10)
            console.log(res);
        }

    }

    async componentDidMount() {
        this.task = await _wms_android_Информация_о_задании(this.props.taskId);
        this.barcodeProcessorHandler = setInterval(this.barcodeProcessor.bind(this), 100);
        this.forceUpdate();
    }

    componentWillUnmount() {
        clearInterval(this.barcodeProcessorHandler)
    }

    palletesGridData: IResult_wms_android_ПИК_список_паллет[];
    palletesGridApi: any;
    palletesGridColumnApi: any;
    //loaded: boolean = false;

    onPalletesGridReady = async (params: any) => {
        this.palletesGridApi = params.api;
        this.palletesGridColumnApi = params.columnApi;
        this.palletesGridData = await _wms_android_ПИК_список_паллет(this.props.taskId, this.intoId, this.fromId);
        this.palletesGridApi.setRowData(this.palletesGridData);
        this.palletesGridApi.sizeColumnsToFit();
        //this.palletesGridApi.resetRowHeights();
        this.forceUpdate();

    };

    tovarsGridApi: any;
    tovarsGridColumnApi: any;
    tovarsGridData: IResult_wms_android_ПИК_список_товара_на_паллете[];

    onTovarsGridReady = (params: any) => {
        this.tovarsGridApi = params.api;
        this.tovarsGridColumnApi = params.columnApi;
        setTimeout(this.loadTovarsGridData.bind(this), 1)
    };

    async loadTovarsGridData() {
        if (!this.tovarsGridApi)
            return;
        if (this.fromId > 0) {
            this.tovarsGridData = await _wms_android_ПИК_список_товара_на_паллете(this.props.taskId, this.fromId, this.isReplaceMode, this.changeTMCID);
            this.tovarsGridApi.setRowData(this.tovarsGridData);
            this.tovarsGridApi.sizeColumnsToFit();
            this.tovarsGridApi.resetRowHeights();
        }
        else {
            this.tovarsGridData = [];
            this.tovarsGridApi.setRowData(this.tovarsGridData);
        }
    }

    palletesGridGetRowHeight(params: any): number {
        console.log(params);
        debugger
        return 45;
    }

    render() {
        let overlayLoadingTemplate = '<i class="fa fa-spinner fa-spin ag-overlay-loading-center" style="color:darkgray;font-size:28px;border:0px"></i>';
        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            paddingLeft: 5,
        };

        if (!this.task) {
            return (
                <div className={"app"} style={{ display: this.props.visible ? "" : "none", backgroundColor: "ALICEBLUE", padding: 10, width: "100%" }}>
                    <div className="card">
                        <div className="card-header">
                            загрузка
                            </div>
                        <div className="card-body">
                        </div>
                    </div>
                </div>
            );
        }


        let объединенная = null;
        if (this.task.Объединенная > 0)
            объединенная = <div style={{ color: "brown" }}>Объединенная заявка!</div>;

        let паллета4 = null;
        if (true) {
            паллета4 = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    паллета
                </BuhtaButton>
            )
        }

        let паллетаОткуда = null;
        if (true) {
            паллетаОткуда = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    откуда
                </BuhtaButton>
            )
        }

        let паллетаКуда = null;
        if (true) {
            паллетаКуда = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    куда
                </BuhtaButton>
            )
        }

        let fromInputClassName = classNames({
            "text-color-red": this.fromType == "",
            [getSubcontoTextColorClass(this.fromType)]: this.fromType != ""
        });

        let intoInputClassName = classNames({
            "text-color-red": this.intoType == "",
            [getSubcontoTextColorClass(this.intoType)]: this.intoType != ""
        });

        return (
            <div className={"app"} style={{ display: this.props.visible ? "flex" : "none", flexDirection: "column", backgroundColor: "whitesmoke", padding: 0, width: "100%" }}>


                <div className="card" style={{ marginBottom: 0, flex: "1" }}>
                    <div className="card-header" style={{ zoom: appState.zoom, backgroundColor: getTaskConst(this.task.Тип).headerBackground }}>
                        <div>{this.task.НазваниеЗадания}</div>
                        {объединенная}
                    </div>

                    <div className="card-body" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
                        <div style={{ padding: 5, zoom: appState.zoom, }}>

                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ ...labelStyle }}>откуда</td>
                                        <td className={fromInputClassName} style={{ ...textStyle }}>{this.fromName}</td>
                                        <td style={{ ...textStyle, color: "brown" }}>{this.fromCellName}</td>
                                    </tr>
                                    <tr>
                                        <td style={{ ...labelStyle }}>куда</td>
                                        <td className={intoInputClassName} style={{ ...textStyle }}>{this.intoName}</td>
                                        <td>
                                            <BuhtaButton small outline color="primary">новая</BuhtaButton>
                                            <BuhtaButton small outline color="success" style={{ marginLeft: 5 }}>завершить</BuhtaButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div style={{ display: this.fromId != 0 ? "none" : undefined, zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }} className="ag-theme-balham">
                            <div style={{ height: "100%", width: "100%", position: "absolute" }}>
                                <AgGridReact
                                    //headerHeight={25}
                                    suppressLoadingOverlay
                                    // rowData={this.palletesGridData}
                                    //  overlayLoadingTemplate={overlayLoadingTemplate}
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onPalletesGridReady}
                                    // onColumnResized={() => { this.palletesGridApi.resetRowHeights(); }}
                                    rowHeight={48}
                                    onRowClicked={this.onPalleteGridRowClicked.bind(this)}
                                //getRowHeight={this.palletesGridGetRowHeight.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Что на паллете"
                                        field="ТМЦ"
                                        cellRenderer={agGridMultiRowCellRendererForTMC}
                                        cellStyle={{ whiteSpace: "normal" }}
                                    >
                                    </AgGridColumn>
                                    <AgGridColumn headerName="Ячейка/ Паллета" field="ЯчейкаПаллета" width={140} cellRenderer={agGridMultiRowCellRendererForCellPallete} cellStyle={{ textAlign: "center" }}></AgGridColumn>
                                    <AgGridColumn headerName="Взято/ Взять" field="ВзятоВзять" width={80} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}></AgGridColumn>
                                    <AgGridColumn headerName="Кол-во/ Ед.Изм." field="КолЕдИзм" width={80} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}></AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>
                        <div style={{ display: this.fromId == 0 ? "none" : undefined, zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }} className="ag-theme-balham">
                            <div style={{ height: "100%", width: "100%", position: "absolute" }}>
                                <AgGridReact
                                    //headerHeight={25}
                                    suppressLoadingOverlay
                                    // rowData={this.palletesGridData}
                                    //  overlayLoadingTemplate={overlayLoadingTemplate}
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    // onColumnResized={() => { this.palletesGridApi.resetRowHeights(); }}
                                    rowHeight={80}
                                    onRowClicked={this.onTovarGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Товар"
                                        field="ТМЦ"
                                        cellRenderer={agGridMultiRowCellRendererForTMC}
                                        cellStyle={{ background: ЦВЕТ_ФОНА_ПИК_СПИСОК_ТОВАРА_НА_ПАЛЛЕТЕ, whiteSpace: "normal" }}
                                    >
                                    </AgGridColumn>
                                    <AgGridColumn headerName="Взять" field="Взять" width={50} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, background: ЦВЕТ_ФОНА_ПИК_СПИСОК_ТОВАРА_НА_ПАЛЛЕТЕ }}></AgGridColumn>
                                    <AgGridColumn headerName="шт" field="Шт" width={30} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, background: ЦВЕТ_ФОНА_ПИК_СПИСОК_ТОВАРА_НА_ПАЛЛЕТЕ }}></AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{ zoom: appState.zoom, textAlign: "right" }}>
                    <div style={{ marginTop: 10, paddingRight: 4 }}>
                        {паллета4}
                        {паллетаОткуда}
                        {паллетаКуда}
                    </div>

                    <div style={{ marginTop: 10, paddingBottom: 10, paddingRight: 4 }}>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="danger"
                            outline
                            onClick={() => {
                                appState.openPage(TestBarcodesPage, {
                                    pageId: TestBarcodesPage.PAGE_ID,
                                    taskId: this.props.taskId,
                                    palleteFrom: this.fromId,
                                })
                            }}
                        >
                            ШТРИХ
                        </BuhtaButton>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="secondary"
                            outline
                            // onTouchStart={() => {
                            //     playSound_ButtonClick();
                            // }}
                            onClick={() => {
                                appState.closeActivePage();
                            }}
                        >
                            выход
                        </BuhtaButton>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="success"
                            onClick={() => {
                                //                                this.doExecuteTask();
                            }}
                        >
                            завершить ПИК
                        </BuhtaButton>
                    </div>
                </div>



            </div >
        )
    }

    onPalleteGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_ПИК_список_паллет = e.data;
        let cellStyle: CSSProperties = { borderBottom: "0px solid gray", padding: 4 };
        let info: ReactNode = (
            <table style={{ color: "gray" }}>
                <tbody>
                    <tr>
                        <td style={cellStyle}>на паллете</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}> {agGridMultiRowCellRendererForTMC_for_table_cell(row.ТМЦ)}</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>ячейка</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_ЯЧЕЙКА }}>{row.Ячейка}</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>паллета</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_ПАЛЛЕТА }}>{row.Паллета}</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>взято/взять</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}>{row.ВзятоВзять}</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>кол-во</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }} >{row.КолЕдИзм}</td>
                    </tr>

                </tbody>
            </table>
        );
        showInfo(info);
    }

    onTovarGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_ПИК_список_товара_на_паллете = e.data;
        let cellStyle: CSSProperties = { borderBottom: "0px solid gray", padding: 4 };
        let info: ReactNode = (
            <table style={{ color: "gray" }}>
                <tbody>
                    <tr>
                        <td style={cellStyle}>на паллете</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}> {agGridMultiRowCellRendererForTMC_for_table_cell(row.ТМЦ)}</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>взять</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}>{row.Взять}</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>шт.</td>
                        <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }} >{row.Шт}</td>
                    </tr>

                </tbody>
            </table>
        );
        showInfo(info);
    }

    async doExecuteTask() {
        // if (this.task.Тип == 2) {// ПИК
        //     let result = await _wms_android_Взять_задание_в_работу_ПИК(this.props.taskId, appState.kadrId);
        //     if (result.error) {
        //         showError(result.error);
        //     }

        // }
        // else {
        //     throw new Error("doExecuteTask(): не сделано для задания типа " + this.task.Тип);
        // }
    }
}
