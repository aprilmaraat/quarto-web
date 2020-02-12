import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class GenericService {
    public baseUrl: string;
    // public endpoint: string;
    public http: HttpClient;

    constructor(_http: HttpClient) {
        this.http = _http;
    }

    public get(id: number, endpoint: string): Observable<any> {
        return this.http.get<any>(this.baseUrl + endpoint);
    }

    public getList(endpoint: string): Observable<any[]>{
        return this.http.get<any[]>(this.baseUrl + endpoint);
    }

    public post(object: any, endpoint: string): Observable<any> {
        return this.http.post<any>(this.baseUrl + endpoint, object);
    }
}