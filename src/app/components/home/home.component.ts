import { Component } from '@angular/core';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';
import { AuthService } from '../../services/auth.service';
import { GenericComponent } from '../generic/generic.component';

@Component({
    selector: 'q-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent extends GenericComponent{
    loading: boolean = false;
    userStorage = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private loadService: LoadService, authService: AuthService){
        super(authService);
    }

    ngOnInit(){
        this.loadService.load(this.loading);
    }
}