import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartComponent } from "app/part/part.component";
import { MaterialModule } from "../material/material.module";
import { WagonContainerComponent } from "app/wagon-container/wagon-container.component";
import { WagonBoxComponent } from "app/wagon-box/wagon-box.component";
import { MissingPartComponent, MissingPartDialogComponent } from "app/missing-part/missing-part.component";
import { WagonComponent } from "app/wagon/wagon.component";
import { PickService } from "app/shared/pick.service";
import { BannerComponent } from "app/banner/banner.component";

@NgModule({
    imports: [CommonModule, MaterialModule],    
    declarations: [
        ContentComponent,
        PartComponent, 
        WagonComponent, 
        MissingPartComponent, 
        WagonBoxComponent, WagonContainerComponent, 
        MissingPartComponent, MissingPartDialogComponent,
        BannerComponent
    ],
    entryComponents: [MissingPartDialogComponent]
})

export class ContentModule { }