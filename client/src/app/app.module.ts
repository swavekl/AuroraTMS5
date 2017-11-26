import { BrowserModule } from '@angular/platform-browser';
import { NgModule, InjectionToken } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, Http, XHRBackend, RequestOptions} from '@angular/http';
import { httpFactory } from "./http/http-factory";

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCardModule,
  MatMenuModule,
  MatToolbarModule,
  MatIconModule,
  MatTabsModule,
  MatTableModule,
  MatSidenavModule,
  MatListModule,
  MatInputModule,
  MatFormFieldModule
} from '@angular/material';
import {CdkTableModule} from "@angular/cdk/table";
import 'hammerjs';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BaseService } from './base.service';
import { TodosService } from './todos.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { TournamentModule, TournamentState } from './tournament/tournament.module';
import { ClubsModule, ClubsState } from './clubs/clubs.module';
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './login/register/register.component';
import { WelcomeComponent } from './login/welcome/welcome.component';
import { LandingComponent } from './login/landing/landing.component';

// ngrx related stuff
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule, RouterReducerState, routerReducer } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterEffects } from './router.effects';

// now compose the app state from module's states
export interface AppState {
 routerReducer: RouterReducerState;
 tournamentState: TournamentState;
 clubsState: ClubsState;
 // other module states?
}

export const AppReducers = {
  routerReducer: routerReducer
};

export const AppEffects = [
  RouterEffects
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    MainMenuComponent,
    RegisterComponent,
    WelcomeComponent,
    LandingComponent
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
    MatInputModule,
    MatFormFieldModule,
    CdkTableModule,
    FlexLayoutModule,
    TournamentModule,
    ClubsModule,

    RouterModule.forRoot(rootRouterConfig),

    // ngrx stuff
    StoreModule.forRoot(AppReducers),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    StoreRouterConnectingModule,

    /**
     * Store devtools instrument the store retaining past versions of state
     * and recalculating new states. This enables powerful time-travel
     * debugging.
     *
     * To use the debugger, install the Redux Devtools extension for either
     * Chrome or Firefox
     *
     * See: https://github.com/zalmoxisus/redux-devtools-extension
     */
//    StoreDevtoolsModule.instrumentOnlyWithExtension(),

    EffectsModule.forRoot(AppEffects)
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
