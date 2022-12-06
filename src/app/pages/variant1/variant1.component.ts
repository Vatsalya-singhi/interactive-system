import { PagesService } from './../pages.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AbstractControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ReviewComponent } from 'src/app/modals/review/review.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { of, switchMap } from 'rxjs';

@Component({
    selector: 'app-variant1',
    templateUrl: './variant1.component.html',
    styleUrls: ['./variant1.component.scss']
})
export class Variant1Component implements OnInit {

    public user: any = {};
    public monthArray: number[] = [];
    public yearArray: number[] = [];
    public creditCardForm: FormGroup = new FormGroup({
        name: new FormControl(""),
        number: new FormGroup({
            1: new FormControl(),
            2: new FormControl(),
            3: new FormControl(),
            4: new FormControl(),
        }),
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

    public ngAfterViewInit(): void {
        this.customCodeBlock();
    }


    public generateUser() {
        this.pageService.fetchUser()
            .pipe(
                switchMap((res: any) => {
                    const condition = (/^[a-zA-Z]+(-[a-zA-Z]+)*$/).test(res.cardHolderName);
                    if (!condition) {
                        console.log('NON English Name =>', res.cardHolderName);
                        // debugger;
                        return this.pageService.fetchUser();
                    }
                    return of(res);
                })
            )
            .subscribe({
                next: (data) => {
                    this.user = data;
                    this.cdr.detectChanges();
                    setTimeout(() => {
                        this.cdr.detectChanges();
                        this.updateFormValidators();
                    });
                },
                error: (err) => {
                    console.log(err);
                }
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
            name: "",
            number: {
                1: null,
                2: null,
                3: null,
                4: null,
            },
            month: 1,
            year: 2022,
            cvv: null,
        });
        this.creditCardForm.markAsPristine();
    }

    public updateFormValidators() {
        this.name.setValidators([Validators.required, this.validateName(this.user)]);
        this.number.setValidators([Validators.required, this.validateNumber(this.user)]);
        this.month.setValidators([Validators.required, this.validateMonth(this.user)]);
        this.year.setValidators([Validators.required, this.validateYear(this.user)]);
        this.cvv.setValidators([Validators.required, Validators.minLength(3), Validators.maxLength(3), this.validateCVV(this.user)]);

        this.name.updateValueAndValidity();
        this.number.updateValueAndValidity();
        this.month.updateValueAndValidity();
        this.year.updateValueAndValidity();
        this.cvv.updateValueAndValidity();
    }



    public customCodeBlock() {
        const ALLOW_LIST = new Set(["Backspace", "ArrowLeft", "ArrowRight", "Tab", "Enter", "ArrowDown", "ArrowUp"]);
        const partSelector = ".card-number__part";
        document.querySelectorAll(partSelector).forEach((domInput) => {
            domInput.addEventListener("keydown", (e: any) => {
                if ((e.key < "0" || "9" < e.key) && !ALLOW_LIST.has(e.code)) {
                    e.preventDefault();
                    return;
                }
                if (
                    (!e.target.value && e.code === "Backspace") ||
                    ((e.code === "ArrowLeft" || e.code === "Backspace") &&
                        e.target.selectionStart === 0)
                ) {
                    const previousSibling = e.target.previousElementSibling;
                    if (previousSibling?.tagName?.toLowerCase() === "input") {
                        previousSibling.focus();
                    }
                }
                if (
                    (e.target.value.length === 4 && !(e.key < "0" || "9" < e.key)) ||
                    (e.code === "ArrowRight" &&
                        e.target.selectionEnd === e.target.value.length)
                ) {
                    const nextSibling = e.target.nextElementSibling;
                    if (nextSibling?.tagName?.toLowerCase() === "input") {
                        nextSibling.focus();
                    }
                }
            })
        })
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
            variant: "new",
            type: "variant1"
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
    get number(): FormGroup {
        return this.creditCardForm.get("number") as FormGroup;
    }

    get number1(): FormControl {
        return this.creditCardForm.get("number")?.get("1") as FormControl;
    }
    get number2(): FormControl {
        return this.creditCardForm.get("number")?.get("2") as FormControl;
    }
    get number3(): FormControl {
        return this.creditCardForm.get("number")?.get("3") as FormControl;
    }
    get number4(): FormControl {
        return this.creditCardForm.get("number")?.get("4") as FormControl;
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
            const inputCardNumber = Number(`${this.number1.value ?? 0}${this.number2.value ?? 0}${this.number3.value ?? 0}${this.number4.value ?? 0}`)
            const condition = isNaN(inputCardNumber) || inputCardNumber != user.cardNumber;
            if (condition) {
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

    public getFormattedCVV(cvv: number = 0) {
        return (cvv < 100) ? `0${cvv}` : `${cvv}`;
    }
}
