import { Pipe, Inject, PipeTransform } from '@angular/core';

@Pipe({ name: 'noosferoUrl', pure: false })
export class NoosferoUrlPipe implements PipeTransform {

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
