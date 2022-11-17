import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

}
