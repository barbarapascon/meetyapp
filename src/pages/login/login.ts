import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth'
//import { ProfilePage } from "../profile/profile";
import { HomePage } from "../home/home";
import { ProfilePage } from "../profile/profile";
import { RegisterPage } from "../register/register";
import { AlertController } from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;

  constructor(public alertCtrl: AlertController,private afAuth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams) {

  }
    showAlert() {
    let alert = this.alertCtrl.create({
      title: 'Erro!',
      subTitle: 'Nome do email ou senha inválido',
      buttons: ['OK']
    });
    alert.present();
  }

  async login(user: User) {
    try {
      const result = await this.afAuth.auth.signInWithEmailAndPassword(user.email, user.password).then(result => {
        if(result){
          console.log(result);
          this.navCtrl.setRoot(HomePage);
        }
      }).catch(error => {
        this.showAlert();
      });
      
    }
    catch(e){
      console.error(e);
    }
  }
  Register() {
    this.navCtrl.push(RegisterPage);
  }




}
