import { Restangular } from 'ngx-restangular';
import { Injectable, Inject } from '@angular/core';
import { RestangularService } from './restangular_service';
import { ProfileService } from './profile.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonService extends RestangularService<noosfero.Person> {

    constructor(protected restangular: Restangular) {
        super(restangular);
    }

    getResourcePath() {
        return "people";
    }

    getDataKeys() {
        return {
            singular: 'person',
            plural: 'people'
        };
    }

    getLoggedPerson(): Promise<any> {
        return this.getElement(<any>'me').get().toPromise();
    }

    getFriends(profileId: number, params?: any): Promise<any> {
        return this.getElement(profileId).customGET("friends", params).toPromise();
    }

    getCommunities(profileId: number, params?: any): Promise<any> {
        return this.getElement(profileId).customGET("communities", params).toPromise();
    }

    isFriend(profileId: number, friendId: number, params?: any): Promise<any> {
        return this.getElement(profileId).customGET("friends/" + friendId, params).toPromise();
    }

    addFriend(profileId: number, params?: any): Promise<any> {
        return this.getElement(profileId).customPOST(params, "friends").toPromise();
    }

    removeFriend(profileId: number, params?: any): Promise<any> {
        return this.getElement(profileId).customDELETE("friends", params).toPromise();
    }

    uploadImage(profile: noosfero.Profile, base64ImageJson: any) {
        const headers = { 'Content-Type': 'application/json' };
        // TODO dynamically copy the selected attributes to update
        const attributesToUpdate: any = {
            person: { image_builder: base64ImageJson }
        };
        const restRequest = this.getElement(profile.id).customPOST(attributesToUpdate, null, null, headers);
        return restRequest.toPromise().then(this.getHandleSuccessFunction());
    }

    getFriendshipState(person: noosfero.Person, friend: noosfero.Profile) {
        if (person) {
            return this.getElement(person.id).customGET('friendship', { friend_id: friend.id }).toPromise().then((result: any) => {
                return Promise.resolve(result.data);
            });
        } else {
            return Promise.resolve(0);
        }
    }

    search(params: any): any {
        return this.restangular.all("people").customGET('', params).map(ret => {
            return ret.data;
        });
    }
}
