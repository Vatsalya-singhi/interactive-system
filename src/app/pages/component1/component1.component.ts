import { Component, OnInit } from '@angular/core';

// import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Firestore, collectionData, collection, CollectionReference, DocumentData } from '@angular/fire/firestore';

@Component({
    selector: 'component1',
    templateUrl: './component1.component.html',
    styleUrls: ['./component1.component.scss']
})
export class Component1Component implements OnInit {

    public logList: any[] = [];

    constructor(
        public firestore: Firestore,
        // public afs: AngularFirestore
    ) { }

    public ngOnInit(): void {
        this.fetchLogs();
    }

    public fetchLogs() {
        // this.afs.collection("logs")
        //     .valueChanges()
        //     .subscribe((logList: any[]) => {
        //         console.log("logList =>", logList);
        //         this.logList = logList;
        //     })

        const col: CollectionReference<DocumentData> = collection(this.firestore, 'logs');
        collectionData(col).subscribe((data) => {
            console.log("data=>", data);
            this.logList = this.logList;
        })

    }

}
