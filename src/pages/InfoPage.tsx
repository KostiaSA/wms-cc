import * as  React from "react";
import {IAppPageProps} from "./AppWindow";
// import withRoot from "../withRoot";
// import withStyles from "@material-ui/core/styles/withStyles";
// import {executeSqlStoredProc, executeSqlStoredProc_FirstRecordset} from "../utils/executeSqlStoredProc";
// import {AgGridReact} from "ag-grid-react";
// import {
//     Autowired,
//     BaseComponentWrapper,
//     Bean,
//     FrameworkComponentWrapper,
//     GridOptions,
//     IComponent,
//     Promise,
//     WrapableInterface
// } from "ag-grid-community";
// import {createGridOptionsFromSqlRowsets} from "../utils/createGridOptionsFromSqlRowsets";
// import {showError} from "../utils/showError";
// import {appState} from "../AppState";
// import {IAppPageProps} from "./AppWindow";
// import {view} from "react-easy-state";
// import {SqlGrid} from "../components/SqlGrid";
// import BottomNavigation from "@material-ui/core/BottomNavigation/BottomNavigation";
// import BottomNavigationAction from "@material-ui/core/BottomNavigationAction/BottomNavigationAction";
// import Icon from "@material-ui/core/Icon/Icon";
// import classNames from "classnames";
//
export interface ILoginPageProps extends IAppPageProps{

}
//
//
// const styles = (theme: any) => ({
//     menu: {
//         width: 200,
//     },
// });
//
//
class InfoPage extends React.Component<ILoginPageProps, any> {
//     constructor(props: any, context: any) {
//         super(props, context);
//
//         this.state = {
//             columnDefs: [
//                 {headerName: "Номер", field: "Номер"},
//                 {headerName: "Название", field: "Название"},
//
//             ],
//             rowData: null
//         }
//     }
//
//     gridApi: any;
//     gridColumnApi: any;
//     gridOptions: GridOptions = {};
//
//     onGridReady = (params: any) => {
//         this.gridApi = params.api;
//         this.gridColumnApi = params.columnApi;
//     };
//
//     autoSizeAll() {
//         if (this.gridColumnApi.getAllColumns()) {
//             let allColumnIds: any[] = [];
//             this.gridColumnApi.getAllColumns().forEach(function (column: any) {
//                 allColumnIds.push(column.colId);
//             });
//             this.gridColumnApi.autoSizeColumns(allColumnIds);
//         }
//     }
//
//
//     loaded:boolean=false;
//
//     componentDidMount() {
//         if (!this.loaded && this.props.visible){
//             this.loadFromSql();
//         }
//
//     };
//
//     componentDidUpdate() {
//         if (!this.loaded && this.props.visible){
//             this.loadFromSql();
//         }
//     };
//
//
//     async loadFromSql() {
//         let recordsets: any;
//         try {
//             recordsets = await executeSqlStoredProc("СписокТМЦ");
//
//         } catch (error) {
//             console.error(error);
//             showError("executeSqlStoredProc: СписокТМЦ", error);
//             console.log("componentDidMount close");
//
//             appState.closeActivePage();
//             return;
//         }
//
//         try {
//             this.gridOptions = createGridOptionsFromSqlRowsets(recordsets);
//             this.loaded=true;
//             this.forceUpdate();
//
//         } catch (error) {
//             console.error(error);
//             showError("createGridOptionsFromSqlRowsets: СписокТМЦ", error);
//             appState.closeActivePage();
//             return;
//         }
//
//         this.autoSizeAll();
//         this.gridApi.sizeColumnsToFit();
//         this.gridApi.resetRowHeights();
//
//
//     };
//
//     onColumnResized(event: any) {
//         if (event.finished) {
//             this.gridApi.resetRowHeights();
//         }
//     }
//
//     render() {
//
//
//         let overlayLoadingTemplate = '<i class="fa fa-spinner fa-spin ag-overlay-loading-center" style="color:darkgray;font-size:28px;border:0px"></i>';
//         let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";
//         return (
//             <div style={{height: 150,display: this.props.visible ? "" : "none"}} className="ag-theme-balham">
//                 <AgGridReact
//                     overlayLoadingTemplate={overlayLoadingTemplate}
//                     overlayNoRowsTemplate={overlayNoRowsTemplate}
//                     {...this.gridOptions}
//                     onGridReady={this.onGridReady}
//                     onColumnResized={this.onColumnResized.bind(this)}
//                 >
//                 </AgGridReact>
//
//                 <SqlGrid style={{height:200}} sqlProcName={"СписокТМЦ"} sqlProcParams={[]}/>
//
//
//             </div>
//         )
//     }
}
//
// export default withRoot(withStyles(styles)(InfoPage as any));