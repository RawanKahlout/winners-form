import { Component, OnInit } from '@angular/core';
import { formServices } from '../forms.service';
import { NgForm, FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Params } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-winnersform',
  templateUrl: './winnersform.component.html',
  styleUrls: ['./winnersform.component.css']
})
export class WinnersformComponent implements OnInit {
  constructor(private _formServices: formServices, private _http: HttpClient, private _route: ActivatedRoute, private _router: Router) {
   var temp= this.getRouteParams();
  }
  recFile: File = null;
  uploadedFile;
  path;
  formTemplate;
  extraField;
  routeParam: Params
  competionName;
  message;
  ngOnInit() {
    window.document.body.style.backgroundColor = "black";
    this._formServices.bannerLink(this.routeParam).subscribe(
      data => {
        this.path = data;
     
      },
        error =>{
      
        }
      )

    this._formServices.getFormTemplate(this.routeParam).subscribe(
      data => {
        this.formTemplate = data
        this.extraField = this.formTemplate.extraField;
        this.competionName = this.formTemplate.competionName;
      },
      error => {
      
        this._router.navigate(['**']);
      }
    )
  }
  //const dField = document.getElementById('forms');
  //Object.entries(this.dynamicField).forEach(([key, value]) => {
  //  dField.innerHTML += "<style>" + "input[type=text]{text-align:center; border: 2px solid #FBAD18;border-radius: 0px 8px 0px 8px;background-color: black;margin:auto;color:white;width:50%}" +
  //  +"label {color:#FBAD18;}" + "</style>" +
  //'<div class="form-group ">' +
  //"<label style='color:#FBAD18;display: inline-block;width: 100%;text-align: right;'>" + value + "</label>" + "<input type=text [(ngModel)]='df' name=df class='form-control' id='55'>" +
  //   '</div>'
  // });
  getRouteParams() {
    this._route.params.subscribe(params => {
      return this.routeParam = params.cName;
    });
  }
  fileObj(event) {
    this.recFile = <File>event.target.files[0];
    const file = event.target.files[0];
    this.uploadedFile = file;


  }
  onSubmit(form: NgForm) {
      const fileObj = new FormData();
      fileObj.append('file', this.uploadedFile);
      var formData;
      var route;
      formData = form.value;
      console.log(formData);
      route = this.routeParam
      this._formServices.submitWinnerData(formData, route,this.competionName);
    }
  
}


