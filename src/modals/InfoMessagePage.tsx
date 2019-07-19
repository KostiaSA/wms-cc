import * as  React from "react";
import { zebraTextToSpeech } from "../zebra/ZebraApi";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { getRandomString } from "../utils/getRandomString";
import { ReactNode } from "react";
import { playSound } from "../utils/playSound";
import { sleep } from "../utils/sleep";
import { BuhtaButton } from "../ui/BuhtaButton";


export async function showInfo(message: ReactNode, title: ReactNode = "Инфо") {
    appState.openModal(InfoMessagePage, { pageId: getRandomString(), message, title });
    //playSound("Info");
    //await sleep(700);
    //zebraTextToSpeech("Ошибка");
}


interface IInfoMessagePageProps extends IAppPageProps {
    title: ReactNode;
    message: ReactNode;
}


class InfoMessagePage extends React.Component<IInfoMessagePageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }


    componentDidMount() {
    };


    render(): React.ReactNode {
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window info-message-page" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-secondary"} style={{ zoom: appState.zoom }}>{this.props.title}</ModalHeader>
                    <ModalBody className={"text-info"} style={{ zoom: appState.zoom }}>
                        {this.props.message}
                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="light" className="cy-cancel cy-ok"
                            onClick={() => { appState.modalResult = true, appState.closeActiveModal() }}>
                            Закрыть
                        </BuhtaButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

