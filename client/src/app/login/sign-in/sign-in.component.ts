import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  email = "swaveklorenc@yahoo.com";
  password = "swavek";
  loading = false;
  returnUrl: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router)
    { }

  ngOnInit() {

  console.log ('in SignInComponent.ngOnInit');
        // reset login status
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  login() {
    // when we are redirected to login page we may have the url to which we need to return afterwards, save it here
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

    this.loading = true;
    this.authenticationService.login (this.email, this.password)
    .subscribe(
                    data => {
                    console.log ('login success, now go to this url: ', this.returnUrl);
                        this.router.navigate([this.returnUrl]);
                    },
                    error => {
      console.log ('error logging in', error);
                        //this.alertService.error(error);
                        this.loading = false;
                    });
  }

  logout() {
    this.authenticationService.logout();



  }

}
