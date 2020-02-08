import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export class GenericService {
    public base: string;
    public endpoint: string;
    public http: HttpClient;

    constructor(_http: HttpClient) {
        this.http = _http;
    }

    public get(id: number): Observable<any> {
        let result: Observable<any>;
        return this.http.get<Observable<any>>(this.endpoint);
    }

    public post(object: any): Observable<any> {
        let result: Observable<any>;
        return this.http.post<Observable<any>>(this.endpoint, object);
    }
}