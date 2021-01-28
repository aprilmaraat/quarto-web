import { Component } from '@angular/core';
import { AlertService } from 'src/app/custom-modules/_alert';
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

    constructor(authService: AuthService
        , alertService: AlertService
        , loadService: LoadService) {
        super(authService, alertService, loadService);
    }

    ngOnInit(){
        this.loadService.load(this.loading);
    }
}