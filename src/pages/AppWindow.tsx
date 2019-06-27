import * as  React from "react";
import { appState, IOpenedPage } from "../AppState";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


interface IAppWindowProps {
    classes?: any;
}

export interface IAppPageProps {
    pageId: string;
    visible?: boolean;
    onClose?: () => void;
    disableBarcodes?: boolean;
}


export class AppWindow extends React.Component<IAppWindowProps, any> {


    render() {


        let snack: any = null;
        // if (appState.snack) {
        //     snack = <Snackbar {...appState.snack}></Snackbar>
        // }

        let sqlWaitPanel = null;
        if (appState.sqlWaitPanelVisible) {

            let sqlWaitPanelIcon: HTMLElement;
            sqlWaitPanel = (
                <div style={{ zIndex: 100000, border: "0px solid red", left: 0, top: 0, right: 0, bottom: 0, position: "absolute", background: "#ffffff3b", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span ref={(e) => sqlWaitPanelIcon = e} style={{ display: "none" }}>
                        <i className="fas fa-spinner fa-spin" style={{ fontSize: 30, color: "brown" }}></i>
                    </span>
                </div>
            );

            setTimeout(() => { if (sqlWaitPanelIcon) sqlWaitPanelIcon.style.display = "initial" }, 1000);
        }

        return (

            <div style={{ height: "100%" }}>
                {appState.pages.map((page: IOpenedPage, index: number) => {
                    return (
                        <page.content
                            key={page.props.pageId}
                            visible={appState.activePageId[0] == page.props.pageId}
                            {...page.props}>

                        </page.content>);
                })}
                {appState.modals.map((modal: IOpenedPage, index: number) => {
                    return (
                        <modal.content
                            key={modal.props.pageId}
                            visible
                            {...modal.props}>

                        </modal.content>);
                })}
                <ToastContainer autoClose={2000} />
                {sqlWaitPanel}
            </div>


        )
    }


    constructor(props: any, context: any) {
        super(props, context);
    }

    componentDidMount() {
        window.addEventListener("resize", () => {
            //appState.winWidth = $(window).width()!;
            //appState.winHeight = $(window).height()!;
            this.forceUpdate();
        });

        appState.appWindow = this;
    };


}


