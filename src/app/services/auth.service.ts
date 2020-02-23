import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { PasswordTokenRequest } from '../models/password-token-request';
import { map } from 'rxjs/operators';

@Injectable()
export class AuthService extends GenericService {
    baseUrl = "https://localhost:6001/api/token";
    private currentUserSubject: BehaviorSubject<PasswordTokenRequest>;
    public currentUser: Observable<PasswordTokenRequest>;

    constructor(public http: HttpClient){
        super(http);
        this.currentUserSubject = new BehaviorSubject<PasswordTokenRequest>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): PasswordTokenRequest {
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
        this.currentUserSubject.next(null);
    }

    public registerUser(passwordTokenRequest: PasswordTokenRequest): Observable<any>{
        return this.post(passwordTokenRequest, '/register');
    }

    private setUserCache(user: any){
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
    }
}