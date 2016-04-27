import {Component, Inject, Input} from "ng-forward";

@Component({
    selector: 'sidebar-sections',
    templateUrl: 'app/layout/sidebar/sidebar-sections.html'
})

//@Inject('translateFilter')
export class SidebarSectionsComponent {

    @Input()
    public items: any[] = [
        {
            title: 'Friends',
            count: 0,
            url: '#',
            className: 'active',
            icon: 'fa-users',
            subitems: [
                { title: 'Example' }
            ]
        }
    ];

    addItem(item: any): SidebarSectionsComponent {
        this.items.push(item);
        return this;
    }

}
