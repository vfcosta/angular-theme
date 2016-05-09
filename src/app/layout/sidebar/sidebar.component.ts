import {Component, Inject, Input} from "ng-forward";
import {SidebarNotificationService} from "./sidebar.notification.service";
import {SessionService} from '../../login/session.service';
import {SidebarSectionComponent} from './sidebar-section.component';

@Component({
    selector: 'sidebar',
    templateUrl: 'app/layout/sidebar/sidebar.html',
    directives: [SidebarSectionComponent]
})
@Inject(SidebarNotificationService, SessionService)
/**
 * @ngdoc object
 * @name sidebar.SidebarComponent
 * @requires [SidebarNotificationService, SessionService]
 * @description
 *  This is a widget to a sidebar with visible control.
 *  Needs a SidebarSectionComponent to show sections/items/subitems
 *  menu
 *
 * <b>Usage example:</b>
 * @example
 * <pre>
 * let sidebar: SidebarComponent = new SidebarComponent(SidebarNotificationService, SessionService);
 * sidebar.visible = true;
 * </pre>
 */
export class SidebarComponent {

    /**
     * @ngdoc property
     * @name visible
     * @propertyOf sidebar.SidebarComponent
     * @description
     *  Controls if this component is show/hide
     */
    @Input()
    private visible: boolean = false;

    /**
     * @ngdoc property
     * @name showStatus
     * @propertyOf sidebar.SidebarComponent
     * @description
     *  Controls the show/hide state of the circle user status
     */
    @Input('showstatus')
    public showStatus: boolean = false;

    /**
     * @ngdoc property
     * @name user
     * @propertyOf sidebar.SidebarComponent
     * @description
     *  The user data to show into sidebar
     */
    @Input()
    public user: { name: string } = {
        name: ''
    };

    /**
     * @ngdoc method
     * @name constructor
     * @methodOf sidebar.SidebarComponent
     * @param {SidebarNotificationService} notificationService The service that emmits events to show/hide this component
     * @param {SessionService} session The service that loads the user data when user is logged
     * @description
     *  The constructor for this component. Loads the dependencies services
     */
    constructor(private notificationService: SidebarNotificationService, private session: SessionService) { }

    /**
     * @ngdoc method
     * @name ngOnInit
     * @methodOf sidebar.SidebarComponent
     * @description
     *  Check the initial visibility when this component is loaded
     */
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

    /**
     * @ngdoc method
     * @name isVisible
     * @methodOf sidebar.SidebarComponent
     * @returns {boolean} True, whether this component is visible, otherwise returns false
     * @description
     *  Verify whether sidebar is visible or not
     */
    isVisible(): boolean {
        return <boolean>this.visible;
    }
}
