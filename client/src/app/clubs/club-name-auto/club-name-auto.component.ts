import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { ClubsService } from '../clubs.service';
import { Club } from '../club.model';


/*
Edit field with auto complete capability. Emits event once the selected club is chosen
Usage:

<!--   <club-name-auto (selected)="onClubSelected($event)"></club-name-auto> -->
  onClubSelected(selectedClub:Club) {
  }
*/
@Component({
  selector: 'club-name-auto',
  templateUrl: './club-name-auto.component.html',
  styleUrls: ['./club-name-auto.component.css']
})
export class ClubNameAutoComponent implements OnInit {

  @Input() labelText : string = 'Club Name';

  // list of clubs filtered by search criteria typed in by user
  clubs$: Observable<Club>;

  // when user selects a club from popup we will emit this event
  @Output() selected = new EventEmitter();

  constructor(private clubsService: ClubsService) { }

  ngOnInit() {
  }

  onClubNameChanges(event) {
    let searchTerms = event.target.value;
    this.clubs$ = this.clubsService.list (0, 5, searchTerms)
    .map(response => response.results);
  }

  onSelectionChange (event, selectedClub: Club) {
    this.selected.emit (selectedClub);
  }
}
