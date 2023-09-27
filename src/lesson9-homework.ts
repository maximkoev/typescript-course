// Use mappping types
function exercise47() {
  // implement mapped type that takes two types T and K
  // K must be a union of strings or numbers or symbols
  // the mapped type should create a new type that has all properties included in list K, and the value of each property is T
  // type TRecord<K extends ..., T> = {
  //   [... in ...]: ...;
  // };
  // TODO: uncomment the following code and check if your mapped type works
  // type TPoint = TRecord<"x" | "y" | "z", number>;
  // const point: TPoint = {
  //   x: 1,
  //   y: 2,
  //   z: 3,
  // };
}
exercise47();

// Use mappping types modifiers
function exercise48() {
  // implement mapped type that makes all properties of T optional and nullable
  // type TPartialNullable<T> = {
  //   [... in ...]: ...;
  // };

  type TPoint = {
    x: number;
    y: number;
    z: number;
    name: string;
  };

  // type TNullablePoint = TPartialNullable<TPoint>;
  // const p1: TNullablePoint = { x: 10 };
  // const p2: TNullablePoint = { x: 10, y: null };
}
exercise48();

// Template Literal Type
function exercise49() {
  // TODO: create a type that represents a string that contains Tshirts sizes (S, M, L, XL, XXL)
  // TODO: create a type that represents a string that contains Tshirts colors (red, green, blue)
  // TODO: create a type that represents a string that contains Tshirts sizes and colors (e.g. "S-red", "M-green", "L-blue")
  // TODO: create a function that takes a size and a color and returns a Tshirt size and color
  // TOOD: make sure you annotate the params and return type of the function
  // type TSize =
  // type TColor =
  // type TTshirt =
  // function createTshirt(size, color) {
  //   return `${size}-${color}`;
  // }
  // const tshirt = createTshirt("S", "red");
}
exercise49();

// Fix autocoplete problem for literal union types
function exercise50() {
  // TODO: observe the problem with autocomplete in the line createCar("BMW");
  // TODO: fix the problem by using the approach from the lesson
  type Brands = "BMW" | "Mercedes" | "Audi" | string;

  function createCar(brand: Brands) {
    return `${brand} car`;
  }
  // TODO: check if autocomplete works before and after the fix
  const car = createCar("BMW");
}
exercise50();

// Use satisfies constraint
function exercise51() {
  // Use satisfies constraint
  // TODO: create a tuple type that represents a 3d point
  type TPoint = [];
  // TODO: create a type that represents a 3d shapes (key is a string, value is an array of 3d points)
  type TShapes = {};

  const shapes: TShapes = {
    circle: [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
    ],
    square: [
      [1, 2, 3],
      [4, 5, 6],
    ],
  };

  // TODO: create a function that takes a list points and prints them into console
  function drawShape(points: TPoint[]) {
    console.log(points);
  }

  // drawShape(shapes.circle123); // TOOD: uncomment and fix this to have compile check error, using satisfies constraint
}
exercise51();

// This is an algorithmic problem - use your algorithmic skills and typescript knowledge to solve it
function exerciseExtra2() {
  /**
   * Write a program that prints the integers from 1 to 100 (inclusive).
   * But:
   *  - for multiples of three, print Fizz (instead of the number)
   *  - for multiples of five, print Buzz (instead of the number)
   *  - for multiples of both three and five, print FizzBuzz (instead of the number)
   */

  function fizzBuzz() {
    // TODO: add your code here
  }
  fizzBuzz();
  /**
   * 1
   * 2
   * Fizz
   * 4
   * Buzz
   * ...
   */

  // TODO: convert fizzBuzz function to return a string output instead of printing to console
  function fizzBuzzToString() {
    // TODO: add your code here
  }
  fizzBuzzToString();
  // TODO: write a test to validate fizzBuzz output using console.assert
  // console.assert( ... );
}
exerciseExtra2();
