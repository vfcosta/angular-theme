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
    showAddFriend = false;
    showRemoveFriend = false;
    showConfig = false;
    designMode = false;
    @ViewChild("popover") popover;

    constructor(private elementRef: ElementRef,
        private environmentService: EnvironmentService,
        private session: SessionService,
        private personService: PersonService,
        private notificationService: NotificationService,
        private designModeService: DesignModeService) {

        environmentService.getCurrentEnvironment().then((environment: noosfero.Environment) => {
            this.environment = environment;
        });
        this.currentUser = this.session.currentUser();
    }

    ngOnInit() {
        if (this.profile.type === "Person" && this.currentUser && this.currentUser.person && this.currentUser.person.id !== this.profile.id) {
            this.personService.isFriend(<number>this.currentUser.person.id, <number>this.profile.id).then((response: restangular.IResponse) => {
                this.showRemoveFriend = true;
            }).catch((response: restangular.IResponse) => {
                this.showAddFriend = true;
            });
        } else {
            this.showAddFriend = false;
            this.showRemoveFriend = false;
        }
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

    addFriend() {
        this.personService.addFriend(<number>this.profile.id).then((response: restangular.IResponse) => {
            this.notificationService.success({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.message" });
        }).catch((response: restangular.IResponse) => {
            if (response.data.message.target_id[0].error === 'taken') {
                this.notificationService.error({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.taken.error.message" });
            } else {
                this.notificationService.error({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.error.message" });
            }
        });
    }

    removeFriend() {
        this.personService.removeFriend(<number>this.profile.id).then((response: restangular.IResponse) => {
            this.showRemoveFriend = false;
            this.showAddFriend = true;
            this.notificationService.success({ title: "profile.actions.add_friend.title", message: "profile.actions.remove_friend.message" });
        }).catch((response: restangular.IResponse) => {
            this.notificationService.error({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.error.message" });
        });
    }


    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.popover.hide();
        }
    }

}
