import { Component, ViewChild } from '@angular/core';
import { Platform, NavController,LoadingController,Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { MyTeamsPage } from '../pages/pages';
import { TournamentsPage,TeamHomePage} from '../pages/pages';

import {EliteApiProvider, UserSettingProvider } from '../providers/shared'

@Component({
  templateUrl: 'app.html'

})
export class MyApp {

  favoriteTeams: any;

  @ViewChild('mycontent') navCtrl: NavController

 

  rootPage: any = MyTeamsPage;

  constructor(platform: Platform, 
    statusBar: StatusBar,
     splashScreen: SplashScreen,

    public userSetting:UserSettingProvider,
    public loaderCtrl:LoadingController,
   public eliteApi:EliteApiProvider,

   public events:Events


    ) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
     this.refreshFavorite()
    
     this.events.subscribe('favorite:changed',data=>this.favoriteTeams=data)
      
    });
   
  }

  goHome() {
    this.navCtrl.popToRoot()
  }

  refreshFavorite(){
    this.favoriteTeams=this.userSetting.getAllFavoriteTeams();
  }
  goToTournaments() {
    this.navCtrl.push(TournamentsPage)
  }

 goToTeam(fav){

  let loader=this.loaderCtrl.create({
    content:"Getting data...",
    dismissOnPageChange:true
  });

  loader.present();
    this.eliteApi.getTournamentData(fav.tournamentId).subscribe(l=>this.navCtrl.push(TeamHomePage,fav.team))
 }
 
}

