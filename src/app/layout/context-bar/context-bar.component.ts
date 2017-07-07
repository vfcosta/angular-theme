import { Router } from '@angular/router';
import { Inject, Input, Component, ChangeDetectorRef } from '@angular/core';
import { EventsHubService } from "../../shared/services/events-hub.service";
import { NoosferoKnownEvents } from "../../known-events";
import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from '../../../lib/ng-noosfero-api/http/environment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { DesignModeService } from "../../shared/services/design-mode.service";

declare var _: any;

@Component({
    selector: "context-bar",
    template: require("app/layout/context-bar/context-bar.html")
})
export class ContextBarComponent {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction = 'allow_edit';

    blocksChanged: noosfero.Block[];
    designModeOn = false;
    originalLayout: string;
    originalCustomHeader: string;
    originalCustomFooter: string;
    destroyed = false;

    constructor(private ref: ChangeDetectorRef, @Inject("Window") private window: Window,
        private router: Router,
        private eventsHubService: EventsHubService,
        private blockService: BlockService,
        private notificationService: NotificationService,
        private designModeService: DesignModeService,
        private profileService: ProfileService,
        private environmentService: EnvironmentService) {
    }

    ngOnInit() {
        if (this.isProfile()) {
            this.originalCustomHeader = (<noosfero.Profile>this.owner).custom_header;
            this.originalCustomFooter = (<noosfero.Profile>this.owner).custom_footer;
        }
        this.originalLayout = this.owner.layout_template;
        this.blocksChanged = [];
        this.eventsHubService.subscribeToEvent(this.eventsHubService.knownEvents.BLOCK_CHANGED, (block: noosfero.Block) => {
            this.blocksChanged = this.blocksChanged.filter((b: noosfero.Block) => {
                return block.id !== b.id;
            });
            if ((block.id || !block._destroy) &&
                (block.title != null || Object.keys(block).length > 3 ||
                (block.api_content && Object.keys(block.api_content).length >= 1))) {
                this.blocksChanged.push(block);
            }
            if (!this.destroyed) this.ref.detectChanges();
        });
        this.designModeService.onToggle.subscribe((designModeOn: boolean) => {
            this.designModeOn = designModeOn;
        });
        this.designModeOn = this.designModeService.isInDesignMode();
    }

    ngOnDestroy() {
        this.destroyed = true;
    }

    private callOwnerService(obj: noosfero.Profile | noosfero.Environment) {
        if (this.isProfile()) {
            return this.profileService.update(<noosfero.Profile>obj);
        } else {
            return this.environmentService.update(<noosfero.Environment>obj);
        }
    }

    apply() {
        if (!this.isLayoutTemplateChanged() && !this.hasBlockChanges()) return Promise.resolve();
        this.applyChanges().then(() => {
            this.originalLayout = this.owner.layout_template;
            this.notificationService.success({ title: "contextbar.edition.apply.success.title", message: "contextbar.edition.apply.success.message" });
            this.designModeService.setInDesignMode(false);
        });
    }

    discard() {
        this.window.location.reload();
        this.notificationService.info({ title: "contextbar.edition.discard.success.title", message: "contextbar.edition.discard.success.message" });
    }

    applyChanges() {
        let boxesHolder = { id: this.owner.id };
        if (this.hasBlockChanges()) {
            let groupedBoxesChanged = _.groupBy(this.blocksChanged, (block) => {
                let boxId = block.box.id;
                delete block.box;
                return boxId;
            });

            let boxes = [];
            Object.keys(groupedBoxesChanged).forEach(function (key) {
                boxes.push ( { id: +key, blocks_attributes: groupedBoxesChanged[key] });
            });
            boxesHolder['boxes_attributes'] = boxes;
        }
        if (this.isLayoutTemplateChanged()) boxesHolder['layout_template'] = this.owner.layout_template;
        return this.callOwnerService(<any> boxesHolder).then(() => {
            this.blocksChanged = [];
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.BLOCKS_SAVED, this.owner);
        });
    }

    displayAlertBar() {
        return this.hasBlockChanges() || this.isLayoutTemplateChanged();
    }

    hasBlockChanges() {
        return this.blocksChanged.length > 0;
    }

    isLayoutTemplateChanged() {
        return this.owner && this.originalLayout !== this.owner.layout_template;
    }

    isProfile() {
        let type = '';
        if (this.owner !== undefined) {
            type = (<any>this.owner)['type'];
        }
        return type === "Community" || type === "Person";
    }

}
