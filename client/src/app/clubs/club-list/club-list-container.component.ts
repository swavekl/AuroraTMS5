import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Router } from "@angular/router";

import { Store } from '@ngrx/store';
import * as fromClubs from './../ngrx/club.reducer'
import { PagingInfo } from "./../../utils/paging-info";

import * as RouterActions from './../../router.actions';
import { ClubSearchAction } from './../ngrx/club.actions';

import { Club } from './../club.model';
import { ClubsService } from '../clubs.service';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';

//
// so called dumb component where all interaction with server is happening
//
@Component({
  selector: 'club-list-container',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
  <form>
   <mat-form-field>
      <input matInput type="text" placeholder="Search by club name" name="clubName" (keyup)="onFilterChange($event)">
   </mat-form-field>
<!--   <club-name-auto (selected)="onClubSelected($event)"></club-name-auto> -->
  </form>
  <club-list [clubs]="(results$ | async )" [totalCount]="(totalCount$ | async)"
  (selected)=onSelectedForEdit($event)>
  </club-list>
  `,
})
export class ClubListContainerComponent implements OnInit {

  loading$: Observable<boolean>;
  totalCount$: Observable<number>;
  results$: Observable<Club>;
  pageSize: number = 10;
  searchTerms: string = "";

  constructor(private clubsService: ClubsService,
              private store: Store<fromClubs.State>,
              private router: Router) {
      this.loading$ = store.select(fromClubs.getLoading);
      this.totalCount$ = store.select(fromClubs.getCount);
      this.results$ = store.select(fromClubs.getClubs);
    }

  ngOnInit() {
      let pagingInfo = new PagingInfo (0, this.pageSize, this.searchTerms);
      this.store.dispatch(new ClubSearchAction(pagingInfo));
  }

  onSelectedForEdit (selectedId: number) {
    console.log ('in onSelectedForEdit selectedId = ', selectedId);
    this.store.dispatch ( new RouterActions.Go({path: ['/club/edit/'+selectedId]}));

  }

  onFilterChange(event) {
    //console.log ('in onFilterChange searchFor ', event.target.value);
    this.searchTerms = event.target.value;
    this.store.dispatch(new ClubSearchAction(new PagingInfo (0, this.pageSize, this.searchTerms)));
  }

  onClubSelected(selectedClub:Club) {
//    console.log ('user selectedClub ', selectedClub);
//    console.log ('now change the affilication expirtation date');
  }

}
