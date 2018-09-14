import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';


/*
  Generated class for the SpotOnProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class SpotOnProvider {

  constructor(public http: Http, public loadingCtrl: LoadingController) {
    console.log('Hello SpotOnProvider Provider');
  }

}
