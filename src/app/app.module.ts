import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FormsModule } from '@angular/forms';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
import {AgmCoreModule} from "@agm/core"
import { EliteApiProvider } from '../providers/elite-api/elite-api';
import{MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    StandingPage,
    TeamHomePage,
    MapPage
  }from '../pages/pages'
import { HttpClientModule } from '@angular/common/http';
import { UserSettingProvider } from '../providers/user-setting/user-setting';

@NgModule({
  declarations: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    StandingPage,
    TeamHomePage,
    MapPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AgmCoreModule.forRoot({
      apiKey:'api-key'
    }),
    IonicStorageModule.forRoot({
      name: 'mydb',
      driverOrder: ['localstorage']
    }),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    MyTeamsPage,
    TournamentsPage,
    TeamDetailPage,
    TeamsPage,
    GamePage,
    StandingPage,
    TeamHomePage,
    MapPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    EliteApiProvider,
    UserSettingProvider
  ]
})
export class AppModule {}
