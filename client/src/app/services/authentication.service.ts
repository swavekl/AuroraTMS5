import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'

@Injectable()
export class AuthenticationService {

  constructor(private http: Http) { }

  login (username: string, password: string) {
    return this.http.post('/api/login', JSON.stringify({ username: username, password: password }))
                .map((response: Response) => {
                    // login successful if there's a jwt token in the response
                    let user = response.json();
                    if (user && user.access_token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        sessionStorage.setItem('currentUser', JSON.stringify(user));
                    }

                    return user;
                });
  }

  logout () {
        // remove user from local storage to log user out
        sessionStorage.removeItem('currentUser');
  }

  refreshSession () {
  /**
  POST /myApp/oauth/access_token HTTP/1.1
  Host: server.example.com
  Content-Type: application/x-www-form-urlencoded

  grant_type=refresh_token&refresh_token=eyJhbGciOiJSU0EtT0FFUCIsImVuYyI6IkEyNTZHQ00ifQ....
  */
  }

  loginWithFacebook () {
      var callbackUrl = 'http://localhost:4200/sanction'
      return this.http.get ('/oauth/authenticate/facebook?callbackUrl=' + callbackUrl)
                .map((response: Response) => {
                    let user = response.json();
                    console.log ('facebook login OK. user is ', user);
                    //if (user && user.access_token) {
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                    //    sessionStorage.setItem('currentUser', JSON.stringify(user));
                    //}
                    return user;
                });

/*
      // <YOUR_GRAILS_APP>/oauth/authenticate/<provider>
      <a href="/oauth/authenticate/facebook">Click here to login with facebook</a>
       |    *     | /oauth/access_token                   | Action: accessToken           |
       |    *     | /oauth/${action}/${provider}          | Action: (default action)      |
*/
  }
}
