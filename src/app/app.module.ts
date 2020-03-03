import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AlertModule } from '../app/custom-modules/_alert/alert.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationComponent } from './custom-modules/notification/notification.component';
import { HomeComponent } from './components/home/home.component';
import { LoadOverlayComponent } from './custom-modules/load-overlay/load-overlay.component';
import { NavComponent } from './custom-modules/nav/nav.component';

import { GenericService } from './services/generic.service';
import { AuthService } from './services/auth.service';
import { UserEditComponent } from './components/user/user-edit/user-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent,
    LoadOverlayComponent,
    NavComponent,
    UserEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    AlertModule,
    MatToolbarModule
  ],
  providers: [
    GenericService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
