import { Input, Component, Inject } from 'ng-forward';
import { BlockEditionComponent } from './block-edition/block-edition.component';
import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
import {NotificationService} from '../../shared/services/notification.service';

@Component({
    selector: 'noosfero-block',
    templateUrl: 'app/layout/blocks/block.html',
    directives: [BlockEditionComponent]
})
@Inject("$uibModal", "$scope", BlockService, NotificationService)
export class BlockComponent {

    @Input() block: any;
    @Input() owner: any;

    private modalInstance: any = null;
    originalBlock: noosfero.Block;

    constructor(private $uibModal: any, private $scope: ng.IScope, private blockService: BlockService, private notificationService: NotificationService) { }

    openEdit() {
        if (!this.originalBlock) this.originalBlock = JSON.parse(JSON.stringify(this.block)); // deep copy of block data
        this.modalInstance = this.$uibModal.open({
            templateUrl: 'app/layout/blocks/block-edition/block-edition.html',
            size: 'lg',
            controller: BlockEditionComponent,
            controllerAs: 'modal',
            bindToController: true,
            scope: this.$scope
        });
    }

    save() {
        this.blockService.update(this.attributesToUpdate(this.block)).then(() => {
            this.closeEdit();
            this.notificationService.success({ title: "block.edition.success.title", message: "block.edition.success.message" });
        });
    }

    preview() {
        this.closeEdit();
    }

    cancel() {
        this.block = this.originalBlock;
        this.closeEdit();
    }

    protected attributesToUpdate(block: noosfero.Block) {
        return <any>{
            id: this.block.id,
            display: this.block.settings.display,
            title: this.block.title,
            display_user: this.block.settings.display_user,
            language: this.block.settings.language
        };
    }

    private closeEdit() {
        if (this.modalInstance) {
            this.modalInstance.close();
            this.modalInstance = null;
        }
    }

}
