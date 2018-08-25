import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController } from 'ionic-angular';

import{TeamHomePage} from '../pages';

import{EliteApiProvider}from '../../providers/shared';

import * as  _ from 'lodash'
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
 allTeams=[];
 allTeamsDivisions=[];
teams:any;
queryText="";
games=[];
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public elitApi:EliteApiProvider,
    public loaderCtrl:LoadingController
    ) {
  }
  ionViewDidLoad() {
    let loader=this.loaderCtrl.create({
      content:"loading teams ..."
    })
   let  selectedTournament=this.navParams.data;

   loader.present().then(()=>{
    this.elitApi.getTournamentData( selectedTournament.id).subscribe(data=>{
      this.allTeams=data.teams;
      this.allTeamsDivisions=_.chain(data.teams)
      .groupBy('division')
      .toPairs()
      .map(item=>_.zipObject(['divisionName','divisionTeams'],item))
      .value();
      this.teams= this.allTeamsDivisions;
      this.games=data.games;
      loader.dismiss()

    })
   })
   
   }
  itemTapped($event,team){
    this.navCtrl.push(TeamHomePage,team)
  }
  
  updateTeams(){
    let queryTextLower=this.queryText.toLowerCase();

    let filteredItems=[];

    _.forEach(this.allTeamsDivisions,td=>{
      let teams=_.filter(td.divisionTeams,t=>(<any>t).name.toLowerCase().includes(this.queryText))
      if(teams.length){
        filteredItems.push({divisionName:td.divisionName,divisionTeams:teams})
      }
    })

    this.teams=filteredItems
  }




}
