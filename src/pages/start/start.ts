import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


/**
 * Generated class for the StartPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-start',
  templateUrl: 'start.html',
})
export class StartPage {
  file: string = '../../assets/Master_Cheng_Fu_-_Umcimbi_ft_Lelo_Kamau.mp3';
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  
  }

  nextPage(page: string) {
    this.navCtrl.push(page);
  }

  ionViewDidEnter() {


  }

}
