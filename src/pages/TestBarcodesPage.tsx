import * as  React from "react";
import {executeSqlStoredProc, executeSqlStoredProc_FirstRecordset} from "../utils/executeSqlStoredProc";
import {IAppPageProps} from "./AppWindow";
import {appState} from "../AppState";
import {playSound, playSound_ButtonClick} from "../utils/playSound";
import Button from "reactstrap/lib/Button";

export interface ITestBarcodesPageProps extends IAppPageProps {
    taskId: number;
}


const styles = (theme: any) => ({
    menu: {
        width: 200,
    },
});


export class TestBarcodesPage extends React.Component<ITestBarcodesPageProps> {
    static PAGE_ID = "TestBarcodesPage";

    constructor(props: any, context: any) {
        super(props, context);
    }

    recordset: any[] = [];

    async loadFromSql() {
        if (this.recordset.length == 0 && this.props.pageId == appState.activePageId[0]) {
            this.recordset = await executeSqlStoredProc("ПИК_Лист_тестовые_штрихкоды", this.props.taskId);
            this.forceUpdate();
        }
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
        if (this.recordset.length == 0)
            return null;

        return (

                <div style={{
                    paddingLeft: 5,
                    paddingRight: 5,
                    display: this.props.visible ? "" : "none"
                }}>
                    <Button variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                        playSound_ButtonClick();
                        appState.closeAndDestroyActivePage();
                    }}>
                        Закрыть
                    </Button>
                    <Button variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                        playSound_ButtonClick();
                        appState.closeAndDestroyActivePage();
                        appState.pushTestBarcode("8463943749437202383", "");
                    }}>
                        неизвестный штрих-код
                    </Button>
                    <br/>
                    {
                        this.recordset[4].map((row: any, index: number) => {
                            return ([
                                    <Button key={index+1000000} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-pallete"}>в-подборе-{row.Паллета_Номер}</span>
                                    </Button>,
                                    <br key={index+2000000}/>
                                ]
                            )
                        })
                    }
                    {
                        this.recordset[0].map((row: any, index: number) => {
                            return ([
                                    <Button key={index+1000000} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-pallete"}>нов.{row.Паллета_Номер}</span>
                                    </Button>,
                                    <br key={index+2000000}/>
                                ]
                            )
                        })
                    }
                    {
                        this.recordset[1].map((row: any, index: number) => {
                            return ([
                                    <Button key={index} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Ячейка_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-cell"}>{row.Ячейка_Номер}</span>
                                    </Button>,
                                    <Button key={index+1000000} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-pallete"}>левая {row.Паллета_Номер}</span>
                                    </Button>,
                                    <br key={index+2000000}/>
                                ]
                            )
                        })
                    }
                    {
                        this.recordset[2].map((row: any, index: number) => {
                            return ([
                                    <Button key={index} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Ячейка_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-cell"}>{row.Ячейка_Номер}</span>
                                    </Button>,
                                    <Button key={index+1000000} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-pallete"}>{row.Паллета_Номер}</span>
                                    </Button>,
                                    <br key={index+2000000}/>
                                ]
                            )
                        })
                    }
                    {
                        this.recordset[3].map((row: any, index: number) => {
                            return ([
                                    <Button key={index} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.Паллета_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-pallete"}>{row.Паллета_Номер}</span>
                                    </Button>,
                                    <Button key={index+1000000} variant="outlined" size="small" style={{marginRight:3,marginTop:3}} onClick={() => {
                                        playSound_ButtonClick();
                                        appState.closeAndDestroyActivePage();
                                        appState.pushTestBarcode(row.ТМЦ_ШтрихКод, "");
                                    }}>
                                        <span className={"text-color-tovar"}>{row.ТМЦ_Название.substr(0,60)}</span>
                                        {}
                                    </Button>,
                                    <br key={index+2000000}/>
                                ]
                            )
                        })
                    }
                </div>



        )
    }
}

