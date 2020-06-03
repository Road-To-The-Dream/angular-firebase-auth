import { Injectable } from '@angular/core';
import {Subject, Subscription} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  public receivedError = new Subject();

}
