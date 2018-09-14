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

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, 
    private storage: Storage, public http: Http, public user: UserProvider) {

      this.userEmail = this.user.getEmail();

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

    this.spotOnData = data.data;
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
