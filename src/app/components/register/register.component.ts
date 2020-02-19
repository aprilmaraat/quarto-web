import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../custom-modules/_alert/alert.service';
import { UserType } from 'src/app/models/enum';
import { PasswordTokenRequest } from '../../models/password-token-request';

@Component({
  selector: 'q-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public passwordTokenRequest = new PasswordTokenRequest;
  public userType: UserType;
  public error = { emailAddress: false, password: false, userType: false };

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private router: Router) { }

  public register() {
    if (this.stringIsValid(this.passwordTokenRequest.EmailAddress) 
        && this.stringIsValid(this.passwordTokenRequest.Password) 
        && this.passwordTokenRequest.UserType !== undefined) {
      this.authService.registerUser(this.passwordTokenRequest).subscribe(response => {
        if(!response.wasSuccess){ 
          this.alertService.error(response.messageText);
        }
        this.router.navigate(['/login']);
        this.alertService.success(`Account ${this.passwordTokenRequest.EmailAddress} successfully registered!`);
      }, (err) => {
        this.alertService.error(err.error);
      });
    }
    else {
      this.alertService.error('All fields are required. Please check the errors.');
      this.error.emailAddress = (!this.stringIsValid(this.passwordTokenRequest.EmailAddress));
      this.error.password = (!this.stringIsValid(this.passwordTokenRequest.Password));
      this.error.userType = (this.passwordTokenRequest.UserType == undefined);
    }
  }

  stringIsValid(string: string): boolean{
    return string !== undefined && string !== '';
  }
}
