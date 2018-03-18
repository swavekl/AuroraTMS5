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

  minStartDate = new Date();
  maxStartDate = new Date();

  minEndDate: Date;
  maxEndDate: Date;

  endDateEnabled = false;

  constructor() {
    this.statesList = new StatesList().getList();
    this.minStartDate.setDate(this.minStartDate.getDate() + 30);
    this.maxStartDate.setDate(this.maxStartDate.getDate() + 365);
  }

  ngOnInit() {
  }

  // called after Input changes
  ngOnChanges () {
  }

  onEnableEndDate(date: Date) {
    this.endDateEnabled = true;
    this.minEndDate = new Date(this.insuranceRequest.eventStartDate.getTime());
    this.minEndDate.setDate(this.minEndDate.getDate() + 1);
    this.maxEndDate = new Date(this.insuranceRequest.eventStartDate.getTime());
    this.maxEndDate.setDate(this.maxEndDate.getDate() + 7);
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
