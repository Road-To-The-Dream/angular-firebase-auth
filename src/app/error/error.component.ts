import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ErrorService} from "../services/error.service";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public errors: string[] = [];

  constructor(
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.errorService.receivedError.subscribe((event: string) => {
      this.errors.push(event);
    });
  }

}
