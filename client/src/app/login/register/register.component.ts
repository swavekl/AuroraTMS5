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

  status: string = "";

  constructor(
      private authenticationService: AuthenticationService,
      private route: ActivatedRoute,
      private router: Router
  ) { }

  ngOnInit() {
    this.status = "";
  }

  register() {
    this.authenticationService.register(this.firstName, this.lastName, this.email, this.password, this.password2)
    .subscribe(data => {
                        if (data == true)
//                            this.status = "Success";
                            this.router.navigate(['/welcome']);
                        },
                        error => {
                            //console.log ('error registering', error._body);
                            if (error._body) {
                                this.status = error._body;
                            }
                        });
  }

}
