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

  arrDj=[];
  arrSt=[];
  
  categoriesArr;

  constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider) {
    this.categoriesArr= this.db.categories();

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

    for(var i = 0; i <key.length; i++)
    {
        let k = key[i];
      
      let role=profile[k].Role;
      let stagename= profile[k].stagename;

      console.log(role);

      
      
      if(role=="Dj"){

        if(stagename!=null)
        {
          console.log("dj" +k)
          let objDj ={
            role:role,
            stagename:stagename,
            url:this.globalPic[i],
            key:k
         }
         this.arrSt.push(stagename);
         console.log("lebo")
         console.log(this.arrSt)
  
         
  
         this.arrDj.push(objDj);
         console.log(this.arrDj);
        }
        else{
            console.log("no data")
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

 
 
  generateTopics() {
    // this.topics = [
    //   'Storage in Ionic 2',
    //   'Ionic 2 - calendar',
    //   'Creating a Android application using ionic framework.',
    //   'Identifying app resume event in ionic - android',
    //   'What is hybrid application and why.?',
    //   'Procedure to remove back button text',
    //   'How to reposition ionic tabs on top position.',
    //   'Override Hardware back button in cordova based application - Ionic',
    //   'Drupal 8: Enabling Facets for Restful web services',
    //   'Drupal 8: Get current user session',
    //   'Drupal 8: Programatically create Add another field - Example',  
    // ];

    this.arrSt;
    //console.log(this.arrSt);
  }
 
  getTopics(ev: any) {
    this.generateTopics();
    let serVal = ev.target.value;
    if (serVal && serVal.trim() != '') {
      this.arrSt = this.arrSt.filter((data) => {
       return (data.toLowerCase().indexOf(serVal.toLowerCase()) > -1);
     })
    }
  }

view(i){

  console.log(i);

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      console.log("User has sign in");
      //this.navCtrl.setRoot('ProfilePage',{objs:i});
      console.log(this.arrDj[i]);
    } else {
      console.log("User has not sign in");
    }


    });

}


}
