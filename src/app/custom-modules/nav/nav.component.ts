import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LoadService } from '../../custom-modules/load-overlay/load-overlay.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../_alert';
import { Observable } from 'rxjs';

@Component({
  selector: 'q-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})

export class NavComponent {
  isLoggedIn$: Observable<boolean>;

  constructor(private authService: AuthService
    , private router: Router
    , private loadService: LoadService
    , private alertService: AlertService) {
      this.isLoggedIn$ = this.authService.isLoggedIn;
    }

  ngOnInit() {
    this.loadService.load(false);
  }

  homePage(){
    this.router.navigate(['']);
  }

  logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
    this.alertService.success('Successfully logged out.');
  }
}