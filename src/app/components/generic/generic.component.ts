import { AuthService } from '../../services/auth.service';

export abstract class GenericComponent{
    userStorage = JSON.parse(localStorage.getItem('currentUser'));

    constructor(public authService: AuthService) {}

    checkCache(){
        let expirationDT = new Date(this.userStorage.expiration);
        let currentDT = new Date();

        if(currentDT.getTime() >= expirationDT.getTime())
        {    
            this.authService.logout();
        }
    }

    checkStringIfEmpty(value: string): boolean{
        return (value == undefined) || (value == '');
    }
}