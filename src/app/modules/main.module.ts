import { MainComponent } from '../containers/main/main.component';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MaterialModule } from './material.module';

import { PartComponent } from '../containers/main/part/part.component';
import { WagonContainerComponent } from '../containers/main/wagon-container/wagon-container.component';
import { WagonBoxComponent } from '../containers/main/wagon-box/wagon-box.component';
import { MissingPartComponent, MissingPartDialogComponent } from '../containers/main/missing-part/missing-part.component';
import { WagonComponent } from '../containers/main/wagon-description/wagon-description.component';
import { BannerComponent } from '../containers/main/banner/banner.component';

import { PickService } from '../services/pick.service';
import { MissingPartService } from '../services/missing-part.service';
import { PartAmountComponent } from '../containers/main/part-amount/part-amount.component';
import { WagonContainerPopidComponent } from '../containers/main/wagon-container-popid/wagon-container-popid.component';
import { WagonPopidComponent } from '../containers/main/wagon-popid/wagon-popid.component';
import { PendingPartComponent } from '../containers/main/missing-part/pending-part.component';

@NgModule({
  imports: [CommonModule, MaterialModule, FormsModule],
  declarations: [
    MainComponent,
    PartComponent,
    WagonComponent,
    MissingPartComponent,
    PendingPartComponent,
    WagonBoxComponent,
    WagonContainerComponent,
    MissingPartComponent,
    MissingPartDialogComponent,
    BannerComponent,
    PartAmountComponent,
    WagonContainerPopidComponent,
    WagonPopidComponent
  ],
  entryComponents: [MissingPartDialogComponent],
  providers: [PickService, MissingPartService]
})

export class MainModule { }
