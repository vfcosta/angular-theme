import {Injectable, Output, EventEmitter, Inject} from 'ng-forward';
import {INoosferoLocalStorage} from "./../../shared/models/interfaces";

@Injectable()
@Inject("$localStorage")
export class DesignModeService {
    @Output() onToggle: EventEmitter<boolean> = new EventEmitter<boolean>();

    isInDesignMode(): boolean {
        return this.$localStorage.settings.designModeOn;
    }
    
    destroy() {
        this.$localStorage.settings = {};
    }

    setInDesignMode(value: boolean) {
        if (this.$localStorage.settings.designModeOn !== value) {
            this.$localStorage.settings.designModeOn = value;
            this.onToggle.next(value);
        }
    }

    constructor(private $localStorage: INoosferoLocalStorage) {
        if (!this.$localStorage.settings) {
            this.$localStorage.settings = {};
        }
    }
}
