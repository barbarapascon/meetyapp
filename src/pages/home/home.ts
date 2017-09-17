import { Component } from '@angular/core';
import { NavController, ToastController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth'
import { AngularFireDatabase, FirebaseObjectObservable } from "angularfire2/database";
import { Profile } from "../../models/profile";
import { ProfilePage } from "../profile/profile";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  profileData: FirebaseObjectObservable<Profile>
  
  constructor(private afAuth: AngularFireAuth, private toast: ToastController,private afDatabase: AngularFireDatabase, 
    public navCtrl: NavController,public navParams: NavParams) {

  }

  ionViewWillLoad(){
    this.afAuth.authState.subscribe(data =>{
    if(data && data.email && data.uid){
    
   this.toast.create({
        message:`wlcome to APP_NAME, ${data.email}`,
        duration:3000
    }).present();   
      this.profileData = this.afDatabase.object(`profile/${data.uid}`)
      this.profileData.subscribe(data => {
          if (!data.firstName) {
              this.navCtrl.setRoot(ProfilePage);
          }
      },
     error => {
      console.log("Error", error);
     });
    }
  else{
    this.toast.create({
        message:`nao foi possivel achar dados`,
        duration:3000
    }).present();
    
  }
  });

  }

}
