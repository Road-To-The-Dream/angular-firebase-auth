import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authUser;
  private env = environment;

  constructor(
    private router: Router,
    private errorService: ErrorService,
  ) {
  }

  initialize() {
    const firebaseConfig = {
      apiKey: this.env.firebase.apiKey,
      authDomain: this.env.firebase.authDomain,
      databaseURL: this.env.firebase.databaseURL,
      projectId: this.env.firebase.projectId,
      storageBucket: this.env.firebase.storageBucket,
      messagingSenderId: this.env.firebase.messagingSenderId,
      appId: this.env.firebase.appId
    };

    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
  }

  isSignIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = user;
        const token = this.getToken(user);
        this.router.navigateByUrl('base');
      } else {
        this.authUser = null;
        this.router.navigateByUrl('login');
      }
    });
  }

  signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorService.receivedError.next(error);
      });
  }

  googleSignIn() {

  }

  registration(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorService.receivedError.next(error);
      });
  }

  logout() {
    firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }

  private getToken(user) {
    return user.getIdTokenResult().then(idTokenResult => {
      return idTokenResult;
    });
  }
}
