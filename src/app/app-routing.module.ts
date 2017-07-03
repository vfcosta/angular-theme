import { PasswordComponent } from './login/new-password.component';
import { RegisterComponent } from './account/register.component';
import { CommunityMembersProfileComponent } from './profile/community-members/community-members-profile.component';
import { NewCommunityComponent } from './profile/configuration/communities/new-community.component';
import { CommunityMembersMyProfileComponent } from './profile/configuration/communities/community-members-my-profile.component';
import { DestroyProfileComponent } from './profile/destroy/destroy-profile.component';
import { ChangePasswordComponent } from './profile/configuration/change-password/change-password.component';
import { PersonCommunitiesComponent } from './profile/configuration/communities/person-communities.component';
import { PersonFriendsComponent } from './profile/configuration/friends/person-friends.component';
import { ProfileEditionComponent } from './profile/configuration/profile-edition.component';
import { EditCommunityComponent } from './profile/configuration/communities/edit-community.component';
import { ProfilePersonalDataComponent } from './profile/configuration/personal-data/profile-personal-data.component';
import { ProfileConfigurationComponent } from './profile/configuration/profile-configuration.component';
import { TasksComponent } from './task/tasks/tasks.component';
import { CmsComponent } from './article/cms/cms.component';
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
        path: 'account',
        children: [
            {
                path: 'signup',
                component: RegisterComponent
            },
            {
                path: 'new_password/:code',
                component: PasswordComponent
            }
        ]
    },
    {
        path: 'myprofile/:profile',
        resolve: { environment: EnvironmentResolver, profile: ProfileResolver },
        children: [
            {
                path: '',
                component: ProfileConfigurationComponent,
                children: [
                    {
                        path: '',
                        component: ProfileEditionComponent,
                    },
                    {
                        path: 'friends',
                        component: PersonFriendsComponent,
                    },
                    {
                        path: 'communities',
                        component: PersonCommunitiesComponent,
                    },
                    {
                        path: 'change_password',
                        component: ChangePasswordComponent,
                    },
                    {
                        path: 'destroy_profile',
                        component: DestroyProfileComponent,
                    },
                    {
                        path: 'members',
                        component: CommunityMembersMyProfileComponent,
                    },
                    {
                        path: 'community/new',
                        component: NewCommunityComponent,
                    },
                ]
            },
            {
                path: 'cms',
                component: CmsComponent
            },
            {
                path: 'cms/edit/:id',
                component: CmsComponent
            },
            {
                path: 'tasks',
                component: TasksComponent
            },
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
            {
              path: 'members',
              component: CommunityMembersProfileComponent,
            },
            {
              path: 'friends',
              component: PersonFriendsComponent,
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
