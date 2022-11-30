import { PagesService } from './../pages.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSort } from '@angular/material/sort';
// import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

// import { CollectionViewer, DataSource } from "@angular/cdk/collections";
// import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
// import { addDoc, collection, collectionData, CollectionReference, doc, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';
@Component({
    selector: 'app-component2',
    templateUrl: './component2.component.html',
    styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {

    constructor(
        public pageService: PagesService,
        public _location: Location,
    ) {

    }

    public ngOnInit(): void {

    }

}

