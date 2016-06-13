
namespace noosfero {
    export interface Article extends RestModel {
        abstract: string;
        path: string;
        profile: Profile;
        type: string;
        parent: Article;
        body: string;
        title: string;
        name: string;
        published: boolean;
        setting: any;
        start_date: string;
        end_date: string;
        accept_comments: boolean;

        permissions: string[];
    }
}
