import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, LoadingController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'SignUpPage';

  pages: Array<{title: string, component: any}>;



  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, 
    public loadingCtrl: LoadingController, public user: UserProvider) {

    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage' }
    ];

  }

  checkPreviousAuthorization(): void { 
    if((window.localStorage.getItem('email') === "undefined" || window.localStorage.getItem('email') === null)) {
      this.rootPage = 'SignUpPage';
    } else {
      this.rootPage = 'HomePage';
    }
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.checkPreviousAuthorization();
    });

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
