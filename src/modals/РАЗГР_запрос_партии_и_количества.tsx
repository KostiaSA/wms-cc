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
import { IResult_wms_android_ПИК_список_партий_на_паллете, _wms_android_ПИК_список_партий_на_паллете, IResult_wms_android_ТМЦ_инфо, IResult_wms_android_Информация_о_задании, IResult_wms_android_РАЗГР_список_партий_по_договору, _wms_android_РАЗГР_список_партий_по_договору } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import moment from "moment";



export interface I_РАЗГР_запрос_партии_и_количества_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
    tmc: IResult_wms_android_ТМЦ_инфо;
    barcodeKol: number;
}

export interface I_РАЗГР_запрос_партии_и_количества_Result {
    result: "Ok" | "Cancel";
    selectedPartId: number;
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
    UnitLabel_Caption: string = "";

    СрокРеализДнEdit_Value: number = 0;
    ДатаВыпукаEdit_Value: Date = new Date();
    СрокРеализEdit_Value: Date = new Date();

    kol_error: string = "";
    part_error: string = "";

    async componentDidMount() {
        PlaySound.выберите_партию();
        this.UpTypeEdit_Value = this.props.tmc.ЕдИзм;
        if (this.UpTypeEdit_Value == "")
            this.UpTypeEdit_Value = this.props.tmc.ЕдИзм2;

        this.KolEdit_Value = this.props.barcodeKol;
        this.kolInBox = this.props.barcodeKol;

        this.partList = await _wms_android_РАЗГР_список_партий_по_договору(this.props.task.Ключ, this.props.tmc.Ключ);
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

        //this.data = await _wms_android_ПИК_список_партий_на_паллете(this.props.palleteId, this.props.tmcId, this.props.taskId);
        this.gridApi.setRowData(this.partList);
        this.gridApi.sizeColumnsToFit();
        this.gridApi.resetRowHeights();
        this.forceUpdate();
    }

    onGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_ПИК_список_партий_на_паллете = e.data;
        this.selectedPartId = row.PartKey;
        console.log(row);
        this.forceUpdate();
    }

    СрокРеализДн_Changed() {

    }

    ДатаВыпука_Changed() {

    }

    СрокРеализ_Changed() {

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
        // this.error = "";
        // //MestEdit.DoChangeValue;
        // //KolEdit.DoChangeValue;
        // if (this.info.KolEdit_Value <= 0 || (this.info.bSimpleWeight == 1 && this.info.ClearEdit_Value <= 0)) {
        //     this.error = "неверное количество";
        //     return;
        //     //KolEdit.SetFocus;
        //     //PlaySoundOnPocketPC('Error01');
        // }

        // if (this.info.bSimpleWeight == 1 && this.info.ClearEdit_Value > this.props.запрос_количества_MaxKol) {
        //     this.error = 'Нельзя ввести больше ' + this.props.запрос_количества_MaxKol;
        //     return;
        // }

        // if (this.info.bSimpleWeight == 0 && this.info.KolEdit_Value > this.props.запрос_количества_MaxKol) {
        //     this.error = 'Нельзя ввести больше ' + this.props.запрос_количества_MaxKol;
        // }

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


    render(): React.ReactNode {

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
        //if (this.info.MestPanel_Visible == 0 || this.props.запрос_количества_MaxKol < this.info.InBox)
        //  тип_упак = null;

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
        // if (this.info.MestPanel_Visible == 0 || this.props.запрос_количества_MaxKol < this.info.InBox)
        //     упак = null;

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
                        <span style={{ marginLeft: 3 }}> {this.UnitLabel_Caption}</span>


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
                            className="form-control"
                            style={{ width: 150, display: "inline", color: this.part_error == "" ? ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ : "red", fontWeight: "bold", textAlign: "center" }}
                            value={moment(this.ДатаВыпукаEdit_Value).format("YYYY-MM-DD")}
                            onChange={(event) => { this.ДатаВыпукаEdit_Value = event.target.valueAsDate; this.ДатаВыпука_Changed(); this.forceUpdate() }}
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
                            className="form-control"
                            style={{ width: 150, display: "inline", color: this.part_error == "" ? ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ : "red", fontWeight: "bold", textAlign: "center" }}
                            value={moment(this.СрокРеализEdit_Value).format("YYYY-MM-DD")}
                            onChange={(event) => { this.СрокРеализEdit_Value = event.target.valueAsDate; this.ДатаВыпука_Changed(); this.forceUpdate() }}
                        >
                        </input>
                    </div>
                </td>
            </tr >
        )

        let title = "Выбор партии";
        if (this.partList.length == 0)
            title = "Новая партия";

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

                            <div className="ag-theme-balham" style={{ height: 140, width: "100%", marginBottom: 5, display: this.partList.length > 0 ? "block" : "none" }}>
                                <AgGridReact
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    rowHeight={40}
                                    onRowClicked={this.onGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Партия"
                                        field="Партия"
                                        cellStyle={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, whiteSpace: "normal" }}
                                    >
                                    </AgGridColumn>
                                    <AgGridColumn headerName="Кол-во" field="Кол_во" width={100} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}></AgGridColumn>

                                </AgGridReact>
                            </div>

                            <table style={{ marginBottom: 5 }}>
                                <tbody>
                                    {тип_упак}
                                    {упак}
                                    {кол}
                                </tbody>
                            </table>

                            <div style={{ width: "100%", marginBottom: 5, display: this.partList.length == 0 ? "block" : "none" }}>
                                <div style={{ textAlign: "center" }}>Создание новой партии</div>
                                <table>
                                    <tbody>
                                        {срокДн}
                                        {датаВыпуска}
                                        {срокРеализ}
                                    </tbody>
                                </table>

                            </div>
                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="primary"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.selectedPartId == 0}
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_запрос_партии_и_количества_Result>({ result: "Ok", selectedPartId: this.selectedPartId });
                                }}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_запрос_партии_и_количества_Result>({ result: "Cancel", selectedPartId: 0 });
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