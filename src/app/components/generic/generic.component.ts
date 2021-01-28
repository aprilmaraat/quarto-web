import { LoadService } from 'src/app/custom-modules/load-overlay/load-overlay.service';
import { AlertService } from 'src/app/custom-modules/_alert';
import { AuthService } from '../../services/auth.service';

export abstract class GenericComponent{
    constructor(public authService: AuthService
        , public alertService: AlertService
        , public loadService: LoadService) {
        this.checkCache();
        this.alertService.success('Wow');
        setTimeout (() => {
            this.alertService.success('Huehue');
        }, 2000);
    }

    checkCache(){
        if(this.authService.currentUserValue){
            let expirationDT = new Date(this.authService.currentUserValue.expiration);
            let currentDT = new Date();

            if(currentDT.getTime() >= expirationDT.getTime()){   
                this.authService.loggedIn.next(false); 
                this.authService.logout();
            }
            else{
                this.authService.loggedIn.next(true);
            }
        }
        
    }

    checkStringIfEmpty(value: string): boolean{
        return (value == undefined) || (value == '');
    }
}