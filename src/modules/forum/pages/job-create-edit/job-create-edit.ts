import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppService, POST, FILES, FILE, POST_CREATE } from './../../../../providers/app.service';


@Component({
    selector: 'job-create-edit-page',
    templateUrl: 'job-create-edit.html'
})

export class JobCreateEditPage implements OnInit, OnDestroy {

    title: 'Job Post Title';  // generate base on the given info
    content: 'Job Post Content';  //personal message
    char_1: 'm'; //Gender
    varchar_1: ''; //profession
    varchar_2: 'all'; //province
    varchar_3: 'all'; //city
    varchar_4: '19991225'; //birthday
    int_1: '0'; //work experience
    int_2: ''; //birthday

    mobile: ''; //mobile meta
    firstName: ''; //first name meta
    middleName: ''; //middle name meta
    lastName: ''; //last name meta
    address: ''; //address meta

    files: FILES = [];
    file: FILE;
    ID;


    constructor(private activeRoute: ActivatedRoute,
                public app: AppService) {
    }

    ngOnInit() {}

    ngOnDestroy() {}


    onClickSubmit() {

        let data: POST_CREATE = {
            category: 'jobs',
            post_title: '',
            post_content: '',
            char_1: '',
            varchar_1: '',
            varchar_2: '',
            varchar_4: ''
        };
        data.fid = this.files.reduce((_, file) => { _.push(file.id); return _; }, []);
        data['ID'] = this.ID;
        this.app.forum.postCreate(data).subscribe(res => {
            console.log("Post create: ", res);
            this.app.alert.open({ content: this.app.text('saved') });
        }, e => this.app.warning(e));

    }

    onSuccessUpdateProfile() {

    }


}
