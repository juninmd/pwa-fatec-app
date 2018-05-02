import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the HerokuProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HerokuProvider {

  constructor(public http: HttpClient) {
  }

  getVote() {
    return this.http.get('https://apresentacao-pwa-api.herokuapp.com/vote');
  }

  postVote(vote) {
    return this.http.post('https://apresentacao-pwa-api.herokuapp.com/vote', vote);
  }

}
