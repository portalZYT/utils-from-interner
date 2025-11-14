import {NgModule} from '@angular/core';
import {IonicPageModule} from 'ionic-angular';
import {LookSecourcesPage} from './look-secources';
import {InAppBrowser} from '@ionic-native/in-app-browser';
import {DirectivesModule} from "../../directives/directives.module";
import {WaterMarkerModule} from "cc-water-marker";

@NgModule({
  declarations: [
    LookSecourcesPage,
  ],
  imports: [
    IonicPageModule.forChild(LookSecourcesPage),
    DirectivesModule,
    WaterMarkerModule
  ],
  providers: [
    InAppBrowser
  ]
})
export class LookSecourcesPageModule {
}
