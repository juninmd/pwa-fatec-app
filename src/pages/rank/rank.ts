import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HerokuProvider } from '../../providers/heroku/heroku';

/**
 * Generated class for the RankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})
export class RankPage {

  votes = [];
  person;

  constructor(public navCtrl: NavController, public navParams: NavParams, private herokuProvider: HerokuProvider) {
    if (localStorage.getItem('voto') === null) {
      this.navCtrl.setRoot('HomePage');
    }
  }


  ionViewDidLoad() {
    this.person = this.navParams.get('people');
    this.share();
    this.herokuProvider.getVote().subscribe((q) => {
      this.votes = q;
    }, err => {
    })
  }

  share() {
    if (navigator.share && this.person) {
      let url = document.location.href;

      navigator.share({
        title: 'Votação Eleições',
        text: `Acabo de votar em ${this.person.name}, vote você também!`,
        url: url
      })
        .then(() => console.log('Successful share'))
        .catch((error) => console.log('Error sharing', error));
    }
  }
}
