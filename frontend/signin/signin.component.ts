import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { userServices } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  errorMessage
  constructor(private _userServices: userServices, private _router: Router) { }

  ngOnInit(): void {
    window.document.body.style.backgroundColor = "black";
  }
  onSubmit(form: NgForm) {
    this._userServices.signIn(form.value.email, form.value.password).subscribe(
      data => {
        localStorage.setItem('token', data.toString());
        this._router.navigate(['/form-creation']);

      },
      error => {
        this.errorMessage = "error";
      }
    );;
  }
}
