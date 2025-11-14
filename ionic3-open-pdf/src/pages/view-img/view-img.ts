import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {WaterMarkerOptionModel} from "cc-water-marker";


@IonicPage()
@Component({
  selector: 'page-view-img',
  templateUrl: 'view-img.html',
})
export class ViewImgPage {
  img: any;
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
  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.img = this.navParams.get('imgUrl');
  }

  ionViewWillEnter() {
  }

}
