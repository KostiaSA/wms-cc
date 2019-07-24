import { zebraTextToSpeech } from "../zebra/ZebraApi";
import { playSound } from "../utils/playSound";
import { sleep } from "../utils/sleep";
import { showSnack } from "../ui/showSnack";
import { number } from "prop-types";

function barcodeToString_00_00(barcode: string): string {
    if (!barcode || barcode == "")
        return "";
    barcode = barcode.replace(/\D/g, '').slice(-4);
    return barcode.substr(0, 2) + "(" + barcode.substr(2, 2) + ")";
}


export class PlaySound {

    static async ошибка(text: string) {
        showSnack(text, "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech(text);
    }

    static async ошибка_приложения(text: string) {
        showSnack(text, "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech(text);
    }

    static async неизвестный_штрих_код() {
        showSnack("неизвестный штрих-код", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("неизвестный штрих-кот");
    }

    static async штрих_коды_здесь_недопустимы() {
        showSnack("штрих-коды здесь недопустимы", "error");
        playSound("error-lite");
        await sleep(700);
        zebraTextToSpeech("штрихкоды здесь недопустимы");
    }

    static async паллета(barcode: string) {
        showSnack("паллета " + barcode, "info");
        zebraTextToSpeech("палета " + barcodeToString_00_00(barcode));
    }

    static async паллета_куда(barcode: string) {
        //showSnack("паллета куда " + barcode, "info");
        zebraTextToSpeech("палета куда" + barcodeToString_00_00(barcode));
    }

    static async паллета_откуда(barcode: string) {
        //showSnack("паллета откуда " + barcode, "info");
        zebraTextToSpeech("палета откуда" + barcodeToString_00_00(barcode));
    }

    static async товар(barcode: string) {
        showSnack("товар " + barcode, "info");
        zebraTextToSpeech("товар " + barcodeToString_00_00(barcode));
    }

    static async не_выбрана_паллета_откуда() {
        showSnack("не выбрана паллета откуда", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("не выбрана палета откуда");
    }

    static async не_выбрана_паллета_куда() {
        showSnack("не выбрана паллета куда", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("не выбрана палета куда");
    }

    static async завершить_задание(taskNum: string) {
        showSnack("завершить задание " + taskNum + " ?", "info");
        zebraTextToSpeech("завершить задание " + barcodeToString_00_00(taskNum) + " ?");
    }

    static async задание_взято_в_работу(taskNum: string) {
        showSnack("задание " + taskNum + " взято в работу", "info");
        zebraTextToSpeech("задание " + barcodeToString_00_00(taskNum) + " взято в работу");
    }

    static async паллета_взята_в_подбор(barcode: string) {
        showSnack("паллета " + barcode + " взята в подбор", "info");
        zebraTextToSpeech("палета " + barcodeToString_00_00(barcode) + " взята в подбор");
    }

    static async паллета_завершена(barcode: string) {
        showSnack("паллета " + barcode + " завершена", "info");
        zebraTextToSpeech("палета " + barcodeToString_00_00(barcode) + " завершена");
    }

    static async коробка_взята_в_подбор(barcode: string) {
        showSnack("коробка " + barcode + " взята в подбор", "info");
        zebraTextToSpeech("коробка " + barcodeToString_00_00(barcode) + " взята в подбор");
    }

    static async паллета_не_подходит(barcode: string) {
        showSnack("паллета " + barcode + " не подходит", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("палета " + barcodeToString_00_00(barcode) + " не подходит");
    }

    static async коробка_не_подходит(barcode: string) {
        showSnack("коробка " + barcode + " не подходит", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("коробка " + barcodeToString_00_00(barcode) + " не подходит");
    }

    static async товар_не_подходит(barcode: string) {
        showSnack("товар " + barcode + " не подходит", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("товар " + barcodeToString_00_00(barcode) + " не подходит");
    }

    static async партия_товара_не_подходит(barcode: string) {
        showSnack("партия товара " + barcode + " не подходит", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("партия товара " + barcodeToString_00_00(barcode) + " не подходит");
    }

    static async ячейка_не_подходит(barcode: string) {
        showSnack("ячейка " + barcode + " не подходит", "error");
        playSound("error");
        await sleep(700);
        zebraTextToSpeech("ячейка " + barcodeToString_00_00(barcode) + " не подходит");
    }

    static async штрихкод_не_подходит(barcodeType: string, barcode: string) {
        if (barcodeType == "Яч")
            return PlaySound.ячейка_не_подходит(barcode);
        else if (barcodeType == "PAL")
            return PlaySound.паллета_не_подходит(barcode);
        else if (barcodeType == "ТМЦ")
            return PlaySound.товар_не_подходит(barcode);
        else if (barcodeType == "BOX")
            return PlaySound.коробка_не_подходит(barcode);
        else if (barcodeType == "Пар")
            return PlaySound.партия_товара_не_подходит(barcode);
        else
            throw "PlaySound.штрихкод_не_подходит():неизвестный тип объекта '" + barcodeType + "'";
    }

    static async товар_подобран(barcode: string) {
        showSnack("товар " + barcode + " подобран", "success");
        zebraTextToSpeech("товар " + barcodeToString_00_00(barcode) + " подобран");
    }

    static async партия_товара_подобрана(barcode: string) {
        showSnack("партия товара " + barcode + " подобрана", "success");
        zebraTextToSpeech("партия товара " + barcodeToString_00_00(barcode) + " подобран-а");
    }

    static async введите_количество() {
        //showSnack("товар " + barcode + " подобран", "success");
        zebraTextToSpeech("введите количество");
    }

    static async новое_количество(kol: number) {
        showSnack("новое количество " + kol, "success");
        zebraTextToSpeech("новое количество " + kol);
    }

    static async принято_X_штук(edIzm: string, kol: number) {
        //showSnack("товар " + barcode + " подобран", "success");
        let s = kol.toString().split(".")[0];
        let last = s.slice(-1);
        let last2 = s.substr(-2, 2);
        if (last2 == "10") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "11") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "12") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "13") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "14") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "15") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "16") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "17") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "18") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "19") zebraTextToSpeech("принято " + s + " штук");
        else if (last2 == "20") zebraTextToSpeech("принято " + s + " штук");
        else if (last == "1") zebraTextToSpeech("принята " + s + " штука");
        else if (last == "2") zebraTextToSpeech("принято " + s + " штуки");
        else if (last == "3") zebraTextToSpeech("принято " + s + " штуки");
        else if (last == "4") zebraTextToSpeech("принято " + s + " штуки");
        else if (last == "5") zebraTextToSpeech("принято " + s + " штук");
        else if (last == "6") zebraTextToSpeech("принято " + s + " штук");
        else if (last == "7") zebraTextToSpeech("принято " + s + " штук");
        else if (last == "8") zebraTextToSpeech("принято " + s + " штук");
        else if (last == "9") zebraTextToSpeech("принято " + s + " штук");
        else if (last == "0") zebraTextToSpeech("принято " + s + " штук");

    }

    static async принято_товаров_X(kol: number) {
        let s = kol.toString().split(".")[0];
        showSnack("принято товаров " + s, "success");
        if (s == "1") zebraTextToSpeech("принят 1 товар");
        else if (s == "2") zebraTextToSpeech("принято 2 товара");
        else if (s == "3") zebraTextToSpeech("принято 3 товара");
        else if (s == "4") zebraTextToSpeech("принято 4 товара");
        else if (s == "5") zebraTextToSpeech("принято 5 товарав");
        else if (s == "6") zebraTextToSpeech("принято 6 товаров");
        else if (s == "7") zebraTextToSpeech("принято 7 товаров");
        else if (s == "8") zebraTextToSpeech("принято 8 товаров");
        else if (s == "9") zebraTextToSpeech("принято 9 товаров");
        else if (s == "10") zebraTextToSpeech("принято 10 товаров");
        else if (s == "11") zebraTextToSpeech("принято 11 товаров");
        else if (s == "12") zebraTextToSpeech("принято 12 товаров");
        else if (s == "13") zebraTextToSpeech("принято 13 товаров");
        else if (s == "14") zebraTextToSpeech("принято 14 товаров");
        else if (s == "15") zebraTextToSpeech("принято 15 товаров");
        else if (s == "16") zebraTextToSpeech("принято 16 товаров");
        else if (s == "17") zebraTextToSpeech("принято 17 товаров");
        else if (s == "18") zebraTextToSpeech("принято 18 товаров");
        else if (s == "19") zebraTextToSpeech("принято 19 товаров");
        else if (s == "20") zebraTextToSpeech("принято 20 товаров");
        else zebraTextToSpeech("принято товаров " + s);

    }

    static async выберите_партию() {
        //showSnack("товар " + barcode + " подобран", "success");
        zebraTextToSpeech("выберите партию");
    }

    static async новая_партия() {
        //showSnack("товар " + barcode + " подобран", "success");
        zebraTextToSpeech("новая партия");
    }

    static async выберите_задание() {
        //showSnack("товар " + barcode + " подобран", "success");
        zebraTextToSpeech("выберите задание");
    }
}
