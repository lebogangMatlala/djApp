import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PlayerPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-player',
  templateUrl: 'player.html',
})
export class PlayerPage {

  index;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

    this.index=this.navParams.get("obj");
    console.log(this.index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PlayerPage');

  }

}
