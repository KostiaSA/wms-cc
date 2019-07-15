import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import { sleep } from "../utils/sleep";
import { getRandomString } from "../utils/getRandomString";
import { ReactNode, CSSProperties } from 'react';
import { BuhtaButton } from "../ui/BuhtaButton";

import { ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, ЦВЕТ_ТЕКСТА_ПАЛЛЕТА } from "../const";
import { PlaySound } from '../sounds/PlaySound';
import { IResult_wms_android_ТМЦ_инфо, IResult_wms_android_Информация_о_задании, IResult_wms_android_РАЗГР_список_партий_по_договору, _wms_android_РАЗГР_список_партий_по_договору, _wms_android_Партия_штуки_в_упаковки, _wms_android_РАЗГР_осталось_принять_ТМЦ, _wms_android_РАЗГР_создать_партию } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import moment from "moment";
import { Moment } from 'moment';



export interface I_РАЗГР_запрос_партии_и_количества_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
    tmc: IResult_wms_android_ТМЦ_инфо;
    barcodeKol: number;
}

export interface I_РАЗГР_запрос_партии_и_количества_Result {
    result: "Ok" | "Cancel";
    selectedPartId: number;
    selectedKol: number;
}

export async function get_РАЗГР_запрос_партии_и_количества(
    task: IResult_wms_android_Информация_о_задании,
    tmc: IResult_wms_android_ТМЦ_инфо,
    barcodeKol: number
): Promise<I_РАЗГР_запрос_партии_и_количества_Result> {

    appState.modalResult = undefined;
    appState.openModal(РАЗГР_запрос_партии_и_количества_Page, { pageId: getRandomString(), task, tmc, barcodeKol });
    return new Promise<I_РАЗГР_запрос_партии_и_количества_Result>(
        async (resolve: (res: I_РАЗГР_запрос_партии_и_количества_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class РАЗГР_запрос_партии_и_количества_Page extends React.Component<I_РАЗГР_запрос_партии_и_количества_PageProps, any> {

    constructor(props: I_РАЗГР_запрос_партии_и_количества_PageProps, context: any) {
        super(props, context);
    }

    partList: IResult_wms_android_РАЗГР_список_партий_по_договору[] = [];
    gridApi: any;
    gridColumnApi: any;
    selectedPartId: number = 0;

    kolInBox: number = 0;
    UpTypeEdit_Value: string = "";
    MestEdit_Value: number = 0;
    KolEdit_Value: number = 0;
    BoxLabel_Caption: string = "";
    осталосьПринятьКоличество: number = 0;
    осталосьПринятьУпаковки: string = "";

    //СрокРеализДнEdit_Value: number = 0;
    ДатаВыпуска: Moment = moment().startOf("day");
    СрокРеализ: Moment = moment().startOf("day");

    kol_error: string = "";
    part_error: string = "";

    async componentDidMount() {
        if (this.props.tmc.Весовой)
            throw new Error("Весовой товар пока не работает");

        this.UpTypeEdit_Value = this.props.tmc.ЕдИзм;
        if (this.UpTypeEdit_Value == "")
            this.UpTypeEdit_Value = this.props.tmc.ЕдИзм2;

        this.KolEdit_Value = this.props.barcodeKol;
        this.kolInBox = this.props.barcodeKol;

        this.ДатаВыпуска_Changed();

        this.partList = await _wms_android_РАЗГР_список_партий_по_договору(this.props.task.ДоговорКлюч, this.props.tmc.Ключ);
        if (this.partList.length > 0) {
            this.selectedPartId = 0;
            PlaySound.выберите_партию();
        }
        else {
            this.selectedPartId = -1;
            PlaySound.новая_партия();
        }

        this.осталосьПринятьКоличество = (await _wms_android_РАЗГР_осталось_принять_ТМЦ(this.props.task.Ключ, this.props.task.ДоговорКлюч, this.props.tmc.Ключ)).Количество;
        this.осталосьПринятьУпаковки = (await _wms_android_Партия_штуки_в_упаковки(this.props.tmc.Ключ, 0, this.осталосьПринятьКоличество)).Упаковки;
        this.forceUpdate();

    }

    onTovarsGridReady = (params: any) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        setTimeout(this.loadGridData.bind(this), 1)
    };

    async loadGridData() {
        if (!this.gridApi)
            return;

        if (this.partList.length > 0) {
            this.selectedPartId = this.partList[0].Ключ;
        }
        this.gridApi.setRowData(this.partList);

        this.gridApi.sizeColumnsToFit();
        this.gridApi.resetRowHeights();
        this.forceUpdate();
    }

    onGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_РАЗГР_список_партий_по_договору = e.data;
        this.selectedPartId = row.Ключ;
        //this.gridApi.refreshCells({ force: true });
        this.gridApi.redrawRows();
        this.gridApi.ref
        //console.log(row);
        this.forceUpdate();
    }

    ДатаВыпуска_Changed() {
        if (this.props.tmc.СрокГодностиДни > 0) {
            this.СрокРеализ = moment(this.ДатаВыпуска).add(this.props.tmc.СрокГодностиДни, "days")
        }
        else if (this.props.tmc.СрокГодностиМес > 0) {
            this.СрокРеализ = moment(this.ДатаВыпуска).add(this.props.tmc.СрокГодностиМес, "months")
        }

    }

    СрокРеализ_Changed() {
        if (this.props.tmc.СрокГодностиДни > 0) {
            this.ДатаВыпуска = moment(this.СрокРеализ).add(-this.props.tmc.СрокГодностиДни, "days")
        }
        else if (this.props.tmc.СрокГодностиМес > 0) {
            this.ДатаВыпуска = moment(this.СрокРеализ).add(-this.props.tmc.СрокГодностиМес, "months")
        }

    }

    KolEditChanged() {
        // if (this.info.bSimpleWeight == 1) {
        //     if (this.info.InBox > 0)
        //         this.info.MestEdit_Value = Math.trunc(this.info.KolEdit_Value / this.info.InBox);

        //     this.info.ClearEdit_Value = this.info.KolEdit_Value - this.info.MestEdit_Value * this.info.cBoxWeight;

        //     if (this.info.ClearEdit_Value < 0)
        //         this.info.ClearEdit_Value = 0;
        // }
        // else {
        //     if (this.info.InBox > 0 && this.info.bSimpleWeight == 0)
        //         this.info.MestEdit_Value = Math.trunc(this.info.KolEdit_Value / this.info.InBox);
        // }

    }

    MestEditChanged() {
        // if (this.info.bSimpleWeight == 1) {
        //     this.info.ClearEdit_Value = this.info.KolEdit_Value - this.info.cBoxWeight * this.info.MestEdit_Value;
        //     if (this.info.ClearEdit_Value < 0)
        //         this.info.ClearEdit_Value = 0;
        // }
        // else {
        //     this.info.KolEdit_Value = this.info.MestEdit_Value * this.info.InBox;
        // }
    }

    checkError() {
        this.kol_error = "";
        // //MestEdit.DoChangeValue;
        // //KolEdit.DoChangeValue;
        if (this.KolEdit_Value <= 0) {
            this.kol_error = "неверное количество";
        }

        this.part_error = "";
        // //MestEdit.DoChangeValue;
        // //KolEdit.DoChangeValue;
        if (this.СрокРеализ.diff(moment().startOf("day"), "days") < 0) {
            this.part_error = "товар просрочен";
        }
        if (moment().startOf("day").diff(this.ДатаВыпуска, "days") < 0) {
            this.part_error = "неверная дата выпуска";
        }

        // if (this.info.ShtH == 0 && this.info.PlaceID > 0) {
        //     if (this.info.InUp > 0 && this.info.KolEdit_Value % this.info.InUp > 0) {
        //         if (this.info.DopF == 1 && this.info.InUp2 > 0) {
        //             if (this.info.KolEdit_Value % this.info.InUp2 > 0) {
        //                 this.error = 'Количество д.б. кратным ' + this.info.InUp2;
        //                 return;
        //             }
        //             else
        //                 return;

        //         }
        //         this.error = 'Количество д.б. кратным ' + this.info.InUp;
        //         return;
        //     }

        // }
    }


    async ok() {

        if (this.selectedPartId == -1) {
            this.selectedPartId = (await _wms_android_РАЗГР_создать_партию(this.props.task.ДоговорКлюч, this.props.tmc.Ключ, this.ДатаВыпуска, this.СрокРеализ, 0)).Партия;
        }
        appState.setModalResult<I_РАЗГР_запрос_партии_и_количества_Result>({ result: "Ok", selectedPartId: this.selectedPartId, selectedKol: this.KolEdit_Value });

    }

    render(): React.ReactNode {

        this.checkError();
        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };

        let kol_disabled: boolean = !(this.props.task.РучнойВводКоличества || this.props.tmc.ТипТовара.toUpperCase() == "МЕРНЫЙ");

        let items = this.props.tmc.СписокУпаковок.split("\r").map((item: string, index: number) => <option key={index} value={item}>{item}</option>);
        let тип_упак = (
            <tr>
                <td style={labelStyle}>тип уп.</td>
                <td style={textStyle}>
                    <select
                        disabled={kol_disabled}
                        className="form-control form-control"
                        name="select3"
                        value={this.UpTypeEdit_Value}
                        onChange={async (event: any) => {
                            console.log(event.target.value); //await appState.сохранить_настройки_ТСД("zoom", Number.parseFloat(event.target.value)); 
                            this.forceUpdate();
                        }}
                    >
                        {items}
                    </select>
                </td>
            </tr>
        )
        if (this.props.tmc.КолВУпак <= 1)
            тип_упак = null;

        let упак = (
            <tr>
                <td style={labelStyle}>упаковок</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <BuhtaButton
                            outline
                            color="warning"
                            style={{ borderRadius: "1rem", marginRight: 3, borderColor: "#ffc10747" }}
                            onClick={() => { this.MestEdit_Value--; this.MestEditChanged(); this.forceUpdate() }}
                            disabled={kol_disabled}

                        >
                            <i className="fa fa-minus"></i>
                        </BuhtaButton>
                        <input
                            required
                            type="number"
                            className="form-control"
                            style={{ width: 60, display: "inline", color: this.kol_error == "" ? "#ffc107" : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.MestEdit_Value}
                            onChange={(event) => { this.MestEdit_Value = Number.parseFloat(event.target.value); this.MestEditChanged(); this.forceUpdate() }}
                            disabled={kol_disabled}

                        >
                        </input>
                        <BuhtaButton
                            outline
                            color="warning"
                            style={{ borderRadius: "1rem", marginLeft: 3, borderColor: "#ffc10747" }}
                            onClick={() => { this.MestEdit_Value++; this.MestEditChanged(); this.forceUpdate() }}
                            disabled={kol_disabled}
                        >
                            <i className="fa fa-plus"></i>
                        </BuhtaButton>
                        <span style={{ marginLeft: 3 }}> {this.BoxLabel_Caption}</span>
                    </div>
                </td>
            </tr>
        )
        if (this.props.tmc.КолВУпак <= 1)
            упак = null;

        //KolEdit.Enabled := Param.Values('Разрешить ручной ввод количества') or AnsiSameText(Param.Values('ТипТовара'), 'Мерный');

        let кол = (
            <tr>
                <td style={labelStyle}>единиц</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <BuhtaButton
                            outline
                            color="success"
                            style={{ borderRadius: "1rem", marginRight: 3, borderColor: "#4dbd743d" }}
                            onClick={() => { this.KolEdit_Value--; this.KolEditChanged(); this.forceUpdate() }}
                            disabled={kol_disabled}

                        >
                            <i className="fa fa-minus"></i>
                        </BuhtaButton>
                        <input
                            disabled={kol_disabled}
                            required
                            type="number"
                            className="form-control"
                            style={{ width: 60, display: "inline", color: this.kol_error == "" ? "#4dbd74" : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.KolEdit_Value}
                            onChange={(event) => { this.KolEdit_Value = Number.parseFloat(event.target.value); this.KolEditChanged(); this.forceUpdate() }}

                        >

                        </input>
                        <BuhtaButton
                            disabled={kol_disabled}
                            outline
                            color="success"
                            style={{ borderRadius: "1rem", marginLeft: 3, borderColor: "#4dbd743d" }}
                            onClick={() => { this.KolEdit_Value++; this.KolEditChanged(); this.forceUpdate() }}
                        >
                            <i className="fa fa-plus"></i>
                        </BuhtaButton>
                        <span style={{ marginLeft: 3 }}> {this.props.tmc.ЕдИзм}</span>


                    </div>
                </td>
            </tr >
        )


        let срокДн: any;
        if (this.props.tmc.СрокГодностиДни > 0)
            срокДн = (
                <tr>
                    <td colSpan={2} style={{ ...textStyle, color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>срок годности {this.props.tmc.СрокГодностиДни} дн.</td>
                </tr >
            )
        if (this.props.tmc.СрокГодностиМес > 0)
            срокДн = (
                <tr>
                    <td colSpan={2} style={{ ...textStyle, color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>срок годности {this.props.tmc.СрокГодностиМес} мес.</td>
                </tr >
            )

        let датаВыпуска = (
            <tr>
                <td style={labelStyle}>дата выпуска</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <input
                            required
                            type="date"
                            className="form-control cy-production-date"
                            style={{ width: 150, display: "inline", color: this.part_error == "" ? ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.ДатаВыпуска.format("YYYY-MM-DD")}
                            onChange={(event) => { this.ДатаВыпуска = moment(event.target.valueAsDate); this.ДатаВыпуска_Changed(); this.forceUpdate() }}
                        >
                        </input>
                    </div>
                </td>
            </tr >
        )

        let срокРеализ = (
            <tr>
                <td style={labelStyle}>срок реализ.</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <input
                            required
                            type="date"
                            className="form-control cy-realize-date"
                            style={{ width: 150, display: "inline", color: this.part_error == "" ? ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.СрокРеализ.format("YYYY-MM-DD")}
                            onChange={(event) => { this.СрокРеализ = moment(event.target.valueAsDate); this.СрокРеализ_Changed(); this.forceUpdate() }}
                        >
                        </input>
                    </div>
                </td>
            </tr >
        )

        let title = "Выбор партии";
        if (this.partList.length == 0)
            title = "Новая партия";

        let kol_error: any = null;
        if (this.kol_error != "")
            kol_error = <div style={{ color: "red", textAlign: "center", marginBottom: 5 }} >{this.kol_error}</div>

        let part_error: any = null;
        if (this.part_error != "")
            part_error = <div style={{ color: "red", textAlign: "center", marginBottom: 5 }} >{this.part_error}</div>

        let осталосьПринять = <div style={{ textAlign: "center", marginBottom: 5 }}>Осталось принять {this.осталосьПринятьУпаковки}</div>;
        if (this.осталосьПринятьКоличество == 0) {
            осталосьПринять = <div style={{ textAlign: "center", marginBottom: 5, color: "red", fontWeight: "bold" }}>Весь товар принят</div>;
        }
        else if (this.осталосьПринятьКоличество < 0) {
            осталосьПринять = <div style={{ textAlign: "center", marginBottom: 5, color: "red", fontWeight: "bold" }}>Принято больше на {this.осталосьПринятьУпаковки.replace("-", "")}</div>;
        }


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>{title}</div>
                        {/* <div style={{ color: ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, textAlign: "left", fontSize: 11 }}>
                            {this.partList[0] ? this.partList[0].НазваниеПаллеты : ""}
                        </div> */}
                        <div style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, textAlign: "left", fontSize: 11 }}>
                            {this.props.tmc.НомерНазвание}
                        </div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: 340, }}>
                        <div className="card-body" style={{ zoom: appState.zoom, padding: 5 }}>

                            <div className="ag-theme-balham" style={{ fontSize: 11, height: 120, width: "100%", marginBottom: 5, display: this.partList.length > 0 ? "block" : "none" }}>
                                <AgGridReact
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    rowHeight={28}
                                    onRowClicked={this.onGridRowClicked.bind(this)}
                                    headerHeight={24}
                                >
                                    <AgGridColumn
                                        headerName="Выберите партию из списка"
                                        field="Партия"
                                        cellStyle={(param: any) => {
                                            let row = param.data as IResult_wms_android_РАЗГР_список_партий_по_договору;
                                            if (row.Ключ != this.selectedPartId) {
                                                return { color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, whiteSpace: "normal" }
                                            }
                                            else {
                                                return { fontWeight: "bold", color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, whiteSpace: "normal" }
                                            }
                                        }}
                                    >
                                    </AgGridColumn>

                                </AgGridReact>
                            </div>

                            {осталосьПринять}

                            <table style={{ marginBottom: 5 }}>
                                <tbody>
                                    {тип_упак}
                                    {упак}
                                    {кол}
                                </tbody>
                            </table>
                            {kol_error}

                            <div style={{ width: "100%", marginBottom: 5, marginTop: 5, display: this.partList.length == 0 ? "block" : "none" }}>
                                <div style={{ textAlign: "center" }}>Создание новой партии</div>
                                <table>
                                    <tbody>
                                        {срокДн}
                                        {датаВыпуска}
                                        {срокРеализ}
                                    </tbody>
                                </table>

                            </div>
                            {part_error}
                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="primary"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.selectedPartId == 0 || this.kol_error != "" || this.part_error != ""}
                                onClick={this.ok.bind(this)}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_запрос_партии_и_количества_Result>({ result: "Cancel", selectedPartId: 0, selectedKol: 0 });
                                }}>
                                Отмена
                            </BuhtaButton>
                        </div>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }


}