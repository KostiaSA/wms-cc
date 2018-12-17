import * as React from "react";
import {executeSqlStoredProc} from "../utils/executeSqlStoredProc";
import {showError} from "../utils/showError";
import {appState} from "../AppState";
import {createGridOptionsFromSqlRowsets} from "../utils/createGridOptionsFromSqlRowsets";
import {AgGridReact} from "ag-grid-react";
import {GridOptions} from "ag-grid-community";
import {CSSProperties} from "react";


export interface ISqlGridProps {
    style?: CSSProperties;
    sqlProcName: string;
    sqlProcParams: any[];
}


export class SqlGrid extends React.Component<ISqlGridProps, any> {
    constructor(props: any, context: any) {
        super(props, context);
    }

    gridApi: any;
    gridColumnApi: any;
    gridOptions: GridOptions = {};
    loaded: boolean = false;

    onGridReady = (params: any) => {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;

        this.autoSizeAll();
        if (this.gridApi) {
            this.gridApi.sizeColumnsToFit();
            this.gridApi.resetRowHeights();
        }

    };

    autoSizeAll() {
        if (this.gridColumnApi && this.gridColumnApi.getAllColumns()) {
            let allColumnIds: any[] = [];
            this.gridColumnApi.getAllColumns().forEach(function (column: any) {
                allColumnIds.push(column.colId);
            });
            this.gridColumnApi.autoSizeColumns(allColumnIds);
        }
    }

    async loadFromSql() {
        if (appState.tsdKey == -1) // не было логина
            return;

        this.loaded = false;
        let recordsets: any;
        try {
            recordsets = await executeSqlStoredProc(this.props.sqlProcName, ...this.props.sqlProcParams);

        } catch (error) {
            console.error(error);
            showError("executeSqlStoredProc: " + this.props.sqlProcName, error);
            //appState.closeActivePage();
            return;
        }

        try {
            // @ts-ignore
            this.gridOptions = createGridOptionsFromSqlRowsets(recordsets);
            this.loaded = true;
            this.forceUpdate();

        } catch (error) {
            console.error(error);
            showError("createGridOptionsFromSqlRowsets: " + this.props.sqlProcName, error);
            //appState.closeActivePage();
            return;
        }

        // this.autoSizeAll();
        // if (this.gridApi) {
        //     this.gridApi.sizeColumnsToFit();
        //     this.gridApi.resetRowHeights();
        // }

    };


    componentDidMount() {
        if (!this.loaded) {
            this.loadFromSql();
        }

    };

    componentDidUpdate() {
        if (!this.loaded) {
            this.loadFromSql();
        }
    };

    onColumnResized(event: any) {
        if (event.finished) {
            this.gridApi.resetRowHeights();
        }
    }

    render() {

        let overlayLoadingTemplate = '<i class="fa fa-spinner fa-spin ag-overlay-loading-center" style="color:darkgray;font-size:28px;border:0px"></i>';
        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>пустой список</span>";

        return (
            <div style={this.props.style} className="ag-theme-balham">
                <AgGridReact
                    overlayLoadingTemplate={overlayLoadingTemplate}
                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                    {...this.gridOptions}
                    onGridReady={this.onGridReady}
                    onColumnResized={this.onColumnResized.bind(this)}
                >
                </AgGridReact>
            </div>
        )
    }

}