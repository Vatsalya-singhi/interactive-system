import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Variant1Component } from './variant1/variant1.component';
import { Variant2Component } from './variant2/variant2.component';

const routes: Routes = [
    {
        path: 'variant-1',
        component: Variant1Component,
    },
    {
        path: 'variant-2',
        component: Variant2Component,
    },
    {
        path: '**',
        redirectTo: '/',
    },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
    ],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
