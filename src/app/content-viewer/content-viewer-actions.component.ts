import {Component, Inject} from "ng-forward";

@Component({
    selector: "content-viewer-actions",
    templateUrl: "app/content-viewer/navbar-actions.html",
})
@Inject("noosfero")
export class ContentViewerActions {

    article: any;
    profile: any;

    constructor(noosfero) {
        noosfero.currentProfile.then((profile) => {
            this.profile = profile;
        });
    }
}
