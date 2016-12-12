import { Inject, Input, Component } from 'ng-forward';
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";
import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from '../../../lib/ng-noosfero-api/http/environment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { DesignModeService } from "../../admin/layout-edit/designMode.service";

@Component({
    selector: "config-bar",
    templateUrl: "app/layout/config-bar/config-bar.html"
})
@Inject("$scope", EventsHubService, BlockService, NotificationService, DesignModeService, ProfileService, EnvironmentService)
export class ConfigBarComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction = "allow_edit";

    blocksChanged: noosfero.Block[];
    designModeOn = false;
    eventsNames: NoosferoKnownEvents;
    originalLayout: string;

    constructor(private $scope: ng.IScope,
        private eventsHubService: EventsHubService,
        private blockService: BlockService,
        private notificationService: NotificationService,
        private designModeService: DesignModeService,
        private profileService: ProfileService,
        private environmentService: EnvironmentService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        this.originalLayout = this.owner.layout_template;
        this.blocksChanged = [];
        this.eventsHubService.subscribeToEvent(this.eventsNames.BLOCK_CHANGED, (block: noosfero.Block) => {
            this.blocksChanged = this.blocksChanged.filter((b: noosfero.Block) => {
                return block.id !== b.id;
            });
            if (block.title != null || Object.keys(block).length > 1) {
                this.blocksChanged.push(block);
            }
            this.$scope.$apply();
        });
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designModeOn = designModeOn;
            this.$scope.$apply();
        });
        this.designModeOn = this.designModeService.isInDesignMode();
    }

    private callOwnerService(obj: noosfero.Profile | noosfero.Environment) {
        let type = (<any>this.owner)['type'];
        let isProfile = type === "Community" || type === "Person";
        if (isProfile) {
            return this.profileService.update(<noosfero.Profile>obj);
        } else {
            return this.environmentService.update(<noosfero.Environment>obj);
        }
    }

    apply() {
        Promise.all([this.applyBlockChanges(), this.applyLayoutTemplate()]).then(() => {
            this.notificationService.success({ title: "configbar.edition.apply.success.title", message: "configbar.edition.apply.success.message" });
        });
    }

    applyLayoutTemplate() {
        if (!this.isLayoutTemplateChanged()) return Promise.resolve();
        let updated: any = { id: this.owner.id, layout_template: this.owner.layout_template };
        return this.callOwnerService(updated).then(() => {
            this.originalLayout = updated.layout_template;
        });
    }

    applyBlockChanges() {
        if (!this.hasBlockChanges()) return Promise.resolve();
        return this.blockService.updateAll(this.blocksChanged).then(() => {
            this.blocksChanged = [];
            this.eventsHubService.emitEvent(this.eventsNames.BLOCKS_SAVED, this.owner);
        });
    }

    displayApplyButton() {
        return this.hasBlockChanges() || this.isLayoutTemplateChanged();
    }

    hasBlockChanges() {
        return this.blocksChanged.length > 0;
    }

    isLayoutTemplateChanged() {
        return this.owner && this.originalLayout !== this.owner.layout_template;
    }
}
