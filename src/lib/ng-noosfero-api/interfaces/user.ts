namespace noosfero {
    export interface User extends RestModel, ModelWithPermissions {
        id: number;
        login: string;
        email: string;
        person: Person;
        private_token: string;
        userRole: string;
    }
}