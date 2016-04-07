import { Input, Inject, Component } from "ng-forward";
import {Hotspot} from "../../../app/hotspot/hotspot.decorator";

@Component({
    selector: "comment-paragraph-uuid-hotspot",
    template: "<span></span>",
})
@Inject("$scope")
@Hotspot("comment_form_extra_contents")
export class CommentParagraphUuidHotspotComponent {

    @Input() comment: noosfero.Comment;

    constructor(private $scope: ng.IScope) { }

    ngOnInit() {
        this.$scope.$watch("comment", () => {
            this.comment['paragraph_uuid'] = "???";
        });
    }
}
