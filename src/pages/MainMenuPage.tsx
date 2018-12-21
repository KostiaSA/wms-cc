import * as  React from "react";
import {IAppPageProps} from "./AppWindow";
import {appState} from "../AppState";
import {playSound_ButtonClick} from "../utils/playSound";
import {PeakPage} from "./Peak/PeakPage";
import {showAppError} from "../modals/ErrorMessagePage";
// import TextField from "@material-ui/core/TextField/TextField";
// import withRoot from "../withRoot";
// import withStyles from "@material-ui/core/styles/withStyles";
// import MenuItem from "@material-ui/core/MenuItem/MenuItem";
// import ListItemIcon from "@material-ui/core/ListItemIcon/ListItemIcon";
// import ListItemText from "@material-ui/core/ListItemText/ListItemText";
// import MenuList from "@material-ui/core/MenuList/MenuList";
// import Paper from "@material-ui/core/Paper/Paper";
// import classNames from "classnames";
// import Icon from "@material-ui/core/Icon/Icon";
// import Divider from "@material-ui/core/Divider/Divider";
// import {executeSql} from "../utils/executeSql";
// import {executeSqlStoredProc_FirstRecordset} from "../utils/executeSqlStoredProc";
// import {IAppPageProps} from "./AppWindow";
// import {buhtaTheme} from "../buhtaTheme";
// import MuiThemeProvider from "@material-ui/core/styles/MuiThemeProvider";
// import {appState} from "../AppState";
// import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
// import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
// import {PeakPage} from "./Peak/PeakPage";
// import {showSnack} from "../ui/showSnack";
// import {playSound, playSound_ButtonClick} from "../utils/playSound";
//
//
export interface IMainMenuPageProps extends IAppPageProps {

}

//
// export interface IMainMenuPageState {
//     rows: any[];
// }
//
//
// const styles = (theme: any) => ({
//     menu: {
//         width: 200,
//     },
// });
//
//
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
    render() {
//         let classes: any = {};
//         let iconStyle = {fontSize: "20px", width: "auto"};
//
//         // for (let i = 0; i < 8; i++)
//         //     this.state.rows.push(...this.state.rows);
//         //
//         // console.log(this.state.rows.length);
//

        let titleStyle = {marginTop: "0.5em"};

        return (
            <div className={"app"} style={{display: this.props.visible ? "" : "none"}}>
                <h5 className={"text-center"} style={titleStyle}>ЗАДАНИЯ В РАБОТЕ</h5>
                <ul className="list-group">
                    <li
                        className="list-group-item disabled"
                        onClick={() => {
                            playSound_ButtonClick();
                            appState.openPage(PeakPage, {pageId: "PeakPage"})
                        }}

                    >
                        <i className="fa fa-user"></i>
                        ПИК 39373489 showAppError
                    </li>
                    <li className="list-group-item"
                        onClick={() => {

                        showAppError("Top 100 Cryptocurrencies by Market Capitalization");
                    }}
                    >
                        test ошибки
                    </li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                    <li className="list-group-item">Morbi leo risus</li>
                    <li className="list-group-item">Dapibus ac facilisis in</li>
                </ul>
                <h5 className={"text-center"} style={titleStyle}>ЗАДАНИЯ ОЖИДАЮТ</h5>
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
                </ul>
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
