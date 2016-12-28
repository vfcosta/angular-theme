import { Inject, Input, Component } from 'ng-forward';
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";
import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from '../../../lib/ng-noosfero-api/http/environment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { DesignModeService } from "../../shared/services/design-mode.service";

@Component({
    selector: "context-bar",
    templateUrl: "app/layout/context-bar/context-bar.html"
})
@Inject("$state", "$scope", EventsHubService, BlockService, NotificationService, DesignModeService, ProfileService, EnvironmentService)
export class ContextBarComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction: any;

    blocksChanged: noosfero.Block[];
    designModeOn = false;
    eventsNames: NoosferoKnownEvents;
    originalLayout: string;
    originalCustomHeader: string;
    originalCustomFooter: string;

    constructor(private $state: ng.ui.IStateService,
        private $scope: ng.IScope,
        private eventsHubService: EventsHubService,
        private blockService: BlockService,
        private notificationService: NotificationService,
        private designModeService: DesignModeService,
        private profileService: ProfileService,
        private environmentService: EnvironmentService) {
        this.eventsNames = new NoosferoKnownEvents();
    }

    ngOnInit() {
        if (this.isProfile()) {
            this.originalCustomHeader = (<noosfero.Profile>this.owner).custom_header;
            this.originalCustomFooter = (<noosfero.Profile>this.owner).custom_footer;
        }
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
        if (this.isProfile()) {
            return this.profileService.update(<noosfero.Profile>obj);
        } else {
            return this.environmentService.update(<noosfero.Environment>obj);
        }
    }

    apply() {
        Promise.all([this.applyBlockChanges(), this.applyLayoutTemplate(), this.applyCustomContentChanges()]).then(() => {
            this.notificationService.success({ title: "contextbar.edition.apply.success.title", message: "contextbar.edition.apply.success.message" });
        });
    }

    discard() {
        this.$state.reload();
        this.notificationService.info({ title: "contextbar.edition.discard.success.title", message: "contextbar.edition.discard.success.message" });
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

    applyCustomContentChanges() {
        if (!this.isCustomContentChanged() || !this.isProfile()) return Promise.resolve();
        let profile: any = { id: this.owner.id, custom_header: (<noosfero.Profile>this.owner).custom_header, custom_footer: (<noosfero.Profile>this.owner).custom_footer };
        return this.profileService.update(profile).then(() => {
            this.originalCustomHeader = profile.custom_header;
            this.originalCustomFooter = profile.custom_footer;
        });
    }

    displayAlertBar() {
        return this.hasBlockChanges() || this.isLayoutTemplateChanged() || this.isCustomContentChanged();
    }

    hasBlockChanges() {
        return this.blocksChanged.length > 0;
    }

    isLayoutTemplateChanged() {
        return this.owner && this.originalLayout !== this.owner.layout_template;
    }

    isCustomContentChanged() {
        if (!this.isProfile()) return false;
        let profile = <noosfero.Profile>this.owner;
        return this.originalCustomHeader !== profile.custom_header || this.originalCustomFooter !== profile.custom_footer;
    }

    isProfile() {
        let type = '';
        if (this.owner !== undefined) {
            type = (<any>this.owner)['type'];
        }
        return type === "Community" || type === "Person";
    }

}
