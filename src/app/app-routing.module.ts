import { ProfileAboutComponent } from './profile/about/profile-about.component';
import { SearchComponent } from './search/search.component';
import { DomainResolver } from './shared/resolvers/domain.resolver';
import { DomainComponent } from './domain/domain.component';
import { EnvironmentWithBoxesResolver } from './shared/resolvers/environment-with-boxes.resolver';
import { EnvironmentHomeComponent } from './environment/environment-home.component';
import { ActivitiesComponent } from './profile/activities/activities.component';
import { ProfileResolver } from './shared/resolvers/profile.resolver';
import { ProfileHomeComponent } from './profile/profile-home.component';
import { ContentViewerComponent } from './article/content-viewer/content-viewer.component';
import { ProfileComponent } from './profile/profile.component';
import { EnvironmentComponent } from './environment/environment.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnvironmentResolver } from "./shared/resolvers/environment.resolver";

const routes: Routes = [
    // {
    //     path: '',
    //     component: DomainComponent,
    //     resolve: { domain: DomainResolver },
    // },
    {
        path: '',
        component: EnvironmentComponent,
        resolve: { environment: EnvironmentWithBoxesResolver },
        children: [
          {
            path: '',
            component: EnvironmentHomeComponent,
          },
          {
              path: 'search',
              component: SearchComponent
          }
        ]
    },
    {
        path: 'profile/:profile',
        component: ProfileComponent,
        resolve: { environment: EnvironmentResolver, profile: ProfileResolver },
        children: [
            {
              path: '',
              component: ActivitiesComponent,
            },
            {
              path: 'about',
              component: ProfileAboutComponent,
            },
        ]
    },
    {
        path: ':profile',
        component: ProfileComponent,
        resolve: { environment: EnvironmentResolver, profile: ProfileResolver },
        children: [
            {
              path: '',
              component: ProfileHomeComponent,
            },
            {
              path: '**',
              component: ContentViewerComponent,
            },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forRoot(routes) ],
    exports: [ RouterModule ],
    providers: [
        EnvironmentResolver,
        ProfileResolver,
        EnvironmentWithBoxesResolver,
        DomainResolver,
    ]
})
export class AppRoutingModule { }
