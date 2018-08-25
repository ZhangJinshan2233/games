import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/shared'
import { TeamHomePage,MapPage } from '../pages'
declare var window:any
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

    this.game.gameTime=Date.parse(this.game.time);

  }

  teamTapped(teamId) {
    let tournamentData = this.eliteApi.currentTournament;
    console.log(teamId)
    let team = tournamentData.teams.find(team => team.id === teamId)
   console.log(team)
    this.navCtrl.push(TeamHomePage, team);
  }

  isWinner(score1,score2){
    return Number(score1)>Number(score2)
  }

goToDirection(){

  let tournamentData=this.eliteApi.currentTournament;
  let location=tournamentData.locations[this.game.locationId];
console.log(location)
  window.location=`geo:${location.latitude},${location.longitude};u=35;`;
}

goToMap(){
  this.navCtrl.push(MapPage,this.game)
}

}
