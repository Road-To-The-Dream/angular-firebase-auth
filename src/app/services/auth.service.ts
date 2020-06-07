import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";
import {ErrorService} from "./error.service";
import {User} from "../models/user";

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

  public initialize() {
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

  public isSignIn() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.authUser = new User();
        this.authUser.setUser(user);
        const token = this.getToken(user);
        this.router.navigateByUrl('base');
      } else {
        this.authUser = null;
        this.router.navigateByUrl('login');
      }
    });
  }

  public signIn(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorService.receivedError.next(error);
      });
  }

  public googleSignIn() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then()
      .catch(error => {
      this.errorService.receivedError.next(error.message);
    });
  }

  public gitHubSignIn() {
    const provider = new firebase.auth.GithubAuthProvider();
    firebase.auth().signInWithPopup(provider)
      .then()
      .catch(error => {
        this.errorService.receivedError.next(error.message);
      });
  }

  public registration(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .catch(error => {
        this.errorService.receivedError.next(error);
      });
  }

  public logout() {
    firebase.auth().signOut();
    this.router.navigateByUrl('login');
  }

  private getToken(user) {
    return user.getIdTokenResult().then(idTokenResult => {
      return idTokenResult;
    });
  }
}
