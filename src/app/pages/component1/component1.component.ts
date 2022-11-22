import { Component, OnInit } from '@angular/core';
import { Firestore, collectionData, collection, CollectionReference, DocumentData, addDoc, DocumentReference, setDoc, getDocs } from '@angular/fire/firestore';
import { finalize, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

import * as _ from "lodash";
import * as moment from "moment";
import { doc, updateDoc } from '@firebase/firestore';

@Component({
    selector: 'component1',
    templateUrl: './component1.component.html',
    styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

    public actualValue: number = 0;
    public userValue: number = 0;

    public logList: any[] = [];

    public first: number = 0;
    public rows: number = 5;
    public columnList: any[] = [
        { header: "ID", field: "id" },
        { header: "Type", field: "type" },
        { header: "Log", field: "error" },
        { header: "Date", field: "createdAt" },
    ];
    public globalFilterFields = ["id", "type", "error", "createdAt"];

    public subscriptions: Subscription[] = []

    constructor(
        public firestore: Firestore,
        public _location: Location,
    ) { }

    public ngOnInit(): void {
        this.fetchLogs();
    }

    public ngOnDestroy(): void {
        this.subscriptions.forEach((sub) => sub.unsubscribe());
    }

    public fetchLogs() {
        const col: CollectionReference<DocumentData> = collection(this.firestore, 'logs');
        let obs$: Subscription = collectionData(col)
            .subscribe((data) => {

                _.forEach(data, (obj) => {
                    let timestamp = obj["createdAt"];
                    obj["createdAt"] = moment(new Date(timestamp.seconds * 1000)).format("DD-MM-YYYY")
                })

                this.logList = data;
                console.log("this.logList=>", this.logList);
            })
        this.subscriptions.push(obs$);
    }

    public next() {
        this.first = this.first + this.rows;
    }

    public prev() {
        this.first = this.first - this.rows;
    }

    public reset() {
        this.first = 0;
    }

    public isLastPage(): boolean {
        return this.logList ? this.first === (this.logList.length - this.rows) : true;
    }

    public isFirstPage(): boolean {
        return this.logList ? this.first === 0 : true;
    }

}
