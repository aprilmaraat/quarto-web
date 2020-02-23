import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../custom-modules/_alert/alert.service';
import { UserType } from 'src/app/models/enum';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';

@Component({
  selector: 'q-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public passwordTokenRequest = new PasswordTokenRequest;
  public userType: UserType;
  public error = { emailAddress: false, password: false, userType: false };
  public loading: boolean = false;

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private loadService: LoadService
    , private router: Router) { 
      this.loadService.load(false);
      if (this.authService.currentUserValue) {
        this.router.navigate(['/']);
      }
    }

  public register() {
    if (this.stringIsValid(this.passwordTokenRequest.EmailAddress) 
        && this.stringIsValid(this.passwordTokenRequest.Password) 
        && this.passwordTokenRequest.UserType !== undefined) {
        this.error.emailAddress = false;
        this.error.password = false;
        this.error.userType = false;
        this.loadService.load(true);
        this.authService.registerUser(this.passwordTokenRequest).subscribe(response => {
        if(!response.wasSuccess){ 
          this.alertService.error(response.messageText);
        }
        this.router.navigate(['/login']);
        this.alertService.success(`Account ${this.passwordTokenRequest.EmailAddress} successfully registered!`);
        this.loadService.load(false);
      }, (err) => {
        this.alertService.error(err.error);
        this.loadService.load(false);
      });
    }
    else {
      this.alertService.error('All fields are required. Please check the errors.');
      this.error.emailAddress = (!this.stringIsValid(this.passwordTokenRequest.EmailAddress));
      this.error.password = (!this.stringIsValid(this.passwordTokenRequest.Password));
      this.error.userType = (this.passwordTokenRequest.UserType == undefined);
      this.loadService.load(false);
    }
  }

  stringIsValid(string: string): boolean{
    return string !== undefined && string !== '';
  }
}
