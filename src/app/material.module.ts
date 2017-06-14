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
    MdSelectModule
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
        MdInputModule,
        MdSelectModule
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
        MdSelectModule 
    ]
})

export class MaterialModule { }