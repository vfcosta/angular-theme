import {Component, Input} from "ng-forward";

@Component({
    selector: 'sidebar-section',
    templateUrl: 'app/layout/sidebar/sidebar-section.html'
})
/**
 * @ngdoc object
 * @name sidebar.SidebarSectionComponent
 * @description
 *  This is a widget to render sections to
 *  SidebarComponent.
 *
 * <b>Usage example:</b>
 * @example
 * <pre>
 * let section: SidebarSectionComponent = new SidebarSectionComponent('MySection');
 * section.addItem({
 *    title: 'Friends',
 *    count: 0,
 *    url: '#',
 *    className: 'active',
 *    icon: 'fa-users', //A font-awesome icon class
 *    subitems: [
 *      { title: 'Example' }
 *   ]
 * });
 * </pre>
 */
export class SidebarSectionComponent {

    /**
     * @ngdoc property
     * @name name
     * @propertyOf sidebar.SidebarComponent
     * @description
     *  The name of the section
     */
    @Input()
    public name: string;

    /**
     * @ngdoc property
     * @name items
     * @propertyOf sidebar.SidebarComponent
     * @description
     *  Array of items to render into this sidebar menu
     */
    @Input()
    public items: any[] = [];

    /**
     * @ngdoc method
     * @name constructor
     * @methodOf sidebar.SidebarSectionComponent
     * @param {string} name The name of the section (optional)
     * @description
     *  The constructor for this component. The name of section
     *  can be assigned here, optionally
     */
    constructor() {
    }

    /**
     * @ngdoc method
     * @name addItem
     * @methodOf sidebar.SidebarSectionComponent
     * @param {Object} item Literal object with properties to render a menu item
     * @returns {SidebarSectionComponent} This own component type, using the "Fluent Interface" pattern
     * @description
     *  Use this method to add new items for a section instance
     *
     * <b>Usage example:</b>
     * @example
     * <pre>
     * section.addItem({
     *    title: 'Friends',
     *    count: 0,
     *    url: '#',
     *    className: 'active',
     *    icon: 'fa-users', //A font-awesome icon class
     *    subitems: [
     *      { title: 'Example' } //A subitem literal object
     *   ]
     * });
     * </pre>
     */
    addItem(item: any): SidebarSectionComponent {
        this.items.push(item);
        return this;
    }

    /**
     * @ngdoc method
     * @name setName
     * @methodOf sidebar.SidebarSectionComponent
     * @param {string} name The name of the section
     * @returns {SidebarSectionComponent} This own component type, using the "Fluent Interface" pattern
     * @description
     *  Change the name of the section assigned on constructor
     *
     * <b>Usage example:</b>
     * @example
     * <pre>
     * section.setName('MyAnotherSection')
     *        .addItem({
     *              //Item here
     *              ...
     *          });
     * </pre>
     */
    setName(name: string): SidebarSectionComponent {
        this.name = name;
        return this;
    }

}
