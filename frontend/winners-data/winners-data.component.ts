import { Component, OnInit } from '@angular/core';
import { dataservice } from '../data.service';
import {ActivatedRoute,Params ,Router} from '@angular/router'
import {userServices} from '../user.service';
@Component({
  selector: 'app-winners-data',
  templateUrl: './winners-data.component.html',
  styleUrls: ['./winners-data.component.css']
})
export class WinnersDataComponent implements OnInit {
exist ;
  constructor(private _dataservice: dataservice , private _route: ActivatedRoute , private _router : Router , private _userServices : userServices) {
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
      //this.dates.push(element.submitionData);
      this.dFeilds.push(element.formData)
    })
    //this.tableHeader.push("submition Date");
    this.dFeilds.forEach(obj => {
      Object.entries(obj).forEach(([key, value]) => {
        if (this.i == 0) {
          this.tableHeader.push(key)
        }
        this.dFeildsVal.push(value);
      })
      this.i = 1;
    })
    this.matrix = Array.from({ length:this.len }, (_, i) => i)
      .map(i => this.dFeildsVal.slice(i * this.tableHeader.length, i * this.tableHeader.length + this.tableHeader.length));
    //for (var i = 0 ; this.len ; i++)
    //{this.matrix.push(this.dates[i])}
 
  }//-------------
  getParams(){
    this._route.params.subscribe(params => {
      return this.routeParam = params.id; 
    });
  }
}