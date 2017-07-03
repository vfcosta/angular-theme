import { ActivatedRoute, Router } from '@angular/router';
import { EventsHubService } from './../../shared/services/events-hub.service';
import { Component, Inject } from '@angular/core';
import { ArticleService } from "../../../lib/ng-noosfero-api/http/article.service";
import { ProfileService } from "../../../lib/ng-noosfero-api/http/profile.service";
import { NotificationService } from "../../shared/services/notification.service";
import { BasicOptionsComponent } from './basic-options/basic-options.component';

@Component({
    selector: 'article-cms',
    template: require("app/article/cms/cms.html"),
})
export class CmsComponent {

    article: noosfero.Article;
    parent: noosfero.Article = <noosfero.Article>{};
    profile: noosfero.Profile;

    id: number;
    parentId: number;
    profileIdentifier: string;
    loading: boolean | number;
    path: string;


    constructor(private articleService: ArticleService, private profileService: ProfileService,
        private notificationService: NotificationService, @Inject("Window") private window: Window,
        private eventsHubService: EventsHubService, private route: ActivatedRoute, private router: Router) {

        this.parentId = route.snapshot.queryParams['parent_id'];
        this.profileIdentifier = route.snapshot.params["profile"];
        this.id = route.snapshot.params['id'];

        this.path = window.location.pathname;
        this.profile = route.snapshot.data['profile'];

        if (this.parentId) {
            this.articleService.get(this.parentId).then((result: noosfero.RestResult<noosfero.Article>) => {
                this.parent = result.data;
            });
        }
        if (this.id) {
            this.articleService.get(this.id).then((result: noosfero.RestResult<noosfero.Article>) => {
                this.article = result.data;
                this.article.name = this.article.title; // FIXME
            });
        } else {
            this.article = <noosfero.Article>{ type: route.snapshot.queryParams['type'] || "TextArticle", published: true };
        }
    }

    save() {
        this.loading = true;

        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            if (this.id) {
                return this.articleService.updateArticle(this.article);
            } else if (this.parentId) {
                return this.articleService.createInParent(this.parentId, this.article);
            } else {
                return this.articleService.createInProfile(profile, this.article);
            }
        }).then((response: noosfero.RestResult<noosfero.Article>) => {
            let article = (<noosfero.Article>response.data);
            this.router.navigate([article.profile.identifier, article.path]);
            this.notificationService.success({ message: `article.basic_editor.${article.type.replace(/.*::/, '')}.success.message` });
        }).catch((error: any) => {
            this.loading = false;
            this.eventsHubService.emitEvent(this.eventsHubService.knownEvents.ARTICLE_SAVE_ERROR, error);
            this.notificationService.error({ message: "article.basic_editor.save.failed" });
        });
    }

    cancel() {
        this.window.history.back();
    }

}
