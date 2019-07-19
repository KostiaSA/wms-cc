import * as  React from "react";
import { executeSqlStoredProc, executeSqlStoredProc_FirstRecordset } from "../utils/executeSqlStoredProc";
import { IAppPageProps } from "./AppWindow";
import { appState } from "../AppState";
import { playSound, playSound_ButtonClick } from "../utils/playSound";

import { BuhtaButton } from "../ui/BuhtaButton";
import { IResult_wms_android_Тестовые_штрихкоды, _wms_android_Тестовые_штрихкоды } from "../generated-api";

export interface ITestBarcodesPageProps extends IAppPageProps {
    taskId: number;
    palleteFrom: number;
}


const styles = (theme: any) => ({
    menu: {
        width: 200,
    },
});


// export interface I_ПИК_Лист_тестовые_штрихкоды {
//     newPalletes: null | any[];
//     palletesOutOfTask: null | any[];
//     palletesInTask: null | any[];
//     tovarInTask: null | any[];
//     palletesKuda: null | any[];
// }

export class TestBarcodesPage extends React.Component<ITestBarcodesPageProps> {
    static PAGE_ID = "TestBarcodesPage";

    constructor(props: any, context: any) {
        super(props, context);
    }

    //recordset: any[] = [];
    data: IResult_wms_android_Тестовые_штрихкоды[];

    async loadFromSql() {
        if (!this.data && this.props.pageId == appState.activePageId[0]) {
            this.data = await _wms_android_Тестовые_штрихкоды(this.props.taskId, this.props.palleteFrom);
            this.forceUpdate();
        }
        //debugger
        // if (this.recordset.length == 0 && this.props.pageId == appState.activePageId[0]) {
        //     this.recordset = await executeSqlStoredProc("ПИК_Лист_тестовые_штрихкоды", this.props.taskId);
        //     this.forceUpdate();
        // }
    }

    componentDidMount() {
        //console.log("MainMenuPage componentDidMount");
        this.loadFromSql();
    };

    // componentDidUpdate() {
    //     //console.log("MainMenuPage componentDidUpdate");
    //     this.loadFromSql();
    // };

    render() {
        if (!this.data)
            return null;
        else
            return (

                <div
                    className={(appState.getActivePageId() == this.props.pageId ? "cy-test-barcodes-page" : "")}
                    style={{
                        paddingLeft: 5,
                        paddingRight: 5,
                        display: this.props.visible ? "" : "none",
                        backgroundColor: "white",
                        zoom: appState.zoom
                    }}>
                    <BuhtaButton outline style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                        appState.closeActivePage();
                    }}>
                        Закрыть
                    </BuhtaButton>
                    <BuhtaButton outline style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                        appState.closeActivePage();
                        appState.pushTestBarcode("8463943749437202383", "");
                    }}>
                        {"неизвестный штрих-код"}
                    </BuhtaButton>
                    <br />
                    {
                        (this.data || []).map((row: IResult_wms_android_Тестовые_штрихкоды, index: number) => {
                            return ([
                                <BuhtaButton key={index} outline
                                    style={{ marginRight: 3, marginTop: 5, maxWidth: 250 }} onClick={() => {
                                        appState.closeActivePage();
                                        appState.pushTestBarcode(row.ШтрихКод, "");
                                    }}>
                                    <span style={{ color: row.Цвет, whiteSpace: "normal" }}>{row.Объект}</span>
                                    <br />
                                    <span style={{ color: "#ff00ff8a", whiteSpace: "normal" }}>шк:{row.ШтрихКод}</span>
                                </BuhtaButton>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {/* {
                        (this.data.newPalletes || []).map((row: any, index: number) => {
                            return ([
                                <BuhtaButton key={index + 1000000} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>нов.{row.Паллета_Номер}</span>
                                </BuhtaButton>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.palletesOutOfTask || []).map((row: any, index: number) => {
                            return ([
                                <BuhtaButton key={index} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Ячейка_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-cell"}>{row.Ячейка_Номер}</span>
                                </BuhtaButton>,
                                <BuhtaButton key={index + 1000000} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>левая {row.Паллета_Номер}</span>
                                </BuhtaButton>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.palletesInTask || []).map((row: any, index: number) => {
                            return ([
                                <BuhtaButton key={index} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Ячейка_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-cell"}>{row.Ячейка_Номер}</span>
                                </BuhtaButton>,
                                <BuhtaButton key={index + 1000000} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>{row.Паллета_Номер}</span>
                                </BuhtaButton>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.tovarInTask || []).map((row: any, index: number) => {
                            return ([
                                <BuhtaButton key={index} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>{row.Паллета_Номер}</span>
                                </BuhtaButton>,
                                <BuhtaButton key={index + 1000000} outline
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.ТМЦ_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-tovar"}>{row.ТМЦ_Название.substr(0, 60)}</span>
                                    {}
                                </BuhtaButton>,
                                (() => {
                                    if (!row.Партия_Название)
                                        return null;
                                    else
                                        return (
                                            <BuhtaButton key={index + 5000000} outline
                                                style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                                    appState.closeAndDestroyActivePage();
                                                    appState.pushTestBarcode(row.Партия_ШтрихКод, "");
                                                }}>
                                                <span
                                                    className={"text-color-part"}> партия: {row.Партия_Название.substr(0, 50)}</span>
                                                {}
                                            </BuhtaButton>
                                        )
                                })()
                                ,
                                <br key={index + 2000000} />

                            ]
                            )
                        })
                    } */}
                </div>


            )
    }
}

