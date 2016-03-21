namespace noosfero {
    export interface User {
        id: number;
        login: string;
        email: string;
        person: Person;
        private_token: string;
        userRole: string;
    }
}