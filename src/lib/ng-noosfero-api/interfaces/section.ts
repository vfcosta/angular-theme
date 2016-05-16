namespace noosfero {
    /**
     * @ngdoc interface
     * @name noosfero.Section
     * @description
     *  Represents a block settings section. A Section has a value property, 
     * which represents the Section name, and an optinally checked property which
     * has the same value as the value property indicating that this property is
     * selected in the block configuration.
     */
    export interface Section {

        value: string;
        checked: string;
    }
}