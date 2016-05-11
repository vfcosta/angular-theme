import {Injectable, EventEmitter} from "ng-forward";


@Injectable()
export class SidebarNotificationService {
    private alternateVisibilityEvent: EventEmitter<boolean> = new EventEmitter<boolean>();
    public sidebarVisible: boolean = false;

    getCurrentVisibility() {
        return this.sidebarVisible;
    }

    alternateVisibility() {
        this.sidebarVisible = !this.sidebarVisible;
        this.alternateVisibilityEvent.next(this.sidebarVisible);
    }

    setVisibility(visibility: boolean) {
        this.sidebarVisible = visibility;
        this.alternateVisibilityEvent.next(this.sidebarVisible);
    }

    subscribe(fn: (visible: boolean) => void) {
        this.alternateVisibilityEvent.subscribe(fn);
    }

}
