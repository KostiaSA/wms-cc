import * as  React from "react";
import { executeSqlStoredProc, executeSqlStoredProc_FirstRecordset } from "../utils/executeSqlStoredProc";
import { IAppPageProps } from "./AppWindow";
import { appState } from "../AppState";
import { playSound, playSound_ButtonClick } from "../utils/playSound";
import Button from "reactstrap/lib/Button";
import { call_wmsapi } from "../utils/call_wmsapi";

export interface ITestBarcodesPageProps extends IAppPageProps {
    taskId: number;
}


const styles = (theme: any) => ({
    menu: {
        width: 200,
    },
});


export interface I_ПИК_Лист_тестовые_штрихкоды {
    newPalletes: null | any[];
    palletesOutOfTask: null | any[];
    palletesInTask: null | any[];
    tovarInTask: null | any[];
    palletesKuda: null | any[];
}

export class TestBarcodesPage extends React.Component<ITestBarcodesPageProps> {
    static PAGE_ID = "TestBarcodesPage";

    constructor(props: any, context: any) {
        super(props, context);
    }

    //recordset: any[] = [];
    data: I_ПИК_Лист_тестовые_штрихкоды | undefined;

    async loadFromSql() {
        if (!this.data && this.props.pageId == appState.activePageId[0]) {
            this.data = await call_wmsapi<I_ПИК_Лист_тестовые_штрихкоды>("ПИК_Лист_тестовые_штрихкоды", { taskId: this.props.taskId });
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

    componentDidUpdate() {
        //console.log("MainMenuPage componentDidUpdate");
        this.loadFromSql();
    };

    render() {
        if (!this.data)
            return null;
        else
            return (

                <div style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    display: this.props.visible ? "" : "none",
                    backgroundColor: "white"
                }}>
                    <Button outline size="small" style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                        playSound_ButtonClick();
                        appState.closeAndDestroyActivePage();
                    }}>
                        Закрыть
                </Button>
                    <Button outline size="small" style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                        playSound_ButtonClick();
                        appState.closeAndDestroyActivePage();
                        appState.pushTestBarcode("8463943749437202383", "");
                    }}>
                        {"неизвестный штрих-код"}
                    </Button>
                    <br />
                    {
                        (this.data.palletesKuda || []).map((row: any, index: number) => {
                            return ([
                                <Button key={index + 1000000} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>в-подборе-{row.Паллета_Номер}</span>
                                </Button>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.newPalletes || []).map((row: any, index: number) => {
                            return ([
                                <Button key={index + 1000000} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>нов.{row.Паллета_Номер}</span>
                                </Button>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.palletesOutOfTask || []).map((row: any, index: number) => {
                            return ([
                                <Button key={index} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Ячейка_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-cell"}>{row.Ячейка_Номер}</span>
                                </Button>,
                                <Button key={index + 1000000} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>левая {row.Паллета_Номер}</span>
                                </Button>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.palletesInTask || []).map((row: any, index: number) => {
                            return ([
                                <Button key={index} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Ячейка_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-cell"}>{row.Ячейка_Номер}</span>
                                </Button>,
                                <Button key={index + 1000000} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>{row.Паллета_Номер}</span>
                                </Button>,
                                <br key={index + 2000000} />
                            ]
                            )
                        })
                    }
                    {
                        (this.data.tovarInTask || []).map((row: any, index: number) => {
                            return ([
                                <Button key={index} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-pallete"}>{row.Паллета_Номер}</span>
                                </Button>,
                                <Button key={index + 1000000} outline size="small"
                                    style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.ТМЦ_ШтрихКод, "");
                                    }}>
                                    <span className={"text-color-subconto-tovar"}>{row.ТМЦ_Название.substr(0, 60)}</span>
                                    {}
                                </Button>,
                                (() => {
                                    if (!row.Партия_Название)
                                        return null;
                                    else
                                        return (
                                            <Button key={index + 5000000} outline size="small"
                                                style={{ marginRight: 3, marginTop: 3 }} onClick={() => {
                                                    playSound_ButtonClick();
                                                    appState.closeAndDestroyActivePage();
                                                    appState.pushTestBarcode(row.Партия_ШтрихКод, "");
                                                }}>
                                                <span
                                                    className={"text-color-part"}> партия: {row.Партия_Название.substr(0, 50)}</span>
                                                {}
                                            </Button>
                                        )
                                })()
                                ,
                                <br key={index + 2000000} />

                            ]
                            )
                        })
                    }
                </div>


            )
    }
}

