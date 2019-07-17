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



export interface I_Запрос_штрих_кода_PageProps extends IAppPageProps {
}

export interface I_Запрос_штрих_кода_Result {
    result: "Ok" | "Cancel";
    barcode: string;
}

export async function get_Запрос_штрих_кода(): Promise<I_Запрос_штрих_кода_Result> {

    appState.modalResult = undefined;
    appState.openModal(Запрос_штрих_кода_Page, { pageId: getRandomString() });
    return new Promise<I_Запрос_штрих_кода_Result>(
        async (resolve: (res: I_Запрос_штрих_кода_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class Запрос_штрих_кода_Page extends React.Component<I_Запрос_штрих_кода_PageProps, any> {

    constructor(props: I_Запрос_штрих_кода_PageProps, context: any) {
        super(props, context);
    }

    barcode: string = "";
    alphaMode: boolean;
    pattern: string = `\d`;
    mode: "" | "PAL" | "CEL" | "PAR" | "BRA" | "ZAK" | "T" = "";

    async componentDidMount() {

    }

    async ok() {
        appState.pushTestBarcode(this.mode + this.barcode, "");
        appState.setModalResult<I_Запрос_штрих_кода_Result>({ result: "Ok", barcode: this.mode + this.barcode });
    }

    render(): React.ReactNode {

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };

        // let кол = (
        //     <tr>
        //         <td style={labelStyle}>штрих-код</td>
        //         <td style={textStyle}>
        //             <div className="input-groupx">
        //             </div>
        //         </td>
        //     </tr >
        // )



        return (
            //<div className={"app " + (this.props.visible ? "active-win" : "")} style={{ display: this.props.visible ? "" : "none" }}>
            <Modal className={(this.props.visible ? "active-win" : "")} isOpen centered={false} fade={false}>
                <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                    <div style={{ color: "steelblue" }}>Введите штрих-код</div>
                </ModalHeader>
                <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: 110, }}>
                    <div className="card-body" style={{ padding: 15, textAlign: "center" }}>
                        <span style={{ fontWeight: "bold" }}>{this.mode + " "}</span>
                        <input
                            required
                            type={this.alphaMode ? "string" : "number"}
                            pattern={this.pattern}
                            className="form-control cy-barcode-input"
                            style={{ width: "80%", display: "inline", fontWeight: "bold" }}
                            value={this.barcode}
                            onChange={(event) => {
                                this.barcode = event.target.value;
                                this.forceUpdate()
                            }}
                        >
                        </input>
                        <div style={{ textAlign: "center", marginTop: 10 }}>
                            <BuhtaButton small outline style={{ marginLeft: 5, minWidth: 38 }} onClick={() => { this.mode = "PAL"; this.forceUpdate() }}>PAL</BuhtaButton>
                            <BuhtaButton small outline style={{ marginLeft: 5, minWidth: 38 }} onClick={() => { this.mode = "CEL"; this.forceUpdate() }}>CEL</BuhtaButton>
                            <BuhtaButton small outline style={{ marginLeft: 5, minWidth: 38 }} onClick={() => { this.mode = "PAR"; this.forceUpdate() }}>PAR</BuhtaButton>
                            <BuhtaButton small outline style={{ marginLeft: 5, minWidth: 38 }} onClick={() => { this.mode = "BRA"; this.forceUpdate() }}>BRA</BuhtaButton>
                            <BuhtaButton small outline style={{ marginLeft: 5, minWidth: 38 }} onClick={() => { this.mode = "ZAK"; this.forceUpdate() }}>ZAK</BuhtaButton>
                            <BuhtaButton small outline style={{ marginLeft: 5, minWidth: 38 }} onClick={() => { this.mode = "T"; this.forceUpdate() }}>T</BuhtaButton>

                        </div>

                    </div>

                </ModalBody>
                <ModalFooter style={{ zoom: appState.zoom }}>
                    <div style={{ width: "100%" }}>
                        <BuhtaButton color="primary"
                            className="cy-ok"
                            style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                            disabled={this.barcode == ""}
                            onClick={this.ok.bind(this)}>
                            Ok
                            </BuhtaButton>
                        <BuhtaButton
                            className="cy-cancel"
                            style={{ float: "right" }}
                            color="light"
                            onClick={() => {
                                appState.setModalResult<I_Запрос_штрих_кода_Result>({ result: "Cancel", barcode: "" });
                            }}>
                            Отмена
                            </BuhtaButton>
                        <BuhtaButton

                            style={{ float: "left", display: this.alphaMode ? "none" : undefined }}
                            color="light"
                            onClick={() => {
                                this.alphaMode = true;
                                this.forceUpdate();
                            }}>
                            Вкл.буквы
                            </BuhtaButton>
                    </div>
                </ModalFooter>
            </Modal>
            //</div >
        )
    }


}