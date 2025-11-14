import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';

//请求头
export class RequestHeadModel {
  DeviceInfo: any;

  constructor(UserId: string, Token: string, deviceInfo: any) {
    if (deviceInfo.Platform != null) {
      this.DeviceInfo = deviceInfo;
    }
  }
}

@Injectable()
export class AppInterceptor implements HttpInterceptor {
  deviceInfo: any;

  constructor() {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // let requestHeadModel = new RequestHeadModel(userId, token, this.deviceInfo);
    request = request.clone({
      setHeaders: {},
      url: "http://192.168.13.28:3000/" + request.url
    });
    return next.handle(request).do((event: HttpEvent<any>) => {
      if (event instanceof HttpResponse) {
        // stop our loader here
      }
    }, (err: any) => {
      // stop our loader here
      if (err instanceof HttpErrorResponse) {
        //请求失败丢进service统一处理
      }
    });

  }
}
