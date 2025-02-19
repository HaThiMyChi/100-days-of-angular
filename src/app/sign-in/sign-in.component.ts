import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  userInfo = {
    userName: 'tiepphan',
    password: '',
    rememberMe: true,
  }

  usernamePattern = /^[a-z]{6,32}$/i;
  passwordPattern = /^(?=.*[!@#$%^&*]+)[a-z0-9!@#$%^&*]{6,32}$/;

  constructor() { }

  ngOnInit(): void {
  }

  obSubmit(form: NgForm) {
    console.log(form);
    throw new Error('something went wrong');
  }

}
