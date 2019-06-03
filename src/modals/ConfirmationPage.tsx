import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { playSound_ButtonClick } from "../utils/playSound";
import { sleep } from "../utils/sleep";
import { getRandomString } from "../utils/getRandomString";
import { ReactNode } from "react";



export interface I_Confirmation_PageProps extends IAppPageProps {
    title: ReactNode;
    message: ReactNode;
    buttonText: ReactNode;
}

export async function getConfirmation(message: ReactNode, title: ReactNode = "Подтверждение", buttonText: ReactNode = "Ok"): Promise<boolean> {
    appState.modalResult = undefined;
    appState.openModal(Confirmation_Page, { pageId: getRandomString(), message: message, title: title, buttonText: buttonText });
    return new Promise<any>(
        async (resolve: (res: any) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });
}


export class Confirmation_Page extends React.Component<I_Confirmation_PageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }


    componentDidMount() {
    };


    render(): React.ReactNode {
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"}>{this.props.title}</ModalHeader>
                    <ModalBody className={"text-primary"}>
                        {this.props.message}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light"
                            onClick={() => {
                                playSound_ButtonClick();
                                appState.setModalResult<boolean>(false);
                            }}>
                            Отмена
                        </Button>
                        <Button color="primary"
                            onClick={() => {
                                playSound_ButtonClick();
                                appState.setModalResult<boolean>(true);
                            }}>
                            {this.props.buttonText}
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

