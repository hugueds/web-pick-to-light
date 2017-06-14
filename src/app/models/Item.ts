import { Box } from './Box';

export class Item {

    "idPart": number;
    "too": string;
    "obj": string;
    "sname": string;
    "text": string;
    "pos": number;
    "photo": any;
    "leftBoxes": any;
    "rightBoxes": any;
    "isPicked": boolean;
    "isMissing": boolean;
    "timePickingPart": any;
    "columns": number;
    "partName": string;
    "boxes" : Box[];

    constructor(){ }
    
}