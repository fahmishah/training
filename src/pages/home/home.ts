import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  public spotOnData = <any> {};
  public spotOnList = <any>[];
  public userEmail = '';
  public priceInd = '';

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    private storage: Storage, public http: Http, public user: UserProvider) {

      this.userEmail = window.localStorage.getItem('email');

}

ionViewWillEnter() {
  this.getPrice(event);
}

getPrice(event) {
  let loading = this.loadingCtrl.create({
    content: "Loading latest price",
  });

  loading.present();

  this.http.get('https://cws.hellogold.com/api/v2/spot_price.json')
  .map(res => res.json())
  .subscribe(data => {
    
    loading.dismiss();
    if (event)    
    event.complete();

    console.log(data);

    if (this.spotOnList === undefined || this.spotOnList.length == 0) {
      this.priceInd = 'price';
    } else {
      if (data.data.buy >  this.spotOnList[this.spotOnList.length - 1].buy) {
        this.priceInd = 'price-up'
      } else if (data.data.buy <  this.spotOnList[this.spotOnList.length - 1].buy) {
        this.priceInd = 'price-down'
      } else {
        this.priceInd = 'price';
      }
    }

    this.spotOnData = data.data;
    this.spotOnData["indicator"] = this.priceInd;
    this.spotOnList.push(this.spotOnData);

    console.log(this.spotOnList);
  },
  error => {
    loading.dismiss();
    if (event)    
    event.complete();
    console.log(error);
  },
);
}

doRefresh(refresher) {
  this.getPrice(refresher)
}

}
