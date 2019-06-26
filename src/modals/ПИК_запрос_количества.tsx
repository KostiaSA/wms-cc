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
import { IResult_wms_android_ПИК_обработка_шк_товара, IResult_wms_android_ПИК_запрос_количества_info, _wms_android_ПИК_запрос_количества_info } from "../generated-api";
import { ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ } from "../const";
import { PlaySound } from '../sounds/PlaySound';



export interface I_ПИК_запрос_количества_PageProps extends IAppPageProps, IResult_wms_android_ПИК_обработка_шк_товара {
    taskId: number
}

export interface I_ПИК_запрос_количества_Result {
    result: "Ok" | "Cancel";
    newKol: number;
}

export async function get_ПИК_запрос_количества(param: I_ПИК_запрос_количества_PageProps): Promise<I_ПИК_запрос_количества_Result> {
    appState.modalResult = undefined;
    appState.openModal(ПИК_запрос_количества_Page, { pageId: getRandomString(), ...param });
    return new Promise<I_ПИК_запрос_количества_Result>(
        async (resolve: (res: I_ПИК_запрос_количества_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class ПИК_запрос_количества_Page extends React.Component<I_ПИК_запрос_количества_PageProps, any> {

    constructor(props: I_ПИК_запрос_количества_PageProps, context: any) {
        super(props, context);
    }

    info: IResult_wms_android_ПИК_запрос_количества_info;
    error: string = "";

    async componentDidMount() {
        PlaySound.введите_количество();

        this.info = await _wms_android_ПИК_запрос_количества_info(
            this.props.taskId,
            0, // Kol_overflow
            this.props.запрос_количества_NewKol,
            this.props.запрос_количества_TMCID,
            this.props.запрос_количества_PartID,
            this.props.запрос_количества_Ввод_количества_в_раскладке,
            this.props.запрос_количества_ВсегоКоличество,
            this.props.запрос_количества_MaxKol,
            this.props.запрос_количества_ЯчейкаОткуда,
        );
        console.log(this.info)
        this.forceUpdate();

    };


    render(): React.ReactNode {
        if (!this.info)
            return null;

        this.checkError();

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };

        let items = this.info.UpTypeEdit_ComboItems_Text.split("\r").map((item: string, index: number) => <option key={index} value={item}>{item}</option>);
        let тип_упак = (
            <tr>
                <td style={labelStyle}>тип уп.</td>
                <td style={textStyle}>
                    <select
                        className="form-control form-control"
                        name="select3"
                        value={this.info.UpTypeEdit_Value}
                        onChange={async (event: any) => {
                            console.log(event.target.value); //await appState.сохранить_настройки_ТСД("zoom", Number.parseFloat(event.target.value)); 
                            this.forceUpdate();
                        }}
                    >
                        {items}
                        {/* <option value="коробка" selected>коробка</option>
                        <option value="шт">шт</option> */}
                    </select>
                </td>
            </tr>
        )
        if (this.info.MestPanel_Visible == 0 || this.props.запрос_количества_MaxKol < this.info.InBox)
            тип_упак = null;

        let упак = (
            <tr>
                <td style={labelStyle}>упаковок</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <BuhtaButton outline color="warning" style={{ borderRadius: "1rem", marginRight: 3, borderColor: "#ffc10747" }}><i className="fa fa-minus"></i></BuhtaButton>
                        <input
                            required
                            type="number"
                            className="form-control"
                            style={{ width: 60, display: "inline", color: this.error == "" ? "#ffc107" : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.info.MestEdit_Value}
                            onChange={(event) => { this.info.MestEdit_Value = Number.parseFloat(event.target.value); this.forceUpdate() }}
                        >
                        </input>
                        <BuhtaButton outline color="warning" style={{ borderRadius: "1rem", marginLeft: 3, borderColor: "#ffc10747" }}><i className="fa fa-plus"></i></BuhtaButton>
                        <span style={{ marginLeft: 3 }}> {this.info.BoxLabel_Caption}</span>
                    </div>
                </td>
            </tr>
        )
        if (this.info.MestPanel_Visible == 0 || this.props.запрос_количества_MaxKol < this.info.InBox)
            упак = null;

        let кол = (
            <tr>
                <td style={labelStyle}>единиц</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <BuhtaButton
                            outline
                            color="success"
                            style={{ borderRadius: "1rem", marginRight: 3, borderColor: "#4dbd743d" }}
                            onClick={() => { this.info.KolEdit_Value--; this.forceUpdate() }}

                        >
                            <i className="fa fa-minus"></i>
                        </BuhtaButton>
                        <input
                            required
                            type="number"
                            className="form-control"
                            style={{ width: 60, display: "inline", color: this.error == "" ? "#4dbd74" : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.info.KolEdit_Value}
                            onChange={(event) => { this.info.KolEdit_Value = Number.parseFloat(event.target.value); this.forceUpdate() }}
                        >

                        </input>
                        <BuhtaButton
                            outline
                            color="success"
                            style={{ borderRadius: "1rem", marginLeft: 3, borderColor: "#4dbd743d" }}
                            onClick={() => { this.info.KolEdit_Value++; this.forceUpdate() }}
                        >
                            <i className="fa fa-plus"></i>
                        </BuhtaButton>
                        <span style={{ marginLeft: 3 }}> {this.info.UnitLabel_Caption}</span>


                    </div>
                </td>
            </tr >
        )

        let нетто = (
            <tr>
                <td style={labelStyle}>нетто</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <input
                            required
                            type="number"
                            className="form-control"
                            style={{ width: 60, display: "inline", color: this.error == "" ? "#4dbd74" : "red", fontWeight: "bold", textAlign: "center" }}
                            value={this.info.ClearEdit_Value}
                            onChange={(event) => { this.info.ClearEdit_Value = Number.parseFloat(event.target.value); this.forceUpdate() }}
                        >
                        </input>
                        <span style={{ marginLeft: 3 }}> {this.info.UnitLabel_Caption}</span>
                    </div>
                </td>
            </tr >
        )
        if (this.info.ClearPanel_Visible == 0)
            нетто = null;

        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom, color: "gray" }}>Ввод количества</ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom }}>
                        <div className="card-body" style={{ zoom: appState.zoom, padding: 0 }}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td style={labelStyle}>товар</td>
                                        <td style={textStyle}>
                                            <span style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}>{this.props.запрос_количества_НазваниеТовара}</span>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style={labelStyle}>партия</td>
                                        <td style={textStyle}>
                                            <span style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>{this.props.запрос_количества_НазваниеПартии}</span>
                                        </td>
                                    </tr>

                                    {тип_упак}
                                    {упак}
                                    {кол}
                                    {нетто}
                                </tbody>
                            </table>
                            <div style={{ color: "#20a8d8", textAlign: "center", marginTop: 10 }} >{this.info.InTaskLabel_Caption} {this.info.InTaskLabelKol_Caption}</div>
                            <div style={{ color: "gray", fontSize: 9, textAlign: "center", marginTop: 10, display: this.info.TotalPanel_Visible == 0 ? "none" : undefined }} >{this.info.TotalLabel_Caption}</div>
                            <div style={{ color: "red", textAlign: "center", marginTop: 10 }} >{this.error}</div>
                        </div>

                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="success" outline
                                onClick={() => {
                                    this.info.KolEdit_Value = this.props.запрос_количества_MaxKol;
                                    this.forceUpdate();
                                }}>
                                Выбрать все
                            </BuhtaButton>
                            <BuhtaButton color="primary"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.error != ""}
                                onClick={() => {
                                    appState.setModalResult<I_ПИК_запрос_количества_Result>({ result: "Ok", newKol: 0 });
                                }}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_ПИК_запрос_количества_Result>({ result: "Ok", newKol: 0 });
                                }}>
                                Отмена
                            </BuhtaButton>
                        </div>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    checkError() {
        this.error = "";
        //MestEdit.DoChangeValue;
        //KolEdit.DoChangeValue;
        if (this.info.KolEdit_Value <= 0 || (this.info.bSimpleWeight == 1 && this.info.ClearEdit_Value <= 0)) {
            this.error = "неверное количество";
            return;
            //KolEdit.SetFocus;
            //PlaySoundOnPocketPC('Error01');
        }

        if (this.info.bSimpleWeight == 1 && this.info.ClearEdit_Value > this.props.запрос_количества_MaxKol) {
            this.error = 'Нельзя ввести больше ' + this.props.запрос_количества_MaxKol;
            return;
        }

        if (this.info.bSimpleWeight == 0 && this.info.KolEdit_Value > this.props.запрос_количества_MaxKol) {
            this.error = 'Нельзя ввести больше ' + this.props.запрос_количества_MaxKol;
        }

        if (this.info.ShtH == 0 && this.info.PlaceID > 0) {
            if (this.info.InUp > 0 && this.info.KolEdit_Value % this.info.InUp > 0) {
                if (this.info.DopF == 1 && this.info.InUp2 > 0) {
                    if (this.info.KolEdit_Value % this.info.InUp2 > 0) {
                        this.error = 'Количество д.б. кратным ' + this.info.InUp2;
                        return;
                    }
                    else
                        return;

                }
                this.error = 'Количество д.б. кратным ' + this.info.InUp;
                return;
            }

        }
    }
}