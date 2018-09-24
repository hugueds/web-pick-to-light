import { NgModule } from '@angular/core';
import {
    MatDialogModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatToolbarModule,
    MatIconModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule
    // MatTableModule
} from '@angular/material';


@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule
        // MdTableModule
    ],
    exports: [
        MatDialogModule,
        MatButtonModule,
        MatCardModule,
        MatMenuModule,
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSidenavModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatInputModule,
        MatSelectModule,
        MatRadioModule
        // MatTableModule
    ]
})

export class MaterialModule { }