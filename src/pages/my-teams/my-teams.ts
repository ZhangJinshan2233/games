import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';
import { TournamentsPage,TeamHomePage} from '../pages'

import { EliteApiProvider } from '../../providers/shared'
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

  favourites: any = [
    {
      team: { id: 6182, name: 'HC Elite 7th', coach: 'Michelotti' },
      tournamentId: '89e13aa2-ba6d-4f55-9cc2-61eba6172c63',
      tournamentName: 'March Madness Tournament'
    },
    {
      team: { id: 805, name: 'HC Elite', coach: 'Michelotti' },
      tournamentId: '98c6857e-b0d1-4295-b89e-2d95a45437f2',
      tournamentName: 'Holiday Hoops Chanllenge'
    }
  ]
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public eliteApi:EliteApiProvider,
     public loaderCtrl:LoadingController
    ) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MyTeamsPage');
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

}
