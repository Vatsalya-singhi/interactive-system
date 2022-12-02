import { PagesService } from './../pages.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from 'src/app/modals/review/review.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-variant2',
    templateUrl: './variant2.component.html',
    styleUrls: ['./variant2.component.scss']
})

export class Variant2Component implements OnInit {

    public user: any = {};
    public monthArray: number[] = [];
    public yearArray: number[] = [];
    public creditCardForm: FormGroup = new FormGroup({
        name: new FormControl(""),
        number: new FormControl(null),
        month: new FormControl(1),
        year: new FormControl(2022),
        cvv: new FormControl(null),
    });

    // ANALYTICS
    public startTime: number = 0;
    public endTime: number = 0;
    public backSpaceCount = 0;
    public keyCount = 0;

    constructor(
        public _location: Location,
        public pageService: PagesService,
        public cdr: ChangeDetectorRef,
        public dialog: MatDialog,
        public snackBar: MatSnackBar,
    ) {
        this.generateUser();
    }

    public ngOnInit(): void {
        this.monthArray = new Array(12).fill(0).map((val, index) => index + 1);
        this.yearArray = new Array(20).fill(0).map((val, index) => 2022 + index);
        this.startTime = new Date().getTime();
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

    /**
     * FORMS HELPER
    */

    public onSubmit() {
        this.endTime = new Date().getTime();
        this.onReviewClick();
        this.sendAnalytics();
    }

    public onReviewClick() {
        let dialogRef = this.dialog.open(ReviewComponent, {
            width: '500px',
            data: {
                timeTaken: (this.endTime - this.startTime),
                backSpaceCount: this.backSpaceCount,
                keyCount: this.keyCount,
            }
        });

        // dialogRef.afterClosed().subscribe(result => {
        //     console.log(`Dialog result: ${result}`); // Pizza!
        // });
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

    public updateFormValidators() {
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
        this.keyCount += 1;
        if (event.keyCode === 8 || event.keyCode === 46) {
            this.backSpaceCount += 1;
        }
    }

    public sendAnalytics() {
        const timeTaken = (this.endTime - this.startTime);
        const backSpaceCount = this.backSpaceCount;
        const keyCount = this.keyCount;
        const seconds = Number(((timeTaken) / 1000).toFixed(0));
        const typingSpeed = Number((keyCount / seconds).toFixed(1));

        let dataObj = {
            seconds,
            backSpaceCount,
            keyCount,
            typingSpeed,
            variant: "old",
        };

        this.pageService.setDocument(dataObj)
            .then((docRef) => {
                // console.log(docRef.id);
                this.snackBar.open("User Analytics saved!", "Close", {
                    duration: 3000,
                });
            })
            .catch((err) => {
                console.log(err);
                this.snackBar.open("Error: User Analytics not saved!", "Close", {
                    duration: 3000,
                });
            })

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
