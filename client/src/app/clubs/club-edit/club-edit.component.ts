import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Club } from './../club.model';
import { StatesList } from '../../shared/states/states';
import { MatDialog } from '@angular/material';
import { CreditCardPopupComponent } from '../../shared/credit-card-popup/credit-card-popup.component';

@Component({
  selector: 'club-edit',
  templateUrl: './club-edit.component.html',
  styleUrls: ['./club-edit.component.css']
})
export class ClubEditComponent implements OnInit {

  @Input() club: Club;

  @Input() systemPublicKey: string;

  @Output() saved = new EventEmitter();

  @Output() canceled = new EventEmitter();

  statesList: any [];

  constructor(private messageDialog: MatDialog) {
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

  onPayment () {
          var description = this.club.name + ' club affiliation fee';
          var tags = [this.club.name, 'affiliation fee'];
          let dialogRef = this.messageDialog.open(CreditCardPopupComponent, {
            width: '300px', height: '370px',
            data: { title: 'Pay $75', amount: 7500, description: description, tags: tags,
            stripePublicKey: this.systemPublicKey}
          });

          dialogRef.afterClosed().subscribe(result => {
            // true if Pay was clicked, false if Cancel
            console.log('The dialog was closed with result ', result);
          });
  }

}
