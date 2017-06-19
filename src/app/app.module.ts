import { DeviceGuard } from 'app/guard/device.guard';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { MaterialModule } from "app/material.module";
import { ContentModule } from "app/content/content.module";
import { AppRoutingModule } from "app/app-routing.module";

import { DeviceService } from "app/shared/device.service";
import { SockService } from "app/shared/sock.service";
import { PickService } from "app/shared/pick.service";

import { ContentComponent } from './content/content.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FooterComponent } from './footer/footer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AboutComponent } from './about/about.component';

import { BoxColorDirective } from './shared/box-color.directive';
import { WagonColorDirective } from './shared/wagon-color.directive';

import { AppComponent } from './app.component';

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
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    ContentModule
  ],
  providers: [SockService, DeviceService, PickService, DeviceGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
