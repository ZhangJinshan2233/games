import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import{TeamHomePage} from '../pages';

import{EliteApiProvider}from '../../providers/shared'
/**
 * Generated class for the TeamsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

teams:any;

games=[];
  constructor(public navCtrl: NavController, public navParams: NavParams,public elitApi:EliteApiProvider) {
  }
  ionViewDidLoad() {
   let  selectedTournament=this.navParams.data;
    this.elitApi.getTournamentData( selectedTournament.id).subscribe(data=>{
      this.teams=data.teams;
      this.games=data.games
    })
   }
  itemTapped($event,team){
    this.navCtrl.push(TeamHomePage,team)
  }
  
}
