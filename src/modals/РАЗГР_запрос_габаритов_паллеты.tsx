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
import { IResult_wms_android_ТМЦ_инфо, IResult_wms_android_Информация_о_задании, IResult_wms_android_РАЗГР_список_партий_по_договору, _wms_android_РАЗГР_список_партий_по_договору, _wms_android_Партия_штуки_в_упаковки, _wms_android_РАЗГР_осталось_принять_ТМЦ, _wms_android_РАЗГР_создать_партию, IResult_wms_android_Паллета_инфо, IResult_wms_android_Типы_паллет, _wms_android_Типы_паллет, _wms_android_Общий_объем_товара_на_паллете, _wms_android_РАЗГР_завершить_паллету } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import moment from "moment";
import { Moment } from 'moment';
import { zebraTextToSpeech } from "../zebra/ZebraApi";
import { number } from "prop-types";
import { showError } from "./ErrorMessagePage";



export interface I_РАЗГР_запрос_габаритов_паллеты_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
    pallete: IResult_wms_android_Паллета_инфо;
    isInputOst: boolean;
}

export interface I_РАЗГР_запрос_габаритов_паллеты_Result {
    result: "Ok" | "Cancel";
}

export async function get_РАЗГР_запрос_габаритов_паллеты(
    task: IResult_wms_android_Информация_о_задании,
    pallete: IResult_wms_android_Паллета_инфо,
    isInputOst: boolean
): Promise<I_РАЗГР_запрос_габаритов_паллеты_Result> {

    appState.modalResult = undefined;
    appState.openModal(РАЗГР_запрос_габаритов_паллеты_Page, { pageId: getRandomString(), task, pallete, isInputOst });
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

    // partList: IResult_wms_android_РАЗГР_список_партий_по_договору[] = [];
    // gridApi: any;
    // gridColumnApi: any;
    // selectedPartId: number = 0;

    // kolInBox: number = 0;
    // UpTypeEdit_Value: string = "";
    // MestEdit_Value: number = 0;
    // BoxLabel_Caption: string = "";
    // осталосьПринятьКоличество: number = 0;
    // осталосьПринятьУпаковки: string = "";

    тип_паллеты: number;

    ширина: number = 0.8;
    ширина_error: string = "";
    глубина: number = 1.2;
    глубина_error: string = "";
    высота: number = 0;
    высота_error: string = "";

    all_errors: string = "";

    palleteTypes: IResult_wms_android_Типы_паллет[] = [];

    async componentDidMount() {

        zebraTextToSpeech("завершение палеты");
        this.тип_паллеты = this.props.pallete.Тип;
        this.palleteTypes = await _wms_android_Типы_паллет();
        await this.onChange_Тип_паллеты();
        //this.KolEditChanged();
        //this.ДатаВыпуска_Changed();

        this.forceUpdate();

    }

    async onChange_Тип_паллеты() {
        let typeInfo: IResult_wms_android_Типы_паллет = this.palleteTypes.find((t: IResult_wms_android_Типы_паллет) => t.Ключ == this.тип_паллеты);
        if (typeInfo) {
            this.ширина = typeInfo.Ширина / 1000;
            this.глубина = typeInfo.Глубина / 1000;
            let площадь = this.ширина * this.глубина;
            if (площадь > 0) {
                let объем = (await _wms_android_Общий_объем_товара_на_паллете(this.props.pallete.Ключ)).Объем_М3;
                this.высота = Number.parseFloat((объем / площадь * 1.1).toFixed(2));
                if (this.высота > 3)
                    this.высота = 3;

            }
        }

    }

    isErrors(): boolean {
        if (this.ширина_error != "")
            return true;
        if (this.глубина_error != "")
            return true;
        if (this.высота_error != "")
            return true;
    }

    checkError() {
        this.ширина_error = "";
        if (this.ширина < 0.01) {
            this.ширина_error = "ширина меньше 0.01 м";
        }
        if (this.ширина > 3) {
            this.ширина_error = "ширина больше 3 м";
        }

        this.глубина_error = "";
        if (this.глубина < 0.01) {
            this.глубина_error = "глубина меньше 0.01 м";
        }
        if (this.глубина > 3) {
            this.глубина_error = "глубина больше 3 м";
        }

        this.высота_error = "";
        if (this.высота < 0.01) {
            this.высота_error = "высота меньше 0.01 м";
        }
        if (this.высота > 3) {
            this.высота_error = "высота больше 3 м";
        }

        // this.all_errors = [
        //     this.ширина_error,
        // ].join(", ");
    }


    async ok() {


        let res = await _wms_android_РАЗГР_завершить_паллету(
            this.props.task.Ключ,
            this.props.pallete.Ключ,
            this.тип_паллеты,
            this.ширина,
            this.глубина,
            this.высота,
            this.props.pallete._Неперемещаемая,
            this.props.isInputOst,
        );

        if (res.error) {
            showError(res.error);
            return
        }

        PlaySound.паллета_завершена(this.props.pallete.Название);
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


        let ширина: ReactNode = (
            <tr>
                <td style={labelStyle}>ширина</td>
                <td style={textStyle}>
                    <div className="input-groupx" style={{ whiteSpace: "nowrap" }}>
                        <input
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

        let высота: ReactNode = (
            <tr>
                <td style={labelStyle}>высота</td>
                <td style={textStyle}>
                    <div className="input-groupx" style={{ whiteSpace: "nowrap" }}>
                        <input
                            type="number"
                            className="form-control cy-shirina"
                            style={{ width: 80, display: "inline" }}
                            value={this.высота}
                            onChange={(event) => {
                                this.высота = Number.parseFloat(event.target.value);
                                this.checkError();
                                this.forceUpdate();
                            }}

                        >

                        </input>
                        <span style={{ marginLeft: 3 }}> м</span>
                    </div>
                </td>
                <td style={{ color: "red", maxWidth: 100, paddingLeft: 5 }}>
                    {this.высота_error}
                </td>
            </tr >
        )

        let глубина: ReactNode = (
            <tr>
                <td style={labelStyle}>глубина</td>
                <td style={textStyle}>
                    <div className="input-groupx" style={{ whiteSpace: "nowrap" }}>
                        <input
                            type="number"
                            className="form-control cy-shirina"
                            style={{ width: 80, display: "inline" }}
                            value={this.глубина}
                            onChange={(event) => {
                                this.глубина = Number.parseFloat(event.target.value);
                                this.checkError();
                                this.forceUpdate();
                            }}

                        >

                        </input>
                        <span style={{ marginLeft: 3 }}> м</span>
                    </div>
                </td>
                <td style={{ color: "red", maxWidth: 100, paddingLeft: 5 }}>
                    {this.глубина_error}
                </td>
            </tr >
        )

        let items = this.palleteTypes.map((item: IResult_wms_android_Типы_паллет, index: number) => <option key={index} value={item.Ключ}>{item.Название}</option>);
        let тип_паллеты = (
            <tr>
                <td style={labelStyle}>тип паллеты</td>
                <td style={textStyle} colSpan={2}>
                    <select
                        style={{ width: 160 }}
                        className="form-control .cy-pallete-type"
                        name="select3"
                        value={this.тип_паллеты}
                        onChange={async (event: any) => {
                            this.тип_паллеты = Number.parseFloat(event.target.value);
                            await this.onChange_Тип_паллеты();
                            this.forceUpdate();
                        }}
                    >
                        {items}
                    </select>
                </td>
            </tr>
        )

        let печатать_А4 = (
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
                            печатать этикетку A4
                        </label>
                    </div>
                </td>
            </tr>
        )



        // let kol_error: any = null;
        // if (this.ширина_error != "")
        //     kol_error = <div style={{ color: "red", textAlign: "center", marginBottom: 5 }} >{this.ширина_error}</div>


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window cy-razgr-pallete-ok" : "")} isOpen fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>Завершение паллеты  <span style={{ whiteSpace: "nowrap" }}> {this.props.pallete.Название}</span></div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: undefined, }}>
                        <div className="card-body" style={{ padding: 5 }}>

                            <table style={{ marginBottom: 5 }}>
                                <tbody>
                                    {тип_паллеты}
                                    {ширина}
                                    {глубина}
                                    {высота}
                                    {печатать_А4}
                                </tbody>
                            </table>

                        </div>

                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="success"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.isErrors()}
                                onClick={this.ok.bind(this)}>
                                Завершить паллету
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