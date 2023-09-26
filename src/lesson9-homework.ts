// Use mappping types
import {type} from "os";

function exercise47() {
    // implement mapped type that takes two types T and K
    // K must be a union of strings or numbers or symbols
    // the mapped type should create a new type that has all properties included in list K,
    // and the value of each property is T
    type TPrimitive = string | number | symbol;
    type TRecord<K extends TPrimitive, T> = {
        [P in K]: T;
    };
    // TODO: uncomment the following code and check if your mapped type works
    type TPoint = TRecord<"x" | "y" | "z", number>;
    const point: TPoint = {
        x: 1,
        y: 2,
        z: 3,
    };
}

exercise47();

// Use mappping types modifiers
function exercise48() {
    // implement mapped type that makes all properties of T optional and nullable
    type TPartialNullable<T> = {
        [K in keyof T]?: T[K] | null;
    };


    type TPoint = {
        x: number;
        y: number;
        z: number;
        name: string;
    };

    type TNullablePoint = TPartialNullable<TPoint>;
    const p1: TNullablePoint = {x: 10};
    const p2: TNullablePoint = {x: 10, y: null};
}

exercise48();

// Template Literal Type
function exercise49() {
    type TPrimitive = string | number | symbol;
    // TODO: create a type that represents a string that contains Tshirts sizes (S, M, L, XL, XXL)
    type TTshirtsSize = 'S' | 'M' | 'L' | 'XL' | 'XXL'
    // TODO: create a type that represents a string that contains Tshirts colors (red, green, blue)
    type TTshirtsColor = 'red' | 'green' | 'blue'
    // TODO: create a type that represents a string that contains Tshirts sizes and colors (e.g. "S-red", "M-green", "L-blue")
    type TTshirtsSizeNColor = `${TTshirtsSize}-${TTshirtsColor}`
    type TTShirt<T extends TTshirtsSize, K extends TTshirtsColor> = `${T}-${K}`;
    type TTshirtsSizeNColor1 = TTShirt<TTshirtsSize, TTshirtsColor>
    // TODO: create a function that takes a size and a color and returns a Tshirt size and color
    // TODO: make sure you annotate the params and return type of the function
    function createTshirt<T extends TTshirtsSize, K extends TTshirtsColor>(size: T, color: K): TTShirt<T, K> {
        return `${size}-${color}`;
    }

    // function createTshirt2<T extends TTshirtsSizeNColor>(size: TTshirtsSize, color: TTshirtsColor): T {
    //     return `${size}-${color}`;
    // }

    const tshirts: TTshirtsSizeNColor = createTshirt("S", "red");
}

exercise49();

// Fix autocomplete problem for literal union types
function exercise50() {
    // TODO: observe the problem with autocomplete in the line createCar("BMW");
    // TODO: fix the problem by using the approach from the lesson
    type Brands = "BMW" | "Mercedes" | "Audi" | (string & {});

    function createCar(brand: Brands) {
        return `${brand} car`;
    }

    // TODO: check if autocomplete works before and after the fix
    const car = createCar("Audi");
}

exercise50();

// Use satisfies constraint
function exercise51() {
    // Use satisfies constraint
    // TODO: create a tuple type that represents a 3d point
    type TPoint = [number, number, number];
    // TODO: create a type that represents a 3d shapes (key is a string, value is an array of 3d points)
    type TShapes = Record<string, TPoint[]>

    const shapes = {
        circle: [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
        ],
        square: [
            [1, 2, 3],
            [4, 5, 6],
        ],
    } satisfies TShapes;

    // TODO: create a function that takes a list points and prints them into console
    function drawShape(points: TPoint[]) {
        console.log(points);
    }

    drawShape(shapes.circle); // TODO: uncomment and fix this to have compile check error, using satisfies constraint
    // drawShape(shapes.circle123); Error: Unresolved variable circle123
}

exercise51();

// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it

