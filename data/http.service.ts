import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Joke } from '../data/chuks-joke';
import { LocalService } from './local.service';

@Injectable()
export class HttpService {
    constructor(private http: HttpClient, private localService: LocalService) {};
    
    getJoke(): Observable<Joke> {
        return this.http.get('https://api.chucknorris.io/jokes/random').pipe(
            map( data => {
                return {
                    id: data['id'],
                    value: data['value'],
                    isFavourite: this.localService.hasInFavourites(data['id'])
                };
            })
        );
    }
    
}