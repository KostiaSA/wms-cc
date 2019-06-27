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

import { ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО } from "../const";
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

export async function get_ПИК_запрос_партии(taskId: number, tmcId: number, palleteId: number, ): Promise<I_ПИК_запрос_партии_Result> {
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

    data: IResult_wms_android_ПИК_список_партий_на_паллете[];
    tovarsGridApi: any;
    tovarsGridColumnApi: any;
    selectedPartId: number;

    async componentDidMount() {
        PlaySound.выберите_партию();
    };

    onTovarsGridReady = (params: any) => {
        this.tovarsGridApi = params.api;
        this.tovarsGridColumnApi = params.columnApi;
        setTimeout(this.loadTovarsGridData.bind(this), 1)
    };

    async loadTovarsGridData() {
        if (!this.tovarsGridApi)
            return;

        this.data = await _wms_android_ПИК_список_партий_на_паллете(this.props.palleteId, this.props.tmcId, this.props.taskId);
        this.tovarsGridApi.setRowData(this.data);
        this.tovarsGridApi.sizeColumnsToFit();
        this.tovarsGridApi.resetRowHeights();
    }

    onTovarGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_ПИК_список_партий_на_паллете = e.data;
        this.selectedPartId = row.PartKey;
        console.log(row);
    }

    render(): React.ReactNode {

        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";


        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom, color: "gray" }}>Выбор партии</ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom }}>
                        <div className="card-body" style={{ height: 300, zoom: appState.zoom, padding: 0 }}>
                            <div className="ag-theme-balham" style={{ height: "100%", width: "100%", position: "absolute" }}>
                                <AgGridReact
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    rowHeight={40}
                                    onRowClicked={this.onTovarGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Партия"
                                        field="Партия"
                                        cellStyle={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, whiteSpace: "normal" }}
                                    >
                                    </AgGridColumn>
                                    <AgGridColumn headerName="Кол-во" field="Кол_во" width={50} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}></AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="primary"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={!this.selectedPartId}
                                onClick={() => {
                                    appState.setModalResult<I_ПИК_запрос_партии_Result>({ result: "Ok", selectedPartId: this.selectedPartId });
                                }}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
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