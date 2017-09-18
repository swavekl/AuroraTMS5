import {Injectable} from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers} from "@angular/http";
import {Observable} from "rxjs/Rx";
import {environment} from "../../environments/environment";

//
// Class which will be modifying all outgoing requests to add Bearer-Token with JWT token used for authentication with RESTfule services
//
@Injectable()
export class InterceptedHttp extends Http {
    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    // add prefix of the URL from the environment e.g. http://mypc:9000
    private updateUrl(req: string) {
        return  environment.origin + req;
    }

    //
    // add bearer token
    //
    private getRequestOptionArgs(url: string, options?: RequestOptionsArgs) : RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');

        // get the token if it exists, but don't do it for login api cause that's how we request it
        if (url.indexOf('login') == -1) {
          let currentUser = sessionStorage.getItem('currentUser');
          if (currentUser != null) {
            let currentUserObject = JSON.parse (currentUser);
            let jwtToken = currentUserObject.access_token;
            options.headers.append('Authorization', 'Bearer ' + jwtToken);
          }
        }
        return options;
    }

    request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
        return super.request(url, options);
    }

    get(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.get(url, this.getRequestOptionArgs(url, options));
    }

    post(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.post(url, body, this.getRequestOptionArgs(url, options));
    }

    put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.put(url, body, this.getRequestOptionArgs(url, options));
    }

    delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        url = this.updateUrl(url);
        return super.delete(url, this.getRequestOptionArgs(url, options));
    }

}
