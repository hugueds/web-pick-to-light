import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';

import { PartComponent } from "app/content/part/part.component";
import { MaterialModule } from "app/material.module";
import { WagonContainerComponent } from "app/content/wagon-container/wagon-container.component";
import { WagonBoxComponent } from "app/content/wagon-box/wagon-box.component";
import { MissingPartComponent, MissingPartDialogComponent } from "app/content/missing-part/missing-part.component";
import { WagonComponent } from "app/content/wagon-description/wagon-description.component";
import { BannerComponent } from "app/content/banner/banner.component";

import { PickService } from "app/shared/pick.service";
import { MissingPartService } from "app/shared/missing-part.service";
import { PartAmountComponent } from './part-amount/part-amount.component';

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule],    
    declarations: [
        ContentComponent,
        PartComponent, 
        WagonComponent, 
        MissingPartComponent, 
        WagonBoxComponent, WagonContainerComponent, 
        MissingPartComponent, MissingPartDialogComponent,
        BannerComponent,
        PartAmountComponent
    ],
    entryComponents: [MissingPartDialogComponent],
    providers: [PickService, MissingPartService]
})

export class ContentModule { }