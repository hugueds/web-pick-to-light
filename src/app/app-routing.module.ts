import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from "app/configuration/configuration.component";
import { AboutComponent } from "app/about/about.component";

import { ContentComponent } from "app/content/content.component";
import { DeviceGuard } from "app/guard/device.guard";


const routes: Routes = [
    { path: '', component: ContentComponent, canActivate : [DeviceGuard]  },
    { path: 'configuration', component: ConfigurationComponent, /* canDeactivate : [ConfigurationGuard] */ },
    { path: 'about', component: AboutComponent }    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}