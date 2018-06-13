import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from './configuration/configuration.component';
import { AboutComponent } from './about/about.component';

import { ContentComponent } from './content/content.component';
import { DeviceGuard } from './guard/device.guard';
import { ShelfConfigComponent } from './shelf-config/shelf-config.component';
import { TestsComponent } from './tests/tests.component';
import { ShelfDetailComponent } from './shelf-config/shelf-detail.component';
import { OpkComponent } from './opk/opk.component';
import { OpkDetailComponent } from './opk/detail/opk-detail.component';


const routes: Routes = [
    { path : 'shelf-config', component: ShelfConfigComponent },
    { path : 'shelf-config/create', component: ShelfDetailComponent },
    { path : 'shelf-config/edit/:buttonId', component: ShelfDetailComponent },
    { path : 'opk', component: OpkComponent },
    { path : 'opk/edit/:partNumber', component: OpkDetailComponent },
    { path : 'opk/create', component: OpkDetailComponent },
    { path: 'configuration', component: ConfigurationComponent },
    { path: 'about', component: AboutComponent },
    { path: 'tests', component: TestsComponent},
    { path: '', component: ContentComponent, canActivate : [DeviceGuard]  },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}
