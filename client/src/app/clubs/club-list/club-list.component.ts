import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Club } from './../club.model';

//
// so called dumb component which doesn't know about Observables
//
@Component({
  selector: 'club-list',
  templateUrl: './club-list.component.html',
  styleUrls: ['./club-list.component.css']
})
export class ClubListComponent implements OnInit {

  // page worth of clubs
  @Input() clubs: Club[] = [];

  // total count if we are paging
  @Input() totalCount: number = 0;

  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onEdit (clubId: number) {
    this.selected.emit(clubId)
  }

}
