import { Component, OnInit, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { Store } from '@ngrx/store';
import * as fromSanctionRequest from '../sanction.reducer';
import * as RouterActions from './../../../router.actions';
import { SanctionRequest, SanctionRequestStatus } from './../sanction.model';

import { SanctionRequestAddAction, SanctionRequestEditAction, SanctionRequestDuplicateAction, SanctionRequestSaveAction } from './../sanction.actions';
import { CoordinatorInfo, coordinatorList } from './../../../utils/coordinator-list';
import { StatesList } from './../../states'

import { MatDialog } from '@angular/material';
import { MessageDialogComponent } from './../../../shared/message-dialog/message-dialog.component';

@Component({
  selector: 'app-sanction-edit',
  templateUrl: './sanction-edit.component.html',
  styleUrls: ['./sanction-edit.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SanctionEditComponent implements OnInit {
  // this is what we edit
  sanctionRequest$: Observable<SanctionRequest>;
  // this is its id
  editedId: number;

  constructor(private store: Store<fromSanctionRequest.State>,
              private activatedRoute: ActivatedRoute,
              private messageDialog: MatDialog) {
    this.sanctionRequest$ = store.select (fromSanctionRequest.getEdited);
  }

  ngOnInit() {
        // figure out which action it is we are asked te execute
        let isAdd: boolean = false;
        let isDuplicate: boolean = false;
        const urlSegmentArray: UrlSegment[] = this.activatedRoute.snapshot.url;
        for (var i = 0; i < urlSegmentArray.length; i++) {
          var urlSegment: UrlSegment = urlSegmentArray[i];
          if (urlSegment.path == 'add') {
           isAdd = true;
          }
          if (urlSegment.path == 'duplicate') {
           isDuplicate = true;
          }
        }
        this.editedId = this.activatedRoute.snapshot.params['id'] || -1;
        if (isAdd) {
          this.store.dispatch(new SanctionRequestAddAction());
        } else if (isDuplicate) {
          this.store.dispatch(new SanctionRequestDuplicateAction(this.editedId));
        } else {
          this.store.dispatch(new SanctionRequestEditAction(this.editedId));
        }
  }

  /**
  * transfers values from form object to SanctionRequest object
  */
  makeSanctionRequest (formValues: any): SanctionRequest {
    // copy changed values into this new object
    let sanctionRequestToSave: SanctionRequest = new SanctionRequest();
    sanctionRequestToSave.applyChanges (formValues);
    sanctionRequestToSave.id = (this.editedId != -1) ? this.editedId : null;
    return sanctionRequestToSave;
  }

  /**
  * Save the sanction request
  */
  save(formValues: any){
    let sanctionRequestToSave: SanctionRequest = this.makeSanctionRequest (formValues);
    // console.log("Saving sanction request....", sanctionRequestToSave);
    this.store.dispatch(new SanctionRequestSaveAction(sanctionRequestToSave));
  }

  onCancel () {
    this.store.dispatch (new RouterActions.Back());
  }

  // save and submit for sanction
  onSaveAndSubmit (formValues: any) {
    let sanctionRequestToSave: SanctionRequest = this.makeSanctionRequest (formValues);

    // find coordinator who will receive this request and set it in the request.
    // translate long name to short state name
    let stateAbbreviation = this.translateStateName(formValues.venueState);
    let starLevel = 4;
    let coordinatorInfo: CoordinatorInfo = this.findCoordinator(stateAbbreviation, starLevel);

    // notify user about who will be getting this request
    let message: string = "";
    if (coordinatorInfo != null) {
      sanctionRequestToSave.starLevel = starLevel;
      sanctionRequestToSave.coordinatorFirstName = coordinatorInfo.firstName;
      sanctionRequestToSave.coordinatorLastName = coordinatorInfo.lastName;
      sanctionRequestToSave.coordinatorEmail = coordinatorInfo.email;
      message += "Your request has been submitted to ";
      message += coordinatorInfo.firstName + " " + coordinatorInfo.lastName;
    }

    // mark it a submitted
    sanctionRequestToSave.status = SanctionRequestStatus.Submitted;

    // save it
    this.store.dispatch(new SanctionRequestSaveAction(sanctionRequestToSave));

    // show who will get it
    this.openDialog (message);
  }

  /**
  * Translate IL to Illinois
  */
  translateStateName (stateAbbreviation: string): string {
    let stateList: any [] = new StatesList().getList();
    for (var i = 0; i <  stateList.length; i++) {
      let stateObj = stateList[i];
      if (stateObj.abbreviation == stateAbbreviation) {
        return stateObj.name;
      }
    }
    return null;
  }

  /**
  * Finds regional or national coordinator
  */
  findCoordinator (state: string, starLevel: number): CoordinatorInfo {
    let coordinatorInfo: CoordinatorInfo = null;
    if (starLevel >= 4) {
      // national coordinator
      for (var i = 0; i < coordinatorList.length; i++) {
        if(coordinatorList[i].region == 'National') {
          coordinatorInfo = coordinatorList[i];
          break;
        }
      }

    } else {
      // regional coordinator
      for (var i = 0; i < coordinatorList.length; i++) {
        let cinfo:CoordinatorInfo = coordinatorList[i];
        let found: boolean = false;
        let states = coordinatorInfo.states;
        for (var k = 0; k < states.length; k++) {
          if (states[k] == state) {
            found = true;
            break;
          }
        }
        if (found) {
          coordinatorInfo = cinfo;
          break;
        }
      }
    }
    return coordinatorInfo;
  }

  openDialog(message: string): void {

      let dialogRef = this.messageDialog.open(MessageDialogComponent, {
        width: '450px',
        data: { message: message, title: 'Request Submitted'} // , showCancelButton: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed with result ', result);
      });
    }

}
