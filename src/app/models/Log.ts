export class Log {

  idWagon: number;
  user?: string;
  justification?: string;
  connection?: string;
  device?: string;
  timestamp?: Date;
  ip?: string;
  skipItems?: number;
  idStation?: number;


  constructor(idWagon, user, justification) {
    this.idWagon = idWagon;
    this.user = user;
    this.justification = justification;
  }

}
