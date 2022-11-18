import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
    providedIn: 'root'
})

export class PagesService {

    constructor(
        public http: HttpClient
    ) { }

    public getAllLaunches(): Observable<Object> {
        return this.http.get(`https://api.spacexdata.com/v5/launches`);
    }

    public findLessons(courseId: number, filter = '', sortOrder = 'asc', pageNumber = 0, pageSize = 3): Observable<any[]> {
        return this.http.get('/api/lessons', {
            params: new HttpParams()
                .set('courseId', courseId.toString())
                .set('filter', filter)
                .set('sortOrder', sortOrder)
                .set('pageNumber', pageNumber.toString())
                .set('pageSize', pageSize.toString())
        }).pipe(
            map((res: any) => res.payload)
        );
    }

}
