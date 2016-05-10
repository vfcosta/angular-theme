namespace noosfero {
    export interface StatisticsBlock extends Block {
        user_counter: boolean;
        users: number;
        enterprise_counter: boolean;
        enterprises: number;
        product_counter: boolean;
        products: number;
        community_counter: boolean;
        communities: number;
        category_counter: boolean;
        categories: number;
        tag_counter: boolean;
        tags: number;
        comment_counter: boolean;
        comments: number;
        hit_counter: boolean;
        hits: number;
    }
}
