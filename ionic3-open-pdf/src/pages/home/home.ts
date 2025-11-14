import {Component, ViewChild} from '@angular/core';
import {Content, NavController} from 'ionic-angular';
import {WaterMarkerOptionModel} from "cc-water-marker";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  // 水印配置
  optionsWater: WaterMarkerOptionModel;
  @ViewChild('Content') content: Content;

  constructor(public navCtrl: NavController) {
  }

  viewImg() {
    this.navCtrl.push('LookSecourcesPage')
  }

  ionViewWillEnter() {
    this.optionsWater = {
      watermarkLabel: '这是一个水印',
      watermarkX: 0,
      watermarkY: 0,
      watermarkXSpace: 5,
      watermarkYSpace: 5,
      watermarkColor: 'red',
      watermarkFontSize: '16px',
      watermarkAlpha: 0.3,
      showWaterMark: true
    };
    this.content.resize();
  }

}
