import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { DeviceGuard } from './guard/device.guard';

import { MaterialModule } from './modules/material.module';
import { MainModule } from './modules/main.module';
import { AppRoutingModule } from './app-routing.module';

import { Config } from './app.config';
import { DeviceService } from './services/device.service';
import { SockService } from './services/sock.service';
import { PickService } from './services/pick.service';

import { NavbarComponent } from './components/navbar/navbar.component';

import { FooterComponent } from './components/footer/footer.component';
import { TabletConfigComponent } from './containers/tabletConfig/tablet-config.component';
import { AboutComponent } from './containers/about/about.component';

import { BoxColorDirective } from './shared/box-color.directive';
import { WagonColorDirective } from './shared/wagon-color.directive';

import { AppComponent } from './app.component';
import { ButtonConfigComponent } from './containers/buttonConfig/button-config.component';
import { TestsComponent } from './containers/tests/tests.component';
import { ButtonDetailComponent } from './containers/buttonConfig/button-detail/button-detail.component';
import { OpkComponent } from './containers/opk/opk.component';
import { OpkDetailComponent } from './containers/opk/detail/opk-detail.component';
import { SearchPipe } from './shared/search.pipe';
import { TimePipe } from './shared/time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    TabletConfigComponent,
    AboutComponent,
    TestsComponent,
    ButtonConfigComponent,
    ButtonDetailComponent,
    OpkComponent,
    OpkDetailComponent,
    BoxColorDirective,
    WagonColorDirective,
    ButtonConfigComponent,
    TestsComponent,
    SearchPipe,
    TimePipe
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MaterialModule,
    MainModule
  ],
  providers: [
    SockService,
    DeviceService,
    PickService,
    DeviceGuard,
    Config,
    { provide: LocationStrategy, useClass: HashLocationStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
