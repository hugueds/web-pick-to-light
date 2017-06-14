import { Injectable } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { CanActivate, ActivatedRouteSnapshot, } from '@angular/router';

import { Observable } from "rxjs/Observable";
[]
import { DeviceService } from 'app/shared/device.service';


@Injectable()
export class DeviceGuard implements CanActivate {


    constructor(
        private _router: Router,
        private _deviceService: DeviceService
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | boolean {

        let device = this._deviceService.getDeviceInfo();

        if ( device.isRegistered ){
            return true;
        }

        //Comment for offline tests
        this._router.navigate(['/configuration']); 

        return false;
    }

    checkDevice(){

    }

}