import { PagesService } from './../pages.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';

@Component({
    selector: 'app-variant2',
    templateUrl: './variant2.component.html',
    styleUrls: ['./variant2.component.scss']
})

export class Variant2Component implements OnInit {

    public monthArray: number[] = [];
    public yearArray: number[] = [];

    public user: any = {};

    public creditCardForm: FormGroup = new FormGroup({
        name: new FormControl(""),
        number: new FormControl(null),
        month: new FormControl(1),
        year: new FormControl(2022),
        cvv: new FormControl(null),
    });

    public startTime: number = 0;
    public endTime: number = 0;

    public backSpaceCount = 0;

    constructor(
        public _location: Location,
        public pageService: PagesService,
        public cdr: ChangeDetectorRef,
    ) {
        this.generateUser();
    }

    public ngOnInit(): void {
        this.monthArray = new Array(12).fill(0).map((val, index) => index + 1);
        this.yearArray = new Array(20).fill(0).map((val, index) => 2022 + index);
        this.startTime = new Date().getTime();
    }

    public onSubmit() {
        // console.warn(this.creditCardForm.value);
        this.endTime = new Date().getTime();
        const timeTaken: number = (this.endTime - this.startTime) / 1000;
        console.log("timeTaken=>", timeTaken);
        console.log("Number of backspaces/delete pressed=>", this.backSpaceCount);
    }

    public resetForm() {
        this.creditCardForm.reset({
            name: new FormControl(""),
            number: new FormControl(null),
            month: new FormControl(1),
            year: new FormControl(2022),
            cvv: new FormControl(null),
        });
        this.creditCardForm.markAsPristine();
    }

    public generateUser() {
        this.pageService.fetchUser()
            .subscribe((data) => {
                this.user = data;
                this.cdr.detectChanges();
                setTimeout(() => {
                    this.cdr.detectChanges();
                    this.updateFormValidators();
                });
            }, (err) => {
                console.log(err);
            })
    }

    public updateFormValidators() {
        console.log(this.user);
        this.name.setValidators([Validators.required, this.validateName(this.user)]);
        this.number.setValidators([Validators.required, Validators.minLength(16), Validators.maxLength(16), this.validateNumber(this.user)]);
        this.month.setValidators([Validators.required, this.validateMonth(this.user)]);
        this.year.setValidators([Validators.required, this.validateYear(this.user)]);
        this.cvv.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3), this.validateCVV(this.user)]);

        this.name.updateValueAndValidity();
        this.number.updateValueAndValidity();
        this.month.updateValueAndValidity();
        this.year.updateValueAndValidity();
        this.cvv.updateValueAndValidity();
    }

    /**
     * ANALYTICS
    */
    public onKeyUp(event: KeyboardEvent) {
        console.log(event.keyCode);
        if (event.keyCode === 8 || event.keyCode === 46) {
            this.backSpaceCount += 1;
            console.log('backSpaceCount=>', this.backSpaceCount);
        }
    }

    /**
     * GETTER
    */

    get name(): FormControl {
        return this.creditCardForm.get("name") as FormControl;
    }
    get number(): FormControl {
        return this.creditCardForm.get("number") as FormControl;
    }
    get month(): FormControl {
        return this.creditCardForm.get("month") as FormControl;
    }
    get year(): FormControl {
        return this.creditCardForm.get("year") as FormControl;
    }
    get cvv(): FormControl {
        return this.creditCardForm.get("cvv") as FormControl;
    }

    /**
     * CUSTOM VALIDATORS
    */

    public validateName = (user: any) => {
        return (control: AbstractControl) => {
            if (!user.cardHolderName) return null;

            let x = (control.value as string).toUpperCase();
            let y = user.cardHolderName.toUpperCase();
            if (x != y) {
                return { invalidValue: true };
            }
            return null;
        }
    }
    public validateNumber = (user: any) => {
        return (control: AbstractControl) => {
            if (!user.cardNumber) return null;

            if (control.value != user.cardNumber) {
                return { invalidValue: true };
            }
            return null;
        }
    }
    public validateMonth = (user: any) => {
        return (control: AbstractControl) => {
            if (!user?.expiryMonth) return null;

            if (control.value != user?.expiryMonth) {
                return { invalidValue: true };
            }
            return null;
        }
    }
    public validateYear = (user: any) => {
        return (control: AbstractControl) => {
            if (!user.expiryYear) return null;

            if (control.value != user.expiryYear) {
                return { invalidValue: true };
            }
            return null;
        }
    }
    public validateCVV = (user: any) => {
        return (control: AbstractControl) => {
            if (!user.cvv) return null;

            if (control.value != user.cvv) {
                return { invalidValue: true };
            }
            return null;
        }
    }



}
