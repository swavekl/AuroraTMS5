import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  links: Array<MenuItem> = [
  {label: "Sanction", url: "sanction"},
  {label: "Insurance", url: "insurance"}
  ];

  constructor() { }

  ngOnInit() {
  }

}

export class MenuItem {
  label: string;
  url: string;
}
