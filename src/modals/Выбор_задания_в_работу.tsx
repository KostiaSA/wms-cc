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
import { IResult_wms_android_ПИК_список_партий_на_паллете, _wms_android_ПИК_список_партий_на_паллете, IResult_wms_android_РАЗГР_выбрать_задание_список, _wms_android_РАЗГР_выбрать_задание_список } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import { TaskType, getTaskConst } from '../taskConst';
import { agGridMultiRowCellRenderer } from "../utils/agGridMultiRowCellRenderer";
import { zebraGetDeviceId } from '../zebra/ZebraApi';



export interface I_Выбор_задания_в_работу_PageProps extends IAppPageProps {
    taskType: TaskType
}

export interface I_Выбор_задания_в_работу_Result {
    result: "Ok" | "Cancel";
    selectedTaskId: number;
}

export async function get_Выбор_задания_в_работу(taskType: TaskType): Promise<I_Выбор_задания_в_работу_Result> {
    appState.modalResult = undefined;
    appState.openModal(Выбор_задания_в_работу_Page, { pageId: getRandomString(), taskType });
    return new Promise<I_Выбор_задания_в_работу_Result>(
        async (resolve: (res: I_Выбор_задания_в_работу_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class Выбор_задания_в_работу_Page extends React.Component<I_Выбор_задания_в_работу_PageProps, any> {

    constructor(props: I_Выбор_задания_в_работу_PageProps, context: any) {
        super(props, context);
    }

    data: IResult_wms_android_РАЗГР_выбрать_задание_список[] = [];
    gridApi: any;
    gridColumnApi: any;
    selectedTaskId: number = 0;

    async componentDidMount() {
        PlaySound.выберите_задание();
    };

    onTovarsGridReady = (params: any) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        setTimeout(this.loadGridData.bind(this), 1)
    };

    async loadGridData() {
        if (!this.gridApi)
            return;

        let api_func = getTaskConst(this.props.taskType).выбрать_задание_api;
        if (!api_func)
            throw new Error("Выбор_задания_в_работу_Page: нет 'выбрать_задание_api' для " + this.props.taskType);
        this.data = await api_func(appState.kadrId);
        this.gridApi.setRowData(this.data);
        this.gridApi.sizeColumnsToFit();
        //this.gridApi.resetRowHeights();
        this.forceUpdate();
    }

    onGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_РАЗГР_выбрать_задание_список = e.data;
        this.selectedTaskId = row.Ключ;
        console.log(row);
        this.forceUpdate();
    }

    render(): React.ReactNode {

        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";

        let rowHeight = 70;
        if (zebraGetDeviceId() != "emulator")
            rowHeight *= appState.zoom;
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "vybor-zadainya-v-raboty" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div>Выбор задания {this.props.taskType}</div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: 300, }}>
                        <div className="card-body" style={{ zoom: appState.zoom, padding: 0 }}>

                            <div className="ag-theme-balham" style={{ height: "100%", width: "100%", position: "absolute", fontSize: 11 }}>
                                <AgGridReact
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    rowHeight={rowHeight}
                                    headerHeight={0}
                                    onRowClicked={this.onGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Задание"
                                        field="Задание"
                                        cellRenderer={agGridMultiRowCellRenderer}
                                        cellStyle={{ whiteSpace: "normal", fontSize: 11 }}
                                    >
                                    </AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>


                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton color="primary"
                                className="cy-ok"
                                style={{ float: "right", minWidth: 45, marginLeft: 5 }}
                                disabled={this.selectedTaskId == 0}
                                onClick={() => {
                                    appState.setModalResult<I_Выбор_задания_в_работу_Result>({ result: "Ok", selectedTaskId: this.selectedTaskId });
                                }}>
                                Ok
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_Выбор_задания_в_работу_Result>({ result: "Cancel", selectedTaskId: 0 });
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