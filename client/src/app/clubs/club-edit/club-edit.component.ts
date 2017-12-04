import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Club } from './../club.model';
import { StatesList } from '../../shared/states/states';

@Component({
  selector: 'club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {

  @Input() club: Club;

  @Output() saved = new EventEmitter();

  @Output() canceled = new EventEmitter();

  statesList: any [];

  constructor() {
    this.statesList = new StatesList().getList();
  }

  ngOnInit() {
  }

  onSave (formValues: any) {
    this.club.applyChanges(formValues);
    //console.log ('clubToSave ', this.club);
    this.saved.emit(this.club);
  }

  onCancel () {
    this.canceled.emit('canceled');
  }

}
