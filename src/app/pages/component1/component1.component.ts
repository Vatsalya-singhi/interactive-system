import { Component, OnInit } from '@angular/core';
// import { Firestore, collectionData, collection, CollectionReference, DocumentData, addDoc, DocumentReference, setDoc, getDocs } from '@angular/fire/firestore';
// import { finalize, Observable, Subscription } from 'rxjs';
import { Location } from '@angular/common';

import * as _ from "lodash";
// import * as moment from "moment";
// import { doc, updateDoc } from '@firebase/firestore';

@Component({
    selector: 'component1',
    templateUrl: './component1.component.html',
    styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

    constructor(
        public _location: Location,
    ) { }

    public ngOnInit(): void {
    }

    public ngOnDestroy(): void {

    }

}
