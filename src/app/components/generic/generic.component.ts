import { AuthService } from '../../services/auth.service';

export abstract class GenericComponent{
    constructor(public authService: AuthService) {}

    checkCache(){
        let expirationDT = new Date(this.authService.currentUserValue.expiration);
        let currentDT = new Date();
        if(currentDT.getTime() >= expirationDT.getTime())
        {    
            this.authService.logout();
        }
        this.authService.loggedIn.next(true);
    }

    checkStringIfEmpty(value: string): boolean{
        return (value == undefined) || (value == '');
    }
}