import * as  React from "react";
import {IAppPageProps} from "../AppWindow";
import {
    executeSqlStoredProc,
    executeSqlStoredProc_FirstRecordset,
    executeSqlStoredProc_FirstRow, executeSqlStoredProc_FirstRowOrNull, executeSqlStoredProc_FirstValue
} from "../../utils/executeSqlStoredProc";
import {AgGridReact} from "ag-grid-react";
import {
    Autowired,
    BaseComponentWrapper,
    Bean,
    FrameworkComponentWrapper,
    GridOptions,
    IComponent,
    Promise,
    WrapableInterface
} from "ag-grid-community";
import {createGridOptionsFromSqlRowsets} from "../../utils/createGridOptionsFromSqlRowsets";
import {showError} from "../../utils/showError";
import {appState} from "../../AppState";


import {SqlGrid} from "../../components/SqlGrid";


import {playSound, playSound_ButtonClick} from "../../utils/playSound";
import {showInfoMessage} from "../../modals/InfoMessageModal";
import {showSnack} from "../../ui/showSnack";
import {PlaySound} from "../../sounds/PlaySound";
import {TestBarcodesPage} from "../TestBarcodesPage";
import {showErrorMessage} from "../../modals/ErrorMessageModal";
import Button from "reactstrap/lib/Button";

export interface IPeakPageProps extends IAppPageProps {

}


export class PeakPage extends React.Component<IPeakPageProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }


    activeTab: "Путь" | "Паллета" = "Путь";

    taskId: number = 1468635;

    fromType: string = "";
    fromId: number = -1;
    fromStr: string = "не выбрано";

    intoType: string = "";
    intoId: number = -1;
    intoStr: string = "не выбрано";

    docHeader: any = null;

    async loadDocHeader() {
        if (appState.tsdKey == -1) // не было логина
            return;

        this.docHeader = null;
        let recordsets: any;
        try {
            this.docHeader = await executeSqlStoredProc_FirstRow("ПИК_Лист_Шапка", this.taskId);
            this.forceUpdate();

        } catch (error) {
            console.error(error);
            showError("executeSqlStoredProc: ПИК_Лист_Шапка", error);
        }

    };

    barcodeProcessorHandler: any;

    async barcodeProcessor() {
        if (!this.props.visible) return;
        let barcode = appState.getNextBarcodeFromQueue(this.props.pageId);
        if (!barcode) return;

        let script = await executeSqlStoredProc_FirstValue(
            "ПИК_Лист_Поступил_ШтрихКод",
            this.taskId,
            barcode.barcode,
            barcode.barcodeType,
            this.fromType,
            this.fromId,
            this.intoType,
            this.intoId,
        );
        try {
            await eval("(()=>{" + script + "})()");
            this.forceUpdate();
        } catch (e) {
            showErrorMessage(
                " sql-процедура '" + "ПИК_Лист_Поступил_ШтрихКод" + "' вернула скрипт с ошибкой:",
                e.message,
                "{\n" + script + "\n}"
            );
        }


        // let row = await executeSqlStoredProc_FirstRowOrNull("ШтрихКод_Инфо", barcode.barcode);
        // console.log("barcode--------", barcode, row);
        // //PlaySound.неизвестный_штрих_код();
        // PlaySound.паллета(barcode.barcode);
        //
        // //showSnack("неизвестный штрих-код","error");
        // //playSound("unknown-barcode");

    }

    componentDidMount() {
        this.barcodeProcessorHandler = setInterval(this.barcodeProcessor.bind(this), 100);

        if (this.props.visible && !this.docHeader) {
            this.loadDocHeader();
        }

    };

    componentWillUnmount() {
        clearInterval(this.barcodeProcessorHandler)

    };

    componentDidUpdate() {
        if (this.props.visible && !this.docHeader) {
            this.loadDocHeader();
        }
    };

    render() {

        let classes: any = {};
        let iconStyle = {fontSize: "20px", width: "auto"};

        if (!this.docHeader)
            return null;

        return (

            <div
                className={"back-color-pik"}
                style={{
                    height: "100%",
                    paddingLeft: 5,
                    paddingRight: 5,
                    display: this.props.visible ? "flex" : "none",
                    flexDirection: "column",

                }}>
                <div style={{marginBottom:5}}>
                        <span style={{color: "GOLDENROD"}}>
                            ПИК <strong>{this.docHeader.Номер}</strong>, горит
                        </span>
                    <span style={{color: "GOLDENROD"}}>
                            Заявка Ч343, 12.01.2019, ООО "Серые костыли"
                        </span>

                </div>
                <div className="input-group input-group-sm" style={{marginBottom:5}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 58}}>Откуда</span>
                    </div>
                    <input id="username3" name="username3" className="form-control" value={this.fromStr}/>
                    <div className="input-group-append">
                        <span className="input-group-text">
                        <i className="far fa-bars"></i>
                        </span>
                    </div>
                </div>
                <div className="input-group input-group-sm" style={{marginBottom:5}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 58}}>Куда</span>
                    </div>
                    <input id="username3" name="username3" className="form-control" value={this.intoStr}/>
                    <div className="input-group-append">
                        <span className="input-group-text">
                        <i className="far far fa-plus"></i>
                        </span>
                        <span className="input-group-text">
                        <i className="far fa-box-check"></i>
                        </span>
                        <span className="input-group-text">
                        <i className="far fa-bars"></i>
                        </span>
                    </div>
                </div>
                <div style={{flex: 1, display: (this.activeTab == "Путь" ? "" : "none")}}>
                    <div style={{display: "flex", height: "100%", flexDirection: "column"}}>
                            <span style={{textAlign: "center", color: "darkgray"}}>
                                ПОРЯДОК ОБХОДА
                            </span>
                        <SqlGrid style={{flex: 1}} sqlProcName={"ПИК_Лист_Порядок_обхода"}
                                 sqlProcParams={[this.taskId]}/>
                    </div>
                </div>
                <div style={{flex: 1, display: (this.activeTab == "Паллета" ? "" : "none")}}>
                    <div style={{display: "flex", height: "100%", flexDirection: "column"}}>
                            <span style={{textAlign: "center", color: "darkgray"}}>
                                ПОДБОР С ПАЛЛЕТЫ
                            </span>
                        <SqlGrid style={{flex: 1}} sqlProcName={"СписокТМЦ"} sqlProcParams={[]}/>
                    </div>
                </div>
                <div style={{
                    flex: 0,
                    //position: "fixed",
                    //height: 70,
                    //bottom: 0,
                    //width: "100%"
                }}>
                    <nav className="navbar navbar-icon-top navbar-expand" style={{padding: 0}}>

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className="nav-link" href="#"
                                   onTouchStart={() => {
                                       playSound_ButtonClick();
                                       appState.closeActivePage();
                                   }}
                                >
                                    <i className="far fa-arrow-alt-left"></i>
                                    Назад
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"
                                   onTouchStart={() => {
                                       playSound_ButtonClick();
                                       this.activeTab = "Путь";
                                       this.forceUpdate();
                                   }}
                                >
                                    <i className="far fa-person-dolly">
                                        {/*<span className="badge badge-danger">11</span>*/}
                                    </i>
                                    Обход
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link disabled" href="#"
                                   onTouchStart={() => {
                                       playSound_ButtonClick();
                                       this.activeTab = "Паллета";
                                       this.forceUpdate();
                                   }}
                                >
                                    <i className="fa fa-question-circle">

                                    </i>
                                    Паллета
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="fa fa-cog"></i>
                                    Настр.
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#"
                                   onTouchStart={() => {
                                       playSound_ButtonClick();
                                       appState.openPage(TestBarcodesPage, {
                                           pageId: TestBarcodesPage.PAGE_ID,
                                           taskId: this.taskId
                                       })
                                   }}
                                >
                                    <i className="fas fa-barcode"></i>
                                    Тест
                                </a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="#">
                                    <i className="far fa-check-circle"></i>
                                    Готово
                                </a>
                            </li>
                        </ul>

                    </nav>
                </div>

            </div>

        )
    }
}

//
