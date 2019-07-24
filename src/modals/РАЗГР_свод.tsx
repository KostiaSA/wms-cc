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
import { IResult_wms_android_ПИК_список_партий_на_паллете, _wms_android_ПИК_список_партий_на_паллете, IResult_wms_android_РАЗГР_выбрать_задание_список, _wms_android_РАЗГР_выбрать_задание_список, IResult_wms_android_РАЗГР_свод, _wms_android_РАЗГР_свод, IResult_wms_android_Информация_о_задании } from "../generated-api";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import { TaskType, getTaskConst } from '../taskConst';
import { agGridMultiRowCellRenderer } from "../utils/agGridMultiRowCellRenderer";
import { zebraGetDeviceId } from '../zebra/ZebraApi';
import { getUpakKolStr } from "../utils/getUpakKolStr";



export interface I_РАЗГР_свод_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
}

export interface I_РАЗГР_свод_Result {
    result: "Ok";
}

export async function show_РАЗГР_свод(task: IResult_wms_android_Информация_о_задании): Promise<I_РАЗГР_свод_Result> {
    appState.modalResult = undefined;
    appState.openModal(РАЗГР_свод_Page, { pageId: getRandomString(), task });
    return new Promise<I_РАЗГР_свод_Result>(
        async (resolve: (res: I_РАЗГР_свод_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class РАЗГР_свод_Page extends React.Component<I_РАЗГР_свод_PageProps, any> {

    constructor(props: I_РАЗГР_свод_PageProps, context: any) {
        super(props, context);
    }

    data: IResult_wms_android_РАЗГР_свод[] = [];
    gridApi: any;
    gridColumnApi: any;
    selectedTaskId: number = 0;

    async componentDidMount() {

    };

    onGridReady = (params: any) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        setTimeout(this.loadGridData.bind(this), 1)
    };

    async loadGridData() {
        if (!this.gridApi)
            return;

        this.data = await _wms_android_РАЗГР_свод(this.props.task.ДоговорКлюч, this.props.task.Ключ);

        this.gridApi.setRowData(this.data);
        this.gridApi.sizeColumnsToFit();
        this.gridApi.resetRowHeights();
        this.forceUpdate();
    }

    onGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_РАЗГР_выбрать_задание_список = e.data;
        this.selectedTaskId = row.Ключ;
        this.forceUpdate();
    }

    render(): React.ReactNode {

        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";

        let rowHeight = 70;
        if (zebraGetDeviceId() != "emulator")
            rowHeight *= appState.zoom;
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window vybor-zadainya-v-raboty" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div>Отчет о выполнении</div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: window.innerHeight * 0.6 / appState.zoom, }}>
                        <div className="card-body" style={{ zoom: appState.zoom, padding: 0 }}>

                            <div className="ag-theme-balham" style={{ height: "100%", width: "100%", position: "absolute", fontSize: 11 }}>
                                <AgGridReact
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onGridReady}
                                    rowHeight={rowHeight}
                                    headerHeight={22}
                                    onRowClicked={this.onGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Товар"
                                        field="Название"
                                        cellRendererFramework={SvodCellRenderer}
                                        cellStyle={{ whiteSpace: "normal", fontSize: 11 }}
                                        autoHeight
                                    >
                                    </AgGridColumn>

                                    <AgGridColumn
                                        headerName="Задание"
                                        field="Кол"
                                        cellRendererFramework={PlanCellRenderer}
                                        cellStyle={{ whiteSpace: "normal", fontSize: 11 }}
                                        autoHeight
                                        width={70}
                                    >
                                    </AgGridColumn>

                                    <AgGridColumn
                                        headerName="Факт"
                                        field="Кол"
                                        cellRendererFramework={FactCellRenderer}
                                        cellStyle={{ whiteSpace: "normal", fontSize: 11 }}
                                        autoHeight
                                        width={70}
                                    >
                                    </AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>
                    </ModalBody>

                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <div style={{ width: "100%" }}>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_РАЗГР_свод_Result>({ result: "Ok" });
                                }}>
                                Закрыть
                            </BuhtaButton>
                        </div>
                    </ModalFooter>
                </Modal>
            </div >
        )
    }


}

class SvodCellRenderer extends React.Component<any> {
    render() {
        let row: IResult_wms_android_РАЗГР_свод = this.props.data;
        let color = ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ;
        let color2 = "grey";
        if (row.ДогКол != row.ЗаданиеКол) {
            color = "red";
            color2 = "red";
        }
        return (
            <div>
                <span style={{ color }}>{row.Название}</span>
                <span style={{ color: color2 }}> [{row.Номер}]</span>
            </div>
        );
    }
}

class PlanCellRenderer extends React.Component<any> {
    render() {
        let row: IResult_wms_android_РАЗГР_свод = this.props.data;
        let color = ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО;
        if (row.ДогКол != row.ЗаданиеКол)
            color = "red";
        return (
            <div style={{ textAlign: "center", color }}>{getUpakKolStr(row.ДогКол, row.KolInBox, row.ЕдИзм)}</div>
        );
    }
}

class FactCellRenderer extends React.Component<any> {
    render() {
        let row: IResult_wms_android_РАЗГР_свод = this.props.data;
        let color = ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО;
        if (row.ДогКол != row.ЗаданиеКол)
            color = "red";
        return (
            <div style={{ textAlign: "center", color }}>{getUpakKolStr(row.ЗаданиеКол, row.KolInBox, row.ЕдИзм)}</div>
        );
    }
}