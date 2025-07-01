import { Injectable } from '@angular/core';
import { environment } from 'src/environements/environement';
//import {TheUploadAdapterPlugin} from '../lib/the-upload-adapter-plugin';//


@Injectable({
  providedIn: 'root'
})
export class CKEditorGlobalsService {
  BACKEND_URLIMG = 'http://localhost:8090/admin/uploadFile2';
  public static CkConfig = {


    toolbar: [
      'undo',
      'redo',
      '|',
      'lineheight',
      'heading',
      'fontFamily',
      'fontSize',
      '|',
      'bold',
      'italic',
      'underline',
      'fontColor',
      'fontBackgroundColor',
      'highlight',
      '|',
      'link',
      'CKFinder',
      'imageUpload',
      'mediaEmbed',
      '|',
      'alignment',
      'bulletedList',
      'numberedList',
      '|',
      'indent',
      'outdent',
      '|',
      'insertTable',
      'blockQuote',
      'specialCharacters'
    ],
    fontSize: {
      options: [12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24,]
    },
    lineheight: {
      options: [1, 3, 4, 5]
    },
    fontFamily: {
      options: ['CairoBlack', 'CairoFont', 'CairoRegular', 'CairoBlack']
    },
    font_defaultLabel: 'CairoFont',


    language: {
      // The UI will be English.
      ui: 'en',

      // But the content will be edited in Arabic.
      content: 'ar'
    },

    simpleUpload: {
      uploadUrl: `${environment.apiURL}/uploadFile2`,
    },

    ckfinder: {
      openerMethod: 'modal',
      // The URL that the images are uploaded to.
      uploadUrl: `${environment.apiURL}/uploadFile2`,





    },
    image: {
      resizeUnit: 'px',
      // Configure the available styles.
      styles: [
        'alignLeft', 'alignCenter', 'alignRight'
      ],

      // Configure the available image resize options.
      resizeOptions: [
        {
          name: 'imageResize:original',
          label: 'Original',
          value: null
        },
        {
          name: 'imageResize:200',
          label: '200px',
          value: '200'
        },
        {
          name: 'imageResize:300',
          label: '300px',
          value: '300'
        }
      ],

      // You need to configure the image toolbar, too, so it shows the new style
      // buttons as well as the resize buttons.
      toolbar: [
        'imageStyle:alignLeft', 'imageStyle:alignCenter', 'imageStyle:alignRight',
        '|',
        'imageResize',
        '|',
        'imageTextAlternative'
      ]
    },






  };
  constructor() { }

}