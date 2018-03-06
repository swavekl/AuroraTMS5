import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { StatesList } from './states';


@Component({
  selector: 'mat-select-state',
  templateUrl: './states.component.html',
  styleUrls: ['./states.component.css']
})
export class StatesComponent implements OnInit {

  statesList: any [] = new StatesList().getList();

  @Input() name: string;

  @Output() selectionChange = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelectionChange (event) {
    this.selectionChange.emit(event);
  }
}
