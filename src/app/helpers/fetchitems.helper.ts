import { Injectable, Inject } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FetchItemsHelper {
    private itemsUrl = 'http://localhost:3000/';
    // ;
    constructor(private http: Http) { }
    public fetchItems(queryData = '') {
        return this.http.get(this.itemsUrl + queryData)
            .toPromise()
            .then((response) => {
                return response.json();
            })
            .catch((error) => {
                throw (error);
            });
        // .catch((error:any) => Observable.throw(error.json().error || 'Server error: Not getting user account details'))
    }
}
