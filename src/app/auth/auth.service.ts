import { Injectable, NgZone } from '@angular/core';
import {User} from "../shared/services/user";
import * as firebase from "firebase/app";
import { AngularFireAuth } from "@angular/fire/auth";
import {Router} from "@angular/router";
import {AngularFirestore,AngularFirestoreDocument} from "@angular/fire/firestore";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userData: any;
  authState: any=null;
  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,  
    public ngZone: NgZone){
      this.afAuth.authState.subscribe(user=>{
        if(user){
          this.userData= user;
          localStorage.setItem('user',JSON.stringify(this.userData));
          console.log(JSON.parse(localStorage.getItem('user')));
        }
        else{
          localStorage.setItem('user', null);
          console.log(JSON.parse(localStorage.getItem('user')));
        }
      })
    } // NgZone service to remove outside scope warning) {
    

  async signUpByEmail(email: string, passsword: string): Promise<any>{
    try{
      await this.afAuth.createUserWithEmailAndPassword(email, passsword)
      this.router.navigate(['/signin']);
    }
    catch(err){
      return err;
    }
  }

  async signinByEmail(email: string, password: string): Promise<any>{
    try{
      await this.afAuth.signInWithEmailAndPassword(email, password)
      this.router.navigate(['/userselect']);
    }
    catch(err){
      return err;
    }
  }
  
  async sendPasswordResetEmail(email: string): Promise<any>{

    try{
      await this.afAuth.sendPasswordResetEmail(email);
    }
    catch(err){
      return err;
    }
  }

  async verifyPasswordResetCode(actionCode: string): Promise<any>{
    try{
      await this.afAuth.verifyPasswordResetCode(actionCode);
    }
    catch(err){
      return err;
    }
  }

  async passwordResetSubmit(actionCode: string, password: string): Promise<any>{
    try{
      await this.afAuth.confirmPasswordReset(actionCode, password);
      this.router.navigate(['/signin']);
    }
    catch(err){
      return err;
    }
  }

  async signupwithGoogle(): Promise<any>{
    try{
      const provider= new firebase.default.auth.GoogleAuthProvider();
      const credential= this.afAuth.signInWithPopup(provider);
      this.router.navigate(['/signin']);
    return credential;
    }
    catch(err){
      return err;
    }
  }

  async signupWithFB(): Promise<any>{
    try{
      const provider= new firebase.default.auth.FacebookAuthProvider();
      const credential=  await this.afAuth.signInWithPopup(provider)
      this.router.navigate(['/signin']);
      return credential;
      }
      catch(err){
        return err;
      }
  }

  async signinWithGoogle(): Promise<any>{
    try{
      const provider= new firebase.default.auth.GoogleAuthProvider();
      const credential=  await this.afAuth.signInWithPopup(provider)
      this.router.navigate(['/signin']);
      return credential;
      }
      catch(err){
        return err;
      }
  }

  async signinWithFB(): Promise<any>{
    try{
      const provider= new firebase.default.auth.FacebookAuthProvider();
      const credential=  await this.afAuth.signInWithPopup(provider)
      this.router.navigate(['/signin']);
      return credential;
      }
      catch(err){
        return err;
      }
  }
}
