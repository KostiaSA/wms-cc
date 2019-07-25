import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";

import { sleep } from "../utils/sleep";
import { getRandomString } from "../utils/getRandomString";
import { ReactNode } from "react";
import { BuhtaButton } from "../ui/BuhtaButton";
import { stringMessageToReactNode } from "../utils/stringMessageToReactNode";
import { playSound } from "../utils/playSound";




export interface I_Confirmation_PageProps extends IAppPageProps {
    title: ReactNode;
    message: ReactNode;
    buttonText: ReactNode;
}

export async function getWarningConfirmation(message: ReactNode, title: ReactNode = "Подтверждение", buttonText: ReactNode = "Ok"): Promise<boolean> {
    appState.modalResult = undefined;
    appState.openModal(WarningConfirmation_Page, { pageId: getRandomString(), message: message, title: title, buttonText: buttonText });
    return new Promise<any>(
        async (resolve: (res: any) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


class WarningConfirmation_Page extends React.Component<I_Confirmation_PageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }


    componentDidMount() {
        playSound("error-lite");
    };


    render(): React.ReactNode {
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window cy-dialog-confirm confirmation-page" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-warning"} style={{ zoom: appState.zoom }}>{this.props.title}</ModalHeader>
                    <ModalBody className={"text-warning"} style={{ zoom: appState.zoom }}>
                        {stringMessageToReactNode(this.props.message)}
                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <BuhtaButton className="cy-cancel" color="light"
                            onClick={() => {
                                appState.setModalResult<boolean>(false);
                            }}>
                            Отмена
                        </BuhtaButton>
                        <BuhtaButton className="cy-ok" color="warning"
                            onClick={() => {
                                appState.setModalResult<boolean>(true);
                            }}>
                            {this.props.buttonText}
                        </BuhtaButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

