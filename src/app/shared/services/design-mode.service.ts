import { LocalStorageService } from 'angular-2-local-storage';
import { Injectable, Output, EventEmitter, Inject } from '@angular/core';

@Injectable()
export class DesignModeService {

    constructor(private localStorageService: LocalStorageService) {
        this.onToggle.next(this.isInDesignMode());
    }

    @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    isInDesignMode(): boolean {
        return this.localStorageService.get<boolean>('designModeOn');
    }

    destroy() {
        this.localStorageService.remove('designModeOn');
    }

    setInDesignMode(value: boolean) {
        if (this.isInDesignMode() !== value) {
            this.localStorageService.set('designModeOn', value);
            this.onToggle.next(value);
        }
    }
}
