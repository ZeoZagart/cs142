const excludeEnd = (start: number, end: number) => getRange(start, end - 1);
const excludeStart = (start: number, end: number) => getRange(start + 1, end);
const getRange = (start: number, end: number): number[] => {
    let array = new Array();
    for (let i = start; i <= end; i++) {
        array.push(i);
    }
    return array;
}

export {excludeEnd, excludeStart, getRange}