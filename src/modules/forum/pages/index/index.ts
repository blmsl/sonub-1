import { Component, OnInit, NgZone } from '@angular/core';
import { AppService } from './../../../../providers/app.service';

@Component({
    selector: 'forum-index-page',
    templateUrl: 'index.html'
})

export class ForumIndexPage implements OnInit {
    html = '';
    constructor(
        private zone: NgZone,
        public app: AppService
    ) {
        app.section('forum');
        app.wp.page('forum-index').subscribe(html => {
            // console.log("page: ", html);
            this.html = html;
            setTimeout(() => this.listenUrlClick(), 1000);
            // this.listenUrlClick();
            // zone.run( () => this.listenUrlClick() );
        }, e => app.warning({ code: -404 }));



    }

    ngOnInit() {
        
    }

    listenUrlClick() {

        let nodes:NodeList = document.querySelectorAll('.page-body-content-layout > .b [routerLink]');
        let links: Array<Node> = Array.from( nodes );
        console.log("links: ", links);


        links.forEach(link => {
            link.addEventListener('click', e => {
                let url = e.srcElement.getAttribute('routerLink');
                console.log( url );
            });

            // let listener = this.renderer.listen(anchor,'click',e=>{
            //      e.preventDefault();
            //      let href = e.srcElement.getAttribute('href');
            //      this.router.navigateByUrl(href);
            // }
        });

    }


    
}
