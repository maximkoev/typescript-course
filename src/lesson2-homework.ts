// Create a function which uses tuple type to calculate the distance between two points in 2D space
function excercise4(): void {
  // TODO: declare two variables of type tuple, each with two numbers
  // TODO: assign values to the variables (1,1) and (4,5)
  // TODO: create a function which calculates the distance between two points in 2D space
  type TPoint = [number, number];
  const point1: TPoint = [1, 1];
  const point2: TPoint = [4, 5];
  function distance(p1: [number, number], p2: [number, number]): number {
    const [x1, y1] = p1;
    const [x2, y2] = p2;
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  console.log(`Exercise 4. Distance is: ${distance(point1, point2)}`);
}
// TODO: compile and run the code
excercise4();

// Create a function which uses type alias to calculate the distance between two points in 2D space - points are objects with x and y properties
function excercise5(): void {
  // TODO: declare a type alias for a point in 2D space (TPoint) - object with x and y properties
  // TODO: declare two variables of type TPoint
  // TODO: assign values to the variables (1,1) and (4,5)
  // TODO: create a function which calculates the distance between two points in 2D space
  type TPoint = { x: number; y: number };
  const point1: TPoint = { x: 10, y: 1 };
  const point2: TPoint = { x: 4, y: 5 };
  function distance(p1: TPoint, p2: TPoint): number {
    const { x: x1, y: y1 } = p1;
    const { x: x2, y: y2 } = p2;
    // TODO: calculate the distance
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
  }
  console.log(`Exercise 5. Distance is: ${distance(point1, point2)}`);
}
// TODO: compile and run the code
excercise5();

// Create functions that use const declarations
function excercise6(): void {
  // TODO: declare a const PI and assign value 3.14
  // TODO: declare a function which calculates a circle area, takes radius as a parameter
  // TODO: call the function and print the result to console
  // TODO: check the type of PI variable
  // TODO: declare a const variable that is an object with two properties - name and age
  // TODO: declare a function which takes a person object as a parameter and increments age by 1
  // TODO: call the function and print the person object to console
  const PI = 3.14;
  const circleArea = (radius: number): number => {
    return PI * radius ** 2;
  };
  console.log(`Exercise 6. Circle area: ${circleArea(5)}`);
  type TUser = { name: string; age: number };
  const userJohn: TUser = { name: "John", age: 23 };
  const incrementAge = (user: TUser): TUser => {
    user.age++;
    return user;
  };
  console.log(
    `Exercise 6. Incremented age: ${JSON.stringify(incrementAge(userJohn))}`,
  );
}
excercise6();

// Create a function that takes as a first parameter an array of numbers
// a second parameter - a function that takes a number and returns a number.
// and returns a new array with the results of function called on each element of the array (function passed as a first parameter)
function excercise7(): void {
  // TODO: add type annotations
  type TFun = (arg: number) => number;
  function map(arr: Array<number>, fn: TFun): Array<number> {
    // TODO: add logic here
    // TODO: use regular for loop
    const result: number[] = [];
    for (let i = 0; i < arr.length; i++) {
      result.push(fn(arr[i]));
    }
    return result;
  }
  // TODO: create an array of numbers
  const nums: number[] = [1, 2, 3, 4, 5, 10];
  // TODO: create a function which doubles a number
  function double(num: number): number {
    return num * 2;
  }
  // TODO: call map function (created earlier) with the array and the function
  const doubled: number[] = map(nums, double);
  // TODO: print the result to console
  console.log(`Exercise 7. Original array: ${nums}\nDoubled array: ${doubled}`);
}
// TODO: compile and run the code
excercise7();

// declare a function which takes a user and prints greeting to console
function excercise8(): void {
  // TODO: create a type for user, with name property
  type TUser = { name: string };
  // TODO: create a function with name printGreeting, which takes a user and prints greeting to console
  const printGreeting = (user: TUser) => {
    if (user && user.name && typeof user.name === "string") {
      console.log(`Exercise 8. Hello, ${user.name}`);
    } else throw new Error("ArgumentType error");
  };
  // TODO: create a type for product, with name property and price property
  type TProduct = { name: string; price: number };
  // TODO: create a product object, assign it some object literal
  const phone: TProduct = { name: "Iphone", price: 3000 };
  // TODO: call the function with product as a parameter
  printGreeting(phone);
  // TODO: call the function with object literal as a parameter
  printGreeting({ name: "Object Literal" });
  // TODO: try adding extra property to the object literal - observe the error
  // TODO: fix the error with type assertion
  printGreeting({ name: "Greg", lastname: "Agrot" } as TUser);
}
// TODO: compile and run the code
excercise8();

// declare a `Book` class with a constructor and a method
function excercise9() {
  function currentYear(): number {
    return new Date(Date.now()).getFullYear();
  }
  // TODO: declare a `Book` class with a constructor and a method `getInfo` which returns the book info as a string
  class Book {
    // TODO: constructor should take three parameters - title and year of publication
    protected title: string;
    // TODO: add private modifier to the year property
    // TODO: change protected modifier to the year property, remove private modifier
    protected publicationYear: number;
    constructor(title: string, publicationYear: number) {
      if (publicationYear > currentYear()) {
        throw new Error(
          `Publication year could not be in the future - ${publicationYear}`,
        );
      }
      this.title = title;
      this.publicationYear = publicationYear;
    }

    // TODO: method `getInfo` should return the book title and year as a string
    getInfo(): string {
      return `${this.title}, ${this.publicationYear}`;
    }
    // TODO: add a new method `getAge` which returns the age of the book (current year - year of publication)
    get age(): number {
      return currentYear() - this.publicationYear;
    }
    // TODO: add a new method `revise` which takes a new year as a parameter and updates the year property,
    //  add validation to the method - year can not be in the future, year can not be less than prev year
    revise(year: number): void {
      switch (true) {
        case year < this.publicationYear:
          throw new Error(
            `Revised year - ${year},  cannot be less then current - ${this.publicationYear}.`,
          );
        case year > currentYear():
          throw new Error(`Revised year - ${year} cannot be in the future.`);
        default:
          this.publicationYear = year;
      }
    }
  }

  // TODO: create a book object and call the method `getInfo`, print the result to console
  const hpInfo = {
    title: "Harry Potter and the sorcerers stone",
    publicationYear: 1998,
  };
  const hpBook = new Book(hpInfo.title, hpInfo.publicationYear);
  console.log(`Exercise 9. Book info: ${hpBook.getInfo()}`);
  // TODO: assign a new value to the year property
  // TODO: try to access the year property from outside of the class - observe the error
  //hpBook.publicationYear = 2000;
  // TODO: call the method `getInfo` again
  hpBook.getInfo();
  console.log(`Exercise 9. Book age: ${hpBook.age}`);

  // TODO: call the method `revise` and pass a new year as a parameter
  hpBook.revise(2001);

  // TODO: call the method `getAge` and print the result to console
  console.log(`Exercise 9. Book age after revise: ${hpBook.age}`);
  console.log(`Exercise 9. Book info after revise: ${hpBook.getInfo()}`);
  //hpBook.revise(2024) throws Error: Revised year - 2024 cannot be in the future.
  //hpBook.revise(1998) throws Error: Revised year - 1998,  cannot be less than current - 2001.

  // TODO: create a subclass `Magazine` which extends `Book` class
  class Magazine extends Book {
    // TODO: add a new properties `month` and `day` to the `Magazine` class
    month: number;
    day: number;

    // TODO: add constructor override to the Magazine class which takes four parameters - title, year, month and day
    // TODO: use super keyword to call the `Book` class constructor with title and year parameters
    /**
     * Be aware that there is not date verification. It is possible set 30 February and so on
     * @param day - takes day number 0-31
     * @param month - takes months number 1-12
     * @param year - the year when book publicised. Could not be in the future
     * @param title - name of the book
     */
    constructor(day: number, month: number, year: number, title: string) {
      super(title, year);
      if (month < 1 || month > 12) {
        throw new RangeError(
          `Month value is out of range: ${month}. Should be in the range [1-12] `,
        );
      }
      if (day < 1 || day > 31) {
        throw new RangeError(
          `Month value is out of range: ${day}. Should be in the range [1-31]`,
        );
      }
      this.month = month;
      this.day = day;
    }
    // TODO: add a method override `getInfo` to the `Magazine` class which prints the magazine info to console
    // TODO: use super keyword to call the `getInfo` method of the `Book` class
    getInfo(): string {
      return super
        .getInfo()
        .concat(`/${this.day.toString()}/${this.month.toString()}`);
    }
  }

  // TODO: create a magazine object and call the method `getInfo`, print the result to console
  const mag = new Magazine(1, 2, 201, "Harry Potter");
  console.log(`Exercise 9. Magazine info: ${mag.getInfo()}`);
  // TODO: call the inherited method `getAge` of the magazine object and print the result to console
  console.log(`Exercise 9. Magazine age: ${mag.age}`);
}
// TODO: compile and run the code
excercise9();

// try different target compiler options
function excercise10() {
  // TODO: declare a Rectangle class, with width and height properties
  // TODO: add a constructor which takes width and height as parameters
  // TODO: add a method `getArea` which returns the area of the rectangle
  // TODO: add a method `getPerimeter` which returns the perimeter of the rectangle
  // TODO: create an instance of the Rectangle class, with width 10 and height 20
  // TODO: call the method `getArea` and print the result to console
  // TODO: call the method `getPerimeter` and print the result to console
  // TODO: compile and run the code
  // TODO: change compiler target to ES5, compile and see the compiled code
  // TODO: change width and height properties to private, recompile and
  // TODO: change compiler target to ES2015, compile and see the compiled code
  // TODO: change width and height properties to be prefixed with #, to use ESNext private fields support
  // TODO: change compiler target to ESNext, compile and see the compiled code
  // TODO: change compiler target to ES5, try to compile, check if you get the error Private identifiers are only available when targeting ECMAScript 2015 and higher.(18028)
  class Rectangle {
    constructor(
      private width: number,
      private height: number,
    ) {}

    get area(): number {
      return this.height * this.width;
    }

    get perimeter(): number {
      return this.width * 2 + this.height * 2;
    }
  }
  const rect = new Rectangle(10, 20);
  console.log(`Exercise 10. Rectangle area is: ${rect.area}`);
  console.log(`Exercise 10. Rectangle perimeter is: ${rect.perimeter}`);
}
// TODO: compile and run the code
excercise10();
