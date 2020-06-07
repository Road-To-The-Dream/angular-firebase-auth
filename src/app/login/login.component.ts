import {Component} from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.maxLength(8),
    Validators.minLength(3)
  ]);
  hidePassword: boolean = true;

  constructor(
    public authService: AuthService
  ) {
  }

  getErrorMessageLogin() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }

    if (this.password.hasError('minlength')) {
      return 'Minimum 3 character';
    }

    if (this.password.hasError('maxlength')) {
      return 'Maximum 8 character';
    }

    return this.email.hasError('password') ? 'Not a valid password' : '';
  }

  login() {
    if (this.email.valid || this.password.valid) {
      this.authService.signIn(this.email.value, this.password.value);
    }
  }

  googleSignIn() {
    this.authService.googleSignIn();
  }

  gitHubSignIn() {
    this.authService.gitHubSignIn();
  }

  registration() {
    if (this.email.valid || this.password.valid) {
      this.authService.registration(this.email.value, this.password.value);
    }
  }


}
