import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  links: Array<MenuItem> = [
  {label: "Sanction", url: "sanction"},
  {label: "Insurance", url: "insurance"},
  {label: "Add Insurance", url: "insurance-edit"},
  {label: "Configure", url: "configuretournament"},
  {label: "Logout", url: "login"}
  ];

  constructor() { }

  ngOnInit() {
  }

}

export class MenuItem {
  label: string;
  url: string;
}
