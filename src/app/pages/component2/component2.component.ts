import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Location } from '@angular/common';
import { PagesService } from '../pages.service';

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
    displayedColumns: string[] = ['id', 'name', 'progress', 'fruit'];
    dataSource: MatTableDataSource<UserData>;

    @ViewChild(MatPaginator)
    paginator!: MatPaginator;
    @ViewChild(MatSort)
    sort!: MatSort;

    constructor(public pageService: PagesService, public _location: Location) {
        // Create 100 users
        const users = Array.from({ length: 100 }, (_, k) => this.createNewUser(k + 1));
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(users);
    }

    public ngOnInit(): void {
        this.pageService.getAllLaunches()
            .subscribe((data) => {
                console.log("launch list=>", data);
            }, (err) => {
                console.log(err);
            })
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

    public backClicked() {
        this._location.back();
    }


}
