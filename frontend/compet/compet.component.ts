import { Component, OnInit ,ChangeDetectorRef} from '@angular/core';
import {dataservice} from '../data.service'
import {Router}from '@angular/router';
import {userServices} from '../user.service';
import { formServices } from '../forms.service';
import {environment} from '../../environments/environment';
const formsUrl = environment.formsUrl
@Component({
  selector: 'app-compet',
  templateUrl: './compet.component.html',
  styleUrls: ['./compet.component.css']
})
export class CompetComponent implements OnInit {
  formUrl = formsUrl;
  constructor(private _router: Router,private _dataservice : dataservice , private _userServices : userServices ,private _formsService : formServices,private changeDetectorRef: ChangeDetectorRef) { }
  dataSource ;
  text;
  ngOnInit() {
    window.document.body.style.backgroundColor = "black";
    this._userServices.isActive().subscribe(
      data => { },
      error => this._router.navigate(['/signin']),
    );

    this._dataservice.getCompetion().subscribe(data=>{
      this.dataSource = data;
      if (this.dataSource.length == 0)
      {this.text =1 ;}
    },
    error=>{
    
    }
    );
  }
  deleteCompetion(templateId){
   this._formsService.delteCopmetion(templateId).subscribe(data=>{  
    location.reload();
},error=>{
    console.log(error);
})
  }
 
}
