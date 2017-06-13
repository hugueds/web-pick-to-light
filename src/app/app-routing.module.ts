import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurationComponent } from "app/configuration/configuration.component";
import { AboutComponent } from "app/about/about.component";

import { AppComponent } from "app/app.component";
import { ContentComponent } from "app/content/content.component";


const routes: Routes = [
    { path: '', component: ContentComponent /* canActivate */ },
    { path: 'configuration', component: ConfigurationComponent },
    { path: 'about', component: AboutComponent }
    
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}