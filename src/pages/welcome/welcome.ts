import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchPage } from '../../pages/search/search';
import { SignupPage } from '../../pages/signup/signup';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  login(){
    this.navCtrl.push(SearchPage);
    }
  signup(){
    this.navCtrl.push(SignupPage);
    }

}
