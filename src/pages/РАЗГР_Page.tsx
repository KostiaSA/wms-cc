import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState, BarcodeWithType } from '../AppState';
import { CSSProperties, ReactNode } from 'react';
import { getTaskConst } from '../taskConst';
import { BuhtaButton } from '../ui/BuhtaButton';
import { showError } from "../modals/ErrorMessagePage";
import { IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании, _wms_android_Штрихкод_запрещен, _wms_android_Получить_ТМЦ_по_штрих_коду, _wms_android_Получить_Партию_по_штрих_коду, _wms_android_Название_паллеты, _wms_android_Название_ячейки_где_паллета, _wms_android_Получить_Партию_с_паллеты, _wms_android_Паллета_инфо, _wms_android_РАЗГР_Создать_партию_из_штрих_кода, _wms_android_Получить_паллету_по_шк_беспаллетной_ячейки, _wms_android_ПИК_обработка_шк_партии, _wms_android_ТМЦ_инфо } from "../generated-api";
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
import { ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ЯЧЕЙКА, ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО } from "../const";
import { playSound_ButtonClick } from "../utils/playSound";
import { isNormalPallete } from "../utils/isNormalPallete";
import { number } from "prop-types";
import { Moment } from 'moment';
import moment from "moment";
import { parseGS1, IGS1Item } from "../utils/gs1";
import { isDate } from '../utils/isDate';
import { isNumber } from 'util';

export interface IРАЗГР_PageProps extends IAppPageProps {
    taskId: number;
}

export function show_РАЗГР(taskId: number) {
    appState.openPage<IРАЗГР_PageProps>(РАЗГР_Page, { pageId: "РАЗГР_" + taskId, taskId: taskId });
}



export class РАЗГР_Page extends React.Component<IРАЗГР_PageProps> {
    task: IResult_wms_android_Информация_о_задании;

    intoType: string = "";
    intoId: number = 0;
    intoName: string = "не выбрано";
    barcodeProcessorHandler: any;

    isRepeatebleDog: boolean = false; // Режим повторного приема и отргрузки. 
    isInputOst: boolean = false; // Режим ввода начальных остатков


    clearPalleteId() {
        this.intoType = "";
        this.intoId = 0;
        this.intoName = "не выбрано";
        this.forceUpdate();
    }

    async setIntoPalleteId(palleteId: number) {
        this.intoType = "PAL";
        this.intoId = palleteId;
        this.intoName = (await _wms_android_Название_паллеты(palleteId)).НазваниеПаллеты;
        this.forceUpdate();
    }

    async barcodeProcessor() {
        if (!this.props.visible) return;

        let barcode = appState.getNextBarcodeFromQueue(this.props.pageId);
        if (!barcode) return;
        let barcodePrefix = barcode.barcode.substr(0, 3).toUpperCase();
        if (barcode.barcode.toUpperCase().startsWith("CROSS"))
            barcodePrefix = "CROSS";

        if (this.task.ЗавершенноеЗадание) {
            showError("РАЗГРУЗКА завершена.");
            return;
        }



        let res2 = await _wms_android_Штрихкод_запрещен(barcode.barcode);
        if (res2.Запрещен == 1) {
            showError("Запрещенный штрих-код.");
            return;
        }



        if (barcodePrefix == "PAL") {
            let palleteId = Number.parseInt(barcode.barcode.toUpperCase().replace("PAL", ""));
            let pal = await _wms_android_Паллета_инфо(palleteId);
            if (pal.error) {
                showError(pal.error);
                return;
            }

            if (!isNormalPallete(pal)) {
                showError("Это служебная паллета");
                return;
            }

            PlaySound.паллета_куда(barcode.barcode);
            await this.setIntoPalleteId(palleteId)

            return;
        }

        if (barcodePrefix == "CEL") {
            if (!this.isInputOst) {
                showError("Штрих-код ячейки допустим только при вводе начальных остатков!");
                return;
            }

            let palleteRes = await _wms_android_Получить_паллету_по_шк_беспаллетной_ячейки(barcode.barcode);
            if (palleteRes.error) {
                showError(palleteRes.error);
                return;
            }

            PlaySound.паллета_куда(barcode.barcode);
            await this.setIntoPalleteId(palleteRes.Паллета)
            return;

        }

        if (this.isRepeatebleDog) {
            showError('Режим повторного приема и отргрузки. Разрешено сканировать только паллеты!');
            return;
        }

        if (this.task.isCrossDoc) {

            if (barcodePrefix != "CROSS") {
                showError("Заявка 'Транзит'. Допустим только штрих-код CROSS");
                return;
            }
            // todo ProcessCross(fBarCode);       

            this.forceUpdate();
            return;

        }

        if (barcodePrefix == "CROSS") {
            showError("Заявка не 'Транзит'. Штрих-код CROSS недопустим.");
            return;
        }


        let tmcRes = await _wms_android_Получить_ТМЦ_по_штрих_коду(barcode.barcode, this.task.КлиентКлюч);
        let tmcId = tmcRes.ТМЦ;
        let barCodeKol = tmcRes.Количество;
        let partId = 0;

        if (tmcId == 0) {
            let partRes = await _wms_android_Получить_Партию_по_штрих_коду(barcode.barcode, this.task.КлиентКлюч);
            partId = partRes.Партия;
            tmcId = partRes.ТМЦ;
            barCodeKol = partRes.Количество;
        }


        if ((tmcId == 0 && partId == 0) || (tmcId != 0 && partId == 0)) {
            //fCreateedPartID:= 0;
            //fFindTMC:= 0;
            let res = await CreatePart_FromBarCode(barcode.barcode, this.task.КлиентКлюч, this.task.ДоговорКлюч);
            if (res.Ok) {
                if (tmcId != 0 && tmcId != res.FindedTMC) {
                    //bmWarning('Штрих-код привязан к ТМЦ (Ключ=' + IntToStr(TMCID) + '), код ТМЦ в считанном штрих-коде (Ключ=' + IntToStr(fFindTMC) + '). На склад будет принят ТМЦ с ключом=' + IntToStr(fFindTMC));
                    showError("Считанный штрих-код товара в партии был ранее привязан к другому ТМЦ.");
                }
                tmcId = res.FindedTMC;
                partId = res.CreateedPartID;
                if (tmcRes.Количество > 0)
                    barCodeKol = tmcRes.Количество;

            }
        }

        if (tmcId != 0) {
            // todo if TMCID = - 666 then
            // begin
            //   if bmConfirmation('Товар имеет неуникальный штрих-код. Напечатать этикетку?') then
            //   begin
            //     ShowForm('скл_терминал_Разгрузка_печать штрих кодов', Self);
            //   end;
            // end

            await this.processTovarBarcode(tmcId, partId, barCodeKol);


        }
        else {
            showError("Неизвестный штрих-код");
        }



    }

    async processTovarBarcode(tmcId: number, partId: number, barcodeKol: number) {

        let tmcInfo = await _wms_android_ТМЦ_инфо(tmcId);

        if (tmcInfo.Поставщик != this.task.КлиентКлюч) {
            showError("Поставщик ТМЦ не соответствует клиенту в задании!");
            return;
        }


        // let res = await _wms_android_РАЗГР_обработка_шк_товара(
        //     0,
        //     this.props.taskId,
        //     tmcId,
        //     partId,
        //     -1, // todo SkladKol
        //     barcode.barcode,
        //     this.fromId,
        //     this.intoId,
        //     this.isReplaceMode,
        //     this.task.Клиент,
        //     this.isЗапросКоличестваMode,
        //     otherParty,
        //     0, // todo @ChangePalOld
        //     0, // todo @ChangePartOld
        //     appState.kadrId,
        //     0
        // );

        // if (res.error) {
        //     PlaySound.ошибка("");
        //     await showError(res.error);
        //     return
        // }

        // if (res.Нужен_запрос_количества_Ok = 1) {
        //     console.log("Нужен_запрос_количества_Ok", res);
        //     let p: any = {
        //         taskId: this.props.taskId,
        //         ...res
        //     }
        //     let dialog_res = await get_РАЗГР_запрос_количества(p);

        //     if (dialog_res.result == "Ok") {
        //         // юзер ввел количество (dialog_res.newKol), еще раз вызываем с mode=1 
        //         let res2 = await _wms_android_РАЗГР_обработка_шк_товара(
        //             1,
        //             this.props.taskId,
        //             tmcId,
        //             partId,
        //             -1, // todo SkladKol
        //             barcode.barcode,
        //             this.fromId,
        //             this.intoId,
        //             this.isReplaceMode,
        //             this.task.Клиент,
        //             this.isЗапросКоличестваMode,
        //             otherParty,
        //             0, // todo @ChangePalOld
        //             0, // todo @ChangePartOld
        //             appState.kadrId,
        //             dialog_res.newKol
        //         );

        //         await PlaySound.товар_подобран("");
        //         setTimeout(this.loadTovarsGridData.bind(this), 10)
        //         console.log(res);

        //     }
        //     return
        // }
        // else {
        //     await PlaySound.товар_подобран("");
        //     setTimeout(this.loadTovarsGridData.bind(this), 10)
        //     console.log(res);
        // }

    }

    async componentDidMount() {
        this.task = await _wms_android_Информация_о_задании(this.props.taskId);

        this.barcodeProcessorHandler = setInterval(this.barcodeProcessor.bind(this), 100);
        this.forceUpdate();
    }

    componentWillUnmount() {
        clearInterval(this.barcodeProcessorHandler)
    }


    tovarsGridApi: any;
    tovarsGridColumnApi: any;
    //tovarsGridData: IResult_wms_android_РАЗГР_список_товара_на_паллете[];

    onTovarsGridReady = (params: any) => {
        this.tovarsGridApi = params.api;
        this.tovarsGridColumnApi = params.columnApi;
        setTimeout(this.loadTovarsGridData.bind(this), 1)
    };

    async loadTovarsGridData() {
        // if (!this.tovarsGridApi)
        //     return;
        // if (this.fromId > 0) {
        //     this.tovarsGridData = await _wms_android_РАЗГР_список_товара_на_паллете(this.props.taskId, this.fromId, this.isReplaceMode, this.changeTMCID);
        //     this.tovarsGridApi.setRowData(this.tovarsGridData);
        //     this.tovarsGridApi.sizeColumnsToFit();
        //     this.tovarsGridApi.resetRowHeights();
        // }
        // else {
        //     this.tovarsGridData = [];
        //     this.tovarsGridApi.setRowData(this.tovarsGridData);
        // }
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
        if (this.task.Объединенная)
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


        let intoInputClassName = classNames({
            "text-color-red": this.intoType == "",
            [getSubcontoTextColorClass(this.intoType)]: this.intoType != ""
        });

        return (
            <div className={"app cy-razgr-page"} style={{ display: this.props.visible ? "flex" : "none", flexDirection: "column", backgroundColor: "whitesmoke", padding: 0, width: "100%" }}>


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
                        <div style={{ display: this.intoId > 0 ? "none" : undefined, zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }}>
                            <div style={{ height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
                                <div style={{ fontSize: 18, textAlign: "center", color: "darkorange" }}>
                                    <div style={{ marginBottom: 30 }}>Паллета не выбрана!</div>
                                    <div>Отсканируйте штрих-код паллеты, на которую будете принимать товар</div>
                                </div>
                            </div>
                        </div>
                        <div style={{ display: this.intoId == 0 ? "none" : undefined, zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }} className="ag-theme-balham">
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
                                        cellStyle={{ whiteSpace: "normal" }}
                                    >
                                    </AgGridColumn>
                                    {/* <AgGridColumn headerName="Взять" field="Взять" width={50} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, background: ЦВЕТ_ФОНА_РАЗГР_СПИСОК_ТОВАРА_НА_ПАЛЛЕТЕ }}></AgGridColumn>
                                    <AgGridColumn headerName="шт" field="Шт" width={30} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, background: ЦВЕТ_ФОНА_РАЗГР_СПИСОК_ТОВАРА_НА_ПАЛЛЕТЕ }}></AgGridColumn> */}

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
                        {/* <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="danger"
                            outline
                            onClick={async () => {
                                let p: any = {
                                    taskId: this.props.taskId,
                                    запрос_количества_TMCID: 1143,
                                    запрос_количества_NewKol: 1,
                                    запрос_количества_MaxKol: 17,
                                    запрос_количества_PartID: 526,
                                    запрос_количества_ЯчейкаОткуда: 17084,
                                    запрос_количества_НазваниеПартии: "СР: 08.02.2020",
                                    запрос_количества_НазваниеТовара: "[00001638] ПОЛЕСЬЕ Соль экстра 1 кг (20 шт.) :",
                                    запрос_количества_Ввод_количества_в_раскладке: 1,
                                    запрос_количества_ВсегоКоличество: 2196437

                                }
                                await get_РАЗГР_запрос_количества(p);
                                //     taskId: this.props.taskId,
                                //     palleteFrom: this.fromId,
                                // })
                            }}
                        >
                            ЗК
                        </BuhtaButton> */}
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="danger"
                            outline
                            onClick={async () => {
                                //await get_РАЗГР_запрос_партии(this.props.taskId, 1886, 13184);
                            }}
                        >
                            ЗП
                        </BuhtaButton>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm cy-test-barcodes"
                            color="danger"
                            outline
                            onClick={() => {
                                appState.openPage(TestBarcodesPage, {
                                    pageId: TestBarcodesPage.PAGE_ID,
                                    taskId: this.props.taskId,
                                    palleteFrom: 0,
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
                            завершить РАЗГР
                        </BuhtaButton>
                    </div>
                </div>



            </div >
        )
    }

    onTovarGridRowClicked(e: any) {
        // playSound_ButtonClick();
        // let row: IResult_wms_android_РАЗГР_список_товара_на_паллете = e.data;
        // let cellStyle: CSSProperties = { borderBottom: "0px solid gray", padding: 4 };
        // let info: ReactNode = (
        //     <table style={{ color: "gray" }}>
        //         <tbody>
        //             <tr>
        //                 <td style={cellStyle}>на паллете</td>
        //                 <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}> {agGridMultiRowCellRendererForTMC_for_table_cell(row.ТМЦ)}</td>
        //             </tr>
        //             <tr>
        //                 <td style={cellStyle}>взять</td>
        //                 <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}>{row.Взять}</td>
        //             </tr>
        //             <tr>
        //                 <td style={cellStyle}>шт.</td>
        //                 <td style={{ ...cellStyle, color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }} >{row.Шт}</td>
        //             </tr>

        //         </tbody>
        //     </table>
        // );
        // showInfo(info);
    }

    async doExecuteTask() {
        // if (this.task.Тип == 2) {// РАЗГР
        //     let result = await _wms_android_Взять_задание_в_работу_РАЗГР(this.props.taskId, appState.kadrId);
        //     if (result.error) {
        //         showError(result.error);
        //     }

        // }
        // else {
        //     throw new Error("doExecuteTask(): не сделано для задания типа " + this.task.Тип);
        // }
    }
}


interface ICreatePart_FromBarCode_Result {
    Ok: boolean;
    FindedTMC: number;
    CreateedPartID: number;
    Количество: number;
}

async function CreatePart_FromBarCode(aBarCode: string, aClientID: number, aDogID: number): Promise<ICreatePart_FromBarCode_Result> {

    let fArtikulBarCodeSt: string;
    let fReleaseDate: Moment;
    let fExpiredDate: Moment;
    let fPartNum: string = "";

    let result: ICreatePart_FromBarCode_Result = { Ok: false, FindedTMC: 0, CreateedPartID: 0, Количество: 0 }

    let fGS1 = parseGS1(aBarCode);

    if (fGS1.length > 0) {
        let item: IGS1Item;

        // выделяем штрих-код тмц
        item = fGS1.find((i: IGS1Item) => i.ai == "01"); if (!item) return result;
        fArtikulBarCodeSt = item.data.toString();

        // выделяем дату выпуска
        item = fGS1.find((i: IGS1Item) => i.ai == "11"); if (!item) return result;
        if (item.data instanceof Date)
            fReleaseDate = moment(item.data);
        else
            return result;

        // выделяем дату годности
        item = fGS1.find((i: IGS1Item) => i.ai == "17"); if (!item) return result;
        if (item.data instanceof Date)
            fExpiredDate = moment(item.data);
        else
            return result;

        // выделяем номер партии
        item = fGS1.find((i: IGS1Item) => i.ai == "10"); if (!item) return result;
        if (!item.data || item.data == "")
            return result;
        fPartNum = item.data.toString();

        // выделяем количество
        item = fGS1.find((i: IGS1Item) => i.ai == "37"); if (!item) return result;
        if (!item.data || item.data == "" || !(Number.parseFloat(item.data.toString()) > 0))
            return result;
        result.Количество = Number.parseFloat(item.data.toString())

        let tmcId = (await _wms_android_Получить_ТМЦ_по_штрих_коду(fArtikulBarCodeSt, aClientID)).ТМЦ;

        if (tmcId > 0) {
            result.Ok = true;
            result.FindedTMC = tmcId;
            result.CreateedPartID = (await _wms_android_РАЗГР_Создать_партию_из_штрих_кода(fArtikulBarCodeSt, aDogID, aClientID, tmcId, fReleaseDate, fExpiredDate, fPartNum)).Партия;
        }

    }

    return result;

}
