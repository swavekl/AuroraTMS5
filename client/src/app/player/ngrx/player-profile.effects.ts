import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { of } from 'rxjs/observable/of';

import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import * as RouterActions from './../../router.actions';

import { PlayerProfile } from './../player-profile.model'
import { PlayerProfileService } from './../player-profile.service';
import * as PlayerProfileActions from './player-profile.actions';

/**
 * Effects offer a way to isolate and easily test side-effects within your
 * application.
 * The `toPayload` helper function returns just
 * the payload of the currently dispatched action, useful in
 * instances where the current state is not necessary.
 *
 * Documentation on `toPayload` can be found here:
 * https://github.com/ngrx/effects/blob/master/docs/api.md#topayload
 *
 * If you are unfamiliar with the operators being used in these examples, please
 * check out the sources below:
 *
 * Official Docs: http://reactivex.io/rxjs/manual/overview.html#categories-of-operators
 * RxJS 5 Operators By Example: https://gist.github.com/btroncone/d6cf141d6f2c00dc6b35
 */

@Injectable()
export class PlayerProfileEffects {

  constructor(private actions$: Actions,
              private playerProfileService: PlayerProfileService)
  { }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(PlayerProfileActions.SEARCH)
    .map(toPayload)
    .switchMap((pagingInfo) => {
      const nextSearch$ = this.actions$.ofType(PlayerProfileActions.SEARCH).skip(1);
      return this.playerProfileService.list(pagingInfo.startIndex, pagingInfo.pageSize, '')
        .takeUntil(nextSearch$)
        .map(response => new PlayerProfileActions.PlayerProfileSearchSuccessAction(response.results, response.count))
        .catch(response => of(new PlayerProfileActions.PlayerProfileSearchSuccessAction([], 0)));
    });

  @Effect()
  edit$: Observable<Action> = this.actions$
    .ofType(PlayerProfileActions.EDIT)
    .map(toPayload)
    .switchMap((id) => {
      return this.playerProfileService.edit(id)
        .map(response => new PlayerProfileActions.PlayerProfileEditSuccessAction(response))
        .catch(response => of(new PlayerProfileActions.PlayerProfileEditFailedAction(response._body)));
    });

  @Effect()
  save$: Observable<Action> = this.actions$
    .ofType(PlayerProfileActions.SAVE)
    .map(toPayload)
    .switchMap((PlayerProfile) => {
      let mappedActions = [
          new PlayerProfileActions.PlayerProfileSaveSuccessAction(),
          new RouterActions.Go({path: ['/tournament/sanction/list']})
      ];
      return this.playerProfileService.save(PlayerProfile)
        .mergeMap(result => mappedActions)
        .catch(response => of(new PlayerProfileActions.PlayerProfileSaveFailedAction(response._body)));
    });

}
