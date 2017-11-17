import {Component, OnInit} from '@angular/core';
import {DataSource} from '@angular/cdk/collections';
import {SanctionService} from './sanction.service';
import {PageEvent} from '@angular/material';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/of';
import { Store } from '@ngrx/store';

import * as fromSanctionRequest from './sanction.reducer'
import {PagingInfo} from "../insurance/insurance.actions";
import {SanctionRequestSearchAction} from "./sanction.actions";
import {Router} from "@angular/router";
import {SanctionRequest} from "./sanction.model";
import * as RouterActions from './../../router.actions';

@Component({
  selector: 'app-sanction',
  templateUrl: './sanction.component.html',
  styleUrls: ['./sanction.component.css']
})
export class SanctionComponent implements OnInit {

  displayColumns = ['tournamentName', 'startDate', 'status', 'edit', 'duplicate'];
  dataSource: SanctionDataSource;
  loading$: Observable<boolean>;
  // error$: Observable<any>;
  length$: Observable<number>;
  pageSize = 10;
  pageSizeOptions = [5, 10, 25, 100];

  constructor(private sanctionService: SanctionService,
              private store: Store<fromSanctionRequest.State>,
              private router: Router)
  {
    this.loading$ = store.select(fromSanctionRequest.getLoading);
    this.length$ = store.select(fromSanctionRequest.getCount);
    let data$ = store.select(fromSanctionRequest.getSanctionRequests);
    this.dataSource = new SanctionDataSource(data$);
    // this.error$ = store.select(fromSanctionRequest.getError);
  }

  ngOnInit() {
    let pagingInfo = new PagingInfo (0, this.pageSize);
    this.store.dispatch(new SanctionRequestSearchAction(pagingInfo));
  }

  onPageEvent(pageEvent: PageEvent) {
    let pagingInfo = new PagingInfo (pageEvent.pageIndex * pageEvent.pageSize, pageEvent.pageSize);
    this.store.dispatch(new SanctionRequestSearchAction(pagingInfo));
  }

  onAddSanction () {
      this.store.dispatch ( new RouterActions.Go({path: ['/sanction/add']}));
  }

  onEditSanction (requestId: number) {
      this.store.dispatch ( new RouterActions.Go({path: ['/sanction/edit/'+requestId]}));
  }

  onDuplicateSanction (requestId: number) {
      this.store.dispatch ( new RouterActions.Go({path: ['/sanction/duplicate/'+requestId]}));
  }
}


export class SanctionDataSource extends DataSource<any> {
  constructor(private sanctionRequests$ : Observable<SanctionRequest[]>) {
    super();
  }

  connect(): Observable<SanctionRequest[]> {
    return this.sanctionRequests$;
  }

  disconnect() {}
}
