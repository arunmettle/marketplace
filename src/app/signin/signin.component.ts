import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup,FormBuilder, Validators } from "@angular/forms";
import { Router } from '@angular/router';
import {AuthService} from '../auth/auth.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {

  signInForm: FormGroup;
  userAccountValidate: Boolean;
  userAccountError: string;
  isSubmitted: Boolean;

  constructor(private formBuilder:FormBuilder, private router: Router, private authService: AuthService) { 
    this.signInForm= this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]], 
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
       ]]
    })

  }

  signInSubmit(){
    console.log(this.signInForm);
    this.isSubmitted= true;
    this.userAccountValidate= false;
    this.authService.signinByEmail(this.signInForm.controls.email.value, this.signInForm.controls.password.value)
    .then((res:any)=>{
      console.log(res);
      if(res.length>0){
        this.userAccountValidate= true;
        this.userAccountError= res;
      }
    });
  }

  get errorControl(){
    return this.signInForm.controls;
  }

  gotoSignup(){
    this.router.navigate(['/signup'])
  }

  gotoPasswordReset(){
    this.router.navigate(['/user-management'])
  }

  signinWithGoogle(){
    console.log("signin with google");
    this.authService.signinWithGoogle()
    .then(res=>{
      if(res.length>0){
        alert(res);
      }
      else{
        console.log("signed in");
        this.router.navigate(['/userselect']);
      }
    })
  }

  signinWithFB(){
    console.log("signin with facebook");
    this.authService.signinWithFB()
    .then(res=>{
      if(res!=null){
        alert(res.message);
      }
      else{
        console.log("signed in");
        this.router.navigate(['/userselect']);
      }
    })
  }

  ngOnInit() {}

}
