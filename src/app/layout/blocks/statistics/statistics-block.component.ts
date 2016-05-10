import {Input, Inject, Component} from "ng-forward";

@Component({
    selector: "noosfero-statistics-block",
    templateUrl: 'app/layout/blocks/statistics/statistics-block.html'
})

export class StatisticsBlockComponent {

    @Input() block: noosfero.StatisticsBlock;
    @Input() owner: any;

    counters: any = [];

    ngOnInit() {
        this.counters.push({ 'should_display': this.block.user_counter, 'value': this.block.users, 'name': 'users' });
        this.counters.push({ 'should_display': this.block.enterprise_counter, 'value': this.block.enterprises, 'name': 'enterprises' });
        this.counters.push({ 'should_display': this.block.product_counter, 'value': this.block.products, 'name': 'products' });
        this.counters.push({ 'should_display': this.block.community_counter, 'value': this.block.communities, 'name': 'communities' });
        this.counters.push({ 'should_display': this.block.category_counter, 'value': this.block.categories, 'name': 'categories' });
        this.counters.push({ 'should_display': this.block.tag_counter, 'value': this.block.tags, 'name': 'tags' });
        this.counters.push({ 'should_display': this.block.comment_counter, 'value': this.block.comments, 'name': 'comments' });
        this.counters.push({ 'should_display': this.block.hit_counter, 'value': this.block.hits, 'name': 'hits' });

    }
}
