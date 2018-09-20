import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the CategoriesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-categories',
  templateUrl: 'categories.html',
})
export class CategoriesPage {
  categoriesArr = ['Deep House', 'Kwaito', 'Afro-Pop', 'Dance Music', 'Commercial House', 'Kasi Rap', 'R&B', 'Commercial Hip Hop', 'Underground Hip Hop', 'Soul', 'Jazz', 'Neo Soul', 'Fusion']
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }


}
