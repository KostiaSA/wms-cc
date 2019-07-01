import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";

import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { BuhtaButton } from "../ui/BuhtaButton";



export type РАЗГР_меню_Page_ModalResult = "Выбор задания" | "Назначить задание (auto)" | "Прием без задания" | "Нет";

export interface I_РАЗГР_меню_PageProps extends IAppPageProps {

}

export class РАЗГР_меню_Page extends React.Component<I_РАЗГР_меню_PageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }


    componentDidMount() {
    };


    render(): React.ReactNode {
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal isOpen centered fade={false} >
                    <ModalHeader style={{ zoom: appState.zoom }}>{"выбор задания РАЗГРУЗКА"}</ModalHeader>
                    <ModalBody className="cy-razgr-menu-page" style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="primary" style={{ marginBottom: 10, display: "block" }}
                            onClick={() => {
                                appState.setModalResult<РАЗГР_меню_Page_ModalResult>("Выбор задания");
                            }}>
                            Выбрать задание из списка
                        </BuhtaButton>

                        <BuhtaButton color="primary" style={{ marginBottom: 10, display: "block" }}
                            onClick={() => {
                                appState.setModalResult<РАЗГР_меню_Page_ModalResult>("Назначить задание (auto)");
                            }}>
                            Получить задание (авто)
                        </BuhtaButton>

                        <BuhtaButton color="primary" style={{ marginBottom: 10, display: "block" }} accessRasdel="MOBILE_ПРИЕМ_Б/З"
                            onClick={() => {
                                appState.setModalResult<РАЗГР_меню_Page_ModalResult>("Прием без задания")
                            }}>
                            Прием без задания
                        </BuhtaButton>
                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="light"
                            onClick={() => {
                                appState.setModalResult<РАЗГР_меню_Page_ModalResult>("Нет")
                            }}>
                            Отмена
                        </BuhtaButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

