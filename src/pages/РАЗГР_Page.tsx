import * as  React from "react";
import { IAppPageProps } from "./AppWindow";
import { appState } from '../AppState';
import { CSSProperties, ReactNode } from 'react';
import { getTaskConst } from '../taskConst';
import { BuhtaButton } from '../ui/BuhtaButton';
import { showError } from "../modals/ErrorMessagePage";
import { IResult_wms_android_Информация_о_задании, _wms_android_Информация_о_задании, _wms_android_Штрихкод_запрещен, _wms_android_Получить_ТМЦ_по_штрих_коду, _wms_android_Получить_Партию_по_штрих_коду, _wms_android_Название_паллеты, _wms_android_Название_ячейки_где_паллета, _wms_android_Получить_Партию_с_паллеты, _wms_android_Паллета_инфо, _wms_android_РАЗГР_Создать_партию_из_штрих_кода, _wms_android_Получить_паллету_по_шк_беспаллетной_ячейки, _wms_android_ПИК_обработка_шк_партии, _wms_android_ТМЦ_инфо, _wms_android_РАЗГР_Проверить_способ_хранения, IResult_wms_android_Партия_ТМЦ_инфо, _wms_android_Партия_ТМЦ_инфо, _wms_android_РАЗГР_Проверить_товар_на_других_паллетах, _wms_android_РАЗГР_Сверка_с_заявкой, _wms_android_РАЗГР_INSERT_скл_Комплектация, _wms_android_РАЗГР_Сверка_с_заявкой_полная, _wms_android_РАЗГР_Список_товара_на_паллете, IResult_wms_android_РАЗГР_Список_товара_на_паллете, _wms_android_РАЗГР_Проверить_паллету, _wms_android_РАЗГР_Взять_паллету_в_задание, IResult_wms_android_Паллета_инфо, IResult_wms_android_РАЗГР_свод, _wms_android_РАЗГР_свод, _wms_android_РАЗГР_инфо_для_отката, _wms_android_РАЗГР_откат, IResult_wms_android_Список_незавершенных_паллет, _wms_android_Список_незавершенных_паллет, _wms_android_РАЗГР_завершить_задание, _wms_android_РАЗГР_Печать_акта_о_расхождениях } from "../generated-api";
import classNames from "classnames";
import { getSubcontoTextColorClass } from '../utils/getSubcontoTextColorClass';
import { TestBarcodesPage } from "./TestBarcodesPage";
import { PlaySound } from "../sounds/PlaySound";
import { AgGridReact } from "ag-grid-react/lib/agGridReact";
import { AgGridColumn } from "ag-grid-react/lib/agGridColumn";
import { escapeHtml } from '../utils/escapeHtml';
import { showInfo } from "../modals/InfoMessagePage";
import { ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ, ЦВЕТ_ТЕКСТА_ПАЛЛЕТА, ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ } from "../const";
import { playSound_ButtonClick } from "../utils/playSound";
import { isNormalPallete } from "../utils/isNormalPallete";
import { Moment } from 'moment';
import moment from "moment";
import { parseGS1, IGS1Item } from "../utils/gs1";
import { getConfirmation } from "../modals/ConfirmationPage";
import { get_РАЗГР_запрос_партии_и_количества } from "../modals/РАЗГР_запрос_партии_и_количества";
import { HelpButton } from "../ui/HelpButton";
import { get_Запрос_штрих_кода } from "../modals/Запрос_штрих_кода";
import { get_РАЗГР_запрос_габаритов_паллеты } from "../modals/РАЗГР_запрос_габаритов_паллеты";
import { show_РАЗГР_свод } from "../modals/РАЗГР_свод";
import { get_Выбор_ТМЦ } from "../modals/Выбор_ТМЦ";
import { get_РАЗГР_изменить_количество } from "../modals/РАЗГР_изменить_количество";
import { zebraTextToSpeech } from "../zebra/ZebraApi";
import { getWarningConfirmation } from "../modals/WarningConfirmationPage copy";
import { get_РАЗГР_завершение_задания } from "../modals/РАЗГР_завершение_задания";

export interface IРАЗГР_PageProps extends IAppPageProps {
    taskId: number;
}

export function show_РАЗГР(taskId: number) {
    appState.openPage<IРАЗГР_PageProps>(РАЗГР_Page, { pageId: "РАЗГР_" + taskId, taskId: taskId });
}



export class РАЗГР_Page extends React.Component<IРАЗГР_PageProps> {
    task: IResult_wms_android_Информация_о_задании;

    intoType: string = "";
    intoPalleteId: number = 0;
    intoPalleteInfo: IResult_wms_android_Паллета_инфо;
    intoName: string = "не выбрано";
    barcodeProcessorHandler: any;

    isReturnOk: boolean = false; // Режим возврата
    isInputOst: boolean = false; // Режим ввода начальных остатков

    isBrak_Checked: boolean = false;
    svod: IResult_wms_android_РАЗГР_свод[] = [];
    svodPercent: number = 0;
    svodOverflow: boolean = false;

    tovarsGridApi: any;
    tovarsGridColumnApi: any;
    tovarsGridData: IResult_wms_android_РАЗГР_Список_товара_на_паллете[] = [];

    palletesInTask: IResult_wms_android_Список_незавершенных_паллет[] = [];

    async clearPalleteId() {
        this.intoType = "";
        this.intoPalleteId = 0;
        this.intoName = "не выбрано";
        await this.loadTovarsGridData();
        this.forceUpdate();
    }

    async loadSvod() {
        this.svod = await _wms_android_РАЗГР_свод(this.task.ДоговорКлюч, this.props.taskId);
        this.svodOverflow = false;
        let dogKol = 0
        let taskKol = 0
        let delta = 0;
        for (let s of this.svod) {
            dogKol += s.ДогКол;
            taskKol += s.ЗаданиеКол;
            delta += s.Дельта;
            if (s.ЗаданиеКол > s.ДогКол)
                this.svodOverflow = true;
        }
        this.svodPercent = 0;
        if (dogKol > 0) {
            this.svodPercent = Math.min(taskKol / dogKol * 100, 95);
        }
        if (this.svodPercent > 0 && this.svodPercent < 5) {
            this.svodPercent = 5;
        }
        if (dogKol > 0 && delta == 0) {
            this.svodPercent = 100;
        }
    }

    async setIntoPalleteId(palleteId: number, info: IResult_wms_android_Паллета_инфо) {
        this.intoType = "PAL";
        this.intoPalleteId = palleteId;
        this.intoPalleteInfo = info;
        this.intoName = info.Название;// (await _wms_android_Название_паллеты(palleteId)).НазваниеПаллеты;
        await this.loadTovarsGridData();
        this.forceUpdate();
    }

    async barcodeProcessor() {
        if (!this.props.visible) return;

        let barcode = appState.getNextBarcodeFromQueue(this.props.pageId);
        if (!barcode) return;
        let barcodePrefix = barcode.barcode.substr(0, 3).toUpperCase();
        if (barcode.barcode.toUpperCase().startsWith("CROSS"))
            barcodePrefix = "CROSS";

        if (this.task.ЗавершенноеЗадание) {
            showError("РАЗГРУЗКА завершена.");
            return;
        }



        let res2 = await _wms_android_Штрихкод_запрещен(barcode.barcode);
        if (res2.Запрещен == 1) {
            showError("Запрещенный штрих-код.");
            return;
        }



        if (barcodePrefix == "PAL") {
            let palleteId = Number.parseInt(barcode.barcode.toUpperCase().replace("PAL", ""));
            let pal = await _wms_android_Паллета_инфо(palleteId);
            if (pal.error) {
                showError(pal.error);
                return;
            }

            if (!isNormalPallete(pal)) {
                showError("Это служебная паллета");
                return;
            }

            let checkResult = await _wms_android_РАЗГР_Проверить_паллету(palleteId, this.task.ДоговорКлюч, this.props.taskId, this.isInputOst, this.isReturnOk);
            if (checkResult.error) {
                showError(checkResult.error);
                return;
            }

            let takeResult = await _wms_android_РАЗГР_Взять_паллету_в_задание(palleteId, this.props.taskId, this.task.ЗонаКлюч);
            if (takeResult.error) {
                showError(takeResult.error);
                return;
            }

            PlaySound.паллета_куда(barcode.barcode);
            await this.setIntoPalleteId(palleteId, pal)

            return;
        }

        if (barcodePrefix == "CEL") {
            if (!this.isInputOst) {
                showError("Штрих-код ячейки допустим только при вводе начальных остатков!");
                return;
            }

            let palleteRes = await _wms_android_Получить_паллету_по_шк_беспаллетной_ячейки(barcode.barcode);
            if (palleteRes.error) {
                showError(palleteRes.error);
                return;
            }

            PlaySound.паллета_куда(barcode.barcode);
            let palInfo = await _wms_android_Паллета_инфо(palleteRes.Паллета);
            await this.setIntoPalleteId(palleteRes.Паллета, palInfo)
            return;

        }

        if (this.task.isCrossDoc) {

            if (barcodePrefix != "CROSS") {
                showError("Заявка 'Транзит'. Допустим только штрих-код CROSS");
                return;
            }
            // todo ProcessCross(fBarCode);       

            this.forceUpdate();
            return;

        }

        if (barcodePrefix == "CROSS") {
            showError("Заявка не 'Транзит'. Штрих-код CROSS недопустим.");
            return;
        }


        let tmcRes = await _wms_android_Получить_ТМЦ_по_штрих_коду(barcode.barcode, this.task.КлиентКлюч);
        let tmcId = tmcRes.ТМЦ;
        let barCodeKol = tmcRes.Количество;
        let partId = 0;

        if (tmcId == 0) {
            let partRes = await _wms_android_Получить_Партию_по_штрих_коду(barcode.barcode, this.task.КлиентКлюч);
            partId = partRes.Партия;
            tmcId = partRes.ТМЦ;
            barCodeKol = partRes.Количество;
        }


        if ((tmcId == 0 && partId == 0) || (tmcId != 0 && partId == 0)) {
            //fCreateedPartID:= 0;
            //fFindTMC:= 0;
            let res = await CreatePart_FromBarCode(barcode.barcode, this.task.КлиентКлюч, this.task.ДоговорКлюч);
            if (res.Ok) {
                if (tmcId != 0 && tmcId != res.FindedTMC) {
                    //bmWarning('Штрих-код привязан к ТМЦ (Ключ=' + IntToStr(TMCID) + '), код ТМЦ в считанном штрих-коде (Ключ=' + IntToStr(fFindTMC) + '). На склад будет принят ТМЦ с ключом=' + IntToStr(fFindTMC));
                    showError("Считанный штрих-код товара в партии был ранее привязан к другому ТМЦ.");
                }
                tmcId = res.FindedTMC;
                partId = res.CreateedPartID;
                if (res.Количество > 0)
                    barCodeKol = res.Количество;
            }
        }

        if (tmcId != 0) {
            if (this.intoPalleteId == 0) {
                showError("Паллета не выбрана!", "Палета не выбрана!");
                return;
            }
            // todo if TMCID = - 666 then
            // begin
            //   if bmConfirmation('Товар имеет неуникальный штрих-код. Напечатать этикетку?') then
            //   begin
            //     ShowForm('скл_терминал_Разгрузка_печать штрих кодов', Self);
            //   end;
            // end

            await this.processTovarBarcode(tmcId, partId, barCodeKol);


        }
        else {
            showError("Неизвестный штрих-код", "Неизвестный штрих код");
        }



    }

    приемБезЗадания(): boolean {
        return this.task.СозданИзДопМеню
    }

    async processTovarBarcode(tmcId: number, partId: number, barcodeKol: number) {

        let tmcInfo = await _wms_android_ТМЦ_инфо(tmcId);
        let partInfo: IResult_wms_android_Партия_ТМЦ_инфо;
        if (partId != 0) {
            partInfo = await _wms_android_Партия_ТМЦ_инфо(partId);
            if (partInfo.error) {
                showError(partInfo.error);
                return;
            }
        }

        if (tmcInfo.Поставщик != this.task.КлиентКлюч) {
            showError("Поставщик ТМЦ не соответствует клиенту в задании!");
            return;
        }

        if (tmcInfo.Вес == 0 || tmcInfo.ДлинаБрутто == 0 || tmcInfo.ШиринаБрутто == 0 || tmcInfo.ОбъемБрутто == 0 || tmcInfo.ВысотаБрутто == 0) {
            // todo  NotifyAdminUsers('Не заполнены ОВХ для ТМЦ №' + GetValueFromSQL('SELECT Номер FROM [ТМЦ view] ТМЦ WITH(NOLOCK) WHERE Ключ = ' + VarToStr(TMCID)));
            if (appState.настройки_WMS("Включить контроль грузогабаритных характеристик при вводе заявок") == "1") {
                // todo Result:= ShowForm('скл_терминал_ОВХ_товар', Self)
                showError("У товара незаполнены ОВ характеристики. Такой товар принимать запрещено!");
                return;

            }


        }

        let res1 = await _wms_android_РАЗГР_Проверить_способ_хранения(tmcId, this.intoPalleteId, this.props.taskId);
        if (res1.Ok != "Ok") {
            showError(res1.Ok);
            return;
        }

        if (tmcInfo.КолВУпак == 0 && tmcInfo.ТипТовара.toUpperCase() == "ШТУЧНЫЙ") {
            showError("Этот товар принимать нельзя. Заполните поле 'кол.в упаковке' в карточке товара.");
            return;
        }

        if (!this.task.isReturn) {
            if (partInfo && partInfo.ДоговорПрихода != 0 && partInfo.ДоговорПрихода != this.task.ДоговорКлюч) {
                showError("Партия создавалась по другому договору прихода.");
                return;

            }
        }

        if (this.task.isReturn && this.task.isBrak && partInfo.Брак.toUpperCase() != "БРАК") {
            showError("В заявке разрешен прием только брака!");
            return;
        }

        if (this.task.isReturn && !this.task.isBrak && partInfo.Брак.toUpperCase() == "БРАК") {
            showError("В заявке прием брака запрещен!");
            return;
        }

        if (!this.приемБезЗадания()) {

            // При сканировании ШК ТМЦ (или при выборе через доп. меню) проверять его наличие на не завершенных паллетах в рамках этого задания РАЗГР. 
            // Если такой товар есть выдавать сообщение "Данный товар уже размещен на паллете №…». Продолжить?".
            let checkResult = await _wms_android_РАЗГР_Проверить_товар_на_других_паллетах(this.intoPalleteId, tmcId, this.props.taskId);
            if (checkResult.ПаллетаНазвание != "") {
                if (!(await getConfirmation("Данный товар уже размещен на паллете " + checkResult.ПаллетаНазвание + ". Продолжить?", "Нужно подтверждение", "Продолжить"))) {
                    return;
                }
            }

            if (tmcInfo.Партионный.toUpperCase() == "ПАРТИОННЫЙ" &&
                partId == 0 &&
                tmcInfo.ТипТовара.toUpperCase() != "ВЕСОВОЙ" &&
                tmcInfo.ТипОтбора.toUpperCase() == "FIFO"
            ) {

                if (tmcInfo.ТипТовара.toUpperCase() != "ШТУЧНЫЙ" || tmcInfo.ТипТовара.toUpperCase() != "МЕРНЫЙ С ФИКС МЕТР") {

                    if (tmcInfo.КарточкаНовойПартии != "") {
                        // todo ShowForm(КарточкаНовойПартии, Self);
                        /*            
                            Flag := ShowForm(КарточкаНовойПартии, Self);
                            if Flag then
                            begin
                                PartID := Param.Values('Новая партия');
                                Param.Values('Партия') := Param.Values('Новая партия');
                            end
                            else
                                Exit;
                        */
                    }
                    else {
                        // todo PartID := CreateNewPartFIFO(TaskID, CurPal, TMCID, IsBrak.Checked);
                        /*
                           PartID := CreateNewPartFIFO(TaskID, CurPal, TMCID, IsBrak.Checked);
                           if PartID <> 0 then
                              Param.Values('Партия') := PartID;
                        */
                    }

                }
            }
        }

        let flag: boolean = false;
        if (!this.isBrak_Checked) {

            if (!this.task.РучнойВводКоличества) {

                if (tmcInfo.Партионный.toUpperCase() == "ПАРТИОННЫЙ" && partId == 0) {
                    showError("Необходимо считать партионную этикетку, либо разрешить ручной ввод количества.");
                    return;
                }

                if (this.task.Сверка.toUpperCase() == "ПРЕДУПРЕЖДЕНИЕ" || this.task.Сверка.toUpperCase() == "ЗАПРЕТ") {
                    let sverka = await _wms_android_РАЗГР_Сверка_с_заявкой(this.props.taskId, tmcId, partId, barcodeKol);
                    if (sverka.Результат != "Ok") {
                        if (this.task.Сверка.toUpperCase() == "ЗАПРЕТ") {
                            await showError('Лишний товар! ' + sverka.Результат);
                            return
                        }
                        else {
                            await showInfo('Лишний товар! ' + sverka.Результат);
                        }
                    }
                }
                flag = true;
            }
            else {
                let res = await get_РАЗГР_запрос_партии_и_количества(this.task, tmcInfo, partInfo, barcodeKol);
                if (res.result == "Ok") {
                    barcodeKol = res.selectedKol;
                    partId = res.selectedPartId;
                    partInfo = await _wms_android_Партия_ТМЦ_инфо(partId);
                    if (partInfo.error) {
                        showError(partInfo.error);
                        return;
                    }
                    flag = true;

                }
                // todo barcodeKol=?
                // todo partId=?
                //showError("1 todo Flag := ShowForm('скл_терминал_РАЗГ_запрос количества EX', Self);");

            }
        }
        else {
            let res = await get_РАЗГР_запрос_партии_и_количества(this.task, tmcInfo, partInfo, barcodeKol);
            if (res.result == "Ok") {
                barcodeKol = res.selectedKol;
                partId = res.selectedPartId;
                partInfo = await _wms_android_Партия_ТМЦ_инфо(partId);
                if (partInfo.error) {
                    showError(partInfo.error);
                    return;
                }
                flag = true;

            }
            // todo Flag := ShowForm('скл_терминал_РАЗГ_запрос количества EX', Self);
            // todo barcodeKol=?
            // todo partId=?
            //showError("2 todo Flag := ShowForm('скл_терминал_РАЗГ_запрос количества EX', Self);");
        }

        if (!flag)
            return;

        let newKol = barcodeKol;

        await _wms_android_РАЗГР_INSERT_скл_Комплектация(
            tmcId, this.task.КлиентПаллетаКлюч, this.intoPalleteId, newKol,
            appState.kadrId, partId, this.props.taskId,
            this.task.isReturn, partInfo.ДоговорПрихода
        );

        PlaySound.принято_товаров_X(newKol);
        this.loadTovarsGridData();
        this.loadSvod().then(() => this.forceUpdate());

        if (this.task.Сверка.toUpperCase() == "ПРЕДУПРЕЖДЕНИЕ" || this.task.Сверка.toUpperCase() == "ЗАПРЕТ") {
            let sverkaFull = await _wms_android_РАЗГР_Сверка_с_заявкой_полная(this.props.taskId, tmcId);
            if (sverkaFull.Результат == "Ok") {
                zebraTextToSpeech('Товар сошелся с заявкой!');
                await showInfo('Товар сошелся с заявкой!');
            }
        }


    }

    async componentDidMount() {
        this.task = await _wms_android_Информация_о_задании(this.props.taskId);
        this.palletesInTask = await _wms_android_Список_незавершенных_паллет(this.task.Ключ);


        if (this.task.КлиентКлюч == 0) {
            await showError("В задании не указан 'Клиент'. Выполнение задания не возможно.");
            setTimeout(() => { appState.closeActivePage(); }, 10);
            return;
        }

        if (this.task.КлиентПаллетаКлюч == 0) {
            await showError("В базе данных отсутствует паллета 'Организация'. Выполнение задания не возможно.");
            setTimeout(() => { appState.closeActivePage(); }, 10);
            return;
        }

        if (this.task.ЗонаКлюч == 0) {
            await showError("В Задании не указана зона ПРР. Выполнение задания не возможно.");
            setTimeout(() => { appState.closeActivePage(); }, 10);
            return;
        }

        await this.loadSvod();
        this.barcodeProcessorHandler = setInterval(this.barcodeProcessor.bind(this), 100);
        this.forceUpdate();
    }

    componentWillUnmount() {
        clearInterval(this.barcodeProcessorHandler)
    }

    onTovarsGridReady = (params: any) => {
        this.tovarsGridApi = params.api;
        this.tovarsGridColumnApi = params.columnApi;
        setTimeout(this.loadTovarsGridData.bind(this), 1)
    };

    async loadTovarsGridData() {
        this.selectedRow = null;

        if (this.task)
            this.palletesInTask = await _wms_android_Список_незавершенных_паллет(this.task.Ключ);

        if (!this.tovarsGridApi)
            return;
        if (this.intoPalleteId > 0) {
            this.tovarsGridData = await _wms_android_РАЗГР_Список_товара_на_паллете(this.intoPalleteId);
            this.tovarsGridApi.setRowData(this.tovarsGridData);
            this.tovarsGridApi.sizeColumnsToFit();
            this.tovarsGridApi.resetRowHeights();
        }
        else {
            this.tovarsGridData = [];
            this.tovarsGridApi.setRowData(this.tovarsGridData);
        }
        this.forceUpdate();
    }

    // palletesGridGetRowHeight(params: any): number {
    //     return 45;
    // }

    async ШК_button_click() {
        let res = await get_Запрос_штрих_кода();
        if (res.result == "Ok") {

        }
    }

    render() {
        let overlayNoRowsTemplate = "<span class='ag-overlay-loading-center'>паллета пустая</span>";

        let labelStyle: CSSProperties = {
            color: "gray"
        };

        let textStyle: CSSProperties = {
            paddingLeft: 5,
        };

        if (!this.task) {
            return (
                <div className={"app"} style={{ display: this.props.visible ? "" : "none", backgroundColor: "ALICEBLUE", padding: 10, width: "100%" }}>
                    <div className="card">
                        <div className="card-header">
                            загрузка
                            </div>
                        <div className="card-body">
                        </div>
                    </div>
                </div>
            );
        }


        let объединенная = null;
        if (this.task.Объединенная)
            объединенная = <div style={{ color: "brown" }}>Объединенная заявка!</div>;

        let паллета4 = null;
        if (true) {
            паллета4 = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    паллета
                </BuhtaButton>
            )
        }

        let паллетаОткуда = null;
        if (true) {
            паллетаОткуда = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    откуда
                </BuhtaButton>
            )
        }

        let паллетаКуда = null;
        if (true) {
            паллетаКуда = (
                <BuhtaButton
                    style={{ marginLeft: 10 }}
                    className="btn-sm"
                    color="warning"
                    outline
                    onClick={() => {
                        //playSound_ButtonClick();
                    }}
                >
                    куда
                </BuhtaButton>
            )
        }


        let intoInputClassName = classNames({
            "text-color-red": this.intoType == "",
            [getSubcontoTextColorClass(this.intoType)]: this.intoType != ""
        });

        let tovarCellRenderer = (param: any) => {
            let row: IResult_wms_android_РАЗГР_Список_товара_на_паллете = param.data;
            return (
                "<div style='color:" + ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ + "'>" + escapeHtml(row.ТоварНазвание) + "</div>" +
                "<div style='color:" + ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ + "'>" + escapeHtml(row.Партия) + "</div>" +
                "<div style='color:" + ЦВЕТ_ТЕКСТА_НОМЕР_ТМЦ + "'>" + escapeHtml(row.ТоварНомер) + "</div>"
            )
        }

        let progressColorClass = "bg-success";
        if (this.svodOverflow)
            progressColorClass = "bg-danger";

        let big_font_message: any = null;

        if (this.intoPalleteId == 0) {
            let buttons: any = this.palletesInTask.map((pal: IResult_wms_android_Список_незавершенных_паллет, index: number) => {
                return (
                    <BuhtaButton
                        key={index}
                        outline
                        color={"warning"}
                        onClick={async () => {
                            await this.завершить_паллету_по_ключу(pal.Ключ);
                            await this.loadTovarsGridData();
                            this.forceUpdate()
                        }}
                        style={{ marginBottom: 5 }}
                    >
                        завершить паллету {pal.НомерНазвание}
                    </BuhtaButton>
                )
            });

            big_font_message = (
                <div style={{ zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }}>
                    <div style={{ height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
                        <div style={{ fontSize: 18, textAlign: "center", color: "darkorange" }}>
                            <div style={{ marginBottom: 30 }}>Паллета не выбрана!</div>
                            <div style={{ marginBottom: 10 }}> Отсканируйте штрих-код паллеты, на которую будете принимать товар</div>
                            {buttons}
                        </div>
                    </div>
                </div>
            )
        }

        if (this.svodPercent == 100 && this.intoPalleteId == 0) {

            let buttons: any = this.palletesInTask.map((pal: IResult_wms_android_Список_незавершенных_паллет, index: number) => {
                return (
                    <BuhtaButton
                        key={index}
                        outline
                        color={"success"}
                        onClick={async () => {
                            await this.завершить_паллету_по_ключу(pal.Ключ);
                            await this.loadTovarsGridData();
                            this.forceUpdate()
                        }}
                        style={{ marginBottom: 5 }}
                    >
                        завершить паллету {pal.НомерНазвание}
                    </BuhtaButton>
                )
            });

            if (buttons.length == 0)
                buttons = <div style={{ fontSize: 18 }}>Нажмите кнопку "Завершить"</div>;

            big_font_message = (
                <div style={{ zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }}>
                    <div style={{ height: "100%", width: "100%", position: "absolute", display: "flex", justifyContent: "center", alignItems: "center", padding: 10 }}>
                        <div style={{ fontSize: 18, textAlign: "center", color: "#4dbd74" }}>
                            <div style={{ marginBottom: 30, fontSize: 18 }}>Задание выполнено!</div>
                            {buttons}
                        </div>
                    </div>
                </div>
            )
        }



        return (
            <div className={"app " + (appState.getActivePageId() == this.props.pageId ? "active-window cy-razgr-page" : "")} style={{ display: this.props.visible ? "flex" : "none", flexDirection: "column", backgroundColor: "whitesmoke", padding: 0, width: "100%" }}>
                <div className="card " style={{ marginBottom: 0, flex: "1" }}>
                    <div className="progress task-progress">
                        <div className={"progress-bar progress-bar-striped " + progressColorClass} style={{ width: this.svodPercent + "%" }}></div>
                    </div>
                    <div className="card-header" style={{ zoom: appState.zoom, padding: 5, backgroundColor: getTaskConst(this.task.Тип).headerBackground }}>
                        <table>
                            <tbody>
                                <tr>
                                    <td>
                                        <div>{this.task.НазваниеЗадания}</div>
                                        {объединенная}
                                    </td>
                                    <td>
                                        <BuhtaButton
                                            outline
                                            color={this.svodOverflow ? "danger" : "success"}
                                            onClick={async () => { await show_РАЗГР_свод(this.task) }}
                                        >
                                            <i className="fal fa-tasks"></i>
                                        </BuhtaButton>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="card-body" style={{ display: "flex", flexDirection: "column", padding: 0 }}>
                        <div style={{ padding: 5, zoom: appState.zoom, }}>

                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr style={{ display: this.intoPalleteId == 0 ? "none" : undefined }}>
                                        <td style={{ ...labelStyle }}>куда</td>
                                        <td className={intoInputClassName} style={{ ...textStyle }}>{this.intoName}</td>
                                        <td>
                                            {/* <BuhtaButton small outline color="primary">новая</BuhtaButton> */}
                                            <BuhtaButton
                                                small outline
                                                color="success"
                                                style={{ marginLeft: 5 }}
                                                onClick={this.завершить_паллету.bind(this)}
                                                hidden={this.intoPalleteId == 0}
                                            >
                                                завершить паллету
                                            </BuhtaButton>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        {big_font_message}
                        <div style={{ display: this.intoPalleteId == 0 ? "none" : undefined, zoom: appState.zoom, flex: "1", overflow: "hidden", position: "relative" }} className="ag-theme-balham">
                            <div style={{ height: "100%", width: "100%", position: "absolute" }}>
                                <AgGridReact
                                    //headerHeight={25}
                                    suppressLoadingOverlay
                                    overlayNoRowsTemplate={overlayNoRowsTemplate}
                                    onGridReady={this.onTovarsGridReady}
                                    //rowHeight={70}
                                    onRowClicked={this.onTovarGridRowClicked.bind(this)}
                                >
                                    <AgGridColumn
                                        headerName="Товар/Партия"
                                        field="Товар"
                                        cellRenderer={tovarCellRenderer}
                                        cellStyle={{ whiteSpace: "normal" }}
                                        autoHeight
                                    >
                                    </AgGridColumn>
                                    <AgGridColumn headerName="Кол" field="Кол" width={45} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}></AgGridColumn>
                                    <AgGridColumn headerName="Упак" field="Кор" width={65} cellStyle={{ textAlign: "center", color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО }}></AgGridColumn>

                                </AgGridReact>
                            </div>
                        </div>

                    </div>
                </div>
                <div style={{ zoom: appState.zoom, textAlign: "right" }}>
                    <div style={{ marginTop: 10, paddingRight: 4 }}>
                        <BuhtaButton small outline color="primary" style={{ marginLeft: 3 }}>Доп.меню</BuhtaButton>
                        <BuhtaButton small outline style={{ marginLeft: 3, minWidth: 40 }} onClick={this.ШК_button_click.bind(this)}>ШК</BuhtaButton>
                        <BuhtaButton
                            disabled={this.intoPalleteId == 0}
                            small outline style={{ marginLeft: 3 }}
                            onClick={async () => {
                                let res = await get_Выбор_ТМЦ(this.task);
                                if (res.result == "Ok") {
                                    appState.pushTestBarcode("T" + res.tmcId, "");
                                }
                            }}
                        >
                            Товар
                        </BuhtaButton>
                        <BuhtaButton
                            disabled={!this.selectedRow}
                            small outline color="success" style={{ marginLeft: 3 }}
                            onClick={async () => {
                                let res = await get_РАЗГР_изменить_количество(this.task, this.selectedRow, this.intoPalleteInfo);
                                if (res.result == "Ok") {
                                    await this.loadTovarsGridData();
                                    this.loadSvod().then(() => this.forceUpdate());
                                }

                            }}
                        >
                            Изм.кол.
                        </BuhtaButton>

                        <BuhtaButton
                            disabled={this.intoPalleteId == 0}
                            small outline color="danger" style={{ marginLeft: 3 }}
                            onClick={async () => {
                                let otkatInfo = await _wms_android_РАЗГР_инфо_для_отката(this.task.Ключ, this.intoPalleteInfo.Ключ);
                                if (otkatInfo.length == 0) {
                                    showError("Нет товара на паллете, откат невозможен");
                                    return;
                                }

                                let otkatTmc = await _wms_android_ТМЦ_инфо(otkatInfo[0].ТМЦ);
                                let otkatPart = await _wms_android_Партия_ТМЦ_инфо(otkatInfo[0].Партия);
                                let message = (
                                    <div>
                                        <div style={{ color: "red", fontSize: 14, marginBottom: 7 }}>Откатить операцию приема?</div>
                                        <div style={{ color: ЦВЕТ_ТЕКСТА_НАЗВАНИЕ_ТМЦ }}>{otkatTmc.Название}</div>
                                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАРТИЯ_ТМЦ, marginBottom: 4 }} >{otkatPart.НомерНазвание}</div>
                                        <div style={{ color: ЦВЕТ_ТЕКСТА_КОЛИЧЕСТВО, marginBottom: 4 }}>кол-во: {otkatInfo[0].Количество} {otkatTmc.ЕдИзм}</div>
                                        <div style={{ color: ЦВЕТ_ТЕКСТА_ПАЛЛЕТА }}>на паллету {this.intoPalleteInfo.Название}</div>
                                    </div>
                                );
                                zebraTextToSpeech("Подтвердите откат");
                                if (await getConfirmation(message)) {

                                    let res = await _wms_android_РАЗГР_откат(otkatInfo[0].Ключ);
                                    if (res.error) {
                                        showError(res.error);
                                        return;
                                    }
                                    else {
                                        zebraTextToSpeech("откат выполнен");
                                        await this.loadTovarsGridData();
                                        this.loadSvod().then(() => this.forceUpdate());
                                    }
                                }

                            }}
                        >
                            Откат
                        </BuhtaButton>

                    </div>

                    <div style={{ marginTop: 10, paddingBottom: 10, paddingRight: 4 }}>
                        {/* <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="danger"
                            outline
                            onClick={async () => {
                                let p: any = {
                                    taskId: this.props.taskId,
                                    запрос_количества_TMCID: 1143,
                                    запрос_количества_NewKol: 1,
                                    запрос_количества_MaxKol: 17,
                                    запрос_количества_PartID: 526,
                                    запрос_количества_ЯчейкаОткуда: 17084,
                                    запрос_количества_НазваниеПартии: "СР: 08.02.2020",
                                    запрос_количества_НазваниеТовара: "[00001638] ПОЛЕСЬЕ Соль экстра 1 кг (20 шт.) :",
                                    запрос_количества_Ввод_количества_в_раскладке: 1,
                                    запрос_количества_ВсегоКоличество: 2196437

                                }
                                await get_РАЗГР_запрос_количества(p);
                                //     taskId: this.props.taskId,
                                //     palleteFrom: this.fromId,
                                // })
                            }}
                        >
                            ЗК
                        </BuhtaButton> */}
                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm cy-test-barcodes"
                            color="danger"
                            outline
                            onClick={() => {
                                appState.openPage(TestBarcodesPage, {
                                    pageId: TestBarcodesPage.PAGE_ID,
                                    taskId: this.props.taskId,
                                    palleteFrom: 0,
                                })
                            }}
                        >
                            ШТРИХ
                        </BuhtaButton>

                        <HelpButton>
                            {this.getHelpBody()}
                        </HelpButton>

                        <BuhtaButton
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="secondary"
                            outline
                            onClick={() => {
                                appState.closeActivePage();
                            }}
                        >
                            Выход
                        </BuhtaButton>
                        <BuhtaButton
                            disabled={this.palletesInTask.length > 0}
                            style={{ marginLeft: 10 }}
                            className="btn-sm"
                            color="success"
                            onClick={this.завершить_задание.bind(this)}
                        >
                            Завершить
                        </BuhtaButton>
                    </div>
                </div>



            </div >
        )
    }

    selectedRow: IResult_wms_android_РАЗГР_Список_товара_на_паллете = null;
    onTovarGridRowClicked(e: any) {
        playSound_ButtonClick();
        this.selectedRow = e.data;
        this.forceUpdate();
    }

    async завершить_паллету() {
        if (this.intoPalleteId == 0)
            return

        await this.loadTovarsGridData(); // не удалять              
        let res = await get_РАЗГР_запрос_габаритов_паллеты(this.task, this.intoPalleteInfo, this.isInputOst, this.tovarsGridData.length == 0);
        if (res.result == "Ok") {
            this.clearPalleteId();
        }


    }

    async завершить_паллету_по_ключу(palleteId: number) {
        let palleteInfo = await _wms_android_Паллета_инфо(palleteId);
        await get_РАЗГР_запрос_габаритов_паллеты(this.task, palleteInfo, this.isInputOst, palleteInfo.Пустая);
    }

    async завершить_задание() {
        this.palletesInTask = await _wms_android_Список_незавершенных_паллет(this.task.Ключ);

        if (this.palletesInTask.length > 0) {
            showError("Остались незавершенные паллеты!");
            return;

        }

        if (this.task.Сверка == "Предупреждение" || this.task.Сверка == "Запрет") {
            let checkResult = await _wms_android_РАЗГР_Сверка_с_заявкой_полная(this.task.Ключ, 0);
            if (checkResult.Результат != "Ok") {
                if (this.task.Сверка == "Запрет") {
                    showError(checkResult.Результат);
                    return;
                }
                else if (this.task.Сверка == "Предупреждение") {
                    if (!await getWarningConfirmation(checkResult.Результат, "Внимание!", "Завершить задание"))
                        return;
                }
            }
        }

        let res = await get_РАЗГР_завершение_задания(this.task, this.isInputOst);
        if (res.result == "Ok") {

            let sqlRes = await _wms_android_РАЗГР_завершить_задание(
                this.task.Ключ,
                this.task.ДоговорКлюч,
                appState.kadrId
            );

            if (sqlRes.error) {
                showError(sqlRes.error);
                return
            }


            if (res.isPrintAkt) {
                let print_res = await _wms_android_РАЗГР_Печать_акта_о_расхождениях(this.task.Ключ, appState.kadrId);
                if (print_res.error) {
                    showError(sqlRes.error);
                }
                else {
                    zebraTextToSpeech("акты отправлены на печать, задание завершено");
                    await showInfo("Aкты отправлены на печать, задание завершено");
                }
            }
            else {
                zebraTextToSpeech("задание завершено");
                await showInfo("Задание завершено");
            }

            appState.closeActivePage();
        }

    }



    getHelpBody() {
        return (
            <React.Fragment>
                <div className="card-header">режим РАЗГРУЗКА</div>
                <div className="card-body">
                    <h5>назначение кнопок:</h5>

                    <table className="help-table">
                        <tbody>
                            <tr>
                                <td>
                                    <BuhtaButton
                                        outline
                                        color={"success"}
                                    >
                                        <i className="fal fa-tasks"></i>
                                    </BuhtaButton>
                                </td>
                                <td>
                                    показать сводку по товарам (надо принять/принято)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton small outline color="success">завершить паллету</BuhtaButton>
                                </td>
                                <td>
                                    завершить прием товара на данную паллету
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton small outline color="primary">Доп.меню</BuhtaButton>
                                </td>
                                <td>
                                    вызов дополнительного меню
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton small outline>ШК</BuhtaButton>
                                </td>
                                <td>
                                    ввод штрих-кода с клавиатуры
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton small outline>Товар</BuhtaButton>
                                </td>
                                <td>
                                    выбор товара из списка (поиск по номеру, названию)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton small outline color="success">Изм.кол.</BuhtaButton>
                                </td>
                                <td>
                                    изменить количество товара (предварительно надо выбрать строку с товаром в списке)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton small outline color="danger">Откат</BuhtaButton>
                                </td>
                                <td>
                                    отменить последнее действие по приему товара на паллету
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton color="secondary" outline>Выход</BuhtaButton>
                                </td>
                                <td>
                                    временно прекратить работу с заданием (потом можно будет взять в работу опять)
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <BuhtaButton color="success">Завершить</BuhtaButton>
                                </td>
                                <td>
                                    завершить задание, когда весь товар разгружен
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </React.Fragment>
        )
    }
}


interface ICreatePart_FromBarCode_Result {
    Ok: boolean;
    FindedTMC: number;
    CreateedPartID: number;
    Количество: number;
}

async function CreatePart_FromBarCode(aBarCode: string, aClientID: number, aDogID: number): Promise<ICreatePart_FromBarCode_Result> {

    let fArtikulBarCodeSt: string;
    let fReleaseDate: Moment;
    let fExpiredDate: Moment;
    let fPartNum: string = "";

    let result: ICreatePart_FromBarCode_Result = { Ok: false, FindedTMC: 0, CreateedPartID: 0, Количество: 0 }

    let fGS1 = parseGS1(aBarCode);

    if (fGS1.length > 0) {
        let item: IGS1Item;

        // выделяем штрих-код тмц
        item = fGS1.find((i: IGS1Item) => i.ai == "01"); if (!item) return result;
        fArtikulBarCodeSt = item.data.toString();

        // выделяем дату выпуска
        item = fGS1.find((i: IGS1Item) => i.ai == "11"); if (!item) return result;
        if (item.data instanceof Date)
            fReleaseDate = moment(item.data);
        else
            return result;

        // выделяем дату годности
        item = fGS1.find((i: IGS1Item) => i.ai == "17"); if (!item) return result;
        if (item.data instanceof Date)
            fExpiredDate = moment(item.data);
        else
            return result;

        // выделяем номер партии
        item = fGS1.find((i: IGS1Item) => i.ai == "10"); if (!item) return result;
        if (!item.data || item.data == "")
            return result;
        fPartNum = item.data.toString();

        // выделяем количество
        item = fGS1.find((i: IGS1Item) => i.ai == "37"); if (!item) return result;
        if (!item.data || item.data == "" || !(Number.parseFloat(item.data.toString()) > 0))
            return result;
        result.Количество = Number.parseFloat(item.data.toString())

        let tmcId = (await _wms_android_Получить_ТМЦ_по_штрих_коду(fArtikulBarCodeSt, aClientID)).ТМЦ;

        if (tmcId > 0) {
            result.Ok = true;
            result.FindedTMC = tmcId;
            result.CreateedPartID = (await _wms_android_РАЗГР_Создать_партию_из_штрих_кода(fArtikulBarCodeSt, aDogID, aClientID, tmcId, fReleaseDate, fExpiredDate, fPartNum)).Партия;
        }

    }

    return result;

}
