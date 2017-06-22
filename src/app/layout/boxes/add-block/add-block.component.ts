import { SettingsService } from './../../../../lib/ng-noosfero-api/http/settings.service';
import { Inject, Component, Input, Output, EventEmitter } from "@angular/core";
import { ProfileService } from '../../../../lib/ng-noosfero-api/http/profile.service';
import { EnvironmentService } from '../../../../lib/ng-noosfero-api/http/environment.service';

declare var _: any;

@Component({
    selector: "add-block",
    template: require("app/layout/boxes/add-block/add-block.html")
})
export class AddBlockComponent {

    @Input() box: noosfero.Box;
    @Input() owner: noosfero.Profile | noosfero.Environment;
    @Output() onAdd = new EventEmitter<noosfero.Block>();

    search: string;
    whitelist = ['RawHTMLBlock', 'CommunitiesBlock', 'HighlightsBlock', 'DisplayContentBlock', 'LinkListBlock', 'LoginBlock',
                 'MembersBlock', 'MenuBlock', 'PeopleBlock', 'ProfileImageBlock', 'RecentDocumentsBlock', 'StatisticsBlock',
                 'BreadcrumbsPlugin::ContentBreadcrumbsBlock', 'CommentParagraphPlugin::DiscussionBlock',
                 'EventPlugin::EventBlock', 'FriendsBlock', 'InterestTagsBlock', 'ProfileImagesPlugin::ProfileImagesBlock',
                 'RecentActivitiesPlugin::ActivitiesBlock', 'SectionBlockPlugin::SectionBlock', 'VideoPlugin::VideoBlock'];
    blocks: noosfero.BlockDefinition[];

    constructor(private settingsService: SettingsService,
                private profileService: ProfileService,
                private environmentService: EnvironmentService) { }

    loadAvailableBlocks() {
        this.settingsService.getAvailableBlocks(this.owner).then((result: noosfero.RestResult<noosfero.BlockDefinition[]>) => {
            this.blocks = _.filter(result.data, (block: noosfero.BlockDefinition) => {
                return this.whitelist.indexOf(block.type) >= 0;
            });
        });
    }

    addBlock(block: noosfero.Block) {
        this.profileService.getBlockTemplate(this.owner.id, block.type).then((result: noosfero.RestResult<noosfero.Block>) => {
            this.onAdd.emit(Object.assign({}, result.data));
        });
    }
}
