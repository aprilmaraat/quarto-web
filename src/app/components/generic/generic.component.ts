import { AuthService } from '../../services/auth.service';

export abstract class GenericComponent{
    constructor(public authService: AuthService) {
        this.checkCache();
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