import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";

import { instanceToPlain } from "class-transformer";
import { Observable } from "rxjs";

/**
 * Converts a DTO to a flat object, so the different class-transformer
 * annotations can work, such as `@Expose()` and `@Exclude()`.
 */
@Injectable()
export class InstanceToPlainInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
        return next.handle(request.clone({ body: instanceToPlain(request.body) }));
    }
}
