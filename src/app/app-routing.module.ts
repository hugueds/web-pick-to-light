import { NgModule } from '@angular/core';
import { Routes, RouterModule, ExtraOptions } from '@angular/router';

import { TabletConfigComponent } from './containers/tabletConfig/tablet-config.component';
import { AboutComponent } from './containers/about/about.component';

import { MainComponent } from './containers/main/main.component';
import { DeviceGuard } from './guard/device.guard';
import { ButtonConfigComponent } from './containers/buttonConfig/button-config.component';
import { TestsComponent } from './containers/tests/tests.component';
import { ButtonDetailComponent } from './containers/buttonConfig/button-detail/button-detail.component';
import { OpkComponent } from './containers/opk/opk.component';
import { OpkDetailComponent } from './containers/opk/detail/opk-detail.component';
import { FollowUpComponent } from './containers/followup/followup.component';

const routes: Routes = [
    { path: '', component: MainComponent, canActivate: [DeviceGuard], pathMatch: 'full' },
    { path: 'button-config', component: ButtonConfigComponent },
    { path: 'button-config/create', component: ButtonDetailComponent },
    { path: 'button-config/edit/:id', component: ButtonDetailComponent },
    { path: 'opk', component: OpkComponent },
    { path: 'opk/create', component: OpkDetailComponent },
    { path: 'opk/edit/:partNumber', component: OpkDetailComponent },
    { path: 'configuration', component: TabletConfigComponent },
    { path: 'about', component: AboutComponent },
    { path: 'tests', component: TestsComponent },
    { path: 'followup', component: FollowUpComponent },
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
