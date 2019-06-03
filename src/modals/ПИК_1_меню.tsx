import * as  React from "react";
import { appState } from "../AppState";
import { IAppPageProps } from "../pages/AppWindow";
import Button from "reactstrap/lib/Button";
import Modal from "reactstrap/lib/Modal";
import ModalHeader from "reactstrap/lib/ModalHeader";
import ModalBody from "reactstrap/lib/ModalBody";
import ModalFooter from "reactstrap/lib/ModalFooter";


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
                            onClick={() => appState.setModalResult(true)}>
                            Выбрать по маршруту
                        </Button>
                        <br />
                        <Button color="primary" style={{ marginBottom: 10 }}
                            onClick={() => appState.setModalResult(true)}>
                            Выбрать задание (вручную)
                        </Button>
                        <br />
                        <Button color="primary" style={{ marginBottom: 10 }}
                            onClick={() => appState.setModalResult(true)}>
                            Получить задание (авто)
                        </Button>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary"
                            onClick={() => appState.setModalResult(false)}>
                            Отмена
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

}

