import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as fromPlayerProfile from './../ngrx/player-profile.reducer';
import { PlayerProfile } from './../player-profile.model';
import { StatesList } from '../../shared/states/states';

@Component({
  selector: 'player-profile-edit',
  templateUrl: './player-profile-edit.component.html',
  styleUrls: ['./player-profile-edit.component.css']
})
export class PlayerProfileEditComponent implements OnInit {
  // this is what we edit
  @Input() playerProfile: PlayerProfile;

  // save and cancel
  @Output() saved = new EventEmitter();
  @Output() canceled = new EventEmitter();

  statesList: any [];

  maxDateOfBirth = new Date();

  constructor() {
    this.statesList = new StatesList().getList();
  }

  ngOnInit() {
  }

  /**
   * Save the sanction request
   */
  onSave(formValues: any){
    console.log ('profile formValues ', formValues);
    let playerProfileToSave: PlayerProfile = new PlayerProfile();
    playerProfileToSave.applyChanges (formValues);
    console.log("Saving player profile ....", playerProfileToSave);
    this.saved.emit (playerProfileToSave);
  }

  onCancel () {
    this.canceled.emit('cancelled');
  }
}
