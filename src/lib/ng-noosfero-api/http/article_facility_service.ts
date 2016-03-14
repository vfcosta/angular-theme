

export class ArticleFactilityService {

    public static ARTICLES_RESOURCE_NAME = "articles";

    resourceBase: restangular.IElement = null;

    constructor(
        protected restangularService: restangular.IService,
        protected profile: noosfero.Profile) {
        if (!profile) {
            throw new Error("Could not instantiate ArticleOwner Service! Profile is missing!");
        }
    }


    getArticles(params?: any, headers?: any): restangular.ICollectionPromise<noosfero.Article> {
        return this.profile.getList<noosfero.Article>(ArticleFactilityService.ARTICLES_RESOURCE_NAME, params, headers);
    }

    getArticle(id: number, params?: any, headers?: any): restangular.IPromise<noosfero.Article> {
        return this.profile.one(ArticleFactilityService.ARTICLES_RESOURCE_NAME, id).get(params, headers);
    }

    removeArticle(article: noosfero.Article, params?: any, headers?: any): restangular.IPromise<noosfero.Article> {
        let element: restangular.IElement = this.restangularService.restangularizeElement(this.profile, article, ArticleFactilityService.ARTICLES_RESOURCE_NAME);
        return element.remove(params, headers);
    }

    createArticle(article: noosfero.Article, params?: any, headers?: any): restangular.IPromise<noosfero.Article> {
        return this.profile.post<noosfero.Article>(ArticleFactilityService.ARTICLES_RESOURCE_NAME, article, params, headers);
    }

    updateArticle(article: noosfero.Article, params?: any, headers?: any): restangular.IPromise<noosfero.Article> {
        let element: restangular.IElement = this.restangularService.restangularizeElement(this.profile, article, ArticleFactilityService.ARTICLES_RESOURCE_NAME);
        return element.put(params, headers);
    }
}