import {
    Component, OnDestroy, OnInit
} from '@angular/core';
import { HttpService } from '../data/http.service';
import { LocalService } from '../data/local.service';
import { Joke } from '../data/chuks-joke';
import { Subscription, timer } from 'rxjs';

@Component({
    selector: 'app-jokearea',
    templateUrl: './joke-display.component.html',
    styleUrls: ['./joke-display.component.css']
})
export class JokeDisplayComponent implements OnInit, OnDestroy {

    joke: Joke = new Joke();
    timerStarted: boolean;

    private timerSub: Subscription;
    private removedItemIdSub: Subscription;

    constructor(private httpService: HttpService, private localService: LocalService) {}

    ngOnInit() {
        this.removedItemIdSub = this.localService.removedItemId$.subscribe(data => {
            this.onRemoveFromFavs(data);
        });
    }

    onRemoveFromFavs(id: string) {
        if(this.joke.id === id) {
            this.joke.isFavourite = false;
        }
    }

    getOneJoke() {
        this.httpService.getJoke().subscribe(
            (data) => (this.joke = data)
        );
    }

    inTurn(i) {
        if (this.timerStarted) {
            this.timerSub = timer(0, i * 1000).subscribe(() => {
                this.getOneJoke();
            });
        }
        else {
            this.timerSub.unsubscribe();
        }
    }

    changeFavourites() {
        if(this.joke.isFavourite) {
            this.localService.addItemToFavs(this.joke.id, this.joke.value);
        }
        else {
            this.localService.removeItemFromFavs(this.joke.id);
        }
    }

    removeAll() {
        this.localService.removeAll();
        if(this.joke) {
            this.joke.isFavourite = false;
        }
    }

    ngOnDestroy() {
        if(!this.timerStarted) {
            this.timerSub.unsubscribe();
        }
        this.removedItemIdSub.unsubscribe();
    }

}