import { Component, Input, Inject } from 'ng-forward';
import { PermissionDirective } from '../../shared/components/permission/permission.directive';
import { DesignModeService } from '../../shared/services/design-mode.service';

@Component({
    selector: 'custom-content',
    templateUrl: "app/profile/custom-content/custom-content.html",
    directives: [PermissionDirective]
})
@Inject("$uibModal", "$scope", DesignModeService)
export class CustomContentComponent {

    // @Inject doesn't works with uibModal.open
    static $inject = ["DesignModeService"];

    @Input() attribute: string;
    @Input() profile: noosfero.Profile;
    @Input() label: string;

    originalContent: string;
    private modalInstance: ng.ui.bootstrap.IModalServiceInstance;

    constructor(
        private $uibModal: ng.ui.bootstrap.IModalService,
        private $scope: ng.IScope,
        private designModeService: DesignModeService) { }

    inEditMode() {
        return this.designModeService.isInDesignMode();
    }

    openEdit() {
        if (!this.originalContent) this.originalContent = (<any>this.profile)[this.attribute];
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

    preview() {
        this.closeEdit();
    }

    cancel() {
        (<any>this.profile)[this.attribute] = this.originalContent;
        this.closeEdit();
    }

    private closeEdit() {
        if (this.modalInstance) {
            this.modalInstance.close();
            this.modalInstance = null;
        }
    }
}
