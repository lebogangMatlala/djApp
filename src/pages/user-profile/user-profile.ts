import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActionSheetController } from 'ionic-angular';

/**
 * Generated class for the UserProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-profile',
  templateUrl: 'user-profile.html',
})
export class UserProfilePage {

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserProfilePage');
  }

 edit()
  {

    const actionSheet = this.actionSheetCtrl.create({
      title: 'Modify your Profile',
      buttons: [
        {
          text: 'Edit Profile',
          role: 'Edit Profile',
          handler: () => {
            console.log('Edit Profile clicked');
          }
        },{
          
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
