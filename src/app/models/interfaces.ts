export interface Event extends Article {
    id: number;
}

export interface Article {
    id: number;
}

export interface Profile {
    id: number;
}

export interface Person extends Profile {
    id: number;
}

export interface TynyMceArticle extends Article {
    id: number;
}

export interface Blog extends Article {
    id: number;
}
