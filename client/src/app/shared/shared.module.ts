import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MessageDialogComponent } from './message-dialog/message-dialog.component';
import { MatDialogModule, MatButtonModule, MatSelectModule } from '@angular/material';
//import { StatesComponent } from './states/states.component';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatSelectModule
  ],
  exports: [
    MessageDialogComponent
//    StatesComponent
  ],
  declarations: [
    MessageDialogComponent
//    StatesComponent
  ]
})
export class SharedModule { }
