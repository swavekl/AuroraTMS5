import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent } from './insurance/insurance.component';
import { SanctionComponent } from './sanction/sanction.component';
import { ConfigureTournamentComponent } from './configure-tournament/configure-tournament.component';
import { AuthGuard } from '../guards/auth.guard';
import {InsuranceEditComponent} from "./insurance/insurance-edit/insurance-edit.component";

const routes: Routes = [
    {path: 'sanction', component: SanctionComponent, canActivate: [AuthGuard] },
    {path: 'insurance', component: InsuranceComponent, canActivate: [AuthGuard] },
    {path: 'insurance/edit', component: InsuranceEditComponent, canActivate: [AuthGuard] },
    {path: 'configuretournament', component: ConfigureTournamentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
