import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { PlayerProfile } from './../player-profile.model';

@Component({
  selector: 'player-profile-list',
  templateUrl: './player-profile-list.component.html',
  styleUrls: ['./player-profile-list.component.css']
})
export class PlayerProfileListComponent implements OnInit {
  // page worth of player profiles
  @Input() playerProfileList: PlayerProfile[] = [];

  // total count if we are paging
  @Input() totalCount: number = 0;

  @Output() selected = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  onSelected (memberId: number) {
    console.log ('memberId ', memberId);
    this.selected.emit(memberId);
  }

}
