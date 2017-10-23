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
import { MainMenuComponent } from './main-menu/main-menu.component';
import { AuthenticationService } from './services/authentication.service';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './login/register/register.component';
import { WelcomeComponent } from './login/welcome/welcome.component';

// ngrx related stuff
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

// now compose the app state from module's states
export interface AppState {
 tournamentState: TournamentState
 // other module states?
}

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
    MatInputModule,
    MatFormFieldModule,
    CdkTableModule,
    FlexLayoutModule,
    TournamentModule,
    RouterModule.forRoot(rootRouterConfig),

    // ngrx stuff
    /**
     * StoreModule.provideStore is imported once in the root module, accepting a reducer
     * function or object map of reducer functions. If passed an object of
     * reducers, combineReducers will be run creating your application
     * meta-reducer. This returns all providers for an @ngrx/store
     * based application.
     */
    StoreModule.forRoot([]),

    /**
     * @ngrx/router-store keeps router state up-to-date in the store and uses
     * the store as the single source of truth for the router's state.
     */
    StoreRouterConnectingModule,
    //RouterStoreModule.connectRouter(),

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

    /**
     * EffectsModule.run() sets up the effects class to be initialized
     * immediately when the application starts.
     *
     * See: https://github.com/ngrx/effects/blob/master/docs/api.md#run
     */
    EffectsModule.forRoot([])
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
