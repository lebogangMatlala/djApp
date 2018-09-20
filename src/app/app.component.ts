import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: string = 'SplashPage';

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyBcha08Y3N17aPJqUm869JYNwoDuKuKZfU",
      authDomain: "hertzwave-1ce74.firebaseapp.com",
      databaseURL: "https://hertzwave-1ce74.firebaseio.com",
      projectId: "hertzwave-1ce74",
      storageBucket: "hertzwave-1ce74.appspot.com",
      messagingSenderId: "622484760811"
    })
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}