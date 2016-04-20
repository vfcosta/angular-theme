import {Component, Inject, Input} from "ng-forward";
import {SidebarNotificationService} from "./sidebar.notification.service";

@Component({
    selector: 'sidebar',
    templateUrl: 'app/layout/sidebar/sidebar.html'
})
@Inject(SidebarNotificationService)
export class SidebarComponent {

    @Input('visible')
    private isVisible: boolean = false;

    constructor(private notificationService: SidebarNotificationService) { }

    ngOnInit() {

        this.notificationService.setVisibility(this.isVisible);
        this.notificationService.subscribe((visible) => {
            this.isVisible = visible;
        });
    }
}
