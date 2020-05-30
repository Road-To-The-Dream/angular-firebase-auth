import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "./login/login.component";
import {BasePageComponent} from "./base-page/base-page.component";


const routes: Routes = [
  { path: 'first-component', component: LoginComponent },
  { path: 'second-component', component: BasePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
