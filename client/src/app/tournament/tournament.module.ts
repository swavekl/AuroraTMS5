import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { InsuranceComponent } from './insurance/insurance.component';
import { SanctionComponent } from './sanction/sanction.component';

@NgModule({
  imports: [
    CommonModule,
    TournamentRoutingModule
  ],
  declarations: [InsuranceComponent, SanctionComponent]
})
export class TournamentModule { }
