import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';

import { LoadService } from './load-overlay.service';

@Component({
    selector: 'q-load-overlay',
    templateUrl: './load-overlay.component.html',
    styleUrls: ['./load-overlay.component.scss']
})
export class LoadOverlayComponent implements OnInit, OnDestroy {
    subscription: Subscription;
    loading: boolean = true;

    constructor(private loadService: LoadService) { }

    ngOnInit(){
        this.subscription = this.loadService.onLoad()
            .subscribe(result => {
                this.loading = result;
            });
    }

    ngOnDestroy(){
        this.subscription.unsubscribe();
    }
}