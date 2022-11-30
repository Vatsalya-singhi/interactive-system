import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Component1Component } from './component1/component1.component';
import { Component2Component } from './component2/component2.component';
import { Variant2Component } from './variant2/variant2.component';

const routes: Routes = [
    // {
    //     path: 'component1',
    //     component: Component1Component
    // },
    // {
    //     path: 'component2',
    //     component: Component2Component
    // },
    {
        path: 'variant-2',
        component: Variant2Component,
    },
    {
        path: '**',
        redirectTo: 'component1',
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
