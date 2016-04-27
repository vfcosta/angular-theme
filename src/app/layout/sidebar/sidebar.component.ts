import {Component, Inject, Input} from "ng-forward";
import {SidebarNotificationService} from "./sidebar.notification.service";
import {SessionService} from '../../login/session.service';
import {SidebarSectionsComponent} from './sidebar-sections.component';

@Component({
    selector: 'sidebar',
    templateUrl: 'app/layout/sidebar/sidebar.html',
    directives: [SidebarSectionsComponent]
})
@Inject(SidebarNotificationService, SessionService)
export class SidebarComponent {

    @Input()
    private visible: boolean = false;

    @Input('showstatus')
    public showStatus: boolean = false;

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
