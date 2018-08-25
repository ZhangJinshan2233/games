import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {EliteApiProvider} from '../../providers/shared';
import * as _ from "lodash"
/**
 * Generated class for the StandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-standing',
  templateUrl: 'standing.html',
})
export class StandingPage {
  divisionFilter='division';
  divisionFilter1='all';
  standings:any;
  team:any;
  allStandings:any
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
      public eliteApi:EliteApiProvider
    ) {
  }

  ionViewDidLoad() {
    this.standings = this.eliteApi.currentTournament.standings;
    this.team = this.navParams.data
   
  //  this.allStandings=
  //  _.chain(this.standings)
  //  .groupBy('division')
  //  .toPairs()
  //  .map(item=>_.zipObject(['divisionName','divisionStandings'],item))
  //  .value()

  this.allStandings=this.eliteApi.currentTournament.standings;
  this.filterDivision(event);
  }
  getHeader(record, recordIndex, records) {
    if (recordIndex=== 0||record.division!==records[recordIndex-1].division) {
      return record.division;
    }
    return null;
  }

  filterDivision(event){
   
      this.standings=_.filter(this.allStandings,s=>s.division===this.team.division)
     
  }

  filterDivision1(event){

      this.standings=this.allStandings
 
  }
}
