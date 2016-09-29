import {Component} from '@angular/core';
@Component(
    {
        selector: 'my-app',
        template: `
            <h1>{{title}}</h1>
            <nav>
                <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a><!--routerLinkActive allows us to add a css class to the active link"-->
                <a routerLink="/heroes" routerLinkActive="active">Heroes</a>
            </nav>
            <router-outlet></router-outlet><!-- the router displays each component immediately below the <router-outlet>-->

        `,
        styleUrls:['app/app.component.css']
    }
)
export class AppComponent{
    title = 'Tour of Heroes';
}
