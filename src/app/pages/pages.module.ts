import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutingModule } from './pages-routing.module';

import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';

// MATERIAL MODULES
import { MaterialExampleModule } from '../../material.module';

// PRIMENG MODULES
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToolbarModule } from 'primeng/toolbar';
import { Variant2Component } from './variant2/variant2.component';


@NgModule({
    declarations: [
        // Component1Component,
        // Component2Component,
        Variant2Component,
    ],
    imports: [
        CommonModule,
        PagesRoutingModule,

        FormsModule,
        ReactiveFormsModule,

        MaterialExampleModule,

        // TableModule,
        // ButtonModule,
        // ToolbarModule,
    ]
})
export class PagesModule { }
