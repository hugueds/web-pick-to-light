import { Injectable } from '@angular/core';

@Injectable()

export class Config {

    // server =  'http://10.8.66.81:8089'; // TESTE
    server =  'http://10.8.66.81:8082'; // ORIGINAL
    pickServer =  'pick.br.scania.com';
    missingPartServer = 'http://10.8.66.81:8083';
    testServer =  'http://10.8.66.81:8089'; // TESTE

}
