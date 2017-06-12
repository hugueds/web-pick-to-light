import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from "app/material/material.module";


import { DeviceService } from "app/shared/device.service";
import { SockService } from "app/shared/sock.service";
import { PickService } from "app/shared/pick.service";


import { PartComponent } from './part/part.component';
import { WagonComponent } from './wagon/wagon.component';
import { ContentComponent } from './content/content.component';
import { WagonContainerComponent } from './wagon-container/wagon-container.component';
import { WagonBoxComponent } from './wagon-box/wagon-box.component';
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';


import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { MissingPartComponent, MissingPartDialogComponent } from './missing-part/missing-part.component';
import { ConfigurationComponent } from './configuration/configuration.component';




@NgModule({
  declarations: [
    AppComponent,
    PartComponent,
    WagonComponent,
    ContentComponent,
    WagonContainerComponent,
    WagonBoxComponent,
    NavbarComponent,
    BannerComponent,
    FooterComponent,
    MissingPartComponent,       
    MissingPartDialogComponent, ConfigurationComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents : [MissingPartDialogComponent],
  providers: [SockService, DeviceService, PickService],
  bootstrap: [AppComponent]
})
export class AppModule { }
