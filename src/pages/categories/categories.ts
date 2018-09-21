import { Component, OnInit } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';

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

  obj = {


  }
  globalPic = [];
  globalDetails = [];
  role;
  keysProfile: any;
  keysPic: any;
  pic;
  globalarr = [];
  picarray = [];
  profilearray = []
  categoriesArr;
  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    this.categoriesArr = this.db.categories();
    let userID;
    this.db.retriveProfilePic().on('value', (data) => {
      var infor = data.val();
      this.pic = infor.url;

      // console.log( infor);
      let keys = Object.keys(infor);

      for (var i = 0; i < keys.length; i++) {
        var k = keys[i];
        this.obj = {
          url: infor[k].url,
          key: k
        }

        this.globalPic[i] = infor[k].url
        //  this.picarray.push(objpic);
        //console.log(this.globalPic);

      }

    }, (error) => {

      console.log(error.message);


    });


    this.db.retrieveProfile().on("value", (data) => {
      let profile = data.val();
      let key = Object.keys(profile);

      console.log(key);

      for (var i = 0; i < key.length; i++) {
        let k = key[i];

        let role = profile[k].Role;
        console.log(role);

        if (role == "Dj") {

          console.log("dj" + k)
        }
        else {
          console.log("audience" + k)
        }


      }



      //////



      let profileDetails = profile.stagename
      this.role = profile.Role
      let keysProfile = Object.keys(profile.Role == "Dj");

      console.log(keysProfile);
      //console.log(profile);
      this.profilearray = [];
      for (var i = 0; i < keysProfile.length; i++) {
        let k = keysProfile[i];
        let role = profile[k].Role
        //console.log(role);

        //  if(role=="Dj"){
        //console.log(profile);
        this.obj = {
          stagename: profile[k].stagename,
          roles: profile[k].Role,
          key: k
        }

        //if(this.obj.roles=="Dj")
        //{
        console.log("dj");
        ///}
        //  }



        // this.globalDetails[i] = profile[k].stagename
        this.profilearray.push(this.obj);
        //     console.log("details");



      }




      //console.log(this.globalPic);
      // console.log(this.globalDetails);

      //  console.log(this.profilearray);


      for (let i = 0; i < this.globalDetails.length; ++i) {

        let objdetails = {
          pic: this.globalPic[i],
          name: this.globalDetails[i],
          role: this.role

        }
        this.globalarr.push(objdetails);
        ///console.log(this.globalarr);

      }


    });





  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

  view(i) {

    console.log(i);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        //this.navCtrl.setRoot('ProfilePage',{objs:i});
        console.log(this.globalarr[i]);
      } else {
        console.log("User has not sign in");
      }


    });

  }

}
