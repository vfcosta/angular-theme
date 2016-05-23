export class HashMap<K extends EqualsObject, V> {
    private values: Array<HashItem<K, V>> = new Array();

    get(key: K): V {
        let found = this.values.find( function(value: HashItem<K, V>) {
            return value.key.equals(key);
        });
        if (found) {
            return found.value;
        }
        return null;
    }

    put(key: K, value: V): void {
        this.values.push(new HashItem(key, value));
    }

    clear() {
        this.values = new Array();
    }
}

export class HashItem<K, V> {
    key: K;
    value: V;
    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export abstract class EqualsObject {

    abstract equals(other: any): boolean;

}