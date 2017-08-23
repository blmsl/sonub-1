import { Component, OnInit } from '@angular/core';
import { AppService } from './../../../../providers/app.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'chat-page',
    templateUrl: 'chat.html'
})

export class ChatPage implements OnInit {
    message = '';
    otherUid = '';
    chats: Array<any>;
    constructor(
        private active: ActivatedRoute,
        public app: AppService
    ) {

        active.params.subscribe(params => {
            if ( params['id'] ) {
                app.db.child('xapi-uid').child( params['id'] ).once('value', snap => {
                    if ( snap ) {
                        let val = snap.val();
                        this.otherUid = val['uid'];
                        console.log("uid:", this.otherUid);

                        this.observeChat();
                    }
                    else {
                        /// error
                        app.warning('Wrong user. User Xapi ID does not exist on firebase.');
                    }
                    
                });
            }
        });



    }

    ngOnInit() { }


    observeChat() {

        this.app.db.child( this.myPath ).limitToLast( 10 ).on('value', snap => {
            if ( ! snap ) {
                /// error
                return
            }
            let val = snap.val();
            let keys = Object.keys(val);
            this.chats = [];
            for( let key of keys.reverse() ) {
                this.chats.push( val[key] );
            }
            console.log( this.chats );
            this.app.rerenderPage();
        });
    }

    get myPath() {
        return `chat/message/${this.app.auth.currentUser.uid}/${this.otherUid}`;
    }
    get otherPath() {
        return `chat/message/${this.otherUid}/${this.app.auth.currentUser.uid}`;
    }

    onSubmit() {
        console.log("message: ", this.message);
        
        this.app.db.child( this.myPath ).push().set({message: this.message});
        this.app.db.child( this.otherPath ).push().set({message: this.message});

        this.message = '';
    }
}
