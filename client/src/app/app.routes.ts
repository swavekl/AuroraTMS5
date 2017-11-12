import {Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import {SignInComponent} from "./login/sign-in/sign-in.component";
import {RegisterComponent} from "./login/register/register.component";
import {WelcomeComponent} from "./login/welcome/welcome.component";
import { LandingComponent } from './login/landing/landing.component';

export const rootRouterConfig: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent,
      children: [
        {path: '', redirectTo:'signin', pathMatch: 'full'},
        {path: 'signin', component: SignInComponent},
        {path: 'register', component: RegisterComponent}
      ]
    },
    {path: 'welcome', component: WelcomeComponent},
    {path: 'landing', component: LandingComponent},
    {path: 'logout', component: LoginComponent}
];

