import { Component, OnInit, OnDestroy, ChangeDetectionStrategy  } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';

import { Observable } from "rxjs/Observable";
import { ISubscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import * as fromSanctionRequest from '../sanction.reducer';
import * as RouterActions from './../../../router.actions';
import { SanctionRequest, SanctionRequestStatus, SanctionCategory } from './../sanction.model';

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
export class SanctionEditComponent implements OnInit, OnDestroy {
  // this is what we edit
  sanctionRequest$: Observable<SanctionRequest>;
  // this is its id
  editedId: number;

  sanctionRequestSubscription: ISubscription;

  statesList: any [];

  step:number = 0;

  // total rating points
  totalPoints: number = 0;

  // updated in case it changes
  venueState: string;

  // keep categories around so we can quickly recalculate total
  categories: SanctionCategory[] = [];

  constructor(private store: Store<fromSanctionRequest.State>,
              private activatedRoute: ActivatedRoute,
              private messageDialog: MatDialog) {
    this.sanctionRequest$ = store.select (fromSanctionRequest.getEdited);
    // subscribe to this observable to extract categories for recalculating total
    this.sanctionRequestSubscription = this.sanctionRequest$.subscribe(sanctionRequest => {
      this.categories = sanctionRequest.requestContents.categories;
      this.totalPoints = this.calculateTotal();
      this.venueState = sanctionRequest.requestContents.venueState;
    });
    this.statesList = new StatesList().getList();
  }

  ngOnDestroy() {
    this.sanctionRequestSubscription.unsubscribe();
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
          this.editedId = -1;
        } else {
          this.store.dispatch(new SanctionRequestEditAction(this.editedId));
        }
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  isCurrentStep(index: number) {
      return this.step == index;
  }

  notFirst(index: number) {
    return this.step > 0;
  }

  notLast(index: number) {
    let totalSteps = 14; // this.sanctionRequest$.requestContents.categories.length;
    return (index != (totalSteps - 1));
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
//    console.log ('formValues ', formValues);
    let sanctionRequestToSave: SanctionRequest = this.makeSanctionRequest (formValues);
//    console.log("Saving sanction request....", sanctionRequestToSave);
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
    let longStateName = this.translateStateName(formValues.venueState);
    let starLevel = sanctionRequestToSave.starLevel;
    let coordinatorInfo: CoordinatorInfo = this.findCoordinator(longStateName, starLevel);

    // notify user about who will be getting this request
    let message: string = "";
    if (coordinatorInfo != null) {
      sanctionRequestToSave.starLevel = starLevel;
      sanctionRequestToSave.coordinatorFirstName = coordinatorInfo.firstName;
      sanctionRequestToSave.coordinatorLastName = coordinatorInfo.lastName;
      sanctionRequestToSave.coordinatorEmail = coordinatorInfo.email;
      message += "Your request has been submitted to ";
      message += coordinatorInfo.firstName + " " + coordinatorInfo.lastName;
      message += " who is the " + coordinatorInfo.region + " region Sanction Coordinator.";
      message += " You may follow up with him by phone " + coordinatorInfo.phone;
      message += " or email " + coordinatorInfo.email;
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
        let states = cinfo.states;
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
//        console.log('The dialog was closed with result ', result);
      });
    }

    isApprovingCoordinator () {
      // check if the current user is a sanction coordinator
      // if not don't show the approve/reject step
      return false;
    }

    // event handler for when radio button is clicked
    onRadioGroupChange(event) {
      this.totalPoints = this.calculateTotal();
    }

    // event handler for when checkbox button is clicked
    onCheckBoxChange (event) {
      this.totalPoints = this.calculateTotal();
    }

    // recalculates total rating points when selection changes
    calculateTotal () {
      let total: number = 0;
      for (var i = 0; i < this.categories.length; i++) {
        let category: SanctionCategory = this.categories[i];
        total += category.getSubTotal();
      }
      return total;
    }

    // calculates which star level user qualifies for based on the rating points total
    getQualifiedStarLevel () {

      let qualifiedStarLevel : number = 0;

      if (this.totalPoints <= 10) {
       qualifiedStarLevel = 0;
      } else if (this.totalPoints > 10 && this.totalPoints <= 20) {
       qualifiedStarLevel = 1;
      } else if (this.totalPoints > 20 && this.totalPoints <= 30) {
       qualifiedStarLevel = 2;
      } else if (this.totalPoints > 30 && this.totalPoints <= 40) {
       qualifiedStarLevel = 3;
      } else if (this.totalPoints > 40 && this.totalPoints <= 50) {
       qualifiedStarLevel = 4;
      } else {
       qualifiedStarLevel = 5;
      }
      return qualifiedStarLevel;
    }

    onVenueStateChange (event) {
   //   console.log ('in onVenueStateChange ', event);
      this.venueState = event.value;
    }

    starLevelChanged(event) {
     // console.log ('in starLevelChanged ', event);
      let starLevel = event.srcElement.value;
      let stateName = this.venueState;
//      console.log ('starLevel ', starLevel);
 //     console.log ('stateName ', stateName);

      // find coordinator who will receive this request and set it in the request.
      let longStateName = this.translateStateName(stateName);
      let coordinatorInfo: CoordinatorInfo = this.findCoordinator(longStateName, starLevel);
//      console.log ('coordinatorInfo ', coordinatorInfo);

    }
}
