import * as  React from "react";
import {
    zebraTextToSpeech,
    zebraGetDeviceId,
    zebraGetDeviceNum,
    zebraShowToast,
    zebraReloadWebView
} from "../zebra/ZebraApi";
import { appState } from '../AppState';
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

import { MainMenuPage } from "./MainMenuPage";
import { showAppError } from "../modals/ErrorMessagePage";
import { _wms_android_Логин, _wms_android_Доступы, _wms_android_Главное_меню_Список_Новых_Заданий } from "../generated-api";
import { BuhtaButton } from "../ui/BuhtaButton";

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
            await appState.зарузить_настройки_ТСД();

            appState.новыеЗадания = await _wms_android_Главное_меню_Список_Новых_Заданий(appState.kadrId, appState.podrId);

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
            <div className="app flex-row align-items-top cy-login-page" style={{ display: this.props.visible ? "" : "none" }}>
                <Container style={{ backgroundColor: "ALICEBLUE", zoom: 1.15 }}>

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
                                    <Input type="text" placeholder="логин" className="cy-login" />
                                </InputGroup>
                                <InputGroup className="mb-4">
                                    <InputGroupAddon addonType="prepend">
                                        <InputGroupText>
                                            <i className="fa fa-unlock"></i>
                                        </InputGroupText>
                                    </InputGroupAddon>
                                    <Input type="password" placeholder="пароль" className="cy-password" />
                                </InputGroup>
                                <Row>
                                    <Col xs="6">
                                        <BuhtaButton color="primary" disabled={this.loginButtonDisabled}
                                            className="px-4"
                                            onClick={
                                                this.loginButtonHandler
                                            }
                                        >
                                            Войти
                                        </BuhtaButton>
                                    </Col>
                                    <Col xs="6">
                                        <BuhtaButton className="px-4" outline
                                            onClick={() => {
                                                zebraReloadWebView()
                                            }}>
                                            Reload
                                        </BuhtaButton>
                                    </Col>
                                </Row>
                            </div>
                        </CardBody>


                    </Col>

                </Container>
            </div>
        )
    }

}

