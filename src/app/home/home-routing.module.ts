import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import {WelcomePage} from '../welcome/welcome.page';
import { SigninComponent } from '../signin/signin.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  },
  {
    path: '/welcome', 
    component: WelcomePage
  }, 
  {
    path: "/signin",
    component: SigninComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
