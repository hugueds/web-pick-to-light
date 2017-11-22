export class PopidList {
    popid: string;
    parts: [{
        obj: string;
        sname: string;
        quantity: number;
    }];

    constructor(popid, parts) {
        this.popid = popid;
        this.parts = parts;
    }


}
