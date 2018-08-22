import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/shared'
import { TeamHomePage } from '../pages'
/**
 * Generated class for the GamePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game',
  templateUrl: 'game.html',
})
export class GamePage {

  game: any

  constructor(public navCtrl: NavController,
    public navParams: NavParams,

    public eliteApi: EliteApiProvider

  ) {

    this.game = this.navParams.data
  }

  ionViewDidLoad() {


  }

  teamTapped(teamId) {
    let tournamentData = this.eliteApi.currentTournament;
    console.log(teamId)
    let team = tournamentData.teams.find(team => team.id === teamId)
   console.log(team)
    this.navCtrl.push(TeamHomePage, team);
  }

}
