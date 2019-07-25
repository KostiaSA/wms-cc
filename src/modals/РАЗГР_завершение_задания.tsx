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
import { IResult_wms_android_Информация_о_задании, _wms_android_РАЗГР_список_партий_по_договору, _wms_android_Партия_штуки_в_упаковки, _wms_android_РАЗГР_осталось_принять_ТМЦ, _wms_android_РАЗГР_создать_партию, IResult_wms_android_Паллета_инфо, IResult_wms_android_Типы_паллет, _wms_android_Типы_паллет, _wms_android_Общий_объем_товара_на_паллете, _wms_android_РАЗГР_завершить_паллету, _wms_android_РАЗГР_завершить_задание } from "../generated-api";
import { zebraTextToSpeech } from "../zebra/ZebraApi";
import { showError } from "./ErrorMessagePage";
import { showInfo } from "./InfoMessagePage";



export interface I_РАЗГР_завершение_задания_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
    isInputOst: boolean;
}

export interface I_РАЗГР_завершение_задания_Result {
    result: "Ok" | "Cancel";
}

export async function get_РАЗГР_завершение_задания(
    task: IResult_wms_android_Информация_о_задании,
    isInputOst: boolean,
): Promise<I_РАЗГР_завершение_задания_Result> {

    appState.modalResult = undefined;
    appState.openModal(РАЗГР_завершение_задания_Page, { pageId: getRandomString(), task, isInputOst });
    return new Promise<I_РАЗГР_завершение_задания_Result>(
        async (resolve: (res: I_РАЗГР_завершение_задания_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class РАЗГР_завершение_задания_Page extends React.Component<I_РАЗГР_завершение_задания_PageProps, any> {

    constructor(props: I_РАЗГР_завершение_задания_PageProps, context: any) {
        super(props, context);
    }


    async componentDidMount() {

        zebraTextToSpeech("завершение задания");

    }

    async ok() {



        appState.setModalResult<I_РАЗГР_завершение_задания_Result>({ result: "Ok" });

    }

    render(): React.ReactNode {


        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            padding: 3,
        };


        let печатать_акт = (
            <tr>
                <td style={labelStyle}></td>
                <td style={{ ...textStyle, paddingTop: 10 }} colSpan={2}>
                    <div className="form-check">
                        <input
                            className="form-check-input"
                            type="checkbox"
                            value=""
                            id="a4"
                            style={{ transform: "scale(1.35)" }}
                        />
                        <label className="form-check-label" htmlFor="a4" style={{ marginLeft: 5 }}>
                            печатать Акт
                        </label>
                    </div>
                </td>
            </tr>
        )





        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal centered className={(appState.getActivePageId() == this.props.pageId ? "active-window cy-razgr-finish-dialog" : "")} isOpen fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div className={"text-primary"}>Завершение задания</div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: undefined, }}>
                        <div className="card-body" style={{ padding: 5 }}>

                            <table style={{ marginBottom: 5 }}>
                                <tbody>
                                    {печатать_акт}
                                </tbody>
                            </table>

                        </div>

                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="success"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                onClick={this.ok.bind(this)}>
                                Завершить задание
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_завершение_задания_Result>({ result: "Cancel" });
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