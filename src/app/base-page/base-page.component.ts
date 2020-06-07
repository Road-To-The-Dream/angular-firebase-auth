import {Component} from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-base-page',
  templateUrl: './base-page.component.html',
  styleUrls: ['./base-page.component.scss']
})
export class BasePageComponent {

  constructor(
    public authService: AuthService
  ) {}

}
