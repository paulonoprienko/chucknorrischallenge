import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { LocalService } from '../data/local.service';

@Component({
    selector: 'app-favlist',
    templateUrl: './favlist.component.html',
    styleUrls: ['./favlist.component.css']
})
export class FavlistComponent implements OnInit, OnDestroy {

    list: {id: string, value: string}[] = [];
    private changeTrackerSub: Subscription;

    constructor(private localService: LocalService) {}

    ngOnInit() {
        this.changeTrackerSub = this.localService.changeTracker$.subscribe(data => {
            this.list = ( Array.from(data, ([id, value]) => ({id, value})) ).reverse();
        });
    }

    remove(id: string) {
        this.localService.removeItemFromFavs(id);
    }

    ngOnDestroy() {
        this.changeTrackerSub.unsubscribe();
    }

}