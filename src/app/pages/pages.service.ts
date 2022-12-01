import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
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

    public fetchUser(): Observable<Object> {
        return this.http.get(`https://randomuser.me/api/`)
            .pipe(
                map((data: any) => data?.results[0]),
                map((res: any) => {
                    return {
                        cardHolderName: `${res.name.first} ${res.name.last}`,
                        cardNumber: Math.floor(Math.random() * 1000000000000000) + 1000000000000000,
                        expiryMonth: Math.floor(Math.random() * 12) + 1,
                        expiryYear: Math.floor(Math.random() * 20) + 2022,
                        cvv: Math.floor(Math.random() * 1000) + 1,
                        profile: res.picture.large,
                    }
                })
            )
    }

}
