import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { CSSProperties } from 'react';
import { getTaskConst } from '../taskConst';
import { BuhtaButton } from "../ui/BuhtaButton";
import { showError } from "../modals/ErrorMessagePage";
import { IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании } from "../generated-api";

export interface IПИК_PageProps extends IAppPageProps {
    taskId: number;
}

export function show_ПИК(taskId: number) {
    appState.openPage<IПИК_PageProps>(ПИК_Page, { pageId: "ПИК_" + taskId, taskId: taskId });
}



export class ПИК_Page extends React.Component<IПИК_PageProps> {
    task: IResult_wms_android_Информация_о_задании;

    async componentDidMount() {
        this.task = await _wms_android_Информация_о_задании(this.props.taskId);
        this.forceUpdate();
    }

    componentWillUnmount() {
    }

    render() {

        let labelStyle: CSSProperties = {
            fontSize: 12,
            color: "gray"
        };

        let textStyle: CSSProperties = {
            paddingLeft: 5,
        };

        if (!this.task) {
            return (
                <div className={"app"} style={{ display: this.props.visible ? "" : "none", backgroundColor: "ALICEBLUE", padding: 10, width: "100%" }}>
                    <div className="card">
                        <div className="card-header">
                            загрузка
                            </div>
                        <div className="card-body">
                        </div>
                    </div>
                </div>
            );
        }


        let подразделение = (
            <tr>
                <td style={labelStyle}>подраздел.</td>
                <td style={textStyle}>{this.task.Подразделение2}</td>
            </tr>
        )

        let исполнитель = (
            <tr>
                <td style={labelStyle}>исполнитель</td>
                <td style={textStyle}>{this.task.Сотрудник}</td>
            </tr>
        )

        let времяНачала = (
            <tr>
                <td style={{ ...labelStyle, paddingTop: 10 }}>время начала</td>
                <td style={{ ...textStyle, color: "dodgerblue", paddingTop: 10 }} > {this.task.ВремяНачалаПлан.format("DD.MM.YYYY HH:mm")}</td>
            </tr>
        )

        let времяКонца = (
            <tr>
                <td style={labelStyle}>время конца</td>
                <td style={{ ...textStyle, color: "dodgerblue" }} > {this.task.ВремяОкончанияПлан.format("DD.MM.YYYY HH:mm")}</td>
            </tr>
        )

        let зона: any = null;
        if (getTaskConst(this.task.Тип).показыватьЗонуВИнфо) {
            зона = (
                <tr>
                    <td style={{ ...labelStyle, paddingTop: 10 }}>зона ПРР</td>
                    <td style={{ ...textStyle, paddingTop: 10 }}>{this.task.Зона}</td>
                </tr>
            )
        }

        let автомобиль: any = null;
        if (getTaskConst(this.task.Тип).показыватьАвтомобильВИнфо) {
            автомобиль = (
                <React.Fragment>
                    <tr>
                        <td style={labelStyle}>автомобиль</td>
                        <td style={textStyle}>{this.task.Автомобиль}</td>
                    </tr>
                    <tr>
                        <td style={labelStyle}>водитель</td>
                        <td style={textStyle}>{this.task.Водитель}</td>
                    </tr>
                </React.Fragment>
            )
        }


        let заявка: any = null;
        if (getTaskConst(this.task.Тип).показыватьЗаявкуВИнфо) {
            let zstyle = { ...textStyle, color: "brown" };
            заявка = (
                <React.Fragment>
                    <tr>
                        <td style={{ ...labelStyle, paddingTop: 10 }}>заявка N</td>
                        <td style={{ ...zstyle, paddingTop: 10 }}>{this.task.ЗаявкаНомер}</td>
                    </tr>
                    <tr>
                        <td style={{ ...labelStyle, paddingLeft: 15 }}>дата</td>
                        <td style={zstyle}>{this.task.ЗаявкаДата}</td>
                    </tr>
                    <tr>
                        <td style={{ ...labelStyle, paddingLeft: 15 }}>прим.</td>
                        <td style={zstyle}>{this.task.ЗаявкаПримечание.substr(0, 120)}</td>
                    </tr>
                </React.Fragment>
            )
        }

        let откудаКуда: any = null;
        if (getTaskConst(this.task.Тип).показыватьОткудаКудаВИнфо) {
            let zstyle = { ...textStyle, color: "peru" };
            заявка = (
                <React.Fragment>
                    <tr>
                        <td style={{ ...labelStyle, paddingTop: 10 }}>откуда</td>
                        <td style={{ ...zstyle, paddingTop: 10 }}>{this.task.Откуда}</td>
                    </tr>
                    <tr>
                        <td style={{ ...labelStyle, paddingLeft: 15 }}>куда</td>
                        <td style={zstyle}>{this.task.Куда}</td>
                    </tr>
                </React.Fragment>
            )
        }

        let паллета: any = null;
        if (getTaskConst(this.task.Тип).показыватьПаллетуВИнфо) {
            let zstyle = { ...textStyle, color: "cadetblue" };
            заявка = (
                <React.Fragment>
                    <tr>
                        <td style={{ ...labelStyle, paddingTop: 10 }}>паллета</td>
                        <td style={{ ...zstyle, paddingTop: 10 }}>{this.task.Паллета}</td>
                    </tr>
                </React.Fragment>
            )
        }

        let объединенная = null;
        if (this.task.Объединенная > 0)
            объединенная = <div style={{ color: "brown" }}>Объединенная заявка!</div>;

        let спецификация = null;
        if (this.task.ЕстьСпецификация) {
            спецификация = (
                <React.Fragment>
                    <tr>
                        <td style={{ ...labelStyle, paddingTop: 10 }}></td>
                        <td style={{ paddingTop: 10 }}>
                            <BuhtaButton
                                color="info"
                                outline
                                onClick={() => {
                                    //playSound_ButtonClick();
                                }}
                            >
                                открыть состав задания
                            </BuhtaButton>
                        </td>
                    </tr>
                </React.Fragment>
            )
        }

        let паллета4 = null;
        if (true) {
            паллета4 = (
                <BuhtaButton
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    паллета
                </BuhtaButton>
            )
        }

        let паллетаОткуда = null;
        if (true) {
            паллетаОткуда = (
                <BuhtaButton
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    откуда
                </BuhtaButton>
            )
        }

        let паллетаКуда = null;
        if (true) {
            паллетаКуда = (
                <BuhtaButton
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    куда
                </BuhtaButton>
            )
        }

        return (
            <div className={"app"} style={{ display: this.props.visible ? "flex" : "none", flexDirection: "column", backgroundColor: "whitesmoke", padding: 10, width: "100%" }}>


                <div className="card" style={{ marginBottom: 0, flex: "1" }}>
                    <div className="card-header" style={{ backgroundColor: getTaskConst(this.task.Тип).headerBackground }}>
                        <div>{this.task.НазваниеЗадания}</div>
                        {объединенная}
                    </div>
                    <div className="card-body" style={{ padding: 10 }}>
                        <table>
                            <tbody>
                                {подразделение}
                                {исполнитель}
                                {времяНачала}
                                {времяКонца}
                                {зона}
                                {автомобиль}
                                {откудаКуда}
                                {паллета}
                                {заявка}
                                {спецификация}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ textAlign: "right" }}>
                    <div style={{ marginTop: 10 }}>
                        {паллета4}
                        {паллетаОткуда}
                        {паллетаКуда}
                    </div>
                    <div style={{ marginTop: 10 }}>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="secondary"
                            outline
                            // onTouchStart={() => {
                            //     playSound_ButtonClick();
                            // }}
                            onClick={() => {
                                appState.closeActivePage();
                            }}
                        >
                            выход
                    </BuhtaButton>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="success"
                            onClick={() => {
                                this.doExecuteTask();
                            }}
                        >
                            завершить ПИК
                    </BuhtaButton>
                    </div>
                </div>



            </div>
        )
    }

    async doExecuteTask() {
        // if (this.task.Тип == 2) {// ПИК
        //     let result = await _wms_android_Взять_задание_в_работу_ПИК(this.props.taskId, appState.kadrId);
        //     if (result.error) {
        //         showError(result.error);
        //     }

        // }
        // else {
        //     throw new Error("doExecuteTask(): не сделано для задания типа " + this.task.Тип);
        // }
    }
}


