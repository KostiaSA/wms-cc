import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";
import { playSound_ButtonClick } from "../utils/playSound";


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
                <Modal isOpen centered fade={false}>
                    <ModalHeader className={"text-danger22"}>{"выбор задания ПИК"}</ModalHeader>
                    <ModalBody>
                        <Button color="primary" style={{ marginBottom: 10 }}
                            onClick={() => {
                                playSound_ButtonClick();
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Выбрать по маршруту");
                            }}>
                            Выбрать по маршруту
                        </Button>
                        <br />
                        <Button color="primary" style={{ marginBottom: 10 }}
                            onClick={() => {
                                playSound_ButtonClick();
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Выбрать задание (вручную)");
                            }}>
                            Выбрать задание (вручную)
                        </Button>
                        <br />
                        <Button color="primary" style={{ marginBottom: 10 }}
                            onClick={() => {
                                playSound_ButtonClick();
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Получить задание (авто)")
                            }}>
                            Получить задание (авто)
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="light"
                            onClick={() => {
                                playSound_ButtonClick();
                                appState.setModalResult<ПИК_1_меню_Page_ModalResult>("Нет")
                            }}>
                            Отмена
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

