
import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import firebase from "firebase";
import { DatabaseProvider } from "../../providers/database/database";
import { NgForm } from "../../../node_modules/@angular/forms";
import { ProfilePage } from "../profile/profile";

@IonicPage()
@Component({
  selector: "page-edit",
  templateUrl: "edit.html"
})
export class EditPage {
  arrProfile = new Array();

  fullname;

  email;
  pic;
  genre;
  bio;
  stagename;
  g

  profileObj = {};
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    public loadingCtrl: LoadingController
  ) {

    console.log(this.genre,
      this.bio,
      this.stagename)
  }

  ionViewDidLoad() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log("User has sign in");
        let id = firebase.auth().currentUser.uid;

        firebase
          .database()
          .ref("Pic/" + id)
          .on(
            "value",
            data => {
              let infor = data.val();
              this.pic = infor.url;
              console.log(this.pic);
            },
            error => {
              console.log(error.message);
            }
          );

        console.log(id);

        firebase
          .database()
          .ref("Registration/" + id)
          .on("value", (data: any) => {
            let userDetails = data.val();

            console.log(userDetails);

            let userID = firebase.auth().currentUser.uid;

            console.log(userID);

            if (userDetails != null && userDetails != "") {
              let obj = {
                id: userID,
                fullname: userDetails.fullname,
                email: userDetails.email,
                bio: userDetails.bio,
                stagename:userDetails.stagename,
                genre:userDetails.genre
              };

              this.arrProfile.push(obj);

              this.fullname = obj.fullname;
              this.email = obj.email;
              this.bio=obj.bio;
              this.stagename=obj.stagename;
              this.genre=obj.genre;

              console.log(this.fullname);
              console.log(obj);
            } else if (userDetails === null && userDetails === "") {
              console.log("User doesnt exist");
            }
          });

        this.arrProfile = [];
      } else {
        console.log("User has not sign in");
      }
    });
  }

  url = "http://www.dealnetcapital.com/files/2014/10/blank-profile.png";


  insertImage(event: any) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      reader.onload = (event: any) => {
        this.url = event.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
      console.log(event.target.files);
      let selectedfile = event.target.files[0];
      let filename = selectedfile.name;
      const loader = this.loadingCtrl.create({
        content: "Please wait...",
        duration: 5000
      });
      loader.present();

      let storageRef = firebase.storage().ref("profilepic/" + filename);

      let metadata = { contentType: "image/jpeg", size: 0.75 };
      let uploadTask = storageRef.put(selectedfile, metadata);

      this.profileObj = {
        filename: filename,
        metadata: metadata
      }
      uploadTask.on(
        "state_changed",
        function(snapshot) {},
        function(error) {
          // Handle unsuccessful uploads
          alert("error !!1");
        },
        function() {
          // Handle successful uploads on complete
          alert("successful !!1");
          uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
            console.log("File available at", downloadURL);

            firebase.auth().onAuthStateChanged(user => {
              if (user) {
                console.log("User has sign in");
                let userID = firebase.auth().currentUser.uid;
                let obj = {
                  url: downloadURL
                };

                firebase
                  .database()
                  .ref("Pic/" + userID)
                  .set({
                    url: downloadURL
                  });

                console.log(userID);
              } else {
                console.log("User has not sign in");
              }
            });
          });
        }
      );

      //});
    }
  }


  input(event){

    this.genre=event.target.value
  }
  submit(form: NgForm) {

    const loader = this.loadingCtrl.create({
      content: "Please wait...",
      duration: 2500
    });
    loader.present();
  
 
    console.log(form.value.fullname + " " +form.value.email);
    console.log(form.value.bio+" " + this.genre + " " +form.value.stagename);

    let obj = {
      fullname: form.value.fullname,
      email: form.value.email,
      stagename:form.value.stagename,
      bio: form.value.bio,
      genre: this.genre 
    };

    this.arrProfile.push(obj);

    let userID = firebase.auth().currentUser.uid;


    this.db.update(userID, obj);

    //firebase.database().ref('Registration/'+userID).update(obj);

    let user = firebase.auth().currentUser;
    user
      .updateEmail(obj.email)
      .then(() => {
        // Update successful.

      this.navCtrl.setRoot("ProfilePage");
      })
      .catch(function(error) {
        // An error happened.
        console.log(error);
      });
   }
}
