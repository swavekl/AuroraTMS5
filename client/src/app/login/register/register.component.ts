import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  firstName: string = "Mario";
  lastName: string = "Lorenc";
  email: string = "swaveklorenc@gmail.com";
  password: string = "Mario1234";
  password2: string = "Mario1234";

  constructor(
      private authenticationService: AuthenticationService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
  }

  register() {
    this.authenticationService.register(this.firstName, this.lastName, this.email, this.password)
    .subscribe(data => {
                        if (data == true)
                            this.router.navigate(['/welcome']);
                        },
                        error => {
          console.log ('error registering', error);
                        });
  }

}
