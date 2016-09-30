/***
 An Observable is a stream of events that we can process with array-like operators. converting Observable to a promise is often a good choice. 
 One advantage of Observables is teh request-cancel-new-request sequence where we send a request and cancel it before it finishes and then send a new request, something that can't 
 be easily done withe promises 
 */

import {Injectable} from '@angular/core';
import {Headers, Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Hero} from './hero';
import {HEROES} from './mock-heroes';

@Injectable()
export class HeroService{
    private heroesUrl = 'app/heroes'; //URL to web api
    private headers = new Headers({'Content-Type': 'application/json'});
    constructor(private http: Http){}

    getHeroes(): Promise<Hero[]>{
        return this.http.get(this.heroesUrl)
                    .toPromise()//convert RxJS Observable to promise
                    .then(response => response.json().data as Hero[])
                    .catch(this.handleError)
    }

    getHero(id: number): Promise<Hero> {
        return this.getHeroes()
        .then(heroes => heroes.find(hero=> hero.id === id));
    }

    update(hero: Hero): Promise<Hero> {
        const url = `${this.heroesUrl}/${hero.id}`;
        return this.http
            .put(url, JSON.stringify(hero), {headers: this.headers})
            .toPromise()
            .then(() => hero)
            .catch(this.handleError);
    }

    create(name: string): Promise<Hero> {
        return this.http
            .post(this.heroesUrl, JSON.stringify({name: name}), {headers: this.headers})
            .toPromise()
            .then(res => res.json().data)
            .catch(this.handleError);
    }

    delete(id: number): Promise<Hero> {
        const url = `${this.heroesUrl}/${id}`;
        return this.http
                    .delete(url, {headers: this.headers})
                    .toPromise()
                    .then(() => null)
                    .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error)
        return Promise.reject(error.message || error)
    }
}