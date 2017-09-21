export class Device {

    id: number;    
    name : string;
    deviceModel: string;    
    user: string;    
    lastLogin: Date;
    groupId : number;
    groupName: string;
    stations : any[];
    isRegistered : boolean = false;  
    currentStation: number = 0;

    constructor(){}

}