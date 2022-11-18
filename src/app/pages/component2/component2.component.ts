import { PagesService } from './../pages.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';

import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, catchError, finalize, Observable, of } from 'rxjs';
import { addDoc, collection, collectionData, CollectionReference, doc, DocumentData, Firestore, setDoc } from '@angular/fire/firestore';

export interface UserData {
    id: string;
    name: string;
    progress: string;
    fruit: string;
}

/** Constants used to fill up our data base. */
const FRUITS: string[] = [
    'blueberry',
    'lychee',
    'kiwi',
    'mango',
    'peach',
    'lime',
    'pomegranate',
    'pineapple',
];
const NAMES: string[] = [
    'Maia',
    'Asher',
    'Olivia',
    'Atticus',
    'Amelia',
    'Jack',
    'Charlotte',
    'Theodore',
    'Isla',
    'Oliver',
    'Isabella',
    'Jasper',
    'Cora',
    'Levi',
    'Violet',
    'Arthur',
    'Mia',
    'Thomas',
    'Elizabeth',
];

@Component({
    selector: 'app-component2',
    templateUrl: './component2.component.html',
    styleUrls: ['./component2.component.scss']
})
export class Component2Component implements OnInit {
    public displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
    public dataSource: MatTableDataSource<UserData>;
    public actualValue: number = 0;
    public userValue: number = 0;

    // dataSourceMock = new UserDataSource(this.pageService);

    @ViewChild(MatPaginator)
    public paginator!: MatPaginator;
    @ViewChild(MatSort)
    public sort!: MatSort;


    constructor(
        public pageService: PagesService,
        public _location: Location,
        public firestore: Firestore
    ) {
        const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
        this.actualValue = users.filter((val) => val.fruit == "kiwi").length ?? 0;

        this.dataSource = new MatTableDataSource(users);
    }

    public ngOnInit(): void {

    }

    public ngAfterViewInit() {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
    }

    public applyFilter(event: Event) {
        const filterValue = (event.target as HTMLInputElement).value;
        this.dataSource.filter = filterValue.trim().toLowerCase();

        if (this.dataSource.paginator) {
            this.dataSource.paginator.firstPage();
        }
    }

    /** Builds and returns a new User. */
    public createNewUser(id: number): UserData {
        const name =
            NAMES[Math.round(Math.random() * (NAMES.length - 1))] +
            ' ' +
            NAMES[Math.round(Math.random() * (NAMES.length - 1))].charAt(0) +
            '.';

        return {
            id: id.toString(),
            name: name,
            progress: Math.round(Math.random() * 100).toString(),
            fruit: FRUITS[Math.round(Math.random() * (FRUITS.length - 1))],
        };

    }




    // public logList: any[] = [];
    // public getLogs() {
    //     const col: CollectionReference<DocumentData> = collection(this.firestore, 'spaceXlog');
    //     collectionData(col).subscribe((data) => {
    //         this.logList = data;
    //         console.log("this.logList =>", this.logList);
    //     })
    // }

}


export class UserDataSource extends DataSource<any> {
    private lessonsSubject = new BehaviorSubject<any[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    public loading$ = this.loadingSubject.asObservable();

    constructor(private pageService: PagesService) {
        super();
    }

    connect(collectionViewer: CollectionViewer): Observable<any[]> {
        return this.lessonsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.lessonsSubject.complete();
        this.loadingSubject.complete();
    }

    loadLessons(courseId: number, filter = '',
        sortDirection = 'asc', pageIndex = 0, pageSize = 3) {

        this.loadingSubject.next(true);

        this.pageService.findLessons(courseId, filter, sortDirection, pageIndex, pageSize)
            .pipe(
                catchError(() => of([])),
                finalize(() => this.loadingSubject.next(false))
            )
            .subscribe((lessons: any) => this.lessonsSubject.next(lessons));
    }

}