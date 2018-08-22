import { Component, ViewChild } from '@angular/core';
import { Platform ,NavController} from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage } from '../pages/pages';
import { TournamentsPage } from '../pages/pages';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  @ViewChild('mycontent') navCtrl:NavController
  rootPage: any = MyTeamsPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  goHome() {
    this.navCtrl.popToRoot()
  }

  goToTournaments(){
    this.navCtrl.push(TournamentsPage)
  }
}

