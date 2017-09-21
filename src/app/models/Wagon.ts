import { Item } from './Item'

export class Wagon  {

	wagonId: number;
	wagonSeq: number;
	items: Item[];
	wagonDate: Date;
	marked: boolean;
	stationId: number;
	stationName: string
	template: number;
	headerStationColumnWidth: any;
	headerSeqColumnWidth: any;
	headerPartColumnWidth: any;
	headerTaktColumnWidth: any;
	boxesColumnWidth: any;
	partRowHeight: any;
	boxesRowHeight: any;
	partNameRowHeight: any;
	qualityAlertRowHeight: any;
	qualityAlertFontSize: number;
	stationTaktOn: boolean;
	stationTaktFirstClickEnabled: boolean;
	stationTaktTime: number;
	barQtyParts: boolean;
	barTimePicking: boolean;
	barPressToMark: boolean;
	barPressToStop: boolean;
	barTimeDefault: number;
	showMissingParts: boolean;
	stackWagon: boolean;
	stackWagonInverseSeq: boolean;
	stackWagonShowPopup: boolean;
	transitionPart: any;	

	constructor(){ }
	
}