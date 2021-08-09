import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class LocalService {

    private favourites: Map<string, string>;

    private changeTracker: BehaviorSubject<Map<string, string>>;
    changeTracker$: Observable<Map<string, string>>;

    private removedItemId: Subject<string>;
    removedItemId$: Observable<string>;

    constructor() {
        this.favourites = new Map( JSON.parse(localStorage.getItem('favourites')) );

        this.changeTracker = new BehaviorSubject(this.favourites);
        this.changeTracker$ = this.changeTracker.asObservable();

        this.removedItemId = new Subject<string>();
        this.removedItemId$ = this.removedItemId.asObservable();
    }

    onChangeEvent() {
        this.changeTracker.next(this.favourites);
    }

    addItemToFavs(id: string, value: string) {

        if(!(this.favourites.size < 10)) {
            this.removeFirst();
        }

        this.favourites.set(id, value);

        localStorage.setItem(
            'favourites',
            JSON.stringify(Array.from(this.favourites.entries()))
        );

        this.onChangeEvent();
    }



    removeItemFromFavs(id: string) {
        this.favourites.delete(id);

        localStorage.setItem(
            'favourites',
            JSON.stringify(Array.from(this.favourites.entries()))
        );

        this.removedItemId.next(id);

        this.onChangeEvent();
    }

    removeFirst() {
        const temp = Array.from(this.favourites.entries()).shift();
        if(temp !== undefined){
            this.removeItemFromFavs(temp[0]);
        }
    }

    removeAll() {
        this.favourites.clear();

        localStorage.setItem(
            'favourites',
            JSON.stringify(Array.from(this.favourites.entries()))
        );

        this.onChangeEvent();
    }

    hasInFavourites(id: string): boolean {
        return this.favourites.has(id);
    }

}