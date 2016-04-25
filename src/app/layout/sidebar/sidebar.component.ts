import {Component, Inject, Input} from "ng-forward";
import {SidebarNotificationService} from "./sidebar.notification.service";
import {SessionService} from '../../login/session.service';

@Component({
    selector: 'sidebar',
    templateUrl: 'app/layout/sidebar/sidebar.html'
})
@Inject(SidebarNotificationService, SessionService)
export class SidebarComponent {

    @Input()
    private visible: boolean = false;

    @Input()
    public user: { name: string } = {
        name: ''
    };

    constructor(private notificationService: SidebarNotificationService, private session: SessionService) { }

    ngOnInit() {

        let userData: any = this.session.currentUser();
        if (userData) {
            this.user = userData.person;
        }

        this.notificationService.setVisibility(this.visible);
        this.notificationService.subscribe((visible: boolean) => {
            this.visible = visible;
        });
    }

    isVisible(): boolean {
        return <boolean>this.visible;
    }
}
