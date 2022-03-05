import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  private url: string = 'https://identitytoolkit.googleapis.com/v1';
  private apiKey: string = 'AIzaSyBj61TlIq5RMotNwHwAF5ABK4UkRq2IKeY';
  userToken: any;

  register(user: UserModel) {
    const authData = {
      //email: user.email,
      //password: user.password,
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post(`${this.url}/accounts:signUp?key=${this.apiKey}`, authData)
      .pipe(
        map((resp: any) => {
          console.log(resp);
          return resp;
        })
      );
  }
  login(user: UserModel) {
    const authData = {
      ...user,
      returnSecureToken: true,
    };
    return this.http
      .post(
        `${this.url}/accounts:signInWithPassword?key=${this.apiKey}`,
        authData
      )
      .pipe(
        map((resp: any) => {
          this.saveToken(resp['idToken']);
          return resp;
        })
      );
  }

  private saveToken(idToken: string) {
    this.userToken = idToken;
    localStorage.setItem('token', idToken);
    let today = new Date();
    today.setSeconds(3600);
    localStorage.setItem('expired', today.getTime().toString());
  }

  readToken() {
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    } else {
      this.userToken = '';
    }
    return this.userToken;
  }

  isAuthenticated(): boolean {
    if (this.userToken?.length < 2) {
      return false;
    }

    const expired = Number(localStorage.getItem('expired'));
    const expireDay = new Date();
    expireDay.setTime(expired);

    if (expireDay > new Date()) {
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('token');
  }
}
