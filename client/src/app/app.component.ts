import { Component } from '@angular/core';
import { TodosService, Todo } from './todos.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  todos: Todo[];

  constructor (private todosService: TodosService) {

  }

  ngOnInit() {
  console.log ('in ngOnInit');

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
