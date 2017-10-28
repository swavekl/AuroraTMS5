import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/skip';
import 'rxjs/add/operator/takeUntil';
import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import { of } from 'rxjs/observable/of';

import { SanctionRequest } from './sanction.model'
import { SanctionService } from './sanction.service';
import * as SanctionRequestActions from './sanction.actions';

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
export class SanctionRequestEffects {

  constructor(private actions$: Actions,
              private sanctionService: SanctionService)
  { }

  @Effect()
  search$: Observable<Action> = this.actions$
    .ofType(SanctionRequestActions.SANCTION_SEARCH)
    .map(toPayload)
    .switchMap((pagingInfo) => {
      const nextSearch$ = this.actions$.ofType(SanctionRequestActions.SANCTION_SEARCH).skip(1);
      return this.sanctionService.list(pagingInfo.startIndex, pagingInfo.pageSize)
        .takeUntil(nextSearch$)
        .map(response => new SanctionRequestActions.SanctionRequestSearchSuccessAction(response.results, response.count))
        .catch(() => of(new SanctionRequestActions.SanctionRequestSearchSuccessAction([], 0)));
    });

  // @Effect()
  // edit$: Observable<Action> = this.actions$
  //   .ofType(SanctionRequestActions.SANCTION_EDIT)
  //   .map(toPayload)
  //   .switchMap((id) => {
  //     return this.sanctionService.edit(id)
  //       .map(response => new SanctionRequestActions.SanctionRequestEditSuccessAction(response))
  //       .catch(response => of(new SanctionRequestActions.SanctionRequestEditFailedAction(response._body)));
  //   });
  //
  // @Effect()
  // duplicate$: Observable<Action> = this.actions$
  //   .ofType(SanctionRequestActions.SANCTION_DUPLICATE)
  //   .map(toPayload)
  //   .switchMap((id) => {
  //     return this.sanctionService.edit(id)
  //       .map(response => new SanctionRequestActions.SanctionRequestEditSuccessAction(response))
  //       .catch(response => of(new SanctionRequestActions.SanctionRequestEditFailedAction(response._body)));
  //   });

}
