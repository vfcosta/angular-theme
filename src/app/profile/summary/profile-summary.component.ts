import { NotificationService } from './../../shared/services/notification.service';
import { DesignModeService } from './../../shared/services/design-mode.service';
import { PersonService } from './../../../lib/ng-noosfero-api/http/person.service';
import { SessionService } from './../../login/session.service';
import { Inject, Input, Component, HostListener, ElementRef, ViewChild  } from "@angular/core";
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";
import { ProfileJoinComponent } from "./../../profile/profile-join/profile-join.component";


@Component({
    selector: "noosfero-profile-summary",
    template: require('app/profile/summary/profile-summary.html')
})
export class ProfileSummaryComponent {

    @Input() profile: noosfero.Profile;
    environment: noosfero.Environment;
    currentUser: noosfero.User;
    editPopoverOpen = false;
    showConfig = false;
    designMode = false;
    @ViewChild("popover") popover;

    constructor(private elementRef: ElementRef,
        private environmentService: EnvironmentService,
        private session: SessionService,
        private notificationService: NotificationService,
        private designModeService: DesignModeService) {

        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });
        this.currentUser = this.session.currentUser();
    }

    ngOnInit() {
        if (this.profile.permissions.indexOf('allow_edit') > -1) {
            this.showConfig = true;
        }
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designMode = designModeOn;
        });
        this.designMode = this.designModeService.isInDesignMode();
    }

    profileLink() {
        if (!this.environment || !this.environment.host || !this.profile) return null;
        let host = this.environment.host.replace(/https?:\/\//, "");
        return `${host}/${this.profile.identifier}`;
    }

    closeEdition() {
        this.editPopoverOpen = false;
        this.popover.hide();
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.popover.hide();
        }
    }

}
