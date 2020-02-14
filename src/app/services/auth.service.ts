import { Observable, BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericService } from './generic.service';
import { RegistrationRequest } from '../models/registration-request';
import { PasswordTokenRequest } from '../models/password-token-request';

@Injectable()
export class AuthService extends GenericService {
    baseUrl = "https://localhost:6001/api/auth";
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

    public registerUser(regsitrationRequest: RegistrationRequest): Observable<any>{
        return this.post(regsitrationRequest, '/register');
    }
}