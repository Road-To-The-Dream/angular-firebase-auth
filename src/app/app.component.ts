import {Component, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'angular-firebase-auth';

  constructor(
    public authService: AuthService
  ) {
  }

  ngOnInit(): void {
    this.authService.initialize();
    this.authService.isSignIn();
  }

}
