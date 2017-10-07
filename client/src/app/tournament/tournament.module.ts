import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TournamentRoutingModule } from './tournament-routing.module';
import { InsuranceComponent } from './insurance/insurance.component';
import { InsuranceService } from './insurance/insurance.service';
import { SanctionComponent } from './sanction/sanction.component';
import { SanctionService } from './sanction/sanction.service';
import { ConfigureTournamentComponent } from './configure-tournament/configure-tournament.component';
import {MdTableModule, MdCardModule} from "@angular/material";
import {CdkTableModule} from "@angular/cdk/table";

@NgModule({
  imports: [
    CdkTableModule,
    MdTableModule,
    MdCardModule,
    CommonModule,
    TournamentRoutingModule
  ],
  declarations: [InsuranceComponent, SanctionComponent, ConfigureTournamentComponent],
  providers: [
    InsuranceService,
    SanctionService
  ]
})
export class TournamentModule { }
