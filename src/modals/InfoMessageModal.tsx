import * as  React from "react";
// import {IAppPageProps} from "../pages/AppWindow";
import {ReactNode} from "react";
// import {buhtaTheme} from "../buhtaTheme";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import Dialog from "@material-ui/core/Dialog/Dialog";
// import {appState} from "../AppState";
// import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
// import DialogContent from "@material-ui/core/DialogContent/DialogContent";
// import DialogContentText from "@material-ui/core/DialogContentText/DialogContentText";
// import DialogActions from "@material-ui/core/DialogActions/DialogActions";
// import Button from "@material-ui/core/Button/Button";
// import {PeakPage} from "../pages/Peak/PeakPage";
// import {getRandomString} from "../utils/getRandomString";
// import {XJSON_parse} from "../utils/xjson";
// import * as moment from "moment";
//
// export interface IInfoMessageModalProps extends IAppPageProps {
//     title: ReactNode
//     message: ReactNode
// }
//
export async function showInfoMessage(title: ReactNode, message: ReactNode): Promise<void> {
//
//     return new Promise<void>(
//         (resolve: () => void, reject: (error: string) => void) => {
//
//             let pageId = getRandomString();
//             appState.openPage<IInfoMessageModalProps>(InfoMessageModal, {
//                 pageId: pageId,
//                 onClose: resolve,
//                 disableBarcodes:true,
//                 title,
//                 message
//             })
//         });
//
}
//
//
// class InfoMessageModal extends React.Component<IInfoMessageModalProps, any> {
//
//     constructor(props: any, context: any) {
//         super(props, context);
//     }
//
//     componentDidMount() {
//
//     };
//
//     componentWillUnmount() {
//
//     };
//
//     componentDidUpdate() {
//     };
//
//     render(): ReactNode {
//
//
//         return (
//             <MuiThemeProvider theme={buhtaTheme}>
//                 <Dialog
//                     open
//                     fullScreen
//                 >
//                     <DialogTitle id="alert-dialog-title">
//                         <div style={{color: "ROYALBLUE", fontSize: "0.75em"}}>{this.props.title}</div>
//                     </DialogTitle>
//                     <DialogContent>
//                         <DialogContentText id="alert-dialog-description">
//                             {this.props.message}
//                         </DialogContentText>
//                     </DialogContent>
//                     <DialogActions>
//                         <Button onClick={() => {
//                             appState.closeAndDestroyActivePage();
//                             if (this.props.onClose)
//                                 this.props.onClose();
//                         }} color="primary">
//                             закрыть
//                         </Button>
//                     </DialogActions>
//                 </Dialog>
//             </MuiThemeProvider>
//         )
//     }
// }
//
