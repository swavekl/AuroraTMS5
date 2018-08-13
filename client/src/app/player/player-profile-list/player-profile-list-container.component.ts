import {Component, OnInit, ChangeDetectionStrategy} from '@angular/core';
import {Router, ActivatedRoute, UrlSegment} from '@angular/router';

import {Observable} from "rxjs/Observable";
import {ISubscription} from 'rxjs/Subscription';
import {Store} from '@ngrx/store';
import * as fromPlayerProfile from './../ngrx/player-profile.reducer';
import * as RouterActions from './../../router.actions';
import {PlayerProfile} from './../player-profile.model';

import {PlayerProfileService} from './../player-profile.service';
import {PlayerProfileSearchAction} from './../ngrx/player-profile.actions';
import {PlayerProfileListComponent} from './player-profile-list.component';

import {PagingInfo} from "./../../utils/paging-info";
import {PlayerProfileSearchCriteria} from "../PlayerProfileSearchCriteria";


@Component({
  selector: 'player-profile-list-container',
  template: `
    <div fxLayout="row">
      <div fxFlex></div>
      <mat-card>
        <mat-card-title>Player Profile Search</mat-card-title>
        <mat-progress-bar *ngIf="loading$ | async; else elseblock" mode="indeterminate"
                          color="primary"></mat-progress-bar>
        <ng-template #elseblock>
          <mat-progress-bar mode="determinate" color="primary" value="0"></mat-progress-bar>
        </ng-template>
        <mat-card-content>
          <form>
            <div fxLayout.sm="column" fxLayout="row" fxLayoutGap="10px">
              <mat-form-field>
                <input matInput type="text" placeholder="First Name" name="firstName" [(ngModel)]="firstName">
              </mat-form-field>
              <mat-form-field>
                <input matInput type="text" placeholder="Last Name" name="lastName" [(ngModel)]="lastName">
              </mat-form-field>
            </div>
            <mat-card-subtitle>OR</mat-card-subtitle>
            <div fxLayout="column">
              <mat-form-field>
                <input matInput type="number" placeholder="USATT Id" name="membershipId" [(ngModel)]="membershipId">
              </mat-form-field>
            </div>
          </form>
          <player-profile-list [playerProfileList]="playerProfileList$ | async"
                               [totalCount]="(totalCount$ | async)"
                               (selected)=onSelected($event)>
          </player-profile-list>
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button (click)="onSearchProfiles($event)">Find</button>
        </mat-card-actions>
      </mat-card>
      <div fxFlex></div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PlayerProfileListContainerComponent implements OnInit {
  loading$: Observable<boolean>;
  totalCount$: Observable<number>;
  playerProfileList$: Observable<PlayerProfile>;
  pageSize: number = 10;
  firstName: string = "";
  lastName: string = "";
  membershipId: number = 0;

  constructor(private playerProfileService: PlayerProfileService,
              private store: Store<fromPlayerProfile.State>,
              private router: Router) {
    this.loading$ = store.select(fromPlayerProfile.getLoading);
    this.totalCount$ = store.select(fromPlayerProfile.getCount);
    this.playerProfileList$ = store.select(fromPlayerProfile.getPlayerProfiles);
  }

  ngOnInit() {
    let searchingCriteria: PlayerProfileSearchCriteria =
      new PlayerProfileSearchCriteria(0, this.pageSize, "", "", 0);
    this.store.dispatch(new PlayerProfileSearchAction(searchingCriteria));
  }

  onSelected(selectedId: number) {
    // show dialog where we ask for birth date

    // once the date is correct we can proceed with editing
    this.store.dispatch(new RouterActions.Go({path: ['/playerprofile/edit/' + selectedId]}));
  }

  onSearchProfiles(event) {
    let usattId: number = (this.membershipId != null && this.membershipId) ? this.membershipId : 0;
    console.log('searching for profiles ' + this.firstName + " " + this.lastName + " id " + usattId);
    this.store.dispatch(new PlayerProfileSearchAction(
      new PlayerProfileSearchCriteria(0, this.pageSize, this.firstName, this.lastName, usattId)
    ));
  }

  onPlayerProfileSelected(selectedPlayerProfile: PlayerProfile) {
//    console.log ('user selectedPlayerProfile ', selectedPlayerProfile);
  }
}
