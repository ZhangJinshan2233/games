
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage'
import * as _ from "lodash"
import{Events} from 'ionic-angular'
/*
  Generated class for the UserSettingProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UserSettingProvider {

  constructor(public storage:Storage,public events:Events) {
    console.log('Hello UserSettingProvider Provider');
  }

  favoriteTeam(team,tournamentId,tournamentName){
    let item={
      team:team,
      tournamentId:tournamentId,
      tournamentName:tournamentName
    }

    this.storage.set(team.id,item).then(resolve=>{
      let data=this.getAllFavoriteTeams()
      this.events.publish("favorite:changed",data)
    })
  
  }

  unFavoriteTeam(team:any){
    this.storage.remove(team.id).then(value=>{
      let data=this.getAllFavoriteTeams()
      this.events.publish("favorite:changed",data)
    })
    
    
    
  }

  isFavoriteTeam(teamId){
    return this.storage.get(teamId).then(value=>value?true:false)
  }

  getAllFavoriteTeams(){
   
    let items1=[];
    let items=[];
    _.forIn(window.localStorage,(v,k)=>{
      items1.push(v);
    })
    
   for (let i=0;i<items1.length-6;i++){

    items[i]=JSON.parse(items1[i])
   }
    return items.length? items:null
  }
}
