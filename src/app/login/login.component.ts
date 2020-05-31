import { Component, OnInit } from '@angular/core';
import * as firebase from "firebase";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  email = new FormControl('', [Validators.required, Validators.email]);
  hidePassword: boolean = true;

  ngOnInit(): void {
    const firebaseConfig = {
      apiKey: "AIzaSyB0D_p8H1VxS-1-2SCRSAY6WOAN4W0CZJQ",
      authDomain: "angular-firebase-auth-eb381.firebaseapp.com",
      databaseURL: "https://angular-firebase-auth-eb381.firebaseio.com",
      projectId: "angular-firebase-auth-eb381",
      storageBucket: "angular-firebase-auth-eb381.appspot.com",
      messagingSenderId: "614252779818",
      appId: "1:614252779818:web:87fc48dd37f94c3140e653"
    };

    const response = firebase.initializeApp(firebaseConfig);
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
