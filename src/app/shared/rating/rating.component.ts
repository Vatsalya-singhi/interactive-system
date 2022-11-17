import { Component, Input, OnInit } from '@angular/core';

@Component({
    selector: 'star-rating',
    templateUrl: './rating.component.html',
    styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

    @Input() public users: number = 0;
    @Input() public selectedValue: number = 0;
    
    public stars: number[] = [1, 2, 3, 4, 5];

    constructor() { }

    public ngOnInit() {
    }

}
