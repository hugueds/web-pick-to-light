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

const modules = [
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
];

@NgModule({
    imports: [
        ...modules,
        // MdTableModule
    ],
    exports: [
        ...modules
    ]
})

export class MaterialModule { }