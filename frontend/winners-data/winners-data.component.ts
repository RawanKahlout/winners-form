import { Component, OnInit } from '@angular/core';
import { dataservice } from '../data.service';
import {ActivatedRoute,Params ,Router} from '@angular/router'
import {userServices} from '../user.service';
import { element } from 'protractor';
import { HttpClient  } from '@angular/common/http'; 

@Component({
  selector: 'app-winners-data',
  templateUrl: './winners-data.component.html',
  styleUrls: ['./winners-data.component.css']
})
export class WinnersDataComponent implements OnInit {
exist ;
  constructor(private _dataservice: dataservice , private _route: ActivatedRoute , private _router : Router , private _userServices : userServices,private _Http :HttpClient) {
  this.getParams();
  this._dataservice.getCDetatils(this.routeParam).subscribe(
    data=>{
     this.preTable = data
     if (this.preTable.length == 0){
       
        const text = document.getElementById('content');
        this.exist =1;
     } 
     this.returnTable();
    },
    error=>{
  
     this._router.navigate(['**']);
    }
  );   
  }
  formsData: [];
  dFeilds: any[] = [];
  dFeildsVal: any[] = [];
  tableHeader: string[] = [];
  preTable;
  i = 0;
  len;
  matrix;
  dates: any[] = [];
  routeParam: Params

  ngOnInit() {
    
    window.document.body.style.backgroundColor = "black";

    this._userServices.isActive().subscribe(
      data => { },
      error => this._router.navigate(['/signin']),
    );
  }
  returnTable() {
    this.len = this.preTable.length;
    this.preTable.forEach(element => {
      this.dFeilds.push(element.formData)
    })
    this.i = 0;
    this.tableHeader = Object.keys(this.dFeilds[this.dFeilds.length-1]);
    this.dFeilds.forEach(obj => {
      Object.keys(this.dFeilds[this.dFeilds.length-1]).forEach((element)=>{
        this.dFeildsVal.push(obj[element]);
      })
    })
    this.matrix = Array.from({ length:this.len }, (_, i) => i)
      .map(i => this.dFeildsVal.slice(i * this.tableHeader.length, i * this.tableHeader.length + this.tableHeader.length));
  }
  getParams(){
    this._route.params.subscribe(params => {
      return this.routeParam = params.id; 
    });
  }
  download(){
    this._dataservice.downloadFile(this.matrix,"Winners Data",this.tableHeader)
  }

}
