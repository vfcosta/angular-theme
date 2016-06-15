import {Component, Injectable, Output, EventEmitter} from 'ng-forward';
import {BodyStateClassesService} from '../../layout/services/body-state-classes.service';

@Injectable()
export class DesignModeService {
    @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    private designModeOn: boolean = false;

    isInDesignMode(): boolean {
        return this.designModeOn;
    }

    setInDesignMode(value: boolean) {
        if (this.designModeOn !== value) {
            this.designModeOn = value;
            this.onToggle.next(this.designModeOn);
        }
    }

    constructor() {
    }
}