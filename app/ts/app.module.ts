import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

//Imports for loadign and configuring the in-memory web api
import {InMemoryWebApiModule} from 'angular2-in-memory-web-api';//replaces the default Http client backend with an in memory web API alternative service
import {InMemoryDataService} from './in-memory-data.service';

import {AppComponent} from './app.component';
import {HeroesComponent} from './heroes.component';
import {DashboardComponent} from './dashboard.component';
import {HeroDetailComponent} from './hero-detail.component';
import {HeroSearchComponent} from './hero-search.component';
import {HeroService} from './hero.service';
//import {SlowHeroService} from './slow-hero.service';
import {routing} from './app.routing';
import './rxjs-extensions';
/***
1. imports makes the exported declarations of other modules available in the current module
2. declarations are to make directives from the current module available to other directives in the current module. Selectors of directives, components or pipes are only matched against the HTML if they are declared or imported.
3. providers are to make services and values known to DI. They are added to the root scope and they are injected to other services or directives that have them as dependency.

A special case for providers are lazy loaded modules that get their own child injector. providers of a lazy loaded module are only provided to this lazy loaded module by default (not the whole application as it is with other mdoules).
*/
@NgModule({
    imports: [BrowserModule, FormsModule, routing, HttpModule, InMemoryWebApiModule.forRoot(InMemoryDataService)],//these will be available throughout the app. You still have to do an import but don't have to for example specify it as a provider for a component
    declarations: [AppComponent, HeroDetailComponent, HeroesComponent, DashboardComponent, HeroSearchComponent] ,
    bootstrap: [AppComponent],
    providers:[HeroService]//these providers will be available in every component
    //register application wide services in the root AppModule providers section
    /**
     As opposed to putting HeroService in the providers array of each component, this creates a singleton HeroService instance, available to all components of the application. Angular will inject HeroService
     */
    //providers: [{provide: HeroService, useClass:SlowHeroService}]//this is how we can use dependency injection to choose what version of the class to use
})
export class AppModule{}
/***
 * 
-imports makes the exported declarations of other modules available in the current module
-declarations are to make directives from the current module available to other directives in the current module. Selectors of directives, components or pipes are only matched against the HTML if they are declared or imported.
-providers are to make services and values known to DI. They are added to the root scope and they are injected to other services or directives that have them as dependency.
 */
 
 /**
 
 The applications in Angular follow modular structure. The Angular apps will contain many modules, each dedicated to the single purpose. Typically module is a cohesive group of code which is integrated with the other modules to run your Angular apps.
 */