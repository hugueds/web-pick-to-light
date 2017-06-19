import { ContentComponent } from './content.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PartComponent } from "app/content/part/part.component";
import { MaterialModule } from "app/material.module";
import { WagonContainerComponent } from "app/content/wagon-container/wagon-container.component";
import { WagonBoxComponent } from "app/content/wagon-box/wagon-box.component";
import { MissingPartComponent, MissingPartDialogComponent } from "app/content/missing-part/missing-part.component";
import { WagonComponent } from "app/content/wagon-description/wagon-description.component";
import { PickService } from "app/shared/pick.service";
import { BannerComponent } from "app/content/banner/banner.component";

@NgModule({
<<<<<<< HEAD
    imports: [ MaterialModule],
    // exports : [ContentModule],
=======
    imports: [CommonModule, MaterialModule],    
>>>>>>> f0e1f9e121a5369aadeb04f2df0e1e4345552629
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

<<<<<<< HEAD
export class ContentaModule {

}
=======
export class ContentModule { }
>>>>>>> f0e1f9e121a5369aadeb04f2df0e1e4345552629
