// @flow
type uniqueArrayByPropertyValueProps = {
    // Non-unique array of items
    array: Array<any>,
    // Property name to be used
    propertyName: string,
    // Update existing item with newer, one found later in the array
    update: boolean,
};
export const uniqueArrayByPropertyValue = ({
    array, propertyName = 'id', update = true,
}: uniqueArrayByPropertyValueProps) => {
    // New result
    const result = [];
    // Keep index of processed items
    const propertyValuesIndex = [];
    // Unique map
    const map = new Map();
    for (const item of array) {
        let addItem = false;
        let updateItem = false;
        let updateIndex = -1;

        const propertyValue = item[propertyName];
        if (update) {
            updateIndex = propertyValuesIndex.indexOf(propertyValue);
            // Item exist, update it in place
            if (updateIndex !== -1) {
                updateItem = true;
            }
            else {
                addItem = true;
            }
        }
        else {
            addItem = !map.has(item.id);
        }

        if (addItem) {
            map.set(item.id, true);
            propertyValuesIndex.push(propertyValue);
            result.push(item);
        }
        else if (updateItem) {
            result[updateIndex] = item;
        }
    }

    return result;
}