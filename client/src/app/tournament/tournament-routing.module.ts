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
    {path: 'insurance/list', component: InsuranceListComponent, canActivate: [AuthGuard] },
    {path: 'insurance/add', component: InsuranceEditContainerComponent, canActivate: [AuthGuard] },
    {path: 'insurance/edit/:id', component: InsuranceEditContainerComponent, canActivate: [AuthGuard] },
    {path: 'insurance/duplicate/:id', component: InsuranceEditContainerComponent, canActivate: [AuthGuard] },

    {path: 'sanction/list', component: SanctionListComponent, canActivate: [AuthGuard] },
    {path: 'sanction/add', component: SanctionEditContainerComponent, canActivate: [AuthGuard] },
    {path: 'sanction/edit/:id', component: SanctionEditContainerComponent, canActivate: [AuthGuard] },
    {path: 'sanction/duplicate/:id', component: SanctionEditContainerComponent, canActivate: [AuthGuard] },

    {path: 'configuretournament', component: ConfigureTournamentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
