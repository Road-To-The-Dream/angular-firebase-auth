import {Component, OnInit} from '@angular/core';
import {ErrorService} from "../services/error.service";
import {asyncScheduler} from "rxjs";

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss']
})
export class ErrorComponent implements OnInit {

  public errors: string[] = [];
  public isNewError = false;

  constructor(
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.errorService.receivedError.subscribe((event: string) => {
      this.isNewError = true;
      this.errors.push(event);
    });
  }

  clearErrors() {
    this.isNewError = false;
    const task = () => this.errors = [];
    asyncScheduler.schedule(task, 500)
  }

}
