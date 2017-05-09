import { Injectable, Output, EventEmitter, Inject } from 'ng-forward';
import { INoosferoLocalStorage } from "..//models/interfaces";

@Injectable()
@Inject("localStorageService")
export class DesignModeService {

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

    constructor(private localStorageService: any) {
        this.onToggle.next(this.isInDesignMode());
    }
}
