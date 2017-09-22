import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/Device';


@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {  

  device: Device;

  constructor(private _deviceService: DeviceService) { }

  ngOnInit() {
    this.device = this._deviceService.getDeviceInfo();
  }

}
