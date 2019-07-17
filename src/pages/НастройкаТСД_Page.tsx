import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { BuhtaButton } from "../ui/BuhtaButton";
import { _wms_android_Сохранить_настройки_ТСД } from "../generated-api";

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

        return (
            <div className={"app cy-nastroika-tsd " + (this.props.visible ? "active-win" : "")} style={{ display: this.props.visible ? "" : "none", backgroundColor: "whitesmoke", padding: 10, width: "100%" }}>

                <div className="card" style={{ marginBottom: 0 }}>
                    <div className="card-header" style={{ textAlign: "center", zoom: appState.zoom, backgroundColor: "white" }}>
                        <div>НАСТРОЙКА ТСД</div>
                    </div>
                    <div className="card-body" style={{ zoom: appState.zoom, padding: 10 }}>
                        <div className="form-horizontal">
                            <div className="form-group row">
                                <label className="col-md-3 col-form-label">размер шрифта</label>
                                <div className="col-md-9">
                                    <select
                                        className="form-control form-control"
                                        name="select3"
                                        onChange={async (event: any) => {
                                            console.log(event.target.value); await appState.сохранить_настройки_ТСД("zoom", Number.parseFloat(event.target.value)); appState.appWindow.forceUpdate();
                                        }}
                                    >
                                        <option value="0.8" selected={appState.настройки_ТСД("zoom") == 0.8}>маленький</option>
                                        <option value="0.9" selected={appState.настройки_ТСД("zoom") == 0.9}>уменьшенный</option>
                                        <option value="1" selected={appState.настройки_ТСД("zoom") == 1}>нормальный</option>
                                        <option value="1.1" selected={appState.настройки_ТСД("zoom") == 1.1}>увеличенный</option>
                                        <option value="1.2" selected={appState.настройки_ТСД("zoom") == 1.2}>большой</option>
                                        <option value="1.3" selected={appState.настройки_ТСД("zoom") == 1.3}>очень большой</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        {/* <table>
                            <tbody>
                            </tbody>
                        </table> */}
                    </div>
                </div>
                <div style={{ zoom: appState.zoom, textAlign: "right" }}>
                    <div style={{ marginTop: 10 }}>
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="secondary"
                            outline
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


