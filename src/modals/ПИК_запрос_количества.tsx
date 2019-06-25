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
import { IResult_wms_android_ПИК_обработка_шк_товара } from "../generated-api";
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


    componentDidMount() {
        PlaySound.введите_количество();

    };


    render(): React.ReactNode {

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };

        let тип_упак = (
            <tr>
                <td style={labelStyle}>тип уп.</td>
                <td style={textStyle}>
                    <select
                        className="form-control form-control"
                        name="select3"
                        onChange={async (event: any) => {
                            console.log(event.target.value); //await appState.сохранить_настройки_ТСД("zoom", Number.parseFloat(event.target.value)); 
                            this.forceUpdate();
                        }}
                    >
                        <option value="коробка" selected>коробка</option>
                        <option value="шт">шт</option>
                    </select>
                </td>
            </tr>
        )

        let упак = (
            <tr>
                <td style={labelStyle}>упаковок</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <BuhtaButton outline color="warning" style={{ borderRadius: "1rem", marginRight: 3, borderColor: "#ffc10747" }}><i className="fa fa-minus"></i></BuhtaButton>
                        <input required type="number" className="form-control" style={{ width: 60, display: "inline" }}></input>
                        <BuhtaButton outline color="warning" style={{ borderRadius: "1rem", marginLeft: 3, borderColor: "#ffc10747" }}><i className="fa fa-plus"></i></BuhtaButton>
                    </div>
                </td>
            </tr>
        )

        let кол = (
            <tr>
                <td style={labelStyle}>единиц</td>
                <td style={textStyle}>
                    <div className="input-groupx">
                        <BuhtaButton outline color="success" style={{ borderRadius: "1rem", marginRight: 3, borderColor: "#4dbd743d" }}><i className="fa fa-minus"></i></BuhtaButton>
                        <input required type="number" className="form-control" style={{ width: 60, display: "inline" }}></input>
                        <BuhtaButton outline color="success" style={{ borderRadius: "1rem", marginLeft: 3, borderColor: "#4dbd743d" }}><i className="fa fa-plus"></i></BuhtaButton>
                    </div>
                </td>
            </tr>
        )


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>Запрос количества</ModalHeader>
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
                                </tbody>
                            </table>
                        </div>

                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="light"
                            onClick={() => {
                                appState.setModalResult<I_ПИК_запрос_количества_Result>({ result: "Ok", newKol: 0 });
                            }}>
                            Отмена
                        </BuhtaButton>
                        <BuhtaButton color="primary"
                            onClick={() => {
                                appState.setModalResult<I_ПИК_запрос_количества_Result>({ result: "Ok", newKol: 0 });
                            }}>
                            Ok
                        </BuhtaButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

