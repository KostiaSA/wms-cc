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
import { IResult_wms_android_ТМЦ_инфо, IResult_wms_android_Информация_о_задании, IResult_wms_android_РАЗГР_список_партий_по_договору, _wms_android_РАЗГР_список_партий_по_договору, _wms_android_Партия_штуки_в_упаковки, _wms_android_РАЗГР_осталось_принять_ТМЦ, _wms_android_РАЗГР_создать_партию, IResult_wms_android_Паллета_инфо } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import moment from "moment";
import { Moment } from 'moment';
import { zebraTextToSpeech } from "../zebra/ZebraApi";



export interface I_РАЗГР_запрос_габаритов_паллеты_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
    pallete: IResult_wms_android_Паллета_инфо;
}

export interface I_РАЗГР_запрос_габаритов_паллеты_Result {
    result: "Ok" | "Cancel";
}

export async function get_РАЗГР_запрос_габаритов_паллеты(
    task: IResult_wms_android_Информация_о_задании,
    pallete: IResult_wms_android_Паллета_инфо
): Promise<I_РАЗГР_запрос_габаритов_паллеты_Result> {

    appState.modalResult = undefined;
    appState.openModal(РАЗГР_запрос_габаритов_паллеты_Page, { pageId: getRandomString(), task, pallete });
    return new Promise<I_РАЗГР_запрос_габаритов_паллеты_Result>(
        async (resolve: (res: I_РАЗГР_запрос_габаритов_паллеты_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class РАЗГР_запрос_габаритов_паллеты_Page extends React.Component<I_РАЗГР_запрос_габаритов_паллеты_PageProps, any> {

    constructor(props: I_РАЗГР_запрос_габаритов_паллеты_PageProps, context: any) {
        super(props, context);
    }

    partList: IResult_wms_android_РАЗГР_список_партий_по_договору[] = [];
    gridApi: any;
    gridColumnApi: any;
    selectedPartId: number = 0;

    kolInBox: number = 0;
    UpTypeEdit_Value: string = "";
    MestEdit_Value: number = 0;
    ширина: number = 0;
    BoxLabel_Caption: string = "";
    осталосьПринятьКоличество: number = 0;
    осталосьПринятьУпаковки: string = "";

    //СрокРеализДнEdit_Value: number = 0;
    ДатаВыпуска: Moment = moment().startOf("day");
    СрокРеализ: Moment = moment().startOf("day");

    ширина_error: string = "";
    all_errors: string = "";

    async componentDidMount() {

        zebraTextToSpeech("завершение задания");
        //this.KolEditChanged();
        //this.ДатаВыпуска_Changed();

        //this.forceUpdate();

    }



    checkError() {
        this.ширина_error = "";
        // //MestEdit.DoChangeValue;
        // //KolEdit.DoChangeValue;
        if (this.ширина <= 0.01) {
            this.ширина_error = "ширина меньше 0.01 m";
        }
        if (this.ширина > 3) {
            this.ширина_error = "ширина больше 3 m";
        }

        this.all_errors = [
            this.ширина_error,
        ].join(", ");
    }


    async ok() {

        // if (this.selectedPartId == -1) {
        //     this.selectedPartId = (await _wms_android_РАЗГР_создать_партию(this.props.task.ДоговорКлюч, this.props.tmc.Ключ, this.ДатаВыпуска, this.СрокРеализ, 0)).Партия;
        // }
        appState.setModalResult<I_РАЗГР_запрос_габаритов_паллеты_Result>({ result: "Ok" });

    }

    render(): React.ReactNode {

        this.checkError();

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };

        // let items = this.props.tmc.СписокУпаковок.split("\r").map((item: string, index: number) => <option key={index} value={item}>{item}</option>);
        // let тип_упак = (
        //     <tr>
        //         <td style={labelStyle}>тип уп.</td>
        //         <td style={textStyle}>
        //             <select
        //                 disabled={kol_disabled}
        //                 className="form-control form-control"
        //                 name="select3"
        //                 value={this.UpTypeEdit_Value}
        //                 onChange={async (event: any) => {
        //                     console.log(event.target.value); //await appState.сохранить_настройки_ТСД("zoom", Number.parseFloat(event.target.value)); 
        //                     this.forceUpdate();
        //                 }}
        //             >
        //                 {items}
        //             </select>
        //         </td>
        //     </tr>
        // )
        // if (this.props.tmc.КолВУпак <= 1)
        //     тип_упак = null;


        let ширина: ReactNode = (
            <tr>
                <td style={labelStyle}>ширина</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <input
                            required
                            type="number"
                            className="form-control cy-shirina"
                            style={{ width: 80, display: "inline" }}
                            value={this.ширина}
                            onChange={(event) => {
                                this.ширина = Number.parseFloat(event.target.value);
                                this.checkError();
                                this.forceUpdate();
                            }}

                        >

                        </input>
                        <span style={{ marginLeft: 3 }}> м</span>
                    </div>
                </td>
                <td style={{ color: "red", maxWidth: 100, paddingLeft: 5 }}>
                    {this.ширина_error}
                </td>
            </tr >
        )




        let kol_error: any = null;
        if (this.ширина_error != "")
            kol_error = <div style={{ color: "red", textAlign: "center", marginBottom: 5 }} >{this.ширина_error}</div>


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(this.props.visible ? "active-win" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>Завершение паллеты {this.props.pallete.Название}</div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: 340, }}>
                        <div className="card-body" style={{ padding: 5 }}>

                            <table style={{ marginBottom: 5 }}>
                                <tbody>
                                    {ширина}
                                </tbody>
                            </table>
                            {kol_error}

                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="primary"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.selectedPartId == 0 || this.ширина_error != "" || this.all_errors != ""}
                                onClick={this.ok.bind(this)}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_запрос_габаритов_паллеты_Result>({ result: "Cancel" });
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