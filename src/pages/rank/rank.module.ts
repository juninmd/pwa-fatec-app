import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RankPage } from './rank';
import { HttpClientModule } from '@angular/common/http';
import { HerokuProvider } from '../../providers/heroku/heroku';
import { OrderByPipe } from '../../pipes/order-by/order-by';

@NgModule({
  declarations: [
    RankPage,
    OrderByPipe
  ],

  imports: [
    IonicPageModule.forChild(RankPage),
    HttpClientModule,
  ],
  providers: [
    HerokuProvider
  ]
})
export class RankPageModule { }
