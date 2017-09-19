import { Component } from '@angular/core';
import { TodosService, Todo } from './todos.service';

import {Subscription} from "rxjs/Subscription";
import 'rxjs/add/operator/filter';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  todos: Todo[];

  watcher: Subscription;
  activeMediaQuery = "";
  isMobile : boolean;

  constructor(media: ObservableMedia, private todosService: TodosService) {
    // subscribe to media changes so we can detect if we are on mobile device or not
    this.watcher = media.subscribe((change: MediaChange) => {
      this.activeMediaQuery = change ? `'${change.mqAlias}' = (${change.mediaQuery})` : "";
      this.isMobile = ( change ? (change.mqAlias == 'xs') : false );
//      console.log ('this.activeMediaQuery = ', this.activeMediaQuery);
//      console.log ('this.isMobile ', this.isMobile);
    });
  }

  ngOnDestroy() {
    this.watcher.unsubscribe();
  }

    ngOnInit() {
    this.todosService.getTodos().subscribe(
    data =>
    {
      this.todos = data;
      console.log ('todos', this.todos);
    },

                                    err => {
                                        // Log errors if any
                                        console.log(err);
                                    }
    );
  }
}
