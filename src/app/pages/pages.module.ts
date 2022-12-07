import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

// MATERIAL MODULES
import { MaterialExampleModule } from '../../material.module';

// PRIMENG MODULES
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Variant2Component } from './variant2/variant2.component';
import { ReviewComponent } from '../modals/review/review.component';
import { MAT_DIALOG_DEFAULT_OPTIONS } from '@angular/material/dialog';
import { Variant1Component } from './variant1/variant1.component';


@NgModule({
    declarations: [
        Variant1Component,
        Variant2Component,
        ReviewComponent,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,

        FormsModule,
        ReactiveFormsModule,

        MaterialExampleModule,
    ],
    entryComponents: [
        ReviewComponent,
    ],
    providers: [
        { provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: { hasBackdrop: false } }
    ]
})
export class PagesModule { }
