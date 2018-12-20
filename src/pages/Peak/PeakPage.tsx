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
import {I_ПИК_Лист_тестовые_штрихкоды, TestBarcodesPage} from "../TestBarcodesPage";
import {showErrorMessage} from "../../modals/ErrorMessageModal";
import Button from "reactstrap/lib/Button";
import {getSubcontoTextColorClass} from "../../utils/getSubcontoTextColorClass";
import classNames from "classnames";
import {
    I_ПИК_Лист_Поступил_ШтрихКод_req,
    I_ПИК_Лист_Поступил_ШтрихКод_ans, ПИК_Лист_Поступил_ШтрихКод_proc
} from "../../wmsapi/ПИК_Лист_Поступил_ШтрихКод";
import {call_wmsapi} from "../../utils/call_wmsapi";

export interface IPeakPageProps extends IAppPageProps {

}


export class PeakPage extends React.Component<IPeakPageProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }


    activeTab: "Путь" | "Паллета" = "Путь";

    taskId: number = 1468646;

    fromType: string = "";
    fromId: number = -1;
    fromName: string = "не выбрано";

    intoType: string = "";
    intoId: number = -1;
    intoName: string = "не выбрано";

    docHeader: any = null;

    reloadTaskStateCounter: number = 0;

    async reloadTaskState() {
        await this.loadDocHeader();
        this.reloadTaskStateCounter++;
        this.forceUpdate();
    }

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

        let req: I_ПИК_Лист_Поступил_ШтрихКод_req = {
            taskId: this.taskId,
            barcode: barcode.barcode,
            barcodeType: barcode.barcodeType,
            fromType: this.fromType,
            fromId: this.fromId,
            intoType: this.intoType,
            intoId: this.intoId,
        };


        let ans = await call_wmsapi<I_ПИК_Лист_Поступил_ШтрихКод_ans>(ПИК_Лист_Поступил_ШтрихКод_proc, req);

        if (ans.error) {
            PlaySound.ошибка("ошибка");
        } else if (ans.неизвестный_штрих_код) {
            PlaySound.неизвестный_штрих_код();
        } else if (ans.штрихкод_не_подходит) {
            PlaySound.штрихкод_не_подходит(barcode.barcodeType, barcode.barcode);
        } else if (ans.не_выбрана_паллета_откуда) {
            PlaySound.не_выбрана_паллета_откуда();
        } else if (ans.не_выбрана_паллета_куда) {
            PlaySound.не_выбрана_паллета_куда();
        } else if (ans.паллета_куда) {
            this.intoType = ans.паллета_куда.intoType;
            this.intoId = ans.паллета_куда.intoId;
            this.intoName = ans.паллета_куда.intoName;
            PlaySound.паллета_куда(barcode.barcode);
            this.forceUpdate();
        } else if (ans.паллета_откуда) {
            this.fromType = ans.паллета_откуда.fromType;
            this.fromId = ans.паллета_откуда.fromId;
            this.fromName = ans.паллета_откуда.fromName;
            PlaySound.паллета_откуда(barcode.barcode);
            this.forceUpdate();
        } else if (ans.паллета_коробка_взята_в_подбор) {
            this.intoType = ans.паллета_коробка_взята_в_подбор.palboxType;
            this.intoId = ans.паллета_коробка_взята_в_подбор.palboxId;
            this.intoName = ans.паллета_коробка_взята_в_подбор.palboxName;
            if (this.intoType == "PAL")
                PlaySound.паллета_взята_в_подбор(barcode.barcode);
            else if (this.intoType == "BOX")
                PlaySound.коробка_взята_в_подбор(barcode.barcode);
            else
                throw "barcodeProcessor(): неизвестный тип " + this.fromType;

            this.forceUpdate();

            throw "проверка";

        }
        else
            console.error("ошибка",ans)


    }


    // async barcodeProcessor() {
    //     if (!this.props.visible) return;
    //     let barcode = appState.getNextBarcodeFromQueue(this.props.pageId);
    //     if (!barcode) return;
    //
    //     let script = await executeSqlStoredProc_FirstValue(
    //         "ПИК_Лист_Поступил_ШтрихКод",
    //         this.taskId,
    //         barcode.barcode,
    //         barcode.barcodeType,
    //         this.fromType,
    //         this.fromId,
    //         this.intoType,
    //         this.intoId,
    //     );
    //     try {
    //         await eval("(()=>{" + script + "})()");
    //         this.forceUpdate();
    //     } catch (e) {
    //         showErrorMessage(
    //             " sql-процедура '" + "ПИК_Лист_Поступил_ШтрихКод" + "' вернула скрипт с ошибкой:",
    //             e.message,
    //             "{\n" + script + "\n}"
    //         );
    //     }
    //
    //
    // }

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

        let fromInputClassName = classNames({
            "form-control": true,
            "text-color-red": this.fromType == "",
            [getSubcontoTextColorClass(this.fromType)]: this.fromType != ""
        });
        let intoInputClassName = classNames({
            "form-control": true,
            "text-color-red": this.intoType == "",
            [getSubcontoTextColorClass(this.intoType)]: this.intoType != ""
        });
        // if (this.fromType != "")
        //     fromInputClassName += "text-color-red";
        // else
        //     fromInputClassName += getSubcontoTextColorClass(this.fromType);

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
                <div style={{marginBottom: 5}}>
                        <span style={{color: "GOLDENROD"}}>
                            ПИК <strong>{this.docHeader.Номер}</strong>, горит
                        </span>
                    <span style={{color: "GOLDENROD"}}>
                            Заявка Ч343, 12.01.2019, ООО "Серые костыли"
                        </span>

                </div>
                <div className="input-group input-group-sm" style={{marginBottom: 5}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 58}}>Откуда</span>
                    </div>
                    <input className={fromInputClassName} value={this.fromName} style={{fontWeight: "bold"}}/>
                    <div className="input-group-append">
                        <span className="input-group-text">
                        <i className="far fa-bars"></i>
                        </span>
                    </div>
                </div>
                <div className="input-group input-group-sm" style={{marginBottom: 5}}>
                    <div className="input-group-prepend">
                        <span className="input-group-text" style={{width: 58}}>Куда</span>
                    </div>
                    <input className={intoInputClassName} value={this.intoName} style={{fontWeight: "bold"}}/>
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
                        <SqlGrid style={{flex: 1}}
                                 sqlProcName={"ПИК_Лист_Порядок_обхода"}
                                 sqlProcParams={[this.taskId]}
                                 reloadCounter={this.reloadTaskStateCounter}
                        />
                    </div>
                </div>
                <div style={{flex: 1, display: (this.activeTab == "Паллета" ? "" : "none")}}>
                    <div style={{display: "flex", height: "100%", flexDirection: "column"}}>
                            <span style={{textAlign: "center", color: "darkgray"}}>
                                ПОДБОР С ПАЛЛЕТЫ
                            </span>
                        <SqlGrid style={{flex: 1}} sqlProcName={"СписокТМЦ"} sqlProcParams={[]}
                                 reloadCounter={this.reloadTaskStateCounter}/>
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
                                <a className="nav-link" href="#"
                                   onTouchStart={() => {
                                       playSound_ButtonClick();
                                       this.reloadTaskState();
                                   }}
                                >
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
