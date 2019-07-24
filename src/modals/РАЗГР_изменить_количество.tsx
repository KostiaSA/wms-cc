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
import { IResult_wms_android_ТМЦ_инфо, IResult_wms_android_Информация_о_задании, IResult_wms_android_РАЗГР_список_партий_по_договору, _wms_android_РАЗГР_список_партий_по_договору, _wms_android_Партия_штуки_в_упаковки, _wms_android_РАЗГР_осталось_принять_ТМЦ, _wms_android_РАЗГР_создать_партию, IResult_wms_android_РАЗГР_Список_товара_на_паллете, _wms_android_ТМЦ_инфо, IResult_wms_android_Партия_ТМЦ_инфо, _wms_android_Партия_ТМЦ_инфо, _wms_android_РАЗГР_изменить_количество, IResult_wms_android_Паллета_инфо } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import moment from "moment";
import { Moment } from 'moment';



export interface I_РАЗГР_изменить_количество_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
    row: IResult_wms_android_РАЗГР_Список_товара_на_паллете;
    pallete: IResult_wms_android_Паллета_инфо;
}

export interface I_РАЗГР_изменить_количество_Result {
    result: "Ok" | "Cancel";
}

export async function get_РАЗГР_изменить_количество(
    task: IResult_wms_android_Информация_о_задании,
    row: IResult_wms_android_РАЗГР_Список_товара_на_паллете,
    pallete: IResult_wms_android_Паллета_инфо
): Promise<I_РАЗГР_изменить_количество_Result> {

    appState.modalResult = undefined;
    appState.openModal(РАЗГР_изменить_количество_Page, { pageId: getRandomString(), task, row, pallete });
    return new Promise<I_РАЗГР_изменить_количество_Result>(
        async (resolve: (res: I_РАЗГР_изменить_количество_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class РАЗГР_изменить_количество_Page extends React.Component<I_РАЗГР_изменить_количество_PageProps, any> {

    constructor(props: I_РАЗГР_изменить_количество_PageProps, context: any) {
        super(props, context);
    }

    kolInBox: number = 0;
    UpTypeEdit_Value: string = "";
    MestEdit_Value: number = 0;
    KolEdit_Value: number = 0;
    BoxLabel_Caption: string = "";
    осталосьПринятьКоличество: number = 0;
    осталосьПринятьУпаковки: string = "";


    kol_error: string = "";
    tmc: IResult_wms_android_ТМЦ_инфо;
    part: IResult_wms_android_Партия_ТМЦ_инфо;
    async componentDidMount() {

        this.tmc = await _wms_android_ТМЦ_инфо(this.props.row.TMCKey);
        if (this.props.row.PartKey > 0) {
            this.part = await _wms_android_Партия_ТМЦ_инфо(this.props.row.PartKey);
        }

        if (this.tmc.Весовой)
            throw new Error("Весовой товар пока не работает");

        this.UpTypeEdit_Value = this.tmc.ЕдИзм;
        if (this.UpTypeEdit_Value == "")
            this.UpTypeEdit_Value = this.tmc.ЕдИзм2;

        this.KolEdit_Value = this.props.row.Кол;
        this.kolInBox = this.tmc.КолВУпак;

        this.KolEditChanged();

        // this.осталосьПринятьКоличество = (await _wms_android_РАЗГР_осталось_принять_ТМЦ(this.props.task.Ключ, this.props.task.ДоговорКлюч, this.tmc.Ключ)).Количество;
        // this.осталосьПринятьУпаковки = (await _wms_android_Партия_штуки_в_упаковки(this.tmc.Ключ, 0, this.осталосьПринятьКоличество)).Упаковки;
        this.forceUpdate();

    }


    KolEditChanged() {
        if (this.tmc.КолВУпак > 0)
            this.MestEdit_Value = Math.trunc(this.KolEdit_Value / this.tmc.КолВУпак);
    }

    MestEditChanged() {
        this.KolEdit_Value = this.MestEdit_Value * this.tmc.КолВУпак;
    }

    checkError() {
        this.kol_error = "";
        if (this.KolEdit_Value < 0) {
            this.kol_error = "неверное количество";
        }
    }


    async ok() {
        let res = await _wms_android_РАЗГР_изменить_количество(
            this.props.task.Ключ,
            this.tmc.Ключ,
            this.props.pallete.Ключ,
            this.part.Ключ,
            this.props.task.КлиентКлюч,
            appState.kadrId,
            this.props.row.Кол,
            this.KolEdit_Value
        );
        if (res.error) {

        }


        appState.setModalResult<I_РАЗГР_изменить_количество_Result>({ result: "Ok" });

    }

    render(): React.ReactNode {
        if (!this.tmc)
            return null;

        this.checkError();

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };

        let kol_disabled: boolean = !(this.props.task.РучнойВводКоличества || this.tmc.ТипТовара.toUpperCase() == "МЕРНЫЙ");

        let items = this.tmc.СписокУпаковок.split("\r").map((item: string, index: number) => <option key={index} value={item}>{item}</option>);
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
        if (this.tmc.КолВУпак <= 1)
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
                            className="form-control cy-upak"
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
        if (this.tmc.КолВУпак <= 1)
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
                            className="form-control cy-kol"
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
                        <span style={{ marginLeft: 3 }}> {this.tmc.ЕдИзм}</span>


                    </div>
                </td>
            </tr >
        )



        let title = "Изменение количества";

        let kol_error: any = null;
        if (this.kol_error != "")
            kol_error = <div style={{ color: "red", textAlign: "center", marginBottom: 5 }} >{this.kol_error}</div>


        let осталосьПринять = <div style={{ textAlign: "center", marginBottom: 5 }}>Осталось принять {this.осталосьПринятьУпаковки}</div>;
        if (this.осталосьПринятьКоличество == 0) {
            осталосьПринять = <div style={{ textAlign: "center", marginBottom: 5, color: "red", fontWeight: "bold" }}>Весь товар принят</div>;
        }
        else if (this.осталосьПринятьКоличество < 0) {
            осталосьПринять = <div style={{ textAlign: "center", marginBottom: 5, color: "red", fontWeight: "bold" }}>Принято больше на <span style={{ whiteSpace: "nowrap" }}>{this.осталосьПринятьУпаковки.replace("-", "")}</span></div>;
        }


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window cy-razgr-get-part-kol" : "")} isOpen fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}>{title}</div>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, textAlign: "left", fontSize: 11 }}>
                            {this.tmc.НомерНазвание}
                        </div>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, textAlign: "left", fontSize: 11 }}>
                            {this.part ? this.part.НомерНазвание : ""}
                        </div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0 }}>
                        <div className="card-body" style={{ padding: 5 }}>

                            {/*осталосьПринять*/}

                            <table style={{ marginBottom: 5 }}>
                                <tbody>
                                    {/* {тип_упак} */}
                                    {упак}
                                    {кол}
                                </tbody>
                            </table>
                            {kol_error}

                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton
                                outline
                                style={{ minWidth: 45, marginLeft: 5 }}
                                disabled={this.KolEdit_Value == 0}
                                onClick={() => {
                                    this.KolEdit_Value = 0;
                                    this.KolEditChanged();
                                    this.forceUpdate();
                                }}>
                                Очистить
                            </BuhtaButton>
                            <BuhtaButton color="primary"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.KolEdit_Value == this.props.row.Кол || this.kol_error != ""}
                                onClick={this.ok.bind(this)}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_изменить_количество_Result>({ result: "Cancel" });
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