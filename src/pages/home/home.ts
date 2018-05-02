import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';
import { HerokuProvider } from '../../providers/heroku/heroku';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  people = [];

  constructor(private navCtrl: NavController, private alertCtrl: AlertController, private herokuProvider: HerokuProvider) {

    if (localStorage.getItem('voto') !== null) {
      this.navCtrl.setRoot('RankPage');
    }

    this.people = [
      {
        id: 1,
        name: 'Jair Bolsonaro'
      },
      {
        id: 2,
        name: 'Lula'
      },
      {
        id: 3,
        name: 'Marina Silva'
      },
      {
        id: 4,
        name: 'Ciro Gomes'
      },
      {
        id: 5,
        name: 'Geraldo Alckmin'
      },
      {
        id: 6,
        name: 'Manuela D\'Ávila'
      },

    ]
  }

  vote(people) {
    const confirm = this.alertCtrl.create({
      title: 'Confirme seu voto',
      message: `Certeza que deseja votar em ${people.name}`,
      buttons: [
        {
          text: 'Discordo',
          handler: () => {

          }
        },
        {
          text: 'Concordo',
          handler: () => {
            this.herokuProvider.postVote(people).subscribe(q => {
              this.alertCtrl.create({
                message: 'Voto computado com sucesso.',
                buttons: [
                  {
                    text: 'OK',
                    handler: () => {
                    }
                  }]
              }).present()

              this.navCtrl.setRoot('RankPage', people);

              localStorage.setItem('voto', 's');

            }, err => {
              this.alertCtrl.create({
                message: 'Deu algum erro D:'
              }).present()
            });
          }
        }
      ]
    });
    confirm.present();
  }
}
