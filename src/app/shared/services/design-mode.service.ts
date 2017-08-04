import {LocalStorageService, SessionStorageService} from 'ngx-webstorage';
import { Injectable, Output, EventEmitter, Inject } from '@angular/core';

@Injectable()
export class DesignModeService {

    @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    constructor(private localStorageService: LocalStorageService) {
        this.onToggle.next(this.isInDesignMode());
    }

    isInDesignMode(): boolean {
        return this.localStorageService.retrieve('designModeOn');
    }

    destroy() {
        this.localStorageService.clear('designModeOn');
    }

    setInDesignMode(value: boolean) {
        if (this.isInDesignMode() !== value) {
            this.localStorageService.store('designModeOn', value);
            this.onToggle.next(value);
        }
    }
}
