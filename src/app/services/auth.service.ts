import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { GenericService } from './generic.service';
import { RegistrationRequest } from '../models/registration-request';

@Injectable()
export class AuthService extends GenericService {
    baseUrl = "https://localhost:6001/api/auth";

    public registerUser(regsitrationRequest: RegistrationRequest): Observable<any>{
        return this.post(regsitrationRequest, '/register');
    }
}