import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import firebase from 'firebase';
import { NgForm } from '@angular/forms';
import { ProfilePage } from '../profile/profile';

/**
 * Generated class for the UploadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-upload',
  templateUrl: 'upload.html',
})
export class UploadPage {
  artistName;
  albumName;
  trackName;
  arrProfile = new Array();

  name;
  surname;
  selectedfile;
  filename;


  constructor(public navCtrl: NavController, public navParams: NavParams,public db:DatabaseProvider,public loadingCtrl: LoadingController) {

     
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad TrackUploadPage');

    firebase.auth().onAuthStateChanged((user)=> {
      if (user) {
        console.log('User has sign in');
        var id =firebase.auth().currentUser.uid;

        console.log(id);
 
        firebase.database().ref('Registration/' +id).on('value', (data: any) => {
 
          var userDetails = data.val();
     
          console.log(userDetails);
    
          var userID =firebase.auth().currentUser.uid;
    
          console.log(userID);
 
          if(userDetails!=null && userDetails!='')
          {
            let obj = {
              id:userID,
              artistName: userDetails.stagename,
            
            
           
            }
           
            this.arrProfile.push(obj);

            this.artistName=obj.artistName;
         
            //yes i did change
            //changes

            console.log(this.artistName);
           console.log(obj);
          }
          else if(userDetails===null && userDetails===''){
            console.log('User doesnt exist')
          }
         
     
        })
       
        this.arrProfile=[];
 
      }
      else{
        console.log('User has not sign in');
 
   
        
      }
    });
  }

  url ='http://www.dealnetcapital.com/files/2014/10/blank-profile.png';


  upload(event: any){
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      }
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      this.selectedfile = event.target.files[0];
      this.filename = this.selectedfile.name;
    
 
  }
}

  saveArtist(form: NgForm)
  {
    console.log(this.artistName);

      let obj={
        artistName:form.value.artistName,
        trackName:form.value.trackName
  
      }

      var storageRef = firebase.storage().ref('tracks/' + this.filename);
 
      var metadata = { contentType: 'audio/mp3', size: 0.75 }
      var uploadTask = storageRef.put(this.selectedfile, metadata);
 
     uploadTask.on('state_changed', function (snapshot) {
 
      }, function (error) {
        // Handle unsuccessful uploads
        console.log("error !!1");
      }, function () {
        // Handle successful uploads on complete
        console.log("successful !!1");

        uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
          console.log('File available at', downloadURL);
 
          firebase.auth().onAuthStateChanged((user) => {
            if (user) {
              console.log('User has sign in');
              var userID = firebase.auth().currentUser.uid;
            
              firebase.database().ref('track/' + userID).push({
                url: downloadURL,
              });
 
              console.log(userID);
 
            }
            else {
              console.log('User has not sign in');
            }
          });
 
        });
      });

      let loading = this.loadingCtrl.create({
        content: 'Please wait...',
        duration: 10000
        
      });
    
      loading.present();
    
      setTimeout(() => {
        var userId = firebase.auth().currentUser.uid;
        this.db.saveArtists(userId,obj).then(()=>{
        });

       this.navCtrl.setRoot('ProfilePage');

        
      }, 10000);
     
      
  }

  click(i)
  {
    alert(i);
  }
}
