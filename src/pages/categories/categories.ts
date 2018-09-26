import { Component } from '@angular/core';
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
  globalPic =[];
  globalDetails=[];
role;
  keysProfile:any;
  keysPic:any;
  pic;
  globalarr=[];
  picarray = [];
  profilearray=[]
  keys;
  categoriesArr;
  arrDj=[];

  //categoriesArr = ['Deep House', 'Kwaito', 'Afro-Pop', 'Dance Music', 'Commercial House', 'Kasi Rap', 'R&B', 'Commercial Hip Hop', 'Underground Hip Hop', 'Soul', 'Jazz', 'Neo Soul', 'Fusion'];

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    let userID;

    ///picture
  this.categoriesArr = this.db.categories();
  console.log(this.categoriesArr);
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

///Djs details
    this.db.retrieveProfile().on("value", (data) => {
       let profile = data.val();
       let key = Object.keys(profile);

    console.log(key);

    for(var i = 0; i <key.length; i++)
     {
        let k = key[i];
      let stagename = profile[k].stagename
      let role=profile[k].Role;
      let genre = profile[k].genre;

      console.log(role + genre);
      if(role=="Dj"){
        if(genre!= null && stagename!=null){    
           console.log("dj" + k + stagename )
        let objDj ={
          role:role,
          stagename:stagename,
          genre:genre,
          url:this.globalPic[i],
          key:k
      }
      

     console.log(objDj);
    this.arrDj.push(objDj);
  }
  else{
    console.log("no stage name or genre"+k)  
  }
     
    }
      else{
        console.log("audience"+k)
      }
     
    }
  
   });


  


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoriesPage');
  }

view(i){
 let keys  = this.arrDj[i].key
  console.log(i);
  console.log("//// key")
  console.log(keys)

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("User has sign in");
      this.navCtrl.setRoot('ViewProfilePage',{keyobj:keys});
      console.log(this.arrDj[i]);

    } else {
      console.log("User has not sign in");

    }


    });

}
page(){
  this.navCtrl.setRoot('ProfilePage');
}

}
