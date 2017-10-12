import { Component, OnInit, Input } from '@angular/core';
import { MatSidenavModule, MatDrawerContainer, MatDrawer } from '@angular/material'
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.css']
})
export class MainMenuComponent implements OnInit {

  @Input() sideNav: MatDrawer;

  links: Array<MenuItem> = [
  {label: "Sanction", url: "sanction"},
  {label: "Insurance", url: "insurance"},
  {label: "Configure", url: "configuretournament"},
  {label: "Logout", url: "login"}
  ];

  constructor(private router: Router) { }

  ngOnInit() {
  }

  /**
  * on mobile devices the menu is opened and when you click on menu item it should close before navigating to this item
  */
  closeAndNavigateToRoute (routerLink) {
   if (this.sideNav && this.sideNav.opened) {
    this.sideNav.close();
   }
    this.router.navigate([routerLink]);
  }

}

export class MenuItem {
  label: string;
  url: string;
}
