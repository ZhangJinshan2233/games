import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{MyTeamsPage, TeamDetailPage,StandingPage} from '../pages';

/**
 * Generated class for the TeamHomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-home',
  templateUrl: 'team-home.html',
})
export class TeamHomePage {

  team:any
  teamDetailTab=TeamDetailPage;
  standingTab=StandingPage;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.team=this.navParams.data;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TeamHomePage');
  }

  goHome(){

   // this.navCtrl.push(MyTeamsPage) this method can navigate to MyTeamPage but it will display back button
    this.navCtrl.popToRoot();
  }
}
