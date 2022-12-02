import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as moment from 'moment';

@Component({
    selector: 'app-review',
    templateUrl: './review.component.html',
    styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

    public formattedTime: string = "";
    public backSpaceCount: number = 0;
    public keyCount: number = 0;
    public typingSpeed: number = 0;

    constructor(
        public dialogRef: MatDialogRef<ReviewComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any,
    ) { }

    public ngOnInit(): void {
        const { timeTaken, backSpaceCount, keyCount } = this.data;
        const seconds = Number(((timeTaken ?? 0) / 1000).toFixed(0));

        this.formattedTime = moment(seconds, "seconds").format("mm:ss");
        this.backSpaceCount = backSpaceCount;
        this.keyCount = keyCount;
        this.typingSpeed = Number((keyCount / seconds).toFixed(1));
    }

    // public onSubmit() {
    //     this.dialogRef.close('Pizza!');
    // }

}
