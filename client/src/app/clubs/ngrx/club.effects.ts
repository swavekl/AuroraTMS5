import { Injectable, InjectionToken, Inject, Optional } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/takeUntil';
import { of } from 'rxjs/observable/of';
import { Scheduler } from 'rxjs/Scheduler';
import { async } from 'rxjs/scheduler/async';
import { empty } from 'rxjs/observable/empty';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as RouterActions from './../../router.actions';

import { Club } from './../club.model'
import { ClubsService } from './../clubs.service';
import * as ClubActions from './club.actions';

export const SEARCH_DEBOUNCE = new InjectionToken<number>('Search Debounce');
export const SEARCH_SCHEDULER = new InjectionToken<Scheduler>(
  'Search Scheduler'
);

@Injectable()
export class ClubEffects {

  constructor(
    private actions$: Actions,
    private clubsService: ClubsService,
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
    .ofType(ClubActions.SEARCH)
    .debounceTime(this.debounce, this.scheduler || async)
    .map(toPayload)
    .switchMap((pagingInfo) => {
    //console.log ('searchEffect searchTerms = ', pagingInfo.searchTerms);
      const nextSearch$ = this.actions$.ofType(ClubActions.SEARCH).skip(1);
      return this.clubsService.list(pagingInfo.startIndex, pagingInfo.pageSize, pagingInfo.searchTerms)
        .takeUntil(nextSearch$)
        .map(response => new ClubActions.ClubSearchSuccessAction(response.results, response.count))
        .catch(response => of(new ClubActions.ClubSearchSuccessAction([], 0)));
    });

  @Effect()
  edit$: Observable<Action> = this.actions$
    .ofType(ClubActions.EDIT)
    .map(toPayload)
    .switchMap((id) => {
      return this.clubsService.edit(id)
        .map(response => new ClubActions.ClubEditSuccessAction(response))
        .catch(response => of(new ClubActions.ClubEditFailedAction(response._body)));
    });

  @Effect()
  duplicate$: Observable<Action> = this.actions$
    .ofType(ClubActions.DUPLICATE)
    .map(toPayload)
    .switchMap((id) => {
      return this.clubsService.edit(id)
        .map(response => new ClubActions.ClubEditSuccessAction(response))
        .catch(response => of(new ClubActions.ClubEditFailedAction(response._body)));
    });

  @Effect()
  save$: Observable<Action> = this.actions$
    .ofType(ClubActions.SAVE)
    .map(toPayload)
    .switchMap((club) => {
      let mappedActions = [
          new ClubActions.ClubSaveSuccessAction(),
          new RouterActions.Go({path: ['/club/list']})
      ];
      return this.clubsService.save(club)
        .mergeMap(result => mappedActions)
        .catch(response => of(new ClubActions.ClubSaveFailedAction(response._body)));
    });
}
