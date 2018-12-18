import * as  React from "react";
import {ComponentType, ReactNode} from "react";
import {Slide, toast, ToastOptions} from "react-toastify";
// import {getRandomString} from "../utils/getRandomString";
// import {appState} from "../AppState";
// import {IInfoMessageModalProps} from "../modals/InfoMessageModal";
// import {IAppPageProps} from "../pages/AppWindow";
// import Snackbar, {SnackbarProps} from "@material-ui/core/Snackbar/Snackbar";
//
//
export function showSnack(message: ReactNode, type: "info" | "warning" | "error" | "success" = "info", duration: number = 2000) {
    let options: ToastOptions = {
        position: toast.POSITION.TOP_CENTER,
        autoClose: duration,
        closeButton: false,
        transition:Slide,
        type:type,
        hideProgressBar:true
    };


    toast(<div style={{textAlign:"center",fontSize:"1.1em"}}>{message}</div> ,options);
//     let backColor: string = "DEEPSKYBLUE";
//     if (type == "warning")
//         backColor = "DARKORANGE";
//     if (type == "error")
//         backColor = "red";
//
//     let snack: SnackbarProps = {
//         open: true,
//         message,
//         anchorOrigin: {vertical: "top", horizontal: "center"},
//         autoHideDuration: duration,
//         onClose: () => {
//             snack.open = false;
//             appState.forceUpdate();
//         },
//         ContentProps: {
//             style: {
//                 backgroundColor: backColor
//             }
//         }
//     };
//     appState.snack = snack;
//     appState.forceUpdate();
}
