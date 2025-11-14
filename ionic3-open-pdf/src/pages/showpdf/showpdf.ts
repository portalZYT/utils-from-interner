import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';


@IonicPage()
@Component({
  selector: 'page-showpdf',
  templateUrl: 'showpdf.html',
})
export class ShowpdfPage {

  displayData: any = {};

  constructor(public navCtrl: NavController,
              public navParams: NavParams) {
    this.displayData = this.navParams.get('displayData');
    console.log(this.displayData);
  }


  goBack() {
    this.navCtrl.pop();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ShowpdfPage');
  }

}
