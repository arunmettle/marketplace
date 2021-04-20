import { Component, OnInit,Inject } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators, AbstractControl } from "@angular/forms";
import{ Router, ActivatedRoute } from '@angular/router';
import {AuthService} from '../auth/auth.service';



@Component({
  selector: 'app-password-reset',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss'],
})
export class UserManagementComponent implements OnInit {

  passwordResetEmailForm: FormGroup;
  passwordResetForm: FormGroup;
  mode:string;actionCode: string;
  ispasswordResetEmail: Boolean;

  constructor(private formBuilder: FormBuilder,
    public authService: AuthService,
    private router: Router,
  private activatedRoute: ActivatedRoute,) { 
    this.passwordResetEmailForm= this.formBuilder.group({
      email:['', [
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    });
    this.passwordResetForm= this.formBuilder.group({
      password: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')
      ]],
      confirmPassword: ['', [
        Validators.required,
        Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
        this.confirmPassword
      ]]
    });
  }
  confirmPassword(control:any){
    if(control._parent!=null&&control._parent.controls!=undefined){
      return control._parent.controls.password.value==control.value?null:{confirmPassword:{valid:false}}
    }
    return null;
  }

  passwordResetEmail(email:string){
    this.authService.sendPasswordResetEmail(email)
    .then(res=>{console.log(res)})
    .catch(err=>{console.log(err)})
  }

  onSubmit(){
    console.log(this.passwordResetEmailForm);
    this.passwordResetEmail(this.passwordResetEmailForm.controls.email.value);
  }

  get errorControl() {
    return this.passwordResetEmailForm.controls;
  }
  get passwordErrorControl(){
    return this.passwordResetForm.controls;
  }

  ngOnInit() {
    var params= this.activatedRoute.snapshot.queryParams;
      this.mode = params['mode'];
      this.actionCode = params['oobCode'];
      if(this.mode==null){
        this.ispasswordResetEmail= true;
      }
    else{
      this.ispasswordResetEmail= false;
    }
      switch(this.mode){
        case 'resetPassword':
      // Display reset password handler and UI.
      //handleResetPassword(auth, actionCode, continueUrl, lang);
      //this.passwordResetEmail(this.passwordResetForm.controls.email.value);
      this.authService.verifyPasswordResetCode(this.actionCode)
      .then(res=>{console.log(res)})
      .catch(err=>{alert(err)});
      break;
    case 'recoverEmail':
      // Display email recovery handler and UI.
      //handleRecoverEmail(auth, actionCode, lang);
      break;
    case 'verifyEmail':
      // Display email verification handler and UI.
      //handleVerifyEmail(auth, actionCode, continueUrl, lang);
      break;
    default:
      break;

      }
      
  }
  passwordResetSubmit(){
    this.authService.passwordResetSubmit(this.actionCode, this.passwordResetForm.controls.password.value)
    .then(res=>{
      alert(res);
    })
  }

}
