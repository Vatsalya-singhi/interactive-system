import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Variant2Component } from './variant2/variant2.component';

const routes: Routes = [
    {
        path: 'variant-2',
        component: Variant2Component,
    },
    {
        path: '**',
        redirectTo: 'variant-2',
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
