import {Component, OnInit} from '@angular/core';
import {Hero} from './hero'
import { HeroService } from './hero.service';
import { Router } from '@angular/router';
//
@Component({
    moduleId: module.id,//using this means that you can take advantage of realtive paths hence the ../ in templateUrl and sytleUrl
    selector: 'my-heroes',
    templateUrl: '../heroes.component.html',
        //<my-hero-detail [hero] = "selectedHero"></my-hero-detail> sets the component's hero property to a hero object through binding
    styleUrls: ['../heroes.component.css']    
})

export class HeroesComponent implements OnInit{    
    heroes: Hero[];
    selectedHero: Hero;
    constructor(private heroService: HeroService, private router: Router){}
    onSelect(hero: Hero): void {
        this.selectedHero = hero;
    }

    getHeroes(): void {
        // this.heroes = this.heroService.getHeroes();
        this.heroService.getHeroes().then(heroes => this.heroes = heroes);
    }

    ngOnInit(): void{
        this.getHeroes();
    }

    gotoDetail(): void{
        let link = ['/detail', this.selectedHero.id];
        this.router.navigate(link);        
    }
}



/***
 * try this
 class TestStatus {
    id: number
    name: string

    constructor(id, name){
        this.id = id;
        this.name = name;
    }
}

type Statuses = Array<TestStatus>;

var statuses: Statuses = [
    new TestStatus(0, "Available"),
    new TestStatus(1, "Ready"),
    new TestStatus(2, "Started")
]
 */