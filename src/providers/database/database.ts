import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import firebase from 'firebase';
/*
  Generated class for the DatabaseProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/


@Injectable()
export class DatabaseProvider {

 

  constructor(public http: HttpClient) {
    console.log('Hello DatabaseProvider Provider');
  }




  update(userID,obj)
  {
    firebase.database().ref('Registration/'+userID).update(obj);
      
  }
 
  registerUser(email,password)
  {
    return firebase.auth().createUserWithEmailAndPassword(email,password); 
      
  }


  login(email:string, password: string){
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  getPlace() {
    let url = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=restaurants+in+Sydney&key=AIzaSyCaiFLiLXtxHiy2O3wp1C3B9QreRdk42cQ';
    
    return new Promise(resolve => {
      this.http.get(url).subscribe(data => {
        resolve(data);
        console.log(data);
      }, err => {
        console.log(err);
      });
    });
  }

  resetPassword(email:string){

    return firebase.auth().sendPasswordResetEmail(email);
    
    
  }

  uploadTrack(filename, file) {
    let timestamp = Number(new Date());
    console.log(timestamp);
    //todo
    return firebase.storage().ref(`/tracks/${timestamp+filename.name}`).put(file);
  }

  retrieveSong(song){
    return new Promise ((accpt, rej) =>{
    
      let storageRef =  firebase.storage().ref();
      storageRef.child('/tracks/' + song).getDownloadURL().then(function(url) {
        accpt(url)
      })

    })

  }


   saveArtists(userID,obj)
   {
     return  firebase.database().ref('artists/' +userID).push(obj);
   }
}
