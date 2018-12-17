import * as  React from "react";
import {appState, IOpenedPage} from "../AppState";

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
        return (

            <div style={{height: "100%"}}>
                {appState.pages.map((page: IOpenedPage, index: number) => {
                    return (
                        <page.content
                            key={page.props.pageId}
                            visible={appState.activePageId[0] == page.props.pageId}
                            {...page.props}>

                        </page.content>);
                })}
                {snack}

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


