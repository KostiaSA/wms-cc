import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { BuhtaButton } from "../ui/BuhtaButton";

export interface IHelp_PageProps extends IAppPageProps {
    body: any;
}

export function show_Help(body: any) {
    appState.openPage<IHelp_PageProps>(Help_Page, { pageId: "Help", body });
}



export class Help_Page extends React.Component<IHelp_PageProps> {

    componentDidMount() {
    }

    componentWillUnmount() {
    }

    render() {

        return (
            <div className={"app " + (this.props.visible ? "active-win" : "")} style={{ display: this.props.visible ? "flex" : "none", flexDirection: "column", backgroundColor: "whitesmoke", padding: 0, height: "100%", width: "100%" }}>

                <div className="card help-page" style={{ flex: 1, zoom: appState.zoom, marginBottom: 0, overflow: "auto" }}>
                    {this.props.body}
                    {/* <div className="card-header" style={{ textAlign: "center", zoom: appState.zoom, backgroundColor: "white" }}>
                        <div>режим РАЗГРУЗКА</div>
                    </div>
                    <div className="card-body" style={{ zoom: appState.zoom, padding: 10 }}>
                        <h4>кнопки ага:</h4>
                    </div> */}
                </div>
                <div style={{ zoom: appState.zoom, textAlign: "right" }}>
                    <div style={{ marginTop: 5 }}>
                        <BuhtaButton
                            style={{ marginRight: 5, marginBottom: 5 }}
                            className="btn-sm"
                            color="secondary"
                            outline
                            onClick={() => {
                                appState.closeActivePage();
                            }}
                        >
                            закрыть
                            </BuhtaButton>
                    </div>
                </div>



            </div>
        )
    }

}


