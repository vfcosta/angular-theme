import { Inject, Input, Component } from "ng-forward";
import {Hotspot} from "../../../app/hotspot/hotspot.decorator";

@Component({
    selector: "comment-paragraph-form-hotspot",
    template: "<span></span>",
})
@Hotspot("comment_form_extra_contents")
@Inject("$scope")
export class CommentParagraphFormHotspotComponent {

    @Input() comment: noosfero.Comment;
    @Input() parent: noosfero.Comment;

    constructor(private $scope: ng.IScope) { }

    ngOnInit() {
        this.$scope.$watch(() => {
            return this.comment;
        }, () => {
            if (this.parent && (<any>this.parent).paragraph_uuid) {
                (<any>this.comment).paragraph_uuid = (<any>this.parent).paragraph_uuid;
            }
        })
    }
}
