import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})

export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  userAccountExists: Boolean;
  isSubmitted: Boolean;
  isEmailMatch: Boolean;
  isPasswordMatch: Boolean;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) {
    this.signUpForm = this.formBuilder.group({
      email: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
      confirmEmail: ['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        this.confirmEmail
      ]],
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        this.confirmPassword
      ]]
    },
    {
      validator: [this.confirmEmail,this.confirmPassword]
    })
  }

  signUpSubmit() {
    console.log(this.signUpForm);
    this.isSubmitted = true;
    this.userAccountExists = false; 
    this.authService.signUpByEmail(this.signUpForm.controls.email.value, this.signUpForm.controls.password.value)
    .then((res)=>{
      if(res.length>0){
        this.userAccountExists= true;
      }
    })
    .catch((err)=>{
      console.log("error"+err);
    });
  }

  get errorControl() {
    return this.signUpForm.controls;
  }

  confirmEmail(control:any){
    if(control._parent!=null&&control._parent.controls!=undefined){
      return control._parent.controls.email.value==control.value?null:{confirmEmail:{valid:false}}
    }
    return null;
  }

  confirmPassword(control:any){
    if(control._parent!=null&&control._parent.controls!=undefined){
      return control._parent.controls.password.value==control.value?null:{confirmPassword:{valid:false}}
    }
    return null;
  }

  signupWithGoogle(){
    console.log("signup with google");
    this.authService.signupwithGoogle()
    .then(res=>{
      if(res.length>0){
        alert(res);
      }
      else{
        console.log("signed up");
      }
    })
  }

  signupWithFB(){
    console.log("signup with facebook");
    this.authService.signupWithFB()
    .then(res=>{
      if(res!=null){
        alert(res.message);
      }
      else{
        console.log("signed up");
      }
    })
  }

  


  ngOnInit() { }

}
