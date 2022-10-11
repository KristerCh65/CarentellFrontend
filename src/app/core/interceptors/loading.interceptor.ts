import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { finalize, Observable } from 'rxjs';
import { LoaderSpinnerService } from '../services/loader-spinner.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {

  constructor(
    private loaderService: LoaderSpinnerService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.loaderService.isLoading.next(true);

    return next.handle(request)
      .pipe(
        finalize(
          () => {
            this.loaderService.isLoading.next(false);
          }
        )
      )
  }
}
