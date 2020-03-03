import { Component } from '@angular/core';
import { GenericComponent } from '../../generic/generic.component';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/custom-modules/_alert';
import { LoadService } from 'src/app/custom-modules/load-overlay/load-overlay.service';
import { Router } from '@angular/router';

@Component({
    selector: 'q-user-edit',
    templateUrl: './user-edit.component.html',
    styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent extends GenericComponent {
    loading: boolean = true;

    constructor(authService: AuthService
        , private alertService: AlertService
        , private loadService: LoadService
        , private router: Router) { 
          super(authService);
        }

        ngOnInit(){
            this.checkCache();
            this.loadService.load(this.loading);
        }
}
