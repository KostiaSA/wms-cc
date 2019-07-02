import { strict } from "assert";
import { string } from "prop-types";


declare var parseBarcode: any;

export interface IGS1Item {
    ai: string;
    dataTitle: string;
    data: string | Date;
    unit: string;
}

export function parseGS1(barcode: string): IGS1Item[] {
    return parseBarcode(barcode);
}