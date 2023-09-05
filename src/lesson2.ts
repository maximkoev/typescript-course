// Array, tupples
let a: number[] = [];
a = [1, 2, 3];

function getOddNumbers(arr: number[]): number[] {
  const result: number[] = [];
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 !== 0) result.push(arr[i]);
  }
  return result;
}
type TPoint = [number, number];
let point: TPoint = [1, 2];
point = [2, 3];
let point3D: [number, number, number] = [1, 2, 3];

let record: [string, string] = ["Hello", "Привіт"];
record = ["Hello", "Привіт"];

// point = point3D;

// Object type, type alias
type TPoint2D = { x: number; y: number };

let point2: TPoint2D = { x: 1, y: 2 };
let point3: TPoint2D = { x: 3, y: 2 };

// const declarations
const PI = 3.14;
// PI = 3.15;
const person = { name: "John", age: 23 };
person.age = 24;

const arr = [1, 2, 3];
arr.push(4);

// Functions
function sum(a: number, b: number): number {
  return a + b;
}
function sayHello(name: string): void {
  console.log(`Hello ${name}`);
}
function sumAll(...numbers: number[]): number {
  let result = 0;
  for (let i = 0; i < numbers.length; i++) {
    result += numbers[i];
  }
  return result;
}

type TSum = (a: number, b: number) => number;

let sum2: TSum = (a, b) => a + b;

// Structural typing, duck typing, type compatibility
type TPoint3D = { x: number; y: number; z: number };
let point3D2: TPoint3D = { x: 1, y: 2, z: 3 };
// type TPoint2D = { x: number; y: number };
let point2D: TPoint2D = { x: 1, y: 2 };

point2D = point3D2;

function printPoint(point: TPoint2D) {
  console.log(`Point: ${point.x.toFixed(2)}, ${point.y.toFixed(2)}`);
}
printPoint(point2D);
printPoint({ x: 1, y: 2 });
printPoint(point3D2);

let user1 = { name: "John", age: 23 };
let user;

// Classes

class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name; // this - instance of the class
    this.age = age;

    return this;
  }

  sayHello() {
    console.log(`Hello, my name is ${this.name}`);
  }
}

let user2 = new User("John", 23);
user2.sayHello();

class Point {
  protected x: number;
  protected y: number;

  constructor(x: number, y: number) {
    this.x = x; // this - instance of the class
    this.y = y;
  }

  // constructor(protected x: number, protected y: number) {
  // }

  protected logAction(str: string) {
    console.log(str, this);
  }

  distance() {
    this.logAction("distance");

    return Math.sqrt(this.x ** 2 + this.y ** 2);
  }

  move(distance: number) {
    this.x += distance;
    this.y += distance;
  }
}

class Point3D extends Point {
  z: number;

  constructor(x: number, y: number, z: number) {
    super(x, y);
    this.z = z;
  }

  distance() {
    this.logAction("distance 3D");

    return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
  }

  move(distance: number) {
    super.move(distance);
    this.z += distance;
  }
}

let point3D3 = new Point3D(1, 2, 3);
point3D3.move(10);
// point3D3.x = 100;

// function distance(x: number, y: number): number;
// function distance(x: number, y: number, z: number):number {
//     if (z) {
//         return Math.sqrt(x ** 2 + y ** 2 + z ** 2);
//     }
//     return Math.sqrt(x ** 2 + y ** 2);
// }
