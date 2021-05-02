import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthResponse } from '../models/auth-response.interface';
import { GenericService } from './generic.service';
import { PasswordTokenRequest } from './request/password-token.request';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends GenericService{
  baseUrl = environment.authApiUrl + 'token';
  private currentUserSubject: BehaviorSubject<AuthResponse>;
  public loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(public http: HttpClient) {
    super(http);
    this.currentUserSubject = new BehaviorSubject<AuthResponse>(JSON.parse(localStorage.getItem('currentUser') || ''));
  }

  get isLoggedIn(){
    return this.loggedIn.asObservable();
  }

  public get currentUserValue(){
    return this.currentUserSubject.value;
  }

  public loginUser(passwordTokenRequest: PasswordTokenRequest): Observable<any>{
    return this.post(passwordTokenRequest, '/login').pipe(map(response => {
        this.setUserCache(response.responseObject);
        return response;
    }));
  }

  public logout(){
    localStorage.removeItem('currentUser');
    this.loggedIn.next(false);
    this.currentUserSubject.next(new AuthResponse());
  }

  public registerUser(passwordTokenRequest: PasswordTokenRequest): Observable<any>{
      return this.post(passwordTokenRequest, '/register');
  }

  private setUserCache(user: AuthResponse){
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.loggedIn.next(true);
    this.currentUserSubject.next(user);
  }
}
