import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {AccountService} from "../../services/user.service";
import {InAppBrowser, InAppBrowserOptions} from '@ionic-native/in-app-browser';
import {WaterMarkerOptionModel} from 'cc-water-marker';

@IonicPage()
@Component({
  selector: 'page-look-secources',
  templateUrl: 'look-secources.html',
  providers: [AccountService]
})
export class LookSecourcesPage {
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
  ddd: '';
  //浏览器配置
  options: InAppBrowserOptions = {
    location: 'no',//Or 'no'
    hidden: 'no', //Or  'yes'
    clearcache: 'yes',
    clearsessioncache: 'yes',
    zoom: 'yes',//Android only ,shows browser zoom controls
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only
    closebuttoncaption: '关闭', //iOS only
    disallowoverscroll: 'yes', //iOS only
    toolbar: 'yes', //iOS only
    enableViewportScale: 'yes', //iOS only
    allowInlineMediaPlayback: 'no',//iOS only
    presentationstyle: 'fullscreen',//iOS only
    fullscreen: 'yes',//Windows only
  };
  imgUrlList: any = [
    {
      "title": "page-0",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-0.png"
    },
    {
      "title": "page-1",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-1.png"
    },
    {
      "title": "page-2",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-2.png"
    },
    {
      "title": "page-3",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-3.png"
    },
    {
      "title": "page-4",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-4.png"
    },
    {
      "title": "page-5",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-5.png"
    },
    {
      "title": "page-6",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-6.png"
    },
    {
      "title": "page-7",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-7.png"
    },
    {
      "title": "page-8",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-8.png"
    },
    {
      "title": "page-9",
      "type": "img",
      "url": "http://v3.xiaosk.com:41971/images/page-9.png"
    },
    {
      "title": "ggg.pdf",
      "type": "pdf",
      "url": "http://v3.xiaosk.com:41971/images/ggg.pdf"
    },
    {
      "title": "Cocos_sz_10.mp4",
      "type": "mp4",
      "url": "http://v3.xiaosk.com:41971/images/Cocos_sz_10.mp4"
    }
  ];

  constructor(public navCtrl: NavController,
              private accountService: AccountService,
              private iab: InAppBrowser,
              private platform: Platform) {
  }

  viewImg(img) {
    if (img.type === 'img') {
      this.navCtrl.push('ViewImgPage', {imgUrl: img})
    } else if (img.type === 'pdf') {
      if (this.platform.is('ios')) {
        this.iab.create(img.url, '_blank', this.options);
      } else {
        // @ts-ignore
        window.plugins.OpenPDF.openWithUrl(img.url, function (data) {
        }, function (data) {
        });
      }
    } else {
      this.iab.create(img.url, '_blank', this.options);
    }

  }

  getDataList() {
    this.accountService.getDataList().then((data) => {
      this.imgUrlList = data;
    })
  }

  ionViewWillEnter() {
    this.getDataList()
  }
}
