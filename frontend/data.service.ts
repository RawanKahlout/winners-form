import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import {environment} from "../environments/environment"
const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class dataservice {
    constructor(private _router: Router, private _http: HttpClient) { }

    getCDetatils(routParams) {
        return this._http.get(apiUrl+'/api/relatedwinners/' + routParams)
    }

    getCompetion() {
        return this._http.get<any[]>(apiUrl+'/api/allTemplates');
    }
}