import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable()

export class AccountService {
  constructor(public http: HttpClient) {
  }

  getDataList = () => new Promise((resolve, reject) => {
    this.http.get('users/images')
      .subscribe(res => {
        resolve(res);
      }, (err) => {
      });
  });
}
