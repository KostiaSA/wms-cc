import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { CSSProperties } from 'react';
import { BuhtaButton } from "../ui/BuhtaButton";

export interface IНастройкаТСД_PageProps extends IAppPageProps {

}

export function show_НастройкаТСД() {
    appState.openPage<IНастройкаТСД_PageProps>(НастройкаТСД_Page, { pageId: "НастройкаТСД" });
}



export class НастройкаТСД_Page extends React.Component<IНастройкаТСД_PageProps> {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            paddingLeft: 5,
        };

        // let зона: any = null;
        // if (getTaskConst(this.task.Тип).показыватьЗонуВИнфо) {
        //     зона = (
        //         <tr>
        //             <td style={{ ...labelStyle, paddingTop: 10 }}>зона ПРР</td>
        //             <td style={{ ...textStyle, paddingTop: 10 }}>{this.task.Зона}</td>
        //         </tr>
        //     )
        // }



        return (
            <div className={"app"} style={{ display: this.props.visible ? "" : "none", backgroundColor: "whitesmoke", padding: 10, width: "100%" }}>

                <div className="card" style={{ marginBottom: 0 }}>
                    <div className="card-header" style={{ textAlign: "center", zoom: appState.zoom, backgroundColor: "white" }}>
                        <div>НАСТРОЙКА ТСД</div>
                    </div>
                    <div className="card-body" style={{ zoom: appState.zoom, padding: 10 }}>
                        <table>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
                <div style={{ zoom: appState.zoom, textAlign: "right" }}>
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
                            назад
                            </BuhtaButton>
                    </div>
                </div>



            </div>
        )
    }

}


