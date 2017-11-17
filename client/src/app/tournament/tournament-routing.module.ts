import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent } from './insurance/insurance.component';
import { SanctionComponent } from './sanction/sanction.component';
import { ConfigureTournamentComponent } from './configure-tournament/configure-tournament.component';
import { AuthGuard } from '../guards/auth.guard';
import {InsuranceEditComponent} from "./insurance/insurance-edit/insurance-edit.component";
import {SanctionEditComponent} from "./sanction/sanction-edit/sanction-edit.component";

const routes: Routes = [
    {path: 'insurance/list', component: InsuranceComponent, canActivate: [AuthGuard] },
    {path: 'insurance/add', component: InsuranceEditComponent, canActivate: [AuthGuard] },
    {path: 'insurance/edit/:id', component: InsuranceEditComponent, canActivate: [AuthGuard] },
    {path: 'insurance/duplicate/:id', component: InsuranceEditComponent, canActivate: [AuthGuard] },

    {path: 'sanction/list', component: SanctionComponent, canActivate: [AuthGuard] },
    {path: 'sanction/add', component: SanctionEditComponent, canActivate: [AuthGuard] },
    {path: 'sanction/edit/:id', component: SanctionEditComponent, canActivate: [AuthGuard] },
    {path: 'sanction/duplicate/:id', component: SanctionEditComponent, canActivate: [AuthGuard] },

    {path: 'configuretournament', component: ConfigureTournamentComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
