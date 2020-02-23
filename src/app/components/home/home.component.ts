import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'q-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {
    loading: boolean = false;
    userStorage = JSON.parse(localStorage.getItem('currentUser'));

    constructor(private loadService: LoadService, private authService: AuthService, private router: Router){
        this.checkCache();
        this.loadService.load(false);
    }

    // might move this to a generic component
    private checkCache(){
        let expirationDT = new Date(this.userStorage.expiration);
        let currentDT = new Date();

        if(currentDT.getTime() >= expirationDT.getTime())
        {    
            this.authService.logout();
        }
    }
}