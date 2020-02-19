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
  public passwordTokenRequest = new PasswordTokenRequest;
  public userType: UserType;
  public error = { emailAddress: false, password: false, userType: false };

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private router: Router) { }

  public register() {
    if (this.passwordTokenRequest.EmailAddress !== undefined && this.passwordTokenRequest.Password !== undefined 
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
      this.error.emailAddress = (this.passwordTokenRequest.EmailAddress == undefined);
      this.error.password = (this.passwordTokenRequest.Password == undefined);
      this.error.userType = (this.passwordTokenRequest.UserType == undefined);
    }
  }
}
