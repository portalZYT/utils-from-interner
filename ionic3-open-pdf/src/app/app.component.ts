import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabsPage} from '../pages/tabs/tabs';
import {WaterMarkerOptionModel} from "cc-water-marker";

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = TabsPage;
  // 水印配置
  optionsWater: WaterMarkerOptionModel = {
    watermarkLabel: '这是一个水印',
    watermarkX: 0,
    watermarkY: 0,
    watermarkXSpace: 5,
    watermarkYSpace: 5,
    watermarkColor: 'gray',
    watermarkFontSize: '16px',
    watermarkAlpha: 0.3,
    showWaterMark: true
  };

  constructor(public platform: Platform,
              public statusBar: StatusBar,
              public splashScreen: SplashScreen) {
    this.initializeApp();
  }


  onDeviceReady = () => {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    })
  };

  initializeApp() {
    document.addEventListener("deviceready", this.onDeviceReady, false);
  }

}
