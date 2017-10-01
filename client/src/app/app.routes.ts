import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SignInComponent} from "./login/sign-in/sign-in.component";
import {RegisterComponent} from "./login/register/register.component";

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent, children: [
      // {path: '', component: SignInComponent},
      {path: '', redirectTo:'signin', pathMatch: 'full'},
      {path: 'signin', component: SignInComponent},
      {path: 'register', component: RegisterComponent}
    ]},
    {path: 'logout', component: LoginComponent}
];

