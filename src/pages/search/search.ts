import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ApiServiceProvider} from '../../providers/api-service/api-service'

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {
  responseData : any;
  userData = {"usn": ""};

  constructor(public navCtrl: NavController, public navParams: NavParams, ) {

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  public search(){ 
    console.log(this.userData.usn);
  }

}
