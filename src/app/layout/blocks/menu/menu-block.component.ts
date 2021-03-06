import { Subscription } from 'rxjs/Subscription';
import { DesignModeService } from './../../../shared/services/design-mode.service';
import { ArticleService } from './../../../../lib/ng-noosfero-api/http/article.service';
import { Component, Input, Inject, HostListener, ElementRef, ViewChild, ViewEncapsulation, OnDestroy, OnInit } from '@angular/core';
import { TranslatorService } from '../../../shared/services/translator.service';
import { TypeaheadMatch } from 'ngx-bootstrap';
import { DragulaService } from 'ng2-dragula';

@Component({
    selector: "noosfero-menu-block",
    templateUrl: './menu-block.html',
    styleUrls: ['./menu-block.scss'],
    encapsulation: ViewEncapsulation.None,
})
export class MenuBlockComponent implements OnDestroy, OnInit {

    @Input() block: any;
    @Input() owner: any;
    @Input() designMode: boolean;
    @ViewChild("popover") popover;

    titleTranslator: any = {
        'profile_about': this.translatorService.translate('blocks.menu.about'),
        'profile_activities': this.translatorService.translate('blocks.menu.activities'),
        'profile_members_index': this.translatorService.translate('blocks.menu.community.members'),
        'memberships_index': this.translatorService.translate('blocks.menu.communities'),
        'friends_index': this.translatorService.translate('blocks.menu.friends')
    };

    links: any[];
    linksAvailable: any[];

    selected: any;
    articles: any[];
    dragulaOptions: any;
    selectedArticle: noosfero.Article;
    designModeSubscription: Subscription;

    constructor(private elementRef: ElementRef,
        private translatorService: TranslatorService,
        private articleService: ArticleService,
        private dragulaService: DragulaService,
        private designModeService: DesignModeService) {

        this.designModeSubscription = designModeService.onToggle.subscribe((designModeOn: boolean) => {
            if (designModeOn && !this.articles) {
                this.articles = [];
                this.articleService.getByProfile(this.owner, { per_page: 100 })
                    .then((result: noosfero.RestResult<noosfero.Article[]>) => {
                        for (const article of <noosfero.Article[]>result.data) {
                            this.articles.push({
                                translatedTitle: article.name,
                                url: 'main.profile.page',
                                urlParams: {page: article.path, profile: this.owner.identifier},
                                title: article.name,
                                path: article.path
                            });
                        }
                    });
            }
        });
    }

    ngOnDestroy() {
        this.designModeSubscription.unsubscribe();
    }

    ngOnInit() {
        this.dragulaOptions = {
            invalid: () => {
                return !this.designMode;
            }
        };

        this.dragulaService.dropModel.subscribe((value) => {
            if (this.designMode) {
                const enabled = [];
                for (const link of this.links) {
                    if (link.path) {
                        enabled.push({ title: link.title, path: link.path });
                    } else if (link.controller) {
                        enabled.push({ title: link.title, controller: link.controller, action: link.action });
                    }
                }
                this.block.api_content.enabled_items = enabled;
            }
        });

        this.links = [];
        this.linksAvailable = [];
        this.block.hide = true;
        if (this.block && this.block.api_content.enabled_items) {
            for (const link of this.block.api_content.enabled_items) {
                this.add(link);
            }
            this.block.hide = false;
        }
        if (this.block && this.block.api_content.available_items) {
            for (const link of this.block.api_content.available_items) {
                let i = 0;
                for (i = 0; i < this.links.length; i++) {
                    if (this.links[i].title === link.title)
                        break;
                }
                if (i >= this.links.length)
                    this.addAvailable(link);
            }
        }
    }

    makeUrl(params: any) {
        const link: { translatedTitle: string, url: any[], urlParams: any, title: string, controller: string, action: string; path: string } = { translatedTitle: '', url: [], urlParams: {}, title: '', controller: '', action: '', path: '' };
        const urlMapping: any = {
            'about': ['/profile', this.owner.identifier, 'about'],
            'activities': ['/profile', this.owner.identifier],
            'index': this.owner.type === 'Person' ? ['/profile', this.owner.identifier, 'friends'] : ['/profile', this.owner.identifier, 'members']
        };
        if (params.controller) {
            link.translatedTitle = this.titleTranslator[params.controller + '_' + params.action];
            link.url = urlMapping[params.action];
            link.title = params.title;
            link.controller = params.controller;
            link.action = params.action;
        } else {
            link.translatedTitle = params.title;
            link.url = ['/', this.owner.identifier, params.path];
            link.title = params.title;
            link.path = params.path;
        }
        return link;
    }

    // TODO Communities and friends links are not available in this template yet.
    hasAvailablePage(link: any) {
        if (link.controller && (link.controller === 'profile' || link.controller === 'profile_members' || link.controller === 'friends') || link.path) {
            return true;
        }
        return false;
    }

    remove(index: number) {
        const link = this.links[index];
        this.links.splice(index, 1);
        if (link.controller) {
            this.addAvailable(link);
        }
        if (link.path) {
            this.articles.push(link);
        }
        let newLink: any;
        if (link.controller) {
            newLink = { title: link.title, controller: link.controller, action: link.action };
        } else {
            if (link.path) {
                newLink = { title: link.title, path: link.path };
            }
        }
        const block = this.block;
        block.api_content.available_items.push(newLink);
        for (let i = 0, a: any[] = block.api_content.enabled_items; i < a.length; i++) {
            if (a[i].title === newLink.title) {
                a.splice(i, 1);
                block.api_content.enabled_items = a;
                break;
            }
        }
        this.block = block;
    }

    add(link: any) {
        if (this.hasAvailablePage(link)) {
            this.links.push(this.makeUrl(link));
        } else if (link.url) {
            this.links.push(link);
        }

        if ((this.hasAvailablePage(link) || link.url) && this.linksAvailable.length > 0) {
            this.removeAvailable(link);
        }
    }

    removeAvailable(link: any) {
        for (let index = 0; index < this.linksAvailable.length; index++) {
            if (this.linksAvailable[index].title === link.title) {
                this.linksAvailable.splice(index, 1);

                let newLink: any;
                if (link.controller) {
                    newLink = { title: link.title, controller: link.controller, action: link.action };
                } else {
                    if (link.path) {
                        newLink = { title: link.title, path: link.path };
                    }
                }
                const block = this.block;
                block.api_content.enabled_items.push(newLink);
                for (let i = 0, a: any[] = block.api_content.available_items; i < a.length; i++) {
                    if (a[i].title === newLink.title) {
                        a.splice(i, 1);
                        block.api_content.available_items = a;
                        break;
                    }
                }
                this.block = block;
                break;
            }
        }
    }

    addAvailable(link: any) {
        if (this.hasAvailablePage(link)) {
            this.linksAvailable.push(this.makeUrl(link));
        } else if (link.url) {
            this.linksAvailable.push(link);
        }
    }

    public addArticle() {
        const enabled = this.block.api_content.enabled_items;
        this.links.push(this.selectedArticle);
        enabled.push({ title: this.selectedArticle.title, path: this.selectedArticle.path });
        this.block.api_content.enabled_items = enabled;
        this.cancelArticle();
    }

    public cancelArticle() {
        this.selected = '';
        this.selectedArticle = null;
    }

    selectArticle($event: any) {
        this.selectedArticle = $event.item;
    }

    @HostListener('document:click', ['$event'])
    onClick($event: any) {
        if (this.popover && !this.elementRef.nativeElement.contains($event.target)) {
            this.popover.hide();
        }
    }
}
