import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { RouterModule } from '@angular/router';
import { rootRouterConfig } from './app.routes';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule, MdButtonModule, MdCardModule, MdMenuModule, MdToolbarModule, MdIconModule, MdTabsModule } from '@angular/material';
import 'hammerjs';
import { FlexLayoutModule } from "@angular/flex-layout";

import { BaseService } from './base.service';
import { TodosService } from './todos.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignInComponent } from './login/sign-in/sign-in.component';
import { TournamentModule } from './tournament/tournament.module';
import { MainMenuComponent } from './main-menu/main-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignInComponent,
    MainMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserAnimationsModule,
    MaterialModule,
    MdButtonModule,
    MdCardModule,
    MdMenuModule,
    MdToolbarModule,
    MdIconModule,
    MdTabsModule,
    FlexLayoutModule,
    TournamentModule,
    RouterModule.forRoot(rootRouterConfig),
  ],
  providers: [
    TodosService,
    BaseService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
