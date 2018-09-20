import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Http, URLSearchParams} from '@angular/http';
import { UserProvider } from '../../providers/user/user';

@IonicPage()
@Component({
  selector: 'page-sign-up',
  templateUrl: 'sign-up.html',
})
export class SignUpPage {

  public authForm: FormGroup;

  public logStatus = "logStatus";
  public userEmail = "userEmail";
  public userData = "userData";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, 
    public loadingCtrl: LoadingController,  public formBuilder: FormBuilder, public http: Http, public user: UserProvider) {

    this.authForm = formBuilder.group({
      email: ['', Validators.compose([Validators.maxLength(70), Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$'), Validators.required])],
      tnc: [false]
  });

  }

  onSubmit(value: any): void {


    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    let alertError = this.alertCtrl.create({
      title: 'Hello Gold',
      subTitle: 'Registration unsuccessful. Try again.',
      buttons: ['Okay']
    });

    loading.present();

    // set param
    let urlSearchParams = new URLSearchParams();
    urlSearchParams.append('email', value.email);
    urlSearchParams.append('uuid', this.generateUUID());
    urlSearchParams.append('data', this.generateString());
    urlSearchParams.append('tnc', value.tnc);

    console.log(urlSearchParams.toString());

    this.http.post("https://staging.hellogold.com/api/v3/users/register.json?" + urlSearchParams.toString(), null)
    .subscribe(data => {

      var response = JSON.parse(data['_body']);
      console.log(response);
      loading.dismiss();

      //set user email and result data from API to storage
      window.localStorage.setItem('email', value.email);
      window.localStorage.setItem('userData', response.data);

      this.navCtrl.setRoot('HomePage');

     }, error => {
      console.log(JSON.parse(error['_body']));
      loading.dismiss();
      alertError.present();
    });


  }

  generateUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
  }

  generateString() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  
    for (var i = 0; i < 256; i++)
      text += possible.charAt(Math.floor(Math.random() * possible.length));
  
    return text;
  }
  
  
  

}
