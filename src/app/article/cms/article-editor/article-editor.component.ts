import { SessionService } from './../../../login/session.service';
import {Component, Input, Inject} from '@angular/core';

@Component({
    selector: 'article-editor',
    template: require("app/article/cms/article-editor/article-editor.html")
})
export class ArticleEditorComponent {

    @Input() article: noosfero.Article;
    @Input() profile: noosfero.Profile;
    @Input() path: string;
    options: any;

    constructor(@Inject("Window") private window: Window,
        private sessionService: SessionService) { }

    ngOnInit() {
        this.window['uploadUrl'] = '/api/v1/profiles/' + this.profile.id + '/articles';
        this.window['listUrl'] = '/api/v1/profiles/' + this.profile.id + '/articles?content_type=Folder,UploadedFile&parent_id=';
        this.window['deleteUrl'] = '/api/v1/articles';
        this.window['renameUrl'] = '/api/v1/articles';
        this.window['privateToken'] = this.sessionService.currentUser().private_token;
        this.window['baseUrl'] = this.getDomanWithPort();
        this.options = { allowedContent: true, removeFormatAttributes: '', filebrowserBrowseUrl: '/ngx-filemanager?editor=CKEditor'};
    }

    getDomanWithPort() {
        return location.protocol + '//' + location.hostname + (location.port ? ':' + location.port : '');
    }
}
