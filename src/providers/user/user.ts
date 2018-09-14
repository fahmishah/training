import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the UserProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserProvider {

  public userData = <any> {};;
  public userEmail = <any> '';

  constructor() {
    console.log('Hello UserProvider Provider');
  }

  setData(data) {
    this.userData = data;
  }

  getData() {
    return this.userData
  }


  setEmail(email) {
    this.userEmail = email;       
  }

  getEmail() {
    return  this.userEmail;
  }
}
