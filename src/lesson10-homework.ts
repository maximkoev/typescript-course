// string manipulation utilities type
function exercise52() {
    // TODO: write a utility type that for given object type T
    // will create a new type with all properties plus methods to get and set properties
    // plus methods to validate each of the property
    type TObjectWitName = {
        name: string;
    };
    type TObjectDescription<T, M> = {
        data: T;
        methods: M & ThisType<T & M>
    }
    // TODO: declare utility type TGettersSettersValidators (union of TGetters, TSetters, TValidators)
    // hint: TGetters for each of the property generates getXxxx method that returns property value
    type TGetters<T> = {
        [K in keyof T & string as `get${Capitalize<K>}`]: () => T[K]
    }
    // hint: TSetters for each of the property generates setXxxx method that sets property value
    type TSetters<T> = {
        [K in keyof T & string as `set${Capitalize<K>}`]: (prop: T[K]) => void
    }
    // hint: TValidators for each of the property generates validateXxxx method that returns true if property value is valid
    type TValidators<T> = {
        [K in keyof T & string as `validate${Capitalize<K>}`]: (prop: T[K]) => boolean
    }
    type TGettersSettersValidators<T> = TSetters<T> & TGetters<T> & TValidators<T>
    const obj = {
        name: "point",
    };

    // TODO: generate this type from TGettersSettersValidators using utility type
    type TObjectMethods = TGettersSettersValidators<typeof obj>;
    // TODO: remvoe this declaration below and replace it with the one above

    const object: TObjectWitName & TObjectMethods = {
        name: "point",
        getName() {
            return this.name;
        },
        setName(name: string) {
            this.name = name;
        },
        validateName() {
            return this.name.length > 0;
        },
    };

    // TODO: add property age to object and check if you get type check errors
    //In this case have an error
    //Initializer type {setName(name: string): void, getName(): string, name: string,
    // age: number, validateName(): boolean} is not assignable to variable
    // type TObjectWitName & TObjectMethods
}

exercise52();

// enums
function exercise53() {
    // TODO: declare enum Color with values Red, Green, Blue
    // TODO: assign Red: 1, Green: 2, Blue: 4
    enum Color {
        Red = 1,
        Green,//keep this prop unassigned because TS implicitly set value "2"
        // I guess it is not great approach in terms of real life projects.
        // I am leaving it as it is because it looks interesting :)
        Blue = 4
    }

    // TODO: declare a function that takes a color as a number and returns a string
    // TODO: use bitmask bitwise AND operator to check if color has Red, Green, Blue
    function getColor(color: number): string {
        let result = '';
        // console.log(`color: ${color}`)
        // console.log(`enum Red: ${Color.Red}`)
        // console.log(`enum Green: ${Color.Green}`)
        // console.log(`enum Blue: ${Color.Blue}`)
        // console.log(`bitwise operator with Red ${Color.Red & color}`)
        // console.log(`bitwise operator with Green ${Color.Green & color}`)
        // console.log(`bitwise operator with Blue ${Color.Blue & color}`)
        if (Color.Red & color) {
            result = result.concat('Red')
        }
        if (Color.Green & color) {
            if (result) {
                result = result.concat(', Green')
            } else result = 'Green'
        }
        if (Color.Blue & color) {
            if (result) {
                result = result.concat(', Blue')
            } else result = result.concat('Blue')
        }
        // TODO: check if red bit is set by bitwise & operator, if so - add "Red" to result
        // TODO: check if green bit is set by bitwise & operator, if so - add "Green" to result
        // TODO: check if blue bit is set by bitwise & operator, if so - add "Blue" to result

        // TODO: explain how bitmask works

        return result.trim();
    }

    // console.log(getColor(3))

    // TODO: add test assertions using this table
    console.assert(getColor(0) === "", " (empty string, no color), bitmask ( 0 0 0 )");
    console.assert(getColor(1) === "Red", ' bitmask ( 0 0 1 )')
    console.assert(getColor(2) === "Green", "bitmask ( 0 1 0 )")
    console.assert(getColor(3) === "Red, Green", "bitmask ( 0 1 1 )")
    console.assert(getColor(4) === "Blue", 'bitmask ( 1 0 0 )')
    console.assert(getColor(5) === "Red, Blue", 'bitmask ( 1 0 1 )')
    console.assert(getColor(6) === "Green, Blue", 'bitmask   ( 1 1 0 )')
    console.assert(getColor(7) === "Red, Green, Blue", 'bitmask ( 1 1 1 )')
}

exercise53();

// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it
function exerciseExtra3() {
    // TODO: write a function to  merge two sorted arrays of numbers into one sorted array
    function mergeSortedArrays(arr1: any, arr2: any): any {
        return quickSort([...arr1, ...arr2])
    }

    console.assert(
        mergeSortedArrays([1, 2, 3], [4, 5, 6]).toString() ===
        [1, 2, 3, 4, 5, 6].toString(),
        `Expected: [1, 2, 4, 5 , 6], Actual: ${mergeSortedArrays([1, 2, 3], [4, 5, 6])}`
    );

    console.assert(
        mergeSortedArrays([3, 4, 5], [4, 5, 6]).toString() ===
        [3, 4, 4, 5, 5, 6].toString(),
        `Expected: [3, 4, 4, 5, 5, 6], Actual: ${mergeSortedArrays([3, 4, 5], [4, 5, 6])}`
    );
    console.assert(
        mergeSortedArrays([3, 4, 5, 6, 6, 10, 20], [4, 5, 6]).toString() ===
        [3, 4, 4, 5, 5, 6, 6, 6, 10, 20].toString(),
        `Expected: [3, 4, 4, 5, 5, 6, 6, 6, 10, 20], Actual: ${mergeSortedArrays([3, 4, 5, 6, 6, 10, 20], [4, 5, 6])}`
    );

    // TODO: convert mergeSortedArrays to a generic function to support strings and numbers
}

exerciseExtra3();

function quickSort(arr: number[]): Array<number> {
    qhelper(arr, 0, arr.length - 1);
    return arr
}

function qhelper(list: number[], firstIndex: number, lastIndex: number) {
    if (firstIndex > lastIndex) {
        return;
    }
    const splitPoint = partition(list, firstIndex, lastIndex);
    qhelper(list, firstIndex, splitPoint - 1);
    qhelper(list, splitPoint + 1, lastIndex);
    return list;
}

function partition(list: number[], firstIndex: number, lastIndex: number): number {
    const pivot: number = list[firstIndex];
    let leftmark: number = firstIndex + 1;
    let rightmark: number = lastIndex;
    let done: boolean = false;
    while (!done) {
        while (leftmark <= rightmark && list[leftmark] <= pivot) {
            leftmark = leftmark + 1;
        }
        while (list[rightmark] >= pivot && rightmark >= leftmark) {
            rightmark = rightmark - 1;
        }
        if (rightmark < leftmark) {
            done = true;
        } else {
            const tmp = list[leftmark];
            list[leftmark] = list[rightmark];
            list[rightmark] = tmp;
        }
    }
    const tmp = list[firstIndex];
    list[firstIndex] = list[rightmark];
    list[rightmark] = tmp;
    return rightmark;
}
