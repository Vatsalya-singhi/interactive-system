import { Component, OnInit } from '@angular/core';
import { PagesService } from '../pages.service';

@Component({
    selector: 'app-component2',
    templateUrl: './component2.component.html',
    styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {

    constructor(public pageService: PagesService) { }

    public ngOnInit(): void {
        this.pageService.getAllLaunches()
            .subscribe((data) => {
                console.log("launch list=>", data);
            }, (err) => {
                console.log(err);
            })
    }

}
