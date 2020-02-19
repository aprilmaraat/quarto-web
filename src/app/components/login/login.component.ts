import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../custom-modules/_alert/alert.service';

@Component({
  selector: 'q-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public passwordTokenRequest = new PasswordTokenRequest;
  public error = { emailAddress: false, password: false };

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private router: Router) { }

  public login() {
    if (this.passwordTokenRequest.EmailAddress !== undefined && this.passwordTokenRequest.Password !== undefined) {
      this.authService.loginUser(this.passwordTokenRequest).subscribe(response => {
        if(!response.wasSuccess){ 
          this.alertService.error(response.messageText);
        }
        this.alertService.success(`Succes login!`);
      }, (err) => {
        this.alertService.error(err.error);
      });
    }
    else {
      this.alertService.error('All fields are required. Please check the errors.');
      this.error.emailAddress = (this.passwordTokenRequest.EmailAddress == undefined);
      this.error.password = (this.passwordTokenRequest.Password == undefined);
    }
  }
}