import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { CSSProperties } from 'react';
import { getTaskConst } from '../taskConst';
import { BuhtaButton } from '../ui/BuhtaButton';
import { showError } from "../modals/ErrorMessagePage";
import { IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании, _wms_android_Проверка_блокировки_пересоздания_ПИКов, _wms_android_Штрихкод_запрещен, _wms_android_ПИК_Подобран, _wms_android_ПИК_все_паллеты_завершены, _wms_android_Получить_ТМЦ_по_штрих_коду, _wms_android_Получить_Партию_по_штрих_коду, _wms_android_ПИК_обработка_шк_паллеты, _wms_android_Название_паллеты, _wms_android_Название_ячейки_где_паллета, IResult_wms_android_ПИК_список_паллет, _wms_android_ПИК_список_паллет } from "../generated-api";
import classNames from "classnames";
import { getSubcontoTextColorClass } from '../utils/getSubcontoTextColorClass';
import { TestBarcodesPage } from "./TestBarcodesPage";
import { PlaySound } from "../sounds/PlaySound";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { replaceAll } from '../utils/replaceAll';
import { escapeHtml } from '../utils/escapeHtml';
import { agGridMultiRowCellRenderer } from "../utils/agGridMultiRowCellRenderer";

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
            console.log("PAL", palResult);
            if (palResult.ПаллетаОткуда > 0) {
                PlaySound.паллета_откуда(barcode.barcode);
                this.fromId = palleteId;
                this.fromType = "PAL";
                this.fromName = (await _wms_android_Название_паллеты(palleteId)).НазваниеПаллеты;
                this.fromCellName = (await _wms_android_Название_ячейки_где_паллета(palleteId)).НазваниеЯчейки;
                if (this.fromName == this.fromCellName)
                    this.fromCellName = "";
                this.forceUpdate();
            }
            if (palResult.ПаллетаКуда > 0) {
                PlaySound.паллета_куда(barcode.barcode);
                this.intoId = palleteId;
                this.intoType = "PAL";
                this.intoName = (await _wms_android_Название_паллеты(palleteId)).НазваниеПаллеты;
                this.forceUpdate();
            }
        }

        console.log("пик-получен-штрих", barcode.barcode);

        // todo режим замены 'Вы находитесь в режиме замены. Можно сканировать только ШК выбранного товара. Для выхода из режима нажмите ИнфЗам.'



        // let req: I_ПИК_Лист_Поступил_ШтрихКод_req = {
        //     taskId: this.taskId,
        //     barcode: barcode.barcode,
        //     barcodeType: barcode.barcodeType,
        //     fromType: this.fromType,
        //     fromId: this.fromId,
        //     intoType: this.intoType,
        //     intoId: this.intoId,
        // };


        // let ans = await call_wmsapi<I_ПИК_Лист_Поступил_ШтрихКод_ans>(ПИК_Лист_Поступил_ШтрихКод_proc, req);

        // if (ans.error) {
        //     PlaySound.ошибка("ошибка");
        // } else if (ans.неизвестный_штрих_код) {
        //     PlaySound.неизвестный_штрих_код();
        // } else if (ans.штрихкод_не_подходит) {
        //     PlaySound.штрихкод_не_подходит(barcode.barcodeType, barcode.barcode);
        // } else if (ans.не_выбрана_паллета_откуда) {
        //     PlaySound.не_выбрана_паллета_откуда();
        // } else if (ans.не_выбрана_паллета_куда) {
        //     PlaySound.не_выбрана_паллета_куда();
        // } else if (ans.паллета_куда) {
        //     this.intoType = ans.паллета_куда.intoType;
        //     this.intoId = ans.паллета_куда.intoId;
        //     this.intoName = ans.паллета_куда.intoName;
        //     PlaySound.паллета_куда(barcode.barcode);
        //     this.forceUpdate();
        // } else if (ans.паллета_откуда) {
        //     this.fromType = ans.паллета_откуда.fromType;
        //     this.fromId = ans.паллета_откуда.fromId;
        //     this.fromName = ans.паллета_откуда.fromName;
        //     PlaySound.паллета_откуда(barcode.barcode);
        //     this.forceUpdate();
        // } else if (ans.паллета_коробка_взята_в_подбор) {
        //     this.intoType = ans.паллета_коробка_взята_в_подбор.palboxType;
        //     this.intoId = ans.паллета_коробка_взята_в_подбор.palboxId;
        //     this.intoName = ans.паллета_коробка_взята_в_подбор.palboxName;
        //     if (this.intoType == "PAL")
        //         PlaySound.паллета_взята_в_подбор(barcode.barcode);
        //     else if (this.intoType == "BOX")
        //         PlaySound.коробка_взята_в_подбор(barcode.barcode);
        //     else
        //         throw "barcodeProcessor(): неизвестный тип " + this.fromType;

        //     this.forceUpdate();

        //     throw "проверка";

        // }
        // else
        //     console.error("ошибка", ans)


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
        this.forceUpdate();
        this.palletesGridApi.sizeColumnsToFit();
        this.palletesGridApi.resetRowHeights();

    };

    tovarsGridApi: any;
    tovarsGridColumnApi: any;
    //loaded: boolean = false;

    onTovarsGridReady = (params: any) => {
        this.tovarsGridApi = params.api;
        this.tovarsGridColumnApi = params.columnApi;

        if (this.tovarsGridApi) {
            this.tovarsGridApi.sizeColumnsToFit();
            this.tovarsGridApi.resetRowHeights();
        }

    };


    render() {
        let overlayLoadingTemplate = '<i class="fa fa-spinner fa-spin ag-overlay-loading-center" style="color:darkgray;font-size:28px;border:0px"></i>';
        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";

        let labelStyle: CSSProperties = {
            fontSize: 12,
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
                    <div className="card-header" style={{ backgroundColor: getTaskConst(this.task.Тип).headerBackground }}>
                        <div>{this.task.НазваниеЗадания}</div>
                        {объединенная}
                    </div>

                    <div className="card-body" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
                        <table style={{ width: "100%", padding: 10, }}>
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
                        <div style={{ flex: "1", overflow: "hidden", position: "relative", fontSize: 11 }} className="ag-theme-balham">
                            <div style={{ height: "100%", width: "100%", position: "absolute" }}>
                                <AgGridReact
                                    //rowData={this.palletesGridData}
                                    //  overlayLoadingTemplate={overlayLoadingTemplate}
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onPalletesGridReady}
                                >
                                    <AgGridColumn
                                        field="ТМЦ" autoHeight
                                        cellRenderer={agGridMultiRowCellRenderer}
                                        cellStyle={{ color: "black" }}
                                    >
                                    </AgGridColumn>
                                    <AgGridColumn field="ЯчейкаПаллета" width={110} autoHeight cellRenderer={agGridMultiRowCellRenderer} cellStyle={{ color: "brown" }}></AgGridColumn>
                                    <AgGridColumn field="ВзятоВзять" width={80}></AgGridColumn>
                                    <AgGridColumn field="КолЕдИзм" width={80}></AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
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
                                    taskId: this.props.taskId
                                })
                            }}
                        >
                            тест-ШРТИХ
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
                                this.doExecuteTask();
                            }}
                        >
                            завершить ПИК
                        </BuhtaButton>
                    </div>
                </div>



            </div>
        )
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


