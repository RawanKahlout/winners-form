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
    downloadFile(data, filename='data',header) {
            console.log(data,"hhh");
        let csvData = this.ConvertToCSV(data,header);
        console.log(csvData)
        let blob = new Blob(['\ufeff' + csvData], { type: 'text/csv;charset=utf-8;' });
        let dwldLink = document.createElement("a");
        let url = URL.createObjectURL(blob);
        let isSafariBrowser = navigator.userAgent.indexOf('Safari') != -1 && navigator.userAgent.indexOf('Chrome') == -1;
        if (isSafariBrowser) {  //if Safari open in new window to save file with random filename.
            dwldLink.setAttribute("target", "_blank");
        }
        dwldLink.setAttribute("href", url);
        dwldLink.setAttribute("download", filename + ".csv");
        dwldLink.style.visibility = "hidden";
        document.body.appendChild(dwldLink);
        dwldLink.click();
        document.body.removeChild(dwldLink);
    }
    ConvertToCSV(objArray, headerList) {
        let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
        let str = '';
        let row = 'S.No,';

        for (let index in headerList) {
            row += headerList[index] + ',';
        }
        row = row.slice(0, -1);
        str += row + '\r\n';
        for (let i = 0; i < array.length; i++) {
            let line = (i+1)+'';
            for (let index in headerList) {
               let head = headerList[index];
               var arrayElement =array[i];
                line += ',' + arrayElement[index];

            }
            str += line + '\r\n';
        }
        return str;
   }
}
