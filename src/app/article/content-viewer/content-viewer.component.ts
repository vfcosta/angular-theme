import { ActivatedRoute } from '@angular/router';
import { Input, Component } from '@angular/core';
import { ArticleService } from '../../../lib/ng-noosfero-api/http/article.service';
import { ProfileService } from '../../../lib/ng-noosfero-api/http/profile.service';
import { AuthService, AuthEvents } from './../../login';

@Component({
    selector: "content-viewer",
    templateUrl: './page.html',
})
export class ContentViewerComponent {

    @Input()
    article: noosfero.Article = null;

    @Input()
    profile: noosfero.Profile = null;

    constructor(private articleService: ArticleService, private profileService: ProfileService, private route: ActivatedRoute, public authService: AuthService) {
        this.activate();        

        this.authService.subscribe(AuthEvents[AuthEvents.loginSuccess], () => {            
            this.activate();            
        });
        
        this.authService.subscribe(AuthEvents[AuthEvents.logoutSuccess], () => {            
            this.activate();
        });
    }

    activate() {
        this.profileService.getCurrentProfile().then((profile: noosfero.Profile) => {
            this.profile = profile;
            const page = this.route.snapshot.url.map(p => p.path).join("/");
            return this.articleService.getArticleByProfileAndPath(this.profile, page);
        }).then((result: noosfero.RestResult<any>) => {
            this.article = <noosfero.Article>result.data;
            this.articleService.setCurrent(this.article);
        });
    }
}
