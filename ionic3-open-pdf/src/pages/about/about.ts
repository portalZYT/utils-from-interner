import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {WaterMarkerOptionModel} from "cc-water-marker";

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
// 水印配置
  optionsWater: WaterMarkerOptionModel = {
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
  constructor(public navCtrl: NavController) {

  }

}
