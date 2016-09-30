import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';// a subject is a producer of an observable event stream

import {HeroSearchService} from './hero-search.service'
import {Hero} from './hero';

@Component({
    moduleId: module.id,
    selector: 'hero-search',
    templateUrl: '../hero-search.component.html',
    styleUrls: ['../hero-search.component.css'],
    providers: [HeroSearchService]
})
export class HeroSearchComponent implements OnInit{
    heroes: Observable<Hero[]>;
    private searchTerms = new Subject<string>();//searchTerms produces an observable of strings, the filter criteria for a name search

    constructor(
        private heroSearchService: HeroSearchService,
        private router: Router
    ){}

    //push a search term into the observable stream
    search(term: string): void{
        this.searchTerms.next(term);//put a new string into the subject's observable stream
    }

    ngOnInit(): void {
        //a subject is also an observable. We're gonig to turn the steram of search terms into a stream of Hero arrays and assign the resutl to the heroes property
        //canceling the obseravable won't actually abort a pending http request until the service supports that feature
        this.heroes = this.searchTerms
            .debounceTime(300) //wait for 300ms pause in events this means we're not constantly making requests
            .distinctUntilChanged() //ignore if next search term is same as previous
            .switchMap(term => term //switch to new observable each time. Cancels and discards previous search observables, returning only the latest search service observable
                //return the http search observable
                ? this.heroSearchService.search(term)
                //or the observable of empty heroes if no search term
                : Observable.of<Hero[]>([]))
            .catch(error => {
                console.log(error);
                return Observable.of<Hero[]>([]);
            });
    }

    gotoDetail(hero: Hero): void{
        let link = ['/detail', hero.id];
        this.router.navigate(link);
    }
}