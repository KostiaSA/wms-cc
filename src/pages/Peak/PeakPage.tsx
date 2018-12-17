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
                    <div>
                        <span  style={{color: "GOLDENROD"}}>
                            ПИК <strong>{this.docHeader.Номер}</strong>, горит
                        </span>
                        <span   style={{color: "GOLDENROD"}}>
                            Заявка Ч343, 12.01.2019, ООО "Серые костыли"
                        </span>

                    </div>
                    <table style={{width: "100%", borderSpacing: 2}}>
                        <tbody>
                        <tr>
                            <td>
                                <span  style={{display: "inline", color: "darkgray"}}>
                                    откуда
                                </span>
                            </td>
                            <td style={{textAlign: "left"}}>
                                <span  style={{display: "inline"}}>
                                    {this.fromStr}
                                </span>

                            </td>
                            {/*<td style={{textAlign: "right"}}>*/}
                                {/*<Fab color="default" size="small" aria-label="Add" className={classes.fab}*/}
                                     {/*style={{minHeight: 26, height: 26, width: 26}}*/}
                                {/*>*/}

                                    {/*<Icon style={{overflow: "visible", fontSize: 11}}*/}
                                          {/*className={classNames('far fa-bars')}/>*/}
                                {/*</Fab>*/}
                            {/*</td>*/}
                        </tr>
                        <tr>
                            <td style={{textAlign: "left"}}>
                                <span  style={{display: "inline", color: "darkgray"}}>
                                    куда
                                </span>
                            </td>
                            <td style={{textAlign: "left"}}>
                                <span  style={{display: "inline"}}>
                                    {this.intoStr}
                                </span>

                            </td>
                            {/*<td style={{textAlign: "right"}}>*/}
                                {/*<Fab color="default" size="small" aria-label="Add" className={classes.fab}*/}
                                     {/*style={{marginLeft: 5, minHeight: 26, height: 26, width: 26}}*/}
                                {/*>*/}

                                    {/*<Icon style={{overflow: "visible", fontSize: 11}}*/}
                                          {/*className={classNames('far fa-box-check')}/>*/}
                                {/*</Fab>*/}
                                {/*<Fab color="default" size="small" aria-label="Add" className={classes.fab}*/}
                                     {/*style={{marginLeft: 5, minHeight: 26, height: 26, width: 26}}*/}
                                {/*>*/}

                                    {/*<Icon style={{overflow: "visible", fontSize: 11}}*/}
                                          {/*className={classNames('far fa-plus')}/>*/}
                                {/*</Fab>*/}
                                {/*<Fab color="default" size="small" aria-label="Add" className={classes.fab}*/}
                                     {/*style={{marginLeft: 5, minHeight: 26, height: 26, width: 26}}*/}
                                {/*>*/}

                                    {/*<Icon style={{overflow: "visible", fontSize: 11}}*/}
                                          {/*className={classNames('far fa-bars')}/>*/}
                                {/*</Fab>*/}
                            {/*</td>*/}
                        </tr>
                        </tbody>
                    </table>
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
                        <Button><i className="fa fa-user"></i><br/>Один</Button>
                        <Button><i className="fa fa-user"></i>Два</Button>
                    </div>
                    {/*<BottomNavigation*/}
                        {/*value="Меню"*/}
                        {/*showLabels*/}
                        {/*//className={classes.stickToBottom}*/}
                        {/*// onChange={(event: any, value: any) => {*/}
                        {/*//     appState.switchToPageByBottomBarIndex(value);*/}
                        {/*//     this.forceUpdate();*/}
                        {/*// }}*/}

                    {/*>*/}
                        {/*<BottomNavigationAction label="Назад"*/}
                                                {/*style={{minWidth: 0}}*/}
                                                {/*icon={<Icon style={iconStyle}*/}
                                                            {/*className={classNames("far fa-arrow-alt-left")}/>}*/}
                                                {/*onClick={() => {*/}
                                                    {/*playSound_ButtonClick();*/}
                                                    {/*appState.closeActivePage();*/}
                                                {/*}}*/}
                        {/*/>*/}
                        {/*<BottomNavigationAction label="Обход"*/}
                                                {/*style={{minWidth: 0}}*/}
                                                {/*icon={<Icon style={iconStyle}*/}
                                                            {/*className={classNames('far fa-person-dolly')}/>}*/}
                                                {/*onClick={() => {*/}
                                                    {/*playSound_ButtonClick();*/}
                                                    {/*this.activeTab = "Путь";*/}
                                                    {/*this.forceUpdate();*/}
                                                {/*}}*/}
                        {/*/>*/}
                        {/*<BottomNavigationAction label="Паллета"*/}
                                                {/*style={{minWidth: 0}}*/}
                                                {/*icon={<Icon style={iconStyle}*/}
                                                            {/*className={classNames('fa fa-question-circle')}/>}*/}
                                                {/*onClick={() => {*/}
                                                    {/*playSound_ButtonClick();*/}
                                                    {/*this.activeTab = "Паллета";*/}
                                                    {/*this.forceUpdate();*/}
                                                {/*}}*/}
                        {/*/>*/}
                        {/*<BottomNavigationAction label="Настр." style={{minWidth: 0}}*/}
                                                {/*icon={<Icon style={iconStyle} className={classNames('fa fa-cog')}*/}
                                                            {/*onClick={() => {*/}
                                                                {/*playSound_ButtonClick();*/}
                                                                {/*showInfoMessage("привет!", "уроды");*/}
                                                            {/*}}*/}
                                                {/*/>}*/}
                        {/*/>*/}
                        {/*<BottomNavigationAction label="Тест" style={{minWidth: 0}}*/}
                                                {/*icon={<Icon style={iconStyle} className={classNames('fas fa-barcode')}*/}
                                                            {/*onClick={() => {*/}
                                                                {/*playSound_ButtonClick();*/}
                                                                {/*appState.openPage(TestBarcodesPage, {*/}
                                                                    {/*pageId: TestBarcodesPage.PAGE_ID,*/}
                                                                    {/*taskId: this.taskId*/}
                                                                {/*})*/}
                                                            {/*}}*/}
                                                {/*/>}*/}
                        {/*/>*/}
                        {/*<BottomNavigationAction label="Готово" style={{minWidth: 0}}*/}
                                                {/*icon={<Icon style={iconStyle}*/}
                                                            {/*className={classNames('far fa-check-circle')}/>}/>*/}
                    {/*</BottomNavigation>*/}

                </div>

        )
    }
}
//
