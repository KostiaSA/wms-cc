import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { BuhtaButton } from "../ui/BuhtaButton";



export type ПИК_1_меню_Page_ModalResult = "Выбрать по маршруту" | "Выбрать задание (вручную)" | "Получить задание (авто)" | "Нет";

export interface I_ПИК_1_меню_PageProps extends IAppPageProps {

}

export class ПИК_1_меню_Page extends React.Component<I_ПИК_1_меню_PageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }


    componentDidMount() {
    };


    render(): React.ReactNode {
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(this.props.visible ? "active-win" : "")} isOpen centered fade={false} >
                    <ModalHeader className={"text-danger22"} style={{ zoom: appState.zoom }}>{"выбор задания ПИК"}</ModalHeader>
                    <ModalBody className="cy-pick-2-menu-page" style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="primary" style={{ marginBottom: 10 }}
                            onClick={() => {
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Выбрать по маршруту");
                            }}>
                            Выбрать по маршруту
                        </BuhtaButton>
                        <br />
                        <BuhtaButton color="primary" style={{ marginBottom: 10 }}
                            onClick={() => {
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Выбрать задание (вручную)");
                            }}>
                            Выбрать задание (вручную)
                        </BuhtaButton>
                        <br />
                        <BuhtaButton color="primary" style={{ marginBottom: 10 }}
                            onClick={() => {
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Получить задание (авто)")
                            }}>
                            Получить задание (авто)
                        </BuhtaButton>
                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="light"
                            onClick={() => {
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Нет")
                            }}>
                            Отмена
                        </BuhtaButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

