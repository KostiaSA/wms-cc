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
import { IResult_wms_android_ПИК_список_партий_на_паллете, _wms_android_ПИК_список_партий_на_паллете } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";



export interface I_ПИК_запрос_партии_PageProps extends IAppPageProps {
    taskId: number;
    tmcId: number;
    palleteId: number;
}

export interface I_ПИК_запрос_партии_Result {
    result: "Ok" | "Cancel";
    selectedPartId: number;
}

export async function get_ПИК_запрос_партии(taskId: number, tmcId: number, palleteId: number): Promise<I_ПИК_запрос_партии_Result> {
    appState.modalResult = undefined;
    appState.openModal(ПИК_запрос_партии_Page, { pageId: getRandomString(), taskId, tmcId, palleteId });
    return new Promise<I_ПИК_запрос_партии_Result>(
        async (resolve: (res: I_ПИК_запрос_партии_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class ПИК_запрос_партии_Page extends React.Component<I_ПИК_запрос_партии_PageProps, any> {

    constructor(props: I_ПИК_запрос_партии_PageProps, context: any) {
        super(props, context);
    }

    data: IResult_wms_android_ПИК_список_партий_на_паллете[] = [];
    gridApi: any;
    gridColumnApi: any;
    selectedPartId: number = 0;

    async componentDidMount() {
        PlaySound.выберите_партию();
    };

    onTovarsGridReady = (params: any) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        setTimeout(this.loadGridData.bind(this), 1)
    };

    async loadGridData() {
        if (!this.gridApi)
            return;

        this.data = await _wms_android_ПИК_список_партий_на_паллете(this.props.palleteId, this.props.tmcId, this.props.taskId);
        this.gridApi.setRowData(this.data);
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

    render(): React.ReactNode {

        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(this.props.visible ? "active-win" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ }}>Выбор партии</div>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, textAlign: "left", fontSize: 11 }}>
                            {this.data[0] ? this.data[0].НазваниеПаллеты : ""}
                        </div>
                        <div style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, textAlign: "left", fontSize: 11 }}>
                            {this.data[0] ? this.data[0].НазваниеТМЦ : ""}
                        </div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: 240, }}>
                        <div className="card-body" style={{ zoom: appState.zoom, padding: 0 }}>

                            <div className="ag-theme-balham" style={{ height: "100%", width: "100%", position: "absolute" }}>
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
                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="primary"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.selectedPartId == 0}
                                onClick={() => {
                                    appState.setModalResult<I_ПИК_запрос_партии_Result>({ result: "Ok", selectedPartId: this.selectedPartId });
                                }}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_ПИК_запрос_партии_Result>({ result: "Cancel", selectedPartId: 0 });
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