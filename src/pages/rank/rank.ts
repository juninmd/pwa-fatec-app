import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, ActionSheetController } from 'ionic-angular';
import { HerokuProvider } from '../../providers/heroku/heroku';


declare var window;

@IonicPage()
@Component({
  selector: 'page-rank',
  templateUrl: 'rank.html',
})

export class RankPage {

  votes = [];
  person;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private herokuProvider: HerokuProvider,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController) {
  }

  doRefresh(refresher) {
    this.herokuProvider.getVote().subscribe((q) => {
      this.votes = <any>q;
      refresher.complete();
    }, err => {
    })
  }


  ionViewDidLoad() {
    if (localStorage.getItem('voto')) {
      this.person = JSON.parse(localStorage.getItem('voto'));
    }

    this.herokuProvider.getVote().subscribe((q) => {
      this.votes = <any>q;
    }, err => {
    })
  }

  share() {
    if (!this.person)
      return;

    if (window.navigator == null || window.navigator.share == null) {
      this.alertCtrl.create({
        message: 'Seu navegador não tem suporte para o compartilhamento :c.',
        buttons: [
          {
            text: 'OK',
            handler: () => {

            }
          }]
      }).present();
      return;
    }

    let url = 'http://pwa-fatec.firebaseapp.com/';

    window.navigator.share({
      title: 'Votação Eleições',
      text: `Acabo de votar em ${this.person.name}, vote você também!`,
      url: url
    })
      .then(() => console.log('Successful share'))
      .catch((error) => console.log('Error sharing', error));
  }

  github() {
    window.location.href = 'https://github.com/juninmd/apresentacao-pwa';
  }

  slack() {

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Slack',
      buttons: [
        {
          text: 'Criar conta',
          handler: () => {
            window.location.href = 'https://goo.gl/HaH8D4';
          }
        }, {
          text: 'Acessar',
          handler: () => {
            window.location.href = 'https://fatec-franca.slack.com';
          }
        }, {
          text: 'Cancelar',
          handler: () => {

          }
        }
      ]
    });
    actionSheet.present();
  }
}
