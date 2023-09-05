"use strict";
// Array, tupples
let a = [];
a = [1, 2, 3];
function getOddNumbers(arr) {
    const result = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] % 2 !== 0)
            result.push(arr[i]);
    }
    return result;
}
let point = [1, 2];
point = [2, 3];
let point3D = [1, 2, 3];
let record = ["Hello", "Привіт"];
record = ["Hello", "Привіт"];
let point2 = { x: 1, y: 2 };
let point3 = { x: 3, y: 2 };
// const declarations
const PI = 3.14;
// PI = 3.15;
const person = { name: "John", age: 23 };
person.age = 24;
const arr = [1, 2, 3];
arr.push(4);
// Functions
function sum(a, b) {
    return a + b;
}
function sayHello(name) {
    console.log(`Hello ${name}`);
}
function sumAll(...numbers) {
    let result = 0;
    for (let i = 0; i < numbers.length; i++) {
        result += numbers[i];
    }
    return result;
}
let sum2 = (a, b) => a + b;
let point3D2 = { x: 1, y: 2, z: 3 };
// type TPoint2D = { x: number; y: number };
let point2D = { x: 1, y: 2 };
point2D = point3D2;
function printPoint(point) {
    console.log(`Point: ${point.x.toFixed(2)}, ${point.y.toFixed(2)}`);
}
printPoint(point2D);
printPoint({ x: 1, y: 2 });
printPoint(point3D2);
let user1 = { name: "John", age: 23 };
let user;
// Classes
class User {
    name;
    age;
    constructor(name, age) {
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
    x;
    y;
    constructor(x, y) {
        this.x = x; // this - instance of the class
        this.y = y;
    }
    // constructor(protected x: number, protected y: number) {
    // }
    logAction(str) {
        console.log(str, this);
    }
    distance() {
        this.logAction("distance");
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }
    move(distance) {
        this.x += distance;
        this.y += distance;
    }
}
class Point3D extends Point {
    z;
    constructor(x, y, z) {
        super(x, y);
        this.z = z;
    }
    distance() {
        this.logAction("distance 3D");
        return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2);
    }
    move(distance) {
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
