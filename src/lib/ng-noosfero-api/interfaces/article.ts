
namespace noosfero {
    export interface Article extends RestModel {
        path: string;
        profile: Profile;
        type: string;
        parent: Article;
        body: string;
        title: string;
        name: string;
    }
}
