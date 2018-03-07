import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PartComponent } from '../content/part/part.component';
import { MaterialModule } from '../material/material.module';
import { WagonContainerComponent } from '../content/wagon-container/wagon-container.component';
import { WagonBoxComponent } from '../content/wagon-box/wagon-box.component';
import { MissingPartComponent, MissingPartDialogComponent } from '../content/missing-part/missing-part.component';
import { WagonComponent } from '../content/wagon-description/wagon-description.component';
import { BannerComponent } from '../content/banner/banner.component';

import { PickService } from '../services/pick.service';
import { MissingPartService } from '../services/missing-part.service';
import { PartAmountComponent } from './part-amount/part-amount.component';
import { WagonContainerPopidComponent } from './wagon-container-popid/wagon-container-popid.component';
import { WagonPopidComponent } from './wagon-popid/wagon-popid.component';
import { PendingPartComponent } from './missing-part/pending-part.component';

@NgModule({
    imports: [CommonModule, MaterialModule, FormsModule],
    declarations: [
        ContentComponent,
        PartComponent,
        WagonComponent,
        MissingPartComponent,  PendingPartComponent,
        WagonBoxComponent, WagonContainerComponent,
        MissingPartComponent, MissingPartDialogComponent,
        BannerComponent,
        PartAmountComponent,
        WagonContainerPopidComponent,
        WagonPopidComponent
    ],
    entryComponents: [MissingPartDialogComponent],
    providers: [PickService, MissingPartService]
})

export class ContentModule { }
