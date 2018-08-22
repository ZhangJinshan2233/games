import { Component } from '@angular/core';
import {AlertController,ToastController, IonicPage, NavController, NavParams } from 'ionic-angular';
import { EliteApiProvider } from '../../providers/shared';
import { GamePage } from '../pages'
import * as _ from 'lodash'
import * as moment from 'moment' //don't need to use typing comment
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

  games = [];//filter by date from allFilterGames
  allFilterGames=[];//filter games
  useDateFilter=false;
  isFollowing=false;
  originalGames = []
  team: any;
  teamStanding:any;
  dateFilter:any;
  private tournamentData: any;

  constructor(public navCtrl: NavController,

    public navParams: NavParams,

    public eliteApi: EliteApiProvider,

    public alertCtrl:AlertController,

    public toastCtrl:ToastController
  ) {

    this.originalGames = this.eliteApi.currentTournament.games;
    this.team = this.navParams.data
   
    this.teamStanding=_.find( this.eliteApi.currentTournament.standings,{'teamId':this.team.id})  
  }

  ionViewDidLoad() {
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
      this.allFilterGames=this.games;
      console.log( this.teamStanding)
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

  dateChanged(){
    
    if(this.useDateFilter){
      this.games=_.filter(this.allFilterGames,g=>moment(g.time).isSame(this.dateFilter,'day'))
    }else{
      this.games= this.allFilterGames
    }
      
  }


  getScoreWorl(game){
    return game.scoreDisplay?game.scoreDisplay[0]:"";
  }

  getScoreDisplayBadgeClass(game){

    return game.scoreDisplay.indexOf('w:')==0?'primary':'danger'
  }

  toggleFollow(){
    if(this.isFollowing){
      let confirm=this.alertCtrl.create({
        title:'unfollow?',
        message:'are you sure?',
        buttons:[
          {
            text:'Yes',
            handler:()=>{
              this.isFollowing=false;
              //Todo

              let toast=this.toastCtrl.create({
                message:"you have unfollowed this team",
                duration:2000,
                position:"bottom"
              })

              toast.present()
            }
            
          },
          {text:"No"}
        ]
      })

      confirm.present().then(()=>{

      })
    }else{
      this.isFollowing=true;
    }
  }
  // goHome(){
  //  // this.navCtrl.popToRoot() *** can not work because it's will navigage to team home 

  //  this.navCtrl.parent.parent.popToRoot()
  //  console.log(this.navCtrl.parent.parent)
  // }
}
