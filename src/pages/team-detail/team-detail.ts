import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/shared';
import { GamePage } from '../pages'
import * as _ from 'lodash'

/**
 * Generated class for the TeamDetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-team-detail',
  templateUrl: 'team-detail.html',
})
export class TeamDetailPage {

  games = [];//filter games

  originalGames = []
  team: any;

  private tournamentData: any;

  constructor(public navCtrl: NavController,

    public navParams: NavParams,

    public eliteApi: EliteApiProvider,

  ) {
   
  }

  ionViewDidLoad() {
    this.originalGames = this.eliteApi.currentTournament.games
    console.log( this.originalGames)
    this.team = this.navParams.data
    console.log(this.team)

    this.games = _.chain(this.originalGames)
      .filter(g => g.team1Id === this.team.id || g.team2Id === this.team.id)
      .map(g => {
        let isTeam1 = (g.team1Id === this.team.id);
        let opponentName = isTeam1 ? g.team2 : g.team1;
        let scoreDisplay = this.getScoreDisplay(isTeam1, g.team1Score, g.team2Score)
        return {
          gameId: g.id,
          opponent: opponentName,
          time: Date.parse(g.time),
          location: g.location,
          locationUrl: g.locationUrl,
          scoreDisplay: scoreDisplay,
          homeAway: (isTeam1 ? "vs." : "at")
        }
      })
      .value();
  }

  getScoreDisplay(isTeam1, team1Score, team2Score) {
    if (team1Score && team2Score) {
      var teamScore = (isTeam1 ? team1Score : team2Score);
      var opponentScore = (isTeam1 ? team2Score : team1Score);
      var winIndiccator = teamScore > opponentScore ? "W" : "L";
      return winIndiccator + teamScore + "-" + opponentScore;
    } else {
      return "";
    }


  }




  gameClicked($event, game) {

    let sourceGame = this.originalGames.find(g => g.id === game.gameId)
    this.navCtrl.parent.parent.push(GamePage, sourceGame)
  }








  // goHome(){
  //  // this.navCtrl.popToRoot() *** can not work because it's will navigage to team home 

  //  this.navCtrl.parent.parent.popToRoot()
  //  console.log(this.navCtrl.parent.parent)
  // }
}
