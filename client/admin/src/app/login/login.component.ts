import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {
  	username : '',
  	password : ''
  }
  loginError = false;
  disabled = false;
  constructor(private _auth: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  loginUser () {
  	console.log(this.loginUserData);
  	this.disabled = true;
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {        
        if(res && res.hasOwnProperty('access_token')) {
          localStorage.setItem('token', res.access_token)
          this._router.navigate(['/dashboard'])
        }else{
        	this.loginError = true
        }
        this.disabled = false;
      },
      err => {
      	console.log(err);
      	this.loginError = true;
      	this.disabled = false;
      }

    ) 
  }

}