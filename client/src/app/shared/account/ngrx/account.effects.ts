import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/debounceTime';
import { of } from 'rxjs/observable/of';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as RouterActions from './../../../router.actions';

import { Account } from './../account.model'
import { AccountService } from './../account.service';
import * as AccountActions from './account.actions';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class AccountEffects {

  constructor(
    private actions$: Actions,
    private accountService: AccountService,
    @Optional()
    @Inject(SEARCH_DEBOUNCE)
    private debounce: number = 500,
    /**
       * You inject an optional Scheduler that will be undefined
       * in normal application usage, but its injected here so that you can mock out
       * during testing using the RxJS TestScheduler for simulating passages of time.
       */
    @Optional()
    @Inject(SEARCH_SCHEDULER)
    private scheduler: Scheduler
    )
  { }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(AccountActions.SYSTEM)
    .debounceTime(this.debounce, this.scheduler || async)
    .map(toPayload)
    .switchMap((Account) => {
      const nextSearch$ = this.actions$.ofType(AccountActions.SYSTEM).skip(1);
      return this.accountService.getSystemAccount()
        .takeUntil(nextSearch$)
        .map(response => new AccountActions.AccountSystemSuccessAction(response))
        .catch(response => of(new AccountActions.AccountSystemFailureAction(response._body)));
    });
}
