import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
    selector: 'app-variant2',
    templateUrl: './variant2.component.html',
    styleUrls: ['./variant2.component.scss']
})
export class Variant2Component implements OnInit {


    public user: any = {
        cardHolderName: "Vijay Sharma",
        cardNumber: "1234-5678-9012-1221",
        expiryMonth: 10,
        expiryYear: 23,
        cvc: 123,
    }

    

    constructor(
        public _location: Location,
    ) { }

    public ngOnInit(): void {
    }

}
