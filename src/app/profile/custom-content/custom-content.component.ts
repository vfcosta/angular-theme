import {Component, Input, Inject} from 'ng-forward';
import {ProfileService} from '../../../lib/ng-noosfero-api/http/profile.service';
import {NotificationService} from '../../shared/services/notification.service';
import {PermissionDirective} from '../../shared/components/permission/permission.directive';

@Component({
    selector: 'custom-content',
    templateUrl: "app/profile/custom-content/custom-content.html",
    directives: [PermissionDirective]
})
@Inject("$uibModal", "$scope", ProfileService, NotificationService)
export class CustomContentComponent {

    @Input() attribute: string;
    @Input() profile: noosfero.Profile;
    @Input() label: string;

    content: string;
    originalContent: string;
    private modalInstance: any = null;

    constructor(private $uibModal: any,
        private $scope: ng.IScope,
        private profileService: ProfileService,
        private notificationService: NotificationService) { }

    ngOnInit() {
        this.$scope.$watch(() => {
            return this.profile ? (<any>this.profile)[this.attribute] : null;
        }, () => {
            if (this.profile) this.content = (<any>this.profile)[this.attribute];
        });
    }

    openEdit() {
        if (!this.originalContent) this.originalContent = this.content;
        this.modalInstance = this.$uibModal.open({
            templateUrl: 'app/profile/custom-content/edit-content.html',
            size: 'lg',
            controller: CustomContentComponent,
            controllerAs: 'modal',
            bindToController: true,
            scope: this.$scope,
            backdrop: 'static'
        });
    }

    save() {
        let profile: any = { id: this.profile.id };
        profile[this.attribute] = this.content;
        this.profileService.update(profile).then(() => {
            this.closeEdit();
            this.notificationService.success({ title: "profile.content.success.title", message: "profile.content.success.message" });
        });
    }

    preview() {
        this.closeEdit();
    }

    cancel() {
        this.content = this.originalContent;
        this.closeEdit();
    }

    private closeEdit() {
        if (this.modalInstance) {
            this.modalInstance.close();
            this.modalInstance = null;
        }
    }
}
