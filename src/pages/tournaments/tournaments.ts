import { Component } from '@angular/core';
import { IonicPage,LoadingController, NavController, NavParams } from 'ionic-angular';

import { TeamsPage } from '../pages';
import { EliteApiProvider } from '../../providers/shared'
/**
 * Generated class for the TournamentsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tournaments',
  templateUrl: 'tournaments.html',
})
export class TournamentsPage {

  tournaments:any;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public elitApi:EliteApiProvider,
    
    public loadingCtrl:LoadingController
    ) {
  }

  
  itemTapped($event,tournament) {
    this.navCtrl.push(TeamsPage,tournament)
  }


  ionViewDidLoad() {
    let loader=this.loadingCtrl.create({
      content:'Getting Tournaments',
      spinner:"dots"
    })

    loader.present().then(()=>{

      this.elitApi.getTournaments().subscribe(data=>{
        this.tournaments=data;

        loader.dismiss();
      })

    })
  
  }

}
