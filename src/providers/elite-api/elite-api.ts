import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the EliteApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/

@Injectable()
export class EliteApiProvider {

  baseUrl:string;

  currentTournament:any
  constructor(public http: HttpClient) {
   
    this.baseUrl="https://elite-schedule-app-9de93.firebaseio.com"
  }

  getTournaments(){

    return this.http.get(`${this.baseUrl}/tournaments.json`)
   
  }

  getTournamentData(tournamentId):Observable<any>{

    this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`).subscribe(data=>{
      this.currentTournament=data 
    })
    
    return this.http.get(`${this.baseUrl}/tournaments-data/${tournamentId}.json`)
  }

}
