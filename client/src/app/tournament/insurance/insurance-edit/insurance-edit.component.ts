import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateUtils } from '../../../utils/date-utils';

import {InsuranceRequest} from "../insurance.model";
import { StatesList } from '../../../shared/states/states'

@Component({
  selector: 'insurance-edit',
  templateUrl: './insurance-edit.component.html',
  styleUrls: ['./insurance-edit.component.css']
})
export class InsuranceEditComponent implements OnInit {

  // this is what we are editing
  @Input() insuranceRequest: InsuranceRequest;

  // save and cancel
  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();

  // list of states in USA
  statesList: any [];

  constructor() {
    this.statesList = new StatesList().getList();
  }

  ngOnInit() {
  }

  // called after Input changes
  ngOnChanges () {
  }

  save(formValues: any){
    // copy changed values into this new object
    let insuranceRequestToSave: InsuranceRequest = new InsuranceRequest();
    insuranceRequestToSave = Object.assign (insuranceRequestToSave, formValues);
    let requestDate: Date = (formValues.requestDate != null) ? new Date (formValues.requestDate) : new Date();
    let dateUtils = new DateUtils();
    insuranceRequestToSave.eventStartDate = dateUtils.convertFromLocalToUTCDate (formValues.eventStartDate);
    insuranceRequestToSave.eventEndDate = dateUtils.convertFromLocalToUTCDate(formValues.eventEndDate);
    insuranceRequestToSave.requestDate = dateUtils.convertFromLocalToUTCDate (requestDate);
    this.saved.emit (insuranceRequestToSave);
  }

  onCancel () {
    this.canceled.emit('cancelled');
  }
}
