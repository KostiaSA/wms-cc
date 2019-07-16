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
            <div className={"app"} style={{ display: this.props.visible ? "" : "none", backgroundColor: "whitesmoke", padding: 10, width: "100%" }}>

                <div className="card" style={{ marginBottom: 0 }}>
                    {this.props.body}
                    {/* <div className="card-header" style={{ textAlign: "center", zoom: appState.zoom, backgroundColor: "white" }}>
                        <div>режим РАЗГРУЗКА</div>
                    </div>
                    <div className="card-body" style={{ zoom: appState.zoom, padding: 10 }}>
                        <h4>кнопки ага:</h4>
                    </div> */}
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
                            закрыть
                            </BuhtaButton>
                    </div>
                </div>



            </div>
        )
    }

}


