import { ProfileFastEditionComponent } from './profile/fast-edition/profile-fast-edition.component';
import { UiSrefDirective } from './shared/directives/ui-sref-directive';
import { CommunitiesBlockComponent } from './layout/blocks/communities/communities-block.component';
import { TaskListComponent } from './task/task-list/task-list.component';
import { LanguageSelectorComponent } from './layout/language-selector/language-selector.component';
import { TranslatePipe } from './shared/pipes/translate-pipe';
import { FooterComponent } from './layout/footer/footer.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { UpgradeModule } from '@angular/upgrade/static';
import { ProfileImageComponent } from "./profile/image/profile-image.component";
import { RawHTMLBlockComponent } from './layout/blocks/raw-html/raw-html-block.component';
import { StatisticsBlockComponent } from "./layout/blocks/statistics/statistics-block.component";
import { UpgradeUtils } from "./shared/upgrade-utils";
import { DynamicComponentModule } from "ng-dynamic";
import { MomentModule } from 'angular2-moment';

@NgModule({
    imports: [FormsModule, BrowserModule, UpgradeModule, MomentModule, DynamicComponentModule.forRoot({imports: [AppModule]})],
    exports: [TranslatePipe],
    declarations: [FooterComponent, TranslatePipe, LanguageSelectorComponent, RawHTMLBlockComponent, StatisticsBlockComponent,
                   ProfileImageComponent, TaskListComponent, CommunitiesBlockComponent, UiSrefDirective, ProfileFastEditionComponent],
    entryComponents: [FooterComponent, LanguageSelectorComponent, RawHTMLBlockComponent, StatisticsBlockComponent, ProfileImageComponent,
                      TaskListComponent, CommunitiesBlockComponent, ProfileFastEditionComponent],
    providers: UpgradeUtils.provideAngular1Services(['AuthService', 'SessionService', '$state', 'TranslatorService', 'ArticleService',
        'BlockService', 'ProfileService', 'PermissionService', 'EventsHubService', '$uibModal', '$scope', 'NotificationService',
        '$log', 'SweetAlert', 'toastr', 'TaskService'])
})
export class AppModule {
    ngDoBootstrap() {
    }
}
