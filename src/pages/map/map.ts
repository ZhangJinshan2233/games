import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import{EliteApiProvider} from '../../providers/shared';
declare var window:any
/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  map:any
  lat: number;
  lng: number;
 
  constructor(public navCtrl: NavController,
     public navParams: NavParams,
     public eliteApi:EliteApiProvider
    ) {
  }

  ngOnInit(): void {
    let game=this.navParams.data;
    let tournamentData=this.eliteApi.currentTournament;
    let location=tournamentData.locations[game.locationId]
    console.log(location)
    this.map={
      lat:Number(location.latitude),
      lng:Number(location.longitude),
      markerLabel:game.location
    }
   

  }

  getDirections(){
    window.location=`geo:${this.map.lat},${this.map.lng};u=35;`;
  }
}
