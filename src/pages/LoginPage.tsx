import * as  React from "react";
import {
    zebraTextToSpeech,
    zebraGetDeviceId,
    zebraGetDeviceNum,
    zebraShowToast,
    zebraReloadWebView
} from "../zebra/ZebraApi";
import { appState } from "../AppState";
import { executeSql } from "../utils/executeSql";
import { stringAsSql } from "../utils/stringAsSql";
import { IAppPageProps } from "./AppWindow";
//import {MainMenuPage} from "./MainMenuPage";
import { playSound_ButtonClick } from "../utils/playSound";
import { CardBody, Container, Input, InputGroup } from "reactstrap";
import Row from "reactstrap/lib/Row";
import CardGroup from "reactstrap/lib/CardGroup";
import Card from "reactstrap/lib/Card";
import Form from "reactstrap/lib/Form";
import InputGroupAddon from "reactstrap/lib/InputGroupAddon";
import InputGroupText from "reactstrap/lib/InputGroupText";
import Col from "reactstrap/lib/Col";
import Button from "reactstrap/lib/Button";
import { MainMenuPage } from "./MainMenuPage";
import { showAppError } from "../modals/ErrorMessagePage";
import { _wms_android_Логин, _wms_android_Доступы } from "../generated-api";

export interface ILoginPageProps extends IAppPageProps {

}


// let state = store({
//     // todo сделать список для входа
//     login: "SA",
//     password: "",
//     showPassword: false,
// });

export class LoginPage extends React.Component<ILoginPageProps, any> {
    static PAGE_ID = "LoginPage";

    constructor(props: any, context: any) {
        super(props, context);
        // this.props = props;
        // this.context = context;
    }

    login: string = "SA";
    password: string = "";

    loginButtonDisabled: boolean = false;

    componentDidMount() {
        this.password = "";
        zebraTextToSpeech("введите пароль");
    };

    loginButtonHandler = async (event: any): Promise<void> => {
        this.loginButtonDisabled = true;
        this.forceUpdate();

        playSound_ButtonClick();

        let _this = this;

        try {

            let row = await _wms_android_Логин(this.login, '', zebraGetDeviceId(), zebraGetDeviceNum());

            if (row.error) {
                console.error(row.error);
                showAppError(row.error);
                return;
            }

            appState.tsdKey = row.tsdKey;
            appState.userName = row.FullUserName;
            appState.kadrId = row.KadrId;
            appState.podrId = row.PodrId;
            appState.доступы = await _wms_android_Доступы(this.login);

            appState.openPage(MainMenuPage, { pageId: MainMenuPage.PAGE_ID });
        }
        catch (e) {
            showAppError(e.toString());
        }
        finally {
            this.loginButtonDisabled = false;
        }


        //appState.forceUpdate();

    };

    render(): React.ReactNode {
        return (
            <div className="app flex-row align-items-top" style={{ display: this.props.visible ? "" : "none" }}>
                <Container style={{ backgroundColor: "ALICEBLUE" }}>

                    <Col md="8">


                        <CardBody>
                            <div>
                                <h2>БУХта WMS</h2>
                                <p className="text-muted">Авторизация</p>
                                <InputGroup className="mb-3">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-user"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="text" placeholder="логин" />
                                </InputGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-unlock"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" placeholder="пароль" />
                                </InputGroup>
                                <Row>
                                    <Col xs="6">
                                        <Button color="primary" disabled={this.loginButtonDisabled}
                                            className="px-4"
                                            onTouchStart={
                                                this.loginButtonHandler
                                            }
                                            onClick={
                                                this.loginButtonHandler
                                            }
                                        >
                                            Войти
                                        </Button>
                                    </Col>
                                    <Col xs="6">
                                        <Button className="px-4" outline
                                            onTouchStart={() => {
                                                playSound_ButtonClick();
                                                zebraReloadWebView()
                                            }}>
                                            Reload
                                        </Button>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>


                    </Col>

                </Container>
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
    //                 <Button variant="contained" color="primary" style={{marginRight: 10}}
    //                         onTouchStart={
    //                             this.loginButtonHandler}
    //                 >
    //                     ВОЙТИ
    //                 </Button>
    //                 <Button variant="contained" style={{marginRight: 10}}
    //                         onTouchStart={() => {
    //                             playSound_ButtonClick();
    //                             zebraReloadWebView()
    //                         }}
    //                 >
    //                     reload
    //                 </Button>
    //
    //
    //             </div>
    //         </div>)
    // }
}

