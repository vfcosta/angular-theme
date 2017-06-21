import { Injectable, Output, EventEmitter, Inject } from '@angular/core';
import { INoosferoLocalStorage } from "../models/interfaces";

@Injectable()
export class DesignModeService {

    constructor(@Inject("localStorageService") private localStorageService: any) {
        this.onToggle.next(this.isInDesignMode());
    }

    @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    isInDesignMode(): boolean {
        return this.localStorageService.get('designModeOn');
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
