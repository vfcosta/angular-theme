import {Component, Injectable, Output, EventEmitter} from 'ng-forward';
import {BodyStateClassesService} from './../layout/services/body-state-classes.service';

@Injectable()
export class DesignModeService {
    @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    private designModeOn: boolean = false;

    constructor() {
    }

    toggle() {
        this.designModeOn = !this.designModeOn;
        this.onToggle.next(this.designModeOn);
    }
}