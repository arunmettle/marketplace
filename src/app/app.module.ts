import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component'; 
import { AppRoutingModule } from './app-routing.module';
import {SigninComponent} from "./signin/signin.component";
import {SignupComponent} from "./signup/signup.component";
import {UserManagementComponent} from "./user-management/user-management.component";
import {firebaseConfig} from "./environments/firebase-config";
import {AuthService} from "./auth/auth.service";

@NgModule({
  declarations: [AppComponent, SigninComponent, SignupComponent, UserManagementComponent],
  entryComponents: [],
  imports: [BrowserModule, 
    IonicModule.forRoot(),
     AppRoutingModule, 
     FormsModule,
      ReactiveFormsModule,
      AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, AngularFireModule, AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
