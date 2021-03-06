import { Component, OnInit, AfterViewInit } from '@angular/core';
import { AppService, ERROR } from './../../providers/app.service';
import { TestService } from './../../providers/test.service';
import { Router, NavigationStart } from '@angular/router';

declare let device;

@Component({
    selector: 'home-page',
    templateUrl: 'home.html'
})

export class HomePage implements OnInit, AfterViewInit {
    device = {};
    post;
    constructor(
        private router: Router,
        public app: AppService,
        // private test: TestService
    ) {
        app.section('home');
        app.layoutColumn();
        if (window['forum_post']) {
            this.post = Object.assign({}, window['forum_post']);
            window['forum_post'] = null;
        }
        document.addEventListener('deviceready', () => this.onDeviceReady(), false);
    }

    // onSubmit() {
    //     // this.app.warning({code: -1, message: 'hello'});

    //     this.app.wp.post({route:'wordpress.error'}).subscribe( res => {
    //         console.log(res);
    //     }, e => {
    //         this.app.warning(e);
    //     });

    // }
    ngOnInit() {


    }

    ngAfterViewInit() {

        // setTimeout(()=>{
        //     this.app.warning( ERROR.LOGIN_FIRST );
        // }, 10);

        // setTimeout(() => {
        //     this.app.warning("hi");
        // }, 10);

        // this.router.navigateByUrl('/forum/abc');
    }

    onDeviceReady() {
        this.device = device;
        // alert('cordova version: ' + device.cordova);
        // console.log("Cordova is ready.");
        // console.log(device.cordova);
        // console.log(device.version);
        // console.log(device.model);
    }


    // onClickLoginWithNaver() {
    //     let a = document.querySelector('#naver_id_login a');
    //     a['click']();
    // }






}
