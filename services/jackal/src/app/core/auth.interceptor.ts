import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(
        private auth: AuthService
    ) {}

    intercept(req: HttpRequest<any>,
              next: HttpHandler
             ): Observable<HttpEvent<any>> {

        const idToken = localStorage.getItem("id_token");
        
        if (idToken) {

            const requestClone = req.clone({
                headers: req.headers
                        .set("Authorization",
                            "Bearer " + idToken)
                        .set("admin", this.auth.user.asset.userInfo.username)
            });

            return next.handle(requestClone);
        }
        else {
            return next.handle(req);
        }
    }
}
