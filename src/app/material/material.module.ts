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
    MdInputModule,
    MdSelectModule,
    MdRadioModule
    // MdTableModule
} from "@angular/material";


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
        MdInputModule,
        MdSelectModule,
        MdRadioModule
        // MdTableModule
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
        MdInputModule,
        MdSelectModule,
        MdRadioModule
        // MdTableModule
    ]
})

export class MaterialModule { }