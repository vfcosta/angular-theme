export class Arrays {
    static remove<T extends noosfero.RestModel>(elements: T[], element: T) {
        if (!elements) return;
        elements.forEach((value: T, index: number, array: T[]) => {
            if (value.id === element.id) {
                array.splice(index, 1);
            }
        });
    }
}
