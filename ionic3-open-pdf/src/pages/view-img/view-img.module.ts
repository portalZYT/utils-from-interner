import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {ViewImgPage} from './view-img';
// 水印
import {WaterMarkerModule} from 'cc-water-marker';

@NgModule({
  declarations: [
    ViewImgPage,
  ],
  imports: [
    IonicPageModule.forChild(ViewImgPage),
    WaterMarkerModule
  ],
})
export class ViewImgPageModule {
}
