import { Component } from '@angular/core';
import { UserData } from '../../models/user-data';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { RegistrationRequest } from '../../models/registration-request';
import { AuthService } from '../../services/auth.service';
import { UserType } from 'src/app/models/enum';
import { AlertService } from '../../custom-modules/_alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'q-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  public registrationRequest = new RegistrationRequest;
  public userData = new UserData;
  public passwordTokenRequest = new PasswordTokenRequest;
  public userType: UserType;
  public error = { emailAddress: false, password: false, userType: false };

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private router: Router) { }

  public register() {
    if (this.userData.EmailAddress !== undefined && this.passwordTokenRequest.Password !== undefined 
        && this.passwordTokenRequest.UserType !== undefined) {
      this.registrationRequest.UserData = this.userData;
      this.registrationRequest.PasswordTokenRequest = this.passwordTokenRequest;
      this.authService.registerUser(this.registrationRequest).subscribe(response => {
        if(!response.wasSuccess){ 
          this.alertService.error(response.messageText);
        }
        this.router.navigate(['/login']);
        this.alertService.success('Account successfully registered, you can now login using the account credentials.');
      }, (err) => {
        this.alertService.error(err.error);
      });
    }
    else {
      this.alertService.error('All fields are required. Please check the errors.');
      this.error.emailAddress = (this.userData.EmailAddress == undefined);
      this.error.password = (this.passwordTokenRequest.Password == undefined);
      this.error.userType = (this.passwordTokenRequest.UserType == undefined);
    }
  }
}
