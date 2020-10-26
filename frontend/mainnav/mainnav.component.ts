import { Component, OnInit } from '@angular/core';
import{userServices} from '../user.service'
@Component({
  selector: 'app-mainnav',
  templateUrl: './mainnav.component.html',
  styleUrls: ['./mainnav.component.css']
})
export class MainnavComponent implements OnInit {

constructor(private _userServices : userServices) { }

  ngOnInit(): void {
  }
  signout(){
    this._userServices.signOut()
  }

}
