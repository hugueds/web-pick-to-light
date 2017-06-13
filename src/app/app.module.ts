import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from "app/material/material.module";
import { ContentModule } from "app/content/content.module";


import { DeviceService } from "app/shared/device.service";
import { SockService } from "app/shared/sock.service";
import { PickService } from "app/shared/pick.service";


import { ContentComponent } from './content/content.component';
import { NavbarComponent } from './navbar/navbar.component';


import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AboutComponent } from './about/about.component';

import { BoxColorDirective } from './box-color.directive';
import { WagonColorDirective } from './wagon-color.directive';
import { AppRoutingModule } from "app/app-routing.module";




@NgModule({
  declarations: [
    AppComponent,           
    NavbarComponent,    
    FooterComponent,
    ConfigurationComponent, 
    AboutComponent,     
    BoxColorDirective, WagonColorDirective
  ],
  imports: [
    // AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    ContentModule
  ],
  providers: [SockService, DeviceService, PickService],
  bootstrap: [AppComponent]
})
export class AppModule { }
