import { NotificationService } from './../../shared/services/notification.service';
import { PersonService } from './../../../lib/ng-noosfero-api/http/person.service';
import { SessionService } from './../../login/session.service';
import { Inject, Input, Component } from "ng-forward";
import { EnvironmentService } from "../../../lib/ng-noosfero-api/http/environment.service";

@Component({
    selector: "noosfero-profile-summary",
    templateUrl: 'app/profile/summary/profile-summary.html'
})
@Inject(EnvironmentService, SessionService, PersonService, NotificationService)
export class ProfileSummaryComponent {

    @Input() profile: noosfero.Profile;
    environment: noosfero.Environment;
    currentUser: noosfero.User;
    editPopoverOpen = false;
    showAddFriend = false;
    showRemoveFriend = false;

    constructor(private environmentService: EnvironmentService,
        private session: SessionService,
        private personService: PersonService,
        private notificationService: NotificationService) {

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
    }

    profileLink() {
        if (!this.environment || !this.environment.host || !this.profile) return null;
        let host = this.environment.host.replace(/https?:\/\//, "");
        return `${host}/${this.profile.identifier}`;
    }

    closeEdition() {
        this.editPopoverOpen = false;
    }

    addFriend() {
        this.personService.addFriend(<number>this.profile.id).then((response: restangular.IResponse) => {
            this.notificationService.success({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.message" });
        }).catch( (response: restangular.IResponse) => {
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
        }).catch( (response: restangular.IResponse) => {
            this.notificationService.error({ title: "profile.actions.add_friend.title", message: "profile.actions.add_friend.error.message" });
        });
    }
}
