import { Component, ViewChild } from '@angular/core';
import { Platform, MenuController, Nav, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireDatabaseModule, AngularFireDatabase } from "angularfire2/database";
import { FirebaseObjectObservable } from 'angularfire2/database-deprecated';

import { AngularFireAuthModule, AngularFireAuth } from 'angularfire2/auth';
import { AngularFireModule } from 'angularfire2';

import { HomePage } from '../pages/home/home';
import { MapProxPage } from '../pages/Map-prox/Map-prox';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { listaProxPage } from '../pages/lista-prox/lista-prox';
import { Novoevento2Page } from '../pages/novoevento2/novoevento2';
import { SugerirPage } from '../pages/sugerir/sugerir';
import { SugestoesPage } from '../pages/sugestoes/sugestoes';
import * as firebase from 'Firebase';
import { NovoeventoPage } from '../pages/novoevento/novoevento';
import { DetalheseventoPage } from '../pages/detalhesevento/detalhesevento';
import { MeuseventosPage } from '../pages/meuseventos/meuseventos';
import { EditareventoPage } from '../pages/editarevento/editarevento';
import { Geolocation } from '@ionic-native/geolocation'; //plugin nativo cordova instalado via npm 


// const config = {
//   apiKey: "mykey",
//   authDomain: "geoloc-----.firebaseapp.com",
//   databaseURL: "https://geoloc-----.firebaseio.com",
//   projectId: "geoloc----",
//   storageBucket: "geoloc----.appspot.com",
//   messagingSenderId: "ididid"
// };
declare var google: any;
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{ title: string, component: any }>;

  constructor(private alertCtrl: AlertController,private geolocation: Geolocation, platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, menu: MenuController) {
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'Novo evento', component: NovoeventoPage },
      { title: 'Meus eventos', component: MeuseventosPage },
      { title: 'Mapear eventos', component: MapProxPage },
      { title: 'Próximos eventos', component: listaProxPage },
      { title: 'Sugerir', component: SugerirPage },
      { title: 'Sugestões', component: SugestoesPage },

    ];


    platform.ready().then(() => {
      menu.enable(true);
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      let optionsGPS = { timeout: 4000, enableHighAccuracy: true };
      geolocation.getCurrentPosition(optionsGPS).then((result) => {
        let gpson = new google.maps.LatLng(result.coords.latitude, result.coords.longitude);
      }).catch((err) => {
        let alert = this.alertCtrl.create({
          title: 'Ative seu GPS',
          subTitle: '...e reinicie o aplicativo para te localizarmos.',
          buttons: ['Ok']
        });
        alert.present();
      });
    });
    // firebase.initializeApp(config);

  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

}
