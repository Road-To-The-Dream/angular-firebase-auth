import {Injectable} from '@angular/core';
import * as firebase from "firebase";
import {environment} from "../../environments/environment";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authUser;
  private env = environment;

  constructor(
    private router: Router
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
      // firebase.initializeApp(firebaseConfig);
    }
  }

  isLogin() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log('user: ', user);
        this.router.navigateByUrl('base');
      } else {
        console.log('user signed: ', user);
        this.router.navigateByUrl('login');
      }
    });
  }

  login(email: string, password: string) {
    firebase.auth().signInWithEmailAndPassword(email, password)
      .catch(error => {
        console.log('ERROR: ', error)
      });

    this.authUser = true;
  }

  registration(email: string, password: string) {
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      // ...
    });
  }

  logout() {

  }
}
