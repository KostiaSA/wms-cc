import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { playSound_ButtonClick } from "../utils/playSound";
import { PeakPage } from "./Peak/PeakPage";
import { showAppError, showError } from "../modals/ErrorMessagePage";
import { ReactNode } from "react";
import { _wms_android_Главное_меню_Список_Новых_Заданий, _wms_android_ПИК_получить_задание, _wms_android_РАЗГР_получить_задание, _wms_android_Выход } from "../generated-api";
import { ИНТЕРВАЛ_ОБНОВЛЕНИЯ_ГЛАВНОГО_МЕНЮ } from "../const";

import { getRandomString } from "../utils/getRandomString";
import { showInfo } from "../modals/InfoMessagePage";
import { I_ПИК_1_меню_PageProps, ПИК_1_меню_Page_ModalResult, ПИК_1_меню_Page } from "../modals/ПИК_2_меню";
import { getConfirmation } from "../modals/ConfirmationPage";
import { show_Информация_о_задании } from "./Информация_о_задании_Page";
import { show_НастройкаТСД } from "./НастройкаТСД_Page";
import { I_РАЗГР_меню_PageProps, РАЗГР_меню_Page_ModalResult, РАЗГР_меню_Page } from "../modals/РАЗГР_меню";
import { get_Выбор_задания_в_работу } from "../modals/Выбор_задания_в_работу";
import { show_Help } from "./Help_Page";
import { zebraGetDeviceId } from "../zebra/ZebraApi";

export interface IMainMenuPageProps extends IAppPageProps {

}

export interface IMainMenuItem {
    group: string;
    icon?: ReactNode;
    label: string;
    code: string;
    onClick?: () => void;
}


let mainMenuItems: IMainMenuItem[] = [
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "РАЗГР",
        code: "РАЗГР",
        onClick: async () => {
            playSound_ButtonClick();
            let res = await appState.getModalResult<I_РАЗГР_меню_PageProps, РАЗГР_меню_Page_ModalResult>(РАЗГР_меню_Page, { pageId: getRandomString() });
            //   | "Назначить задание (auto)" |  | "Нет";
            if (res == "Выбор задания") {
                let res = await get_Выбор_задания_в_работу("РАЗГР");
                if (res.result == "Ok") {
                    show_Информация_о_задании(res.selectedTaskId);
                }
            }
            else if (res == "Прием без задания") {
                showError("Пока не работает");
            }
            else if (res == "Назначить задание (auto)") {
                let res = await _wms_android_РАЗГР_получить_задание(appState.kadrId);
                if (res.taskId == 0) {
                    showInfo("Нет заданий для исполнения");
                    return;
                }
                // if (await getConfirmation("Взять задание в работу?", "Найдено новое задание", "Взять")) {
                //     show_Информация_о_задании(res.taskId);
                //     return;
                // }
                show_Информация_о_задании(res.taskId);
            }
            else
                showAppError("Неверный 'ModalResult' в РАЗГР_меню_Page_ModalResult: " + res);

            //console.log(res);
        }
    },
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "ПОДБОР",
        code: "ПИК",
        onClick: async () => {
            playSound_ButtonClick();
            let res = await appState.getModalResult<I_ПИК_1_меню_PageProps, ПИК_1_меню_Page_ModalResult>(ПИК_1_меню_Page, { pageId: getRandomString() });
            if (res == "Выбрать задание (вручную)") {
                showError("Пока не работает");
            }
            else if (res == "Выбрать по маршруту") {
                showError("Пока не работает");
            }
            else if (res == "Получить задание (авто)") {
                let res = await _wms_android_ПИК_получить_задание(appState.kadrId);
                if (res.taskId == 0) {
                    showInfo("Нет заданий для исполнения");
                    return;
                }
                // if (await getConfirmation("Взять задание в работу?", "Найдено новое задание", "Взять")) {
                //     show_Информация_о_задании(res.taskId);
                //     return;
                // }
                show_Информация_о_задании(res.taskId);
            }
            else
                showAppError("Неверный 'ModalResult' в ПИК_1_меню_Page_ModalResult: " + res);

            console.log(res);
        }
    },
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "ИНФО",
        code: "ИНФО",
    },
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "КОМПЛ",
        code: "КОМПЛ",
    },
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "ПЕРЕМ",
        code: "ПЕРЕМ",
    },
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "УПАКОВКА",
        code: "УПАК",
    },
    {
        group: "ОСНОВНЫЕ ОПЕРАЦИИ",
        label: "ОТГРУЗКА",
        code: "ОТГР",
    },
    {
        group: "ПРОЧИЕ ОПЕРАЦИИ",
        label: "ИНВ",
        code: "ИНВ",
    },
    {
        group: "НАСТРОЙКИ",
        label: "НАСТРОЙКА ТСД",
        code: "НАСТРОЙКА_ТСД",
        icon: <i className="fa fa-cog"></i>,
        onClick: () => {
            playSound_ButtonClick();
            show_НастройкаТСД();
        }
    },
];

export class MainMenuPage extends React.Component<IMainMenuPageProps> {
    static PAGE_ID = "MainMenuPage";
    //
    //     constructor(props: any, context: any) {
    //         super(props, context);
    //         this.state = {rows: []};
    //         // this.props = props;
    //         // this.context = context;
    //     }
    //
    //     async loadFromSql() {
    //         if (this.state.rows.length == 0 && this.props.pageId == appState.activePageId[0]) {
    //             let recordset = await executeSqlStoredProc_FirstRecordset("Главное_меню");
    //             // @ts-ignore
    //             this.state.rows = recordset;
    //             console.log("MainMenuPage this.state.rows", recordset);
    //             this.forceUpdate();
    //         }
    //     }
    //
    //     componentDidMount() {
    //         //console.log("MainMenuPage componentDidMount");
    //         this.loadFromSql();
    //     };
    //
    //     componentDidUpdate() {
    //         //console.log("MainMenuPage componentDidUpdate");
    //         this.loadFromSql();
    //     };
    //

    private timer_новыеЗадания: any;
    componentDidMount() {
        this.timer_новыеЗадания = setInterval(async () => {
            if (this.props.visible) {
                appState.новыеЗадания = await _wms_android_Главное_меню_Список_Новых_Заданий(appState.kadrId, appState.podrId);
                this.forceUpdate();
            }
        }, ИНТЕРВАЛ_ОБНОВЛЕНИЯ_ГЛАВНОГО_МЕНЮ);

    }

    componentWillUnmount() {
        clearInterval(this.timer_новыеЗадания);
    }

    shouldComponentUpdate(nextProps: IMainMenuPageProps) {
        if (nextProps.visible && !this.props.visible) {
            setTimeout(async () => {
                appState.новыеЗадания = await _wms_android_Главное_меню_Список_Новых_Заданий(appState.kadrId, appState.podrId);
                this.forceUpdate();
            }, 10)
        }
        return true;
    }

    renderGroup(group: string): ReactNode[] {
        let ret: ReactNode[] = [];

        for (let item of mainMenuItems) {
            if (item.group == group && appState.isUsersHasAccessToRasdel(item.code)) {

                let новыеЗадания = appState.новыеЗадания.find((x) => x.Тип == item.code);
                let newStr = "";
                if (новыеЗадания && (новыеЗадания.Новых > 0 || новыеЗадания.ВРаботе > 0)) {
                    newStr = новыеЗадания.Новых + "/" + новыеЗадания.ВРаботе;
                }

                let icon: any;
                if (item.icon) {
                    icon = <span style={{ marginRight: 5 }}>{item.icon}</span>
                }

                ret.push(
                    <li
                        key={mainMenuItems.indexOf(item)}
                        className="list-group-item"
                        onClick={item.onClick}
                    >
                        {icon}
                        {item.label} <span style={{ color: "dodgerblue", marginLeft: 10 }}>{newStr}</span>
                    </li>
                );
            }
        }
        return ret;
    }

    render() {
        //         let classes: any = {};
        //         let iconStyle = {fontSize: "20px", width: "auto"};
        //
        //         // for (let i = 0; i < 8; i++)
        //         //     this.state.rows.push(...this.state.rows);
        //         //
        //         // console.log(this.state.rows.length);
        //

        let titleStyle = { marginTop: "0.5em" };

        return (
            <div className={"app " + (appState.getActivePageId() == this.props.pageId ? "active-window cy-main-menu-page" : "")} style={{ display: this.props.visible ? "" : "none", zoom: appState.zoom }}>
                <h5 className={"text-center"} style={titleStyle}>ОСНОВНЫЕ ОПЕРАЦИИ</h5>
                <ul className="list-group">
                    {this.renderGroup("ОСНОВНЫЕ ОПЕРАЦИИ")}
                    {/* <li
                        className="list-group-item"
                        onClick={() => {
                            playSound_ButtonClick();
                            appState.openPage(PeakPage, { pageId: "PeakPage" })
                        }}

                    >
                        <i className="fa fa-user"></i>
                        ПИК 39373489 showAppError
                    </li>
                    <li className="list-group-item  disabled"
                        onClick={() => {

                            showAppError("Top 100 Cryptocurrencies by Market Capitalization");
                        }}
                    >
                        test ошибки
                    </li> */}
                </ul>
                <h5 className={"text-center"} style={titleStyle}>ПРОЧИЕ ОПЕРАЦИИ</h5>
                <ul className="list-group">
                    {this.renderGroup("ПРОЧИЕ ОПЕРАЦИИ")}
                </ul>
                <h5 className={"text-center"} style={titleStyle}>НАСТРОЙКИ</h5>
                <ul className="list-group">
                    {this.renderGroup("НАСТРОЙКИ")}
                </ul>
                <h5 className={"text-center"} style={titleStyle}>ПОМОЩЬ</h5>
                <ul className="list-group">
                    <li className="list-group-item"
                        onClick={() => {
                            playSound_ButtonClick();
                            show_Help(<div>пусто</div>);
                        }}

                    ><i className="fa fa-user" style={{ marginRight: 5 }}></i>Открыть подсказку
                    </li>
                </ul>
                <h5 className={"text-center"} style={titleStyle}>КОНЕЦ РАБОТЫ</h5>
                <ul className="list-group">
                    <li className="list-group-item"
                        onClick={async () => {
                            playSound_ButtonClick();
                            appState.closeActivePage();
                            await _wms_android_Выход(zebraGetDeviceId());
                            appState.tsdKey = -1;
                            appState.userName = "";
                            appState.kadrId = -1;
                            appState.podrId = -1;
                        }}

                    ><i className="fa fa-user" style={{ marginRight: 5 }}></i>Выход
                    </li>
                </ul>
                {/* <h5 className={"text-center"} style={titleStyle}>ЗАДАНИЯ ОЖИДАЮТ</h5>
                <ul className="list-group">
                    <li
                        className="list-group-item disabled"
                    >
                        <i className="fa fa-user"></i>
                        Cras justo odio
                    </li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>

                </ul>
                <h5 className={"text-center"} style={titleStyle}>РАЗНОЕ</h5>
                <ul className="list-group">
                    <li
                        className="list-group-item disabled"
                    >
                        <i className="fa fa-user"></i>
                        Cras justo odio
                    </li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Porta ac consectetur ac</li>

                </ul>
                <h5 className={"text-center"} style={titleStyle}>КОНЕЦ РАБОТЫ</h5>
                <ul className="list-group">
                    <li className="list-group-item"
                        onClick={() => {
                            playSound_ButtonClick();
                            appState.closeActivePage()
                        }}

                    ><i className="fa fa-user"></i>Выход
                    </li>
                </ul> */}
            </div>
            //             <MuiThemeProvider theme={buhtaTheme}>
            //                 <div style={{
            //                     paddingLeft: 5,
            //                     paddingRight: 5,
            //                     display: this.props.visible ? "" : "none"
            //                 }}>
            //                     <MenuList>
            //                         {this.state.rows.map((row: any, index: number) => {
            //                             return (
            //                                 [<MenuItem className={classes.menuItem} key={index}
            //                                            onTouchStart={() => {
            //                                                playSound_ButtonClick();
            //                                                //showSnack("МЕНЮ", "warning", 800);
            //                                            }}
            //
            //                                 >
            //                                     <ListItemIcon className={classes.icon}>
            //                                         <Icon style={{overflow: "visible", color: row.iconColor}}
            //                                               className={classNames("fa fa-" + row.icon)}/>
            //                                     </ListItemIcon>
            //                                     <ListItemText classes={{primary: classes.primary}} inset primary={row.label}/>
            //                                 </MenuItem>,
            //                                     <Divider/>]
            //
            //                             )
            //                         })}
            //                     </MenuList>
            //                     <BottomNavigation
            //                         value="Меню"
            //                         showLabels
            //                         // onChange={(event: any, value: any) => {
            //                         //     appState.switchToPageByBottomBarIndex(value);
            //                         //     this.forceUpdate();
            //                         // }}
            //                         style={{
            //                             width: "100%",
            //                             position: "fixed",
            //                             bottom: 0,
            //                             //display: appState.activePage[0] !== appState.loginPage && appState.activePage[0] !== appState.taskPage ? "flex" : "none"
            //                         }}
            //                     >
            //                         <BottomNavigationAction label="Меню"
            //                             //style={appState.activePage[0] == appState.mainMenuPage ? {color: "dodgerblue"} : {}}
            //                                                 icon={<Icon style={iconStyle} className={classNames('fa fa-home')}/>}/>
            //                         <BottomNavigationAction label="Задания"
            //                                                 icon={<Icon style={iconStyle} className={classNames('fa fa-tasks')}/>}
            //                                                 onClick={() => {
            //                                                     playSound_ButtonClick();
            //                                                     appState.openPage(PeakPage, {pageId: "PeakPage"})
            //                                                 }}
            //                         />
            //                         <BottomNavigationAction label="Инфо"
            //                             //style={appState.activePage[0] == appState.infoPage ? {color: "dodgerblue"} : {}}
            //                                                 icon={<Icon style={iconStyle}
            //                                                             className={classNames('fa fa-question-circle')}/>}/>
            //
            //                         <BottomNavigationAction label="Tapp."
            //                                                 onTouchStart={() => {
            //                                                     playSound_ButtonClick();
            //                                                     appState.closeActivePage();
            //
            //                                                 }}
            //                                                 icon={<Icon style={iconStyle}
            //                                                             className={classNames('fa fa-sign-out-alt')}/>}
            //
            //                         />
            //
            //                         <BottomNavigationAction label="Настр."
            //                                                 icon={<Icon style={iconStyle}
            //                                                             className={classNames('fa fa-sign-out-alt')}/>}
            //                                                 onClick={() => {
            //                                                     playSound_ButtonClick();
            //                                                     showSnack("штрих-коды здесь не допустимы", "warning", 800);
            //                                                 }
            //                                                 }
            //                         />
            //                         <BottomNavigationAction label="Выход"
            //                                                 icon={<Icon style={iconStyle}
            //                                                             className={classNames('fa fa-sign-out-alt')}/>}
            //                                                 onClick={() => {
            //                                                     playSound_ButtonClick();
            //                                                     appState.closeActivePage()
            //                                                 }}
            //
            //                         />
            //                     </BottomNavigation>
            //                 </div>
            //
            //
            //             </MuiThemeProvider>
        )
    }
}

//
