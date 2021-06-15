import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import {environment} from "../environments/environment"
import { error } from 'protractor';
import { data } from 'jquery';
const apiUrl = environment.apiUrl;

@Injectable({ providedIn: 'root' })
export class formServices {
    url;
    dynamicField;
    formData;
    templateId;
    tID;

    constructor(private _router: Router, private _http: HttpClient) { }

    delteCopmetion(templateId){
        return this._http.delete(apiUrl+'/api/deleteTemplate/'+templateId)
    }
    submitTemplateForm(fileObj) {
 
        return this._http.post(apiUrl+'/api/postTemplate', fileObj).subscribe(res => {
           
        })
    }

    submitDataForm(dynamicFeilds, competition, fileName) {
        return this._http.post(apiUrl+'/api/postDataTemplates', { dynamicFeilds, competition, fileName }).subscribe(res => {
        this.templateId =res; 
        this.setId(this.templateId);
        })
    }
    setId(templateId){
        this.tID = templateId._id;
        templateId = this.tID;
        return this._http.put(apiUrl+'/api/setTemplateID', {templateId}).subscribe(res => {
           
            this._router.navigate(['/competitions-list'])
            })
    
    }
    bannerLink(routeParams) {
        return this._http.get(apiUrl+'/api/bannerlink/' + routeParams)
    }
    getFormData() {
        return this._http.get(apiUrl+'/api/getTemplate').subscribe(res => {
            this.dynamicField = res;
        })
    }
    getFormTemplate(routeParams) {
        return this._http.get(apiUrl+'/api/getTemplate/' + routeParams)
    }
    updateFormTemplate(templateObj) {
        console.log(templateObj);
        return this._http.put(apiUrl +'/api/putDataTemplates', templateObj ).subscribe( (res) => {
            console.log(res);
            this._router.navigate(['/competitions-list'])
        }, error => {
            console.log(error);
           this._router.navigate(['/signin'])
           localStorage.removeItem('token');
        }
        )
    }
    submitWinnerData(formData, shortId ,competitionName) {

        return this._http.post(apiUrl+'/api/submitWinnerData',{formData,shortId,competitionName})
        
    }

}
