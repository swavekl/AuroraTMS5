import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import { httpFactory } from "./http/http-factory";

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatMenuModule, MatToolbarModule, MatIconModule, MatTabsModule, MatTableModule,
  MatSidenavModule, MatListModule
  ,NoConflictStyleCompatibilityMode
} from '@angular/material';
import {CdkTableModule} from "@angular/cdk/table";
import 'hammerjs';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BaseService } from './base.service';
import { TodosService } from './todos.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { TournamentModule } from './tournament/tournament.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './login/register/register.component';
import { WelcomeComponent } from './login/welcome/welcome.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    MainMenuComponent,
    RegisterComponent,
    WelcomeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatMenuModule,
    MatTableModule,
    MatToolbarModule,
    MatIconModule,
    MatTabsModule,
    MatTableModule,
    MatSidenavModule,
    MatListModule,
    CdkTableModule,
    FlexLayoutModule,
    TournamentModule,
    NoConflictStyleCompatibilityMode,
    RouterModule.forRoot(rootRouterConfig),
  ],
  providers: [
    TodosService,
    AuthenticationService,
    AuthGuard,
    BaseService,
    {
      provide: Http,
      // this is the factory we need to use to replace standard Http service with our own InterceptedHttp
      useFactory: httpFactory,
      deps: [XHRBackend, RequestOptions]
    }
  ],
  bootstrap: [AppComponent]
})


export class AppModule { }
