import { Router } from '@angular/router';
import { Inject, Input, Component, ChangeDetectorRef, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { EventsHubService } from '../../shared/services/events-hub.service';
import { NoosferoKnownEvents } from '../../known-events';
import { BlockService } from '../../../lib/ng-noosfero-api/http/block.service';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from '../../../lib/ng-noosfero-api/http/environment.service';
import { NotificationService } from '../../shared/services/notification.service';
import { DesignModeService } from '../../shared/services/design-mode.service';
import * as _ from "lodash";

@Component({
    selector: "context-bar",
    templateUrl: './context-bar.html',
    styleUrls: ['./context-bar.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class ContextBarComponent implements OnInit, OnDestroy {

    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Input() permissionAction = 'allow_edit';

    blocksChanged: noosfero.Block[];
    designModeOn = false;
    originalLayout: string;
    originalCustomHeader: string;
    originalCustomFooter: string;
    destroyed = false;

    constructor(private ref: ChangeDetectorRef,
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

    private getOwnerService(): any {
        if (this.isProfile()) {
            return this.profileService;
        } else {
            return this.environmentService;
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
        this.getOwnerService().getBoxes(this.owner.id).then((result: noosfero.RestResult<noosfero.Box[]>) => {
            this.owner.boxes = result.data;
            this.blocksChanged = [];
            this.owner.layout_template = this.originalLayout;
            this.notificationService.info({ title: "contextbar.edition.discard.success.title", message: "contextbar.edition.discard.success.message" });
        });
    }

    applyChanges() {
        const boxesHolder = { id: this.owner.id };
        if (this.hasBlockChanges()) {
            const groupedBoxesChanged = _.groupBy(this.blocksChanged, (block) => {
                const boxId = block.box.id;
                delete block.box;
                return boxId;
            });

            const boxes = [];
            Object.keys(groupedBoxesChanged).forEach(function (key) {
                boxes.push ( { id: +key, blocks_attributes: groupedBoxesChanged[key] });
            });
            boxesHolder['boxes_attributes'] = boxes;
        }
        if (this.isLayoutTemplateChanged()) boxesHolder['layout_template'] = this.owner.layout_template;
        return this.getOwnerService().update(boxesHolder).then(() => {
            this.blocksChanged = [];
            return this.getOwnerService().getBoxes(boxesHolder.id);
        }).then((result: noosfero.RestResult<noosfero.Box[]>) => {
            this.owner.boxes = result.data;
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
