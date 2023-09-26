// ********* Lesson 9 *********

// Mapped Types
function mappedTypes() {
    // js has for in loop
    // for (const key in object) {
    // mapped types are similar to for in loop but for types

    type Point = {
        x: number;
        y: number;
        z: number;
        // name: string;
    };

    type TReadOnlyPoint = {
        readonly x: number;
        readonly y: number;
        readonly z: number;
    };

    const point: TReadOnlyPoint = {
        x: 1,
        y: 2,
        z: 3,
    };

    // point.x = 10; // error

    type TPointV1 = {
        [K in "x" | "y" | "z"]: number;
    };

    type TPointV2 = {
        [K in "x" | "y" | "z"]: Point[K];
    };

    type TReadOnlyPointV2 = {
        readonly [K in "x" | "y" | "z"]: Point[K];
    };

    type TReadOnlyPointV3 = {
        readonly [K in keyof Point]: Point[K];
    };

    /**
     * Make all properties in T readonly
     */
    type Readonly<T> = {
        readonly [P in keyof T]: T[P];
    };

    type TReadOnlyPointV4 = Readonly<Point>;

    // Readonly<T> is a built-in mapped type
}

// Mappping types modifiers
function mappedTypesModifiers() {
    /**
     * Make all properties in T optional
     */
    type Partial<T> = {
        [P in keyof T]+?: T[P];
    };

    /**
     * Make all properties in T required
     */
    type Required<T> = {
        [P in keyof T]-?: T[P];
    };

    /**
     * Make all properties in T readonly
     */
    type Readonly<T> = {
        +readonly [P in keyof T]: T[P];
    };
    /**
     * Remove readonly modifier from all properties in T
     */
    type Mutable<T> = {
        -readonly [P in keyof T]: T[P];
    };

    /**
     * Make all properties in T nullable
     */
    type Nullable<T> = {
        [P in keyof T]: T[P] | null;
    };

    type TPoint = {
        x: number;
        y: number;
        z: number;
        name: string;
    };

    type TNullablePoint = Nullable<TPoint>;

    // usage example
    class State<T> {
        constructor(private state: T) {
        }

        updateState(newState: T) {
            // TODO: use Partial
            this.state = {...this.state, ...newState};
        }

        getStateByKey(key: keyof T) {
            return this.state[key];
        }
    }

    const state = new State<TPoint>({
        x: 1,
        y: 2,
        z: 3,
        name: "point",
    });
    // state.updateState({ x: 10 }); // error

    /**
     * From T, pick a set of properties whose keys are in the union K
     */
    type Pick<T, K extends keyof T> = {
        [P in K]: T[P];
    };
}

mappedTypesModifiers();

// Template Literal Type
function templateLiteralType() {
    // in js we have template literals
    const name = "John";
    const greeting = `Hello ${name}`;

    // in ts we have template literal for types
    type Greeting = `Hello ${string}`; // it is a string type that starts with "Hello " and ends with any string
    const greeting2: Greeting = "Hello John";
    // const greeting3: Greeting = "Hello123 John";

    // example 1
    type CssValue = number | `${number}px` | `${number}em` | `${number}%`;
    const width: CssValue = 100;
    const width2: CssValue = "100px";
    const width3: CssValue = "100em";
    // example 2
    type Color = "red" | "green" | "blue";
    type CssColor = Color | `#${string}`;
    // example 3
    type Shape = "circle" | "square";
    type ShapeWithColor = `${Shape}-${Color}`;

    function drawShapeWithColor(shapeWithColor: ShapeWithColor) {
        console.log(shapeWithColor);
    }

    drawShapeWithColor("circle-red");
    // drawShapeWithColor("circle-red123"); // error
}

templateLiteralType();

// Fix autocomplete problem for literal union types
function fixAutocompleteProblemForLiteralUnionTypes() {
    type Color = "red" | "green" | "blue" | string;

    function drawRectangle(color: Color) {
        console.log(color);
    }

    drawRectangle("redd"); // no autocomplete
    // string includes all possible strings, so Color is a string type alias
    // if to remove the string - nice autocomplete, but we lose the ability to pass any string
    type Color2 = "red" | "green" | "blue" | (string & {});

    function drawRectangle2(color: Color2) {
        console.log(color);
    }

    drawRectangle2("red"); // autocomplete works
}

fixAutocompleteProblemForLiteralUnionTypes();

// Satisfies constraint
function satisfiesConstraint() {
    type ColorString = "red" | "green" | "blue";
    type ColorRGB = [red: number, green: number, blue: number];

    type Color = ColorString | ColorRGB;

    type Theme = Record<string, Color>;

    const theme: Theme = {
        primary: "green",
        secondary: [0, 255, 0],
        danger: "red",
    };

    const [r, g, b] = theme.secondary123; // no error checking

    const theme2 = {
        primary: "green",
        secondary: [0, 255, 0],
        danger: "red",
    } satisfies Theme;

    const [r1, g1, b1] = theme2.secondary;

    const _temp: Theme = theme2;
}

satisfiesConstraint();
