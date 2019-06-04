import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { _wms_android_Главное_меню_Список_Новых_Заданий, _wms_android_ПИК_получить_задание, IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании } from "../generated-api";
import Container from "reactstrap/lib/Container";
import CardBody from "reactstrap/lib/CardBody";
import { CSSProperties } from 'react';

export interface IИнформация_о_задании_PageProps extends IAppPageProps {
    taskId: number;
}

export function show_Информация_о_задании(taskId: number) {
    appState.openPage<IИнформация_о_задании_PageProps>(Информация_о_задании_Page, { pageId: "Информация_о_задании_" + taskId, taskId: taskId });
}



export class Информация_о_задании_Page extends React.Component<IИнформация_о_задании_PageProps> {
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
                <td style={labelStyle}>время начала</td>
                <td style={{ ...textStyle, color: "dodgerblue" }} > {this.task.ВремяНачалаПлан.format("DD.MM.YYYY HH:mm")}</td>
            </tr>
        )
        let времяКонца = (
            <tr>
                <td style={labelStyle}>время конца</td>
                <td style={{ ...textStyle, color: "dodgerblue" }} > {this.task.ВремяОкончанияПлан.format("DD.MM.YYYY HH:mm")}</td>
            </tr>
        )

        return (
            <div className={"app"} style={{ display: this.props.visible ? "" : "none", backgroundColor: "ALICEBLUE", padding: 10, width: "100%" }}>


                <div className="card">
                    <div className="card-header">
                        {this.task.НазваниеЗадания}
                    </div>
                    <div className="card-body" style={{ padding: 10 }}>
                        <table>
                            <tbody>
                                {подразделение}
                                {исполнитель}
                                {времяНачала}
                                {времяКонца}
                            </tbody>
                        </table>
                    </div>
                </div>



            </div>
        )
    }
}


