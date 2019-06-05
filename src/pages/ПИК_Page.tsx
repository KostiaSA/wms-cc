import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { CSSProperties } from 'react';
import { getTaskConst } from '../taskConst';
import { BuhtaButton } from '../ui/BuhtaButton';
import { showError } from "../modals/ErrorMessagePage";
import { IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании } from "../generated-api";
import classNames from "classnames";
import { getSubcontoTextColorClass } from '../utils/getSubcontoTextColorClass';

export interface IПИК_PageProps extends IAppPageProps {
    taskId: number;
}

export function show_ПИК(taskId: number) {
    appState.openPage<IПИК_PageProps>(ПИК_Page, { pageId: "ПИК_" + taskId, taskId: taskId });
}



export class ПИК_Page extends React.Component<IПИК_PageProps> {
    task: IResult_wms_android_Информация_о_задании;

    fromType: string = "";
    fromId: number = -1;
    fromName: string = "не выбрано";

    intoType: string = "";
    intoId: number = -1;
    intoName: string = "не выбрано";

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


        let объединенная = null;
        if (this.task.Объединенная > 0)
            объединенная = <div style={{ color: "brown" }}>Объединенная заявка!</div>;

        let паллета4 = null;
        if (true) {
            паллета4 = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
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
                    style={{ marginLeft: 10 }}
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
                    style={{ marginLeft: 10 }}
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

        let fromInputClassName = classNames({
            "text-color-red": this.fromType == "",
            [getSubcontoTextColorClass(this.fromType)]: this.fromType != ""
        });

        let intoInputClassName = classNames({
            "text-color-red": this.intoType == "",
            [getSubcontoTextColorClass(this.intoType)]: this.intoType != ""
        });

        return (
            <div className={"app"} style={{ display: this.props.visible ? "flex" : "none", flexDirection: "column", backgroundColor: "whitesmoke", padding: 0, width: "100%" }}>


                <div className="card" style={{ marginBottom: 0, flex: "1" }}>
                    <div className="card-header" style={{ backgroundColor: getTaskConst(this.task.Тип).headerBackground }}>
                        <div>{this.task.НазваниеЗадания}</div>
                        {объединенная}
                    </div>

                    <div className="card-body" style={{ padding: 10 }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td style={{ ...labelStyle }}>Пал.откуда</td>
                                    <td className={fromInputClassName} style={{ ...textStyle }}>{this.fromName}</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td style={{ ...labelStyle }}>Пал.куда</td>
                                    <td className={intoInputClassName} style={{ ...textStyle }}>{this.intoName}</td>
                                    <td>
                                        <BuhtaButton small color="success">завершить пал.</BuhtaButton>
                                    </td>
                                </tr>
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


