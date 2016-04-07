import {Component, Input, Inject} from "ng-forward";
import * as plugins from "../../plugins";
import {dasherize} from "ng-forward/cjs/util/helpers";
import {PluginHotspot} from "./plugin-hotspot";

@Component({
    selector: "noosfero-hotspot-comment-form",
    template: "<span></span>"
})
@Inject("$element", "$scope", "$compile")
export class CommentFormHotspotComponent extends PluginHotspot {

    @Input() comment: noosfero.Comment;

    constructor(
        private $element: any,
        private $scope: ng.IScope,
        private $compile: ng.ICompileService) {
        super("comment_form_extra_contents");
    }

    addHotspot(directiveName: string) {
        this.$element.append(this.$compile('<' + directiveName + ' [comment]="ctrl.comment"></' + directiveName + '>')(this.$scope));
    }
}
