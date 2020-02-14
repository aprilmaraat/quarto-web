import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatRadioModule } from '@angular/material/radio';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AlertModule } from '../app/custom-modules/_alert/alert.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { NotificationComponent } from './custom-modules/notification/notification.component';
import { HomeComponent } from './components/home/home.component';

import { GenericService } from './services/generic.service';
import { AuthService } from './services/auth.service';

const config = {
  apiKey: "AIzaSyAagWFzHWhqXGm5Zqx0f_iwcKZsqjDTenc",
  authDomain: "quarto-2ca6f.firebaseapp.com",
  databaseURL: "https://quarto-2ca6f.firebaseio.com",
  projectId: "quarto-2ca6f",
  storageBucket: "quarto-2ca6f.appspot.com",
  messagingSenderId: "630011736873",
  appId: "1:630011736873:web:3d2f6571f2329d4d247d38",
  measurementId: "G-5LYV52557B"
};

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatRadioModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AlertModule
  ],
  providers: [
    GenericService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
