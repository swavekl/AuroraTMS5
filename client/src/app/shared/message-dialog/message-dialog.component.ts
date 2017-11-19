import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

/**
* Simple OK-Cancel dialog for showing messages: You can set title, message and whether Cancel button will appear.
*
      let dialogRef = this.messageDialog.open(MessageDialogComponent, {
        width: '450px',
        data: { message: message, title: 'Request Submitted'} // , showCancelButton: true }
      });

      dialogRef.afterClosed().subscribe(result => {
        // true if OK was clicked, false if Cancel
        console.log('The dialog was closed with result ', result);
      });
*
*/
@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html'
})
export class MessageDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any)
    { }

  onNoClick(): void {
    this.dialogRef.close('No');
  }

  onOkClick(): void {
    this.dialogRef.close('OK');
  }

  ngOnInit() {
  }

}
