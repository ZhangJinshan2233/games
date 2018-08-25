import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { TournamentsPage,TeamHomePage} from '../pages'
import * as _ from "lodash";
import { EliteApiProvider,UserSettingProvider } from '../../providers/shared'
/**
 * Generated class for the MyTeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-teams',
  templateUrl: 'my-teams.html',
})
export class MyTeamsPage {

  favourites: any = []
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public eliteApi:EliteApiProvider,
     public loaderCtrl:LoadingController,
     public userSetting:UserSettingProvider
    ) {

  }

  ionViewDidLoad() {
  }

  goToTournaments() {
    this.navCtrl.push(TournamentsPage)
  }

 favouriteTapped($event,favourite){

  let loader=this.loaderCtrl.create({
    content:"Getting data ...",
    dismissOnPageChange:true
    });
  
    loader.present();

    this.eliteApi.getTournamentData(favourite.tournamentId).subscribe(data=>{
      this.navCtrl.push(TeamHomePage,favourite.team)
    })
 }

 ionViewDidEnter(){
  
  this.favourites=this.userSetting.getAllFavoriteTeams();
 }
}
