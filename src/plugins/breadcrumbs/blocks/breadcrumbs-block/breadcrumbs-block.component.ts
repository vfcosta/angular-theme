import { Router, Event, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, Inject, Input } from "@angular/core";
import { Subscription } from "rxjs";
import { BlockService } from "../../../../lib/ng-noosfero-api/http/block.service";

@Component({
    selector: "noosfero-breadcrumbs-plugin-content-breadcrumbs-block",
    template: require('plugins/breadcrumbs/blocks/breadcrumbs-block/breadcrumbs-block.html')
})
export class BreadcrumbsBlockComponent {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;

    profile: noosfero.Profile;
    links: any[] = [];
    routerEventSubscription: Subscription;

    constructor(private blockService: BlockService, private router: Router, private route: ActivatedRoute,
        @Inject("Window") private window: Window) { }

    ngOnInit() {
        this.routerEventSubscription = this.router.events.subscribe((event: Event) => {
             if (event instanceof NavigationEnd) this.setNavigationState();
        });
        this.profile = this.owner;
    }

    ngOnDestroy() {
        this.routerEventSubscription.unsubscribe();
    }

    setNavigationState() {
        let paths = this.window.location.pathname.replace(/%2F/g, '/').split('/');
        let page = paths.length > 2 ? paths.splice(2).join("/") : null;
        let contextParams = { profile: this.route.snapshot.params['profile'], page: page };
        this.blockService.getApiContent(this.block, contextParams).then((content: any) => {
            this.links = content.links;
            this.block.hide = this.links.length <= 1;
            if (!this.block.hide) {
                this.links[this.links.length - 1]['active'] = true;
            }
        });
    };

    getDisplayName(state: any) {
        if (state.data && state.data.displayName) {
            return state.data.displayName;
        }
        return state.name;
    }
}
