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
import { stringMessageToReactNode } from "../utils/stringMessageToReactNode";


export async function showAppError(message: ReactNode, title: ReactNode = "Ошибка приложения") {
    appState.openModal(ErrorMessagePage, { pageId: getRandomString(), message, title });
    playSound("error");
    await sleep(700);
    zebraTextToSpeech("Ошибка приложения");
}

export async function showError(message: ReactNode, textToSpeech: string = ""): Promise<any> {
    appState.openModal(ErrorMessagePage, { pageId: getRandomString(), message, title: "Ошибка" });
    playSound("error");
    await sleep(700);
    if (textToSpeech != "")
        zebraTextToSpeech(textToSpeech);

    return new Promise<any>(
        async (resolve: (res: any) => void, reject: (error: string) => void) => {
            while (typeof (appState.modalResult) == "undefined")
                await sleep(10);
            let this_modalResult = appState.modalResult;
            appState.modalResult = undefined;
            resolve(this_modalResult);
        });

}


interface IErrorMessagePageProps extends IAppPageProps {
    title: ReactNode;
    message: ReactNode;
}


class ErrorMessagePage extends React.Component<IErrorMessagePageProps, any> {

    constructor(props: any, context: any) {
        super(props, context);
    }


    componentDidMount() {
    };


    render(): React.ReactNode {
        return (
            <div className="app" style={{ display: this.props.visible ? "" : "none" }}>
                <Modal className={(appState.getActivePageId() == this.props.pageId ? "active-window error-message-page" : "")} isOpen centered fade={false}>
                    <ModalHeader className={"text-danger"} style={{ zoom: appState.zoom }}>{this.props.title}</ModalHeader>
                    <ModalBody style={{ zoom: appState.zoom }}>
                        {stringMessageToReactNode(this.props.message)}
                    </ModalBody>
                    <ModalFooter style={{ zoom: appState.zoom }}>
                        <BuhtaButton color="danger" className="cy-cancel cy-ok"
                            onClick={() => { appState.modalResult = true, appState.closeActiveModal() }}>
                            Закрыть
                        </BuhtaButton>
                    </ModalFooter>
                </Modal>
            </div>
        )
    }

    // render() {
    //     return (
    //         <div style={{
    //             paddingTop: 30,
    //             paddingLeft: 15,
    //             paddingRight: 15,
    //             display: this.props.visible ? "" : "none"
    //         }}>
    //
    //             <Typography variant="h5" gutterBottom>
    //                 БУХта WMS
    //             </Typography>
    //             <TextField
    //                 label="Логин"
    //                 value={state.login}
    //                 onChange={(event: any) => {
    //                     state.login = event.target.value;
    //                     this.forceUpdate();
    //                 }}
    //                 margin="dense"
    //                 variant="outlined"
    //             />
    //             <TextField
    //                 id="outlined-adornment-password"
    //                 margin="dense"
    //                 variant="outlined"
    //                 type={state.showPassword ? 'text' : 'password'}
    //                 label="Пароль"
    //                 value={state.password}
    //                 onChange={(event: any) => {
    //                     state.password = event.target.value;
    //                     this.forceUpdate();
    //                 }}
    //                 InputProps={{
    //                     endAdornment: (
    //                         <InputAdornment position="end">
    //                             <IconButton
    //                                 onTouchStart={() => {
    //                                     state.showPassword = !state.showPassword;
    //                                     this.forceUpdate();
    //                                 }}
    //                             >
    //                                 {state.showPassword ?
    //                                     <Icon style={{overflow: "visible"}}
    //                                           className={classNames('fa fa-eye-slash')}/> :
    //                                     <Icon style={{overflow: "visible"}}
    //                                           className={classNames('fa fa-eye')}/>
    //                                 }
    //                             </IconButton>
    //                         </InputAdornment>
    //                     ),
    //                 }}
    //             />
    //             <div style={{padding: 20, textAlign: "center"}}>
    //                 <BuhtaButton variant="contained" color="primary" style={{marginRight: 10}}
    //                         onTouchStart={
    //                             this.loginButtonHandler}
    //                 >
    //                     ВОЙТИ
    //                 </BuhtaButton>
    //                 <BuhtaButton variant="contained" style={{marginRight: 10}}
    //                         onTouchStart={() => {
    //                             playSound_ButtonClick();
    //                             zebraReloadWebView()
    //                         }}
    //                 >
    //                     reload
    //                 </BuhtaButton>
    //
    //
    //             </div>
    //         </div>)
    // }
}

