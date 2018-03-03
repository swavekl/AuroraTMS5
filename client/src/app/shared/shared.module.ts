import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import {
  MatDialogModule,
  MatButtonModule,
  MatSelectModule,
  MatProgressBarModule
} from '@angular/material';
import { CreditCardPopupComponent } from './credit-card-popup/credit-card-popup.component';
import { FinancialTransactionService } from './financial-transaction/financial-transaction.service'
import { AccountComponent } from './account/account.component';
import { AccountService } from './account/account.service';


import { StoreModule, ActionReducerMap } from '@ngrx/store';
//
// NGRX Effects
//
import { EffectsModule } from '@ngrx/effects';
import { FinancialTransactionEffects } from './financial-transaction/ngrx/financial-transaction.effects';
import { AccountEffects } from './account/ngrx/account.effects';
export const sharedFeatureEffects = [
  FinancialTransactionEffects,
  AccountEffects
];

//
// NGRX Reducers & States
//
import * as fromFinancialTransaction from './financial-transaction/ngrx/financial-transaction.reducer';
import * as fromAccount from './account/ngrx/account.reducer';
export const sharedFeatureReducers: ActionReducerMap<any> = {
  subFeatureFinancialTransaction: fromFinancialTransaction.FinancialTransactionReducer,
  subFeatureAccount: fromAccount.AccountReducer
};

export interface sharedState {
  creditCardPayment: fromFinancialTransaction.State;
  account: fromAccount.State;
}

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule,
    MatProgressBarModule,
    FormsModule,

    StoreModule.forFeature('featureShared', sharedFeatureReducers),
    EffectsModule.forFeature(sharedFeatureEffects)
  ],
  exports: [
    MessageDialogComponent,
    CreditCardPopupComponent,
  ],
  declarations: [
    MessageDialogComponent,
    CreditCardPopupComponent,
    AccountComponent
  ],
  providers: [
    FinancialTransactionService,
    AccountService
  ],
})
export class SharedModule { }
