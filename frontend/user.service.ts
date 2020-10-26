import { Injectable } from '@angular/core';
import { HttpClient,HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';
import {environment} from "../environments/environment"
const apiUrl = environment.apiUrl;
@Injectable({ providedIn: 'root' })
export class userServices {
    url;
    dynamicField;
    formData;
    
    constructor(private _router: Router, private _http: HttpClient) { }

    signIn(email, password) {
       
        return this._http.post(apiUrl+'/api/signin', { email, password })
         
    }

    signOut(){
        var token=localStorage.getItem('token')
        return this._http.get(apiUrl +'/api/signout',{
            observe :'body',
            params : new HttpParams().append('token',localStorage.getItem('token')),
        }).subscribe(data=>{
            this._router.navigate(['/signin'])
            localStorage.removeItem('token');
        },
        error=>{
            this._router.navigate(['/signin'])
            localStorage.removeItem('token');
        }
        )
    }

    isActive(){
        const tokens =localStorage.getItem('token');
        return this._http.get(apiUrl+'/api/isActive',{
                observe :'body',
                params : new HttpParams().append('token',localStorage.getItem('token')),
              
        })
    }
}
