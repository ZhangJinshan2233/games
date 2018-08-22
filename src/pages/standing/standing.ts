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
   
   this.allStandings=
   _.chain(this.standings)
   .groupBy('division')
   .toPairs()
   .map(item=>_.zipObject(['divisionName','divisionStandings'],item))
   .value()

   console.log( this.standings)
   console.log( this.allStandings)
  }

}
