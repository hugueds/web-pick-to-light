import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DeviceGuard } from './guard/device.guard';

import { MaterialModule } from './material/material.module';
import { ContentModule } from './content/content.module';
import { AppRoutingModule } from './app-routing.module';

import { Config } from './app.config';
import { DeviceService } from './services/device.service';
import { SockService } from './services/sock.service';
import { PickService } from './services/pick.service';

import { ContentComponent } from './content/content.component';
import { NavbarComponent } from './navbar/navbar.component';

import { FooterComponent } from './footer/footer.component';
import { ConfigurationComponent } from './configuration/configuration.component';
import { AboutComponent } from './about/about.component';

import { BoxColorDirective } from './shared/box-color.directive';
import { WagonColorDirective } from './shared/wagon-color.directive';

import { AppComponent } from './app.component';
import { ShelfConfigComponent } from './shelf-config/shelf-config.component';
import { TestsComponent } from './tests/tests.component';
import { ShelfDetailComponent } from './shelf-config/shelf-detail.component';
import { OpkComponent } from './opk/opk.component';
import { OpkDetailComponent } from './opk/detail/opk-detail.component';
import { SearchPipe } from './shared/search.pipe';
import { TimePipe } from './shared/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ConfigurationComponent,
    AboutComponent,
    TestsComponent,
    ShelfConfigComponent,
    ShelfDetailComponent,
    OpkComponent,
    OpkDetailComponent,
    BoxColorDirective, WagonColorDirective, ShelfConfigComponent, TestsComponent, SearchPipe, TimePipe,
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
  providers: [SockService, DeviceService, PickService, DeviceGuard, Config, { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
