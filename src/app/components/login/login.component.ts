import { Component } from '@angular/core';
import { PasswordTokenRequest } from '../../models/password-token-request';
import { AuthService } from '../../services/auth.service';
import { UserType } from 'src/app/models/enum';
import { AlertService } from '../../custom-modules/_alert/alert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'q-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  public passwordTokenRequest = new PasswordTokenRequest;

  constructor(private authService: AuthService
    , private alertService: AlertService
    , private router: Router) { }
}