import {Component, Inject} from "ng-forward";

import {Profile} from "./../models/interfaces";
@Component({
    selector: "content-viewer-actions",
    templateUrl: "app/content-viewer/navbar-actions.html",
})
@Inject("noosfero")
export class ContentViewerActions {

    article: any;
    profile: any;

    constructor(noosfero: any) {
        noosfero.currentProfile.then((profile: Profile) => {
            this.profile = profile;
        });
    }
}
