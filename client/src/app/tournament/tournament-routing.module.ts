import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../guards/auth.guard';

import { InsuranceListComponent } from './insurance/insurance-list/insurance-list.component';
import {InsuranceEditContainerComponent} from "./insurance/insurance-edit/insurance-edit-container.component";
import {InsuranceEditComponent} from "./insurance/insurance-edit/insurance-edit.component";

import { SanctionListComponent } from './sanction/sanction-list/sanction-list.component';
import {SanctionEditComponent} from "./sanction/sanction-edit/sanction-edit.component";
import {SanctionEditContainerComponent} from "./sanction/sanction-edit/sanction-edit-container.component";

import { ConfigureTournamentComponent } from './configure-tournament/configure-tournament.component';

const routes: Routes = [
     // lazy loaded components so path is ''
     {
     path: '',
     children: [
       {
          path: 'insurance',
          children: [
          {path: 'list', component: InsuranceListComponent, canActivate: [AuthGuard] },
          {path: 'add', component: InsuranceEditContainerComponent, canActivate: [AuthGuard] },
          {path: 'edit/:id', component: InsuranceEditContainerComponent, canActivate: [AuthGuard] },
          {path: 'duplicate/:id', component: InsuranceEditContainerComponent, canActivate: [AuthGuard] },
          ]
       },
       {
          path: 'sanction',
          children: [
            {path: 'list', component: SanctionListComponent, canActivate: [AuthGuard] },
            {path: 'add', component: SanctionEditContainerComponent, canActivate: [AuthGuard] },
            {path: 'edit/:id', component: SanctionEditContainerComponent, canActivate: [AuthGuard] },
            {path: 'duplicate/:id', component: SanctionEditContainerComponent, canActivate: [AuthGuard] },
            ]
       },
       {
          path: 'configuretournament', component: ConfigureTournamentComponent
       }
     ]
   }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
