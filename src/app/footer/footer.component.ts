import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../models/Device';


@Component({
  selector: 'app-footer',
  template: `
  <md-toolbar>
    <span>USUÁRIO: {{ device?.user }}</span>
    <span class="spacer"></span>
    <span>{{ device?.name }}</span>
    <span class="spacer"></span>
    <span>{{ device?.groupName }}</span>
  </md-toolbar>`,
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  device: Device;

  constructor(private _deviceService: DeviceService) { }

  ngOnInit() {
    this.device = this._deviceService.getDeviceInfo();
  }

}
