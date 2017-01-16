import {Pipe} from "ng-forward";

@Pipe("noosferoUrl")
export class NoosferoUrl {

    transform(viewObject: any) {
        let url = '//' + viewObject.host;
        if (viewObject.port) {
            url += ':' + viewObject.port;
        }
        url += '/' + viewObject.profile + '/';
        if (viewObject.page) {
            url += viewObject.page.join('/');
        }
        return url;
    }

}
