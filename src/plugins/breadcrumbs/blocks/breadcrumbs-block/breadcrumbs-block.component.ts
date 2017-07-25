import { Router, Event, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Component, Inject, Input, ViewEncapsulation, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { BlockService } from '../../../../lib/ng-noosfero-api/http/block.service';

@Component({
    selector: 'noosfero-breadcrumbs-plugin-content-breadcrumbs-block',
    templateUrl: './breadcrumbs-block.html',
    styleUrls: ['./breadcrumbs-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class BreadcrumbsBlockComponent implements OnInit, OnDestroy {

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
        if (this.routerEventSubscription) {
            this.routerEventSubscription.unsubscribe();
        }
    }

    setNavigationState() {
        const paths = this.window.location.pathname.replace(/%2F/g, '/').split('/');
        const page = paths.length > 2 ? paths.splice(2).join("/") : null;
        const contextParams = { profile: this.route.snapshot.params['profile'], page: page };
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
