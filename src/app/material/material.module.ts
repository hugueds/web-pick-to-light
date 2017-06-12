import { NgModule } from '@angular/core';
import {
    MdDialogModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdSlideToggleModule,
    MdSidenavModule,
    MdProgressBarModule,
    MdProgressSpinnerModule,    
    MdInputModule 
} from "@angular/material/";


@NgModule({
    imports: [
        MdDialogModule,
        MdButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule,
        MdSlideToggleModule,
        MdSidenavModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdInputModule 
    ],
    exports: [
        MdDialogModule,
        MdButtonModule,
        MdCardModule,
        MdMenuModule,
        MdToolbarModule,
        MdIconModule,
        MdSlideToggleModule,
        MdSidenavModule,
        MdProgressBarModule,
        MdProgressSpinnerModule,
        MdInputModule 
    ]
})

export class MaterialModule { }