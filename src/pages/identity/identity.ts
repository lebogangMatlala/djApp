import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-identity',
  templateUrl: 'identity.html',
})
export class IdentityPage {
  role: string;

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) {

  }

  checkRole(role: string) {
    this.role = role;
  }

  nextPage() {

    if (this.role == 'Dj') {
      this.navCtrl.setRoot('RegisterPage', { role: this.role });
    } else if (this.role == 'Audience') {
      this.navCtrl.setRoot('RegisterPage', { role: this.role });
    }

  }
}
