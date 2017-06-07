import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdSlideToggleModule, MdSidenavModule,MdProgressBarModule, MdProgressSpinnerModule  } from '@angular/material';


import { PartComponent } from './part/part.component';
import { WagonComponent } from './wagon/wagon.component';
import { ContentComponent } from './content/content.component';
import { WagonContainerComponent } from './wagon-container/wagon-container.component';
import { WagonBoxComponent } from './wagon-box/wagon-box.component';

import { SockService } from "app/shared/sock.service";
import { NavbarComponent } from './navbar/navbar.component';
import { BannerComponent } from './banner/banner.component';
import { MissingPartButtonComponent } from './missing-part-button/missing-part-button.component';

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
    MissingPartButtonComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdSlideToggleModule, MdSidenavModule, MdProgressBarModule, MdProgressSpinnerModule
  ],
  providers: [SockService],
  bootstrap: [AppComponent]
})
export class AppModule { }
