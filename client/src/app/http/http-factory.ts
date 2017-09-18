import {XHRBackend, Http, RequestOptions} from "@angular/http";
import {InterceptedHttp} from "./intercepted-http";

/**
* method for registering the new http factory which will be modify all outgoing http requests
*/
export function httpFactory(xhrBackend: XHRBackend, requestOptions: RequestOptions): Http {
    return new InterceptedHttp(xhrBackend, requestOptions);
}
