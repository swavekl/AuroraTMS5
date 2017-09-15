import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InsuranceComponent } from './insurance/insurance.component';
import { SanctionComponent } from './sanction/sanction.component';

const routes: Routes = [
    {path: 'sanction', component: SanctionComponent},
    {path: 'insurance', component: InsuranceComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TournamentRoutingModule { }
