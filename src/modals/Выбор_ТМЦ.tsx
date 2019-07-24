import * as  React from "react";
import { appState } from "../AppState";
import Highlighter from "react-highlight-words";

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
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { playSound_ButtonClick } from "../utils/playSound";
import { zebraGetDeviceId } from '../zebra/ZebraApi';
import { getUpakKolStr } from "../utils/getUpakKolStr";
import { IResult_wms_android_Информация_о_задании, _wms_android_Выбор_ТМЦ_список, IResult_wms_android_Выбор_ТМЦ_список } from "../generated-api";



export interface I_Выбор_ТМЦ_PageProps extends IAppPageProps {
    task: IResult_wms_android_Информация_о_задании;
}

export interface I_Выбор_ТМЦ_Result {
    result: "Ok" | "Cancel";
    tmcId: number;
}

export async function get_Выбор_ТМЦ(task: IResult_wms_android_Информация_о_задании): Promise<I_Выбор_ТМЦ_Result> {
    appState.modalResult = undefined;
    appState.openModal(Выбор_ТМЦ_Page, { pageId: getRandomString(), task });
    return new Promise<I_Выбор_ТМЦ_Result>(
        async (resolve: (res: I_Выбор_ТМЦ_Result) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}

let page: Выбор_ТМЦ_Page;

export class Выбор_ТМЦ_Page extends React.Component<I_Выбор_ТМЦ_PageProps, any> {

    constructor(props: I_Выбор_ТМЦ_PageProps, context: any) {
        super(props, context);
        page = this;
    }

    data: IResult_wms_android_Выбор_ТМЦ_список[] = [];
    gridApi: any;
    gridColumnApi: any;
    selectedTmcId: number = 0;
    likeText: string = "";
    fullList: boolean = false;

    async componentDidMount() {


    };

    onTovarsGridReady = (params: any) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        setTimeout(this.loadGridData.bind(this), 1)
    };

    async loadGridData() {
        if (!this.gridApi)
            return;

        this.data = await _wms_android_Выбор_ТМЦ_список(this.fullList ? 0 : this.props.task.ДоговорКлюч, this.likeText.trim());

        this.gridApi.setRowData(this.data);
        this.gridApi.sizeColumnsToFit();
        this.gridApi.resetRowHeights();
        this.forceUpdate();
    }

    onGridRowClicked(e: any) {
        playSound_ButtonClick();
        let row: IResult_wms_android_Выбор_ТМЦ_список = e.data;
        this.selectedTmcId = row.Ключ;
        this.forceUpdate();
    }

    render(): React.ReactNode {

        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>ничего не найдено</span>";

        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window vybor-zadainya-v-raboty" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>
                        <div>
                            <span style={{ paddingRight: 3 }}>Поиск</span>
                            <input
                                required
                                type={"string"}
                                className="form-control cy-search-input"
                                style={{ width: 120, display: "inline", fontWeight: "bold" }}
                                value={this.likeText}
                                onChange={(event) => {
                                    this.likeText = event.target.value;
                                    this.forceUpdate()
                                }}
                            >
                            </input>
                            <BuhtaButton
                                small outline color="primary" style={{ marginLeft: 5 }}
                                onClick={async () => {
                                    await this.loadGridData();
                                }}
                            >
                                найти
                            </BuhtaButton>
                            <div className="form-check" style={{ paddingLeft: 60, paddingTop: 3 }}>
                                <input
                                    className="form-check-input"
                                    type="checkbox"
                                    checked={this.fullList}
                                    id="a4"
                                    style={{ transform: "scale(1.35)" }}
                                    onChange={async (event) => {
                                        this.fullList = event.target.checked;
                                        await this.loadGridData();
                                    }}

                                />
                                <label className="form-check-label" htmlFor="a4" style={{ marginLeft: 5 }}>
                                    полный список
                                </label>
                            </div>

                        </div>
                    </ModalHeader>
                    <ModalBody className={"text-primary"} style={{ zoom: appState.zoom, padding: 0, height: window.innerHeight * 0.6 / appState.zoom, }}>
                        <div className="card-body" style={{ zoom: appState.zoom, padding: 0 }}>

                            <div className="ag-theme-balham" style={{ height: "100%", width: "100%", position: "absolute", fontSize: 11 }}>
                                <AgGridReact
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    headerHeight={22}
                                    onRowClicked={this.onGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Товар"
                                        field="НомерНазвание"
                                        cellRendererFramework={CellRenderer}
                                        cellStyle={{ whiteSpace: "normal", fontSize: 11 }}
                                        autoHeight
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
                                disabled={this.selectedTmcId == 0}
                                onClick={() => {
                                    appState.setModalResult<I_Выбор_ТМЦ_Result>({ result: "Ok", tmcId: this.selectedTmcId });
                                }}>
                                Выбрать
                            </BuhtaButton>
                            <BuhtaButton
                                className="cy-cancel"
                                style={{ float: "right" }}
                                color="light"
                                onClick={() => {
                                    appState.setModalResult<I_Выбор_ТМЦ_Result>({ result: "Cancel", tmcId: 0 });
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

// class SvodCellRenderer extends React.Component<any> {
//     render() {
//         let row: IResult_wms_android_Выбор_ТМЦ_список = this.props.data;
//         let color = ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ;
//         let color2 = "grey";
//         if (row.ДогКол != row.ЗаданиеКол) {
//             color = "red";
//             color2 = "red";
//         }
//         return (
//             <div>
//                 <span style={{ color }}>{row.Название}</span>
//                 <span style={{ color: color2 }}> [{row.Номер}]</span>
//             </div>
//         );
//     }
// }

class CellRenderer extends React.Component<any> {
    render() {
        let row: IResult_wms_android_Выбор_ТМЦ_список = this.props.data;
        console.log(this.props);
        return (
            <Highlighter
                highlightClassName="search-highlight"
                searchWords={[page.likeText]}
                autoEscape={true}
                textToHighlight={row.НомерНазвание}
            />
        );
    }
}

// class FactCellRenderer extends React.Component<any> {
//     render() {
//         let row: IResult_wms_android_Выбор_ТМЦ = this.props.data;
//         let color = ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО;
//         if (row.ДогКол != row.ЗаданиеКол)
//             color = "red";
//         return (
//             <div style={{ textAlign: "center", color }}>{getUpakKolStr(row.ЗаданиеКол, row.KolInBox, row.ЕдИзм)}</div>
//         );
//     }
// }