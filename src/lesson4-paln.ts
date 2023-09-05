// ********* Lesson 4 *********

// Readonly modifier
function lessonReadonlyModifier() {
  type Person = {
    name: string;
    age: number;
  };

  const person: Person = {
    name: "John",
    age: 18,
  };

  // const in JS is not immutable, it prohibits reassignment
  // person = { name: 'John', age: 19 }; // error
  // but you can change the properties of the object
  person.age = 19; // no error

  type Person2 = {
    readonly name: string;
    readonly age: number;
  };

  const person2: Person2 = {
    name: "John",
    age: 18,
  };
}

// Optional modifier
function lessonOptionalModifier() {
  type Person = {
    name: string;
    age: number;
    email: string;
    phone?: string; // optional modifier
  };

  const person: Person = {
    name: "John",
    age: 18,
    email: "",
    phone: undefined, // optional modifier allows to omit the property when creating the object
  };

  // classes example
  class Point {
    x?: number;
    y?: number;
  }

  const point = new Point();
  // point.x = null; // null is not optional type member
}
lessonOptionalModifier();

// Union Types
function lessonUnionTypes() {
  function formatCommandLine(command: unknown) {
    if (typeof command === "string") {
      return command.trim();
    } else if (Array.isArray(command)) {
      return command.map((arg) => arg.trim()).join(" ");
    }

    return "";
  }

  console.log(formatCommandLine("  git status  ")); // git status
  console.log(formatCommandLine(["git ", " status "])); // git status
  // can pass any value to the function, with no type check errors
  console.log(formatCommandLine(123)); // ''

  // to fix the problem, use union types
  function formatCommandLineV2(command: string | string[]) {
    if (typeof command === "string") {
      return command.trim();
    }
    // it must be an array if it is not a string
    return command.map((arg) => arg.trim()).join(" ");
  }

  console.log(formatCommandLineV2("  git status  ")); // git status
  console.log(formatCommandLineV2(["git ", " status "])); // git status
  // will break if you pass a number
  // console.log(formatCommandLineV2(123)); // error

  function repeat(value: unknown, times: number) {
    if (typeof value === "string") {
      return value.repeat(times);
    } else if (typeof value === "number") {
      return value * times;
    }

    throw new Error("value must be string or number");
  }
  const result = repeat("abc", 3);
  const result2 = repeat(false, 3); // no type check error, but will throw an error at runtime

  function repeat2(value: string | number, times: number): string | number {
    if (typeof value === "string") {
      return value.repeat(times);
    } else if (typeof value === "number") {
      return value * times;
    }

    throw new Error("value must be string or number");
  }
  console.log(repeat2("abc", 3)); // abcabcabc
  console.log(repeat2(123, 3)); // 369
  // will trigger compile time error if you pass a boolean
  // console.log(repeat2(false, 3)); // error is thrown

  // examples of union types
  let val: string | number;
  val = "abc";
  val = 123;

  type TPrimitive =
    | string // for multiple lines allows to start with trailing | for better readability
    | number
    | boolean
    | null
    | undefined
    | symbol
    | bigint;
  let val2: TPrimitive;
  val2 = "abc";
  val2 = 123;
}

// Literal Types
function lessonLiteralTypes() {
  // typescript allows to use any string as a type literal
  // type literals are used to restrict the values of the variable
  // example
  let upDirection: "up"; // the only value that can be assigned to the variable is 'up'
  // any other value will trigger compile time error

  upDirection = "up";
  // upDirection = 'down'; // error

  // single literal type is not very useful, but we can combine it with union types
  let direction: "up" | "down" | "left" | "right";

  direction = "down";
  direction = "left";
  direction = "right";
  // direction = 'upward'; // compile time error

  // it is possible to assign literal union type to a type alias
  type TDirection = "up" | "down" | "left" | "right";
  let direction2: TDirection;

  type TPoint = {
    x: number;
    y: number;
  };

  function move(point: TPoint, direction: TDirection) {
    if (direction === "up") {
      return { x: point.x, y: point.y + 1 };
    }
    if (direction === "down") {
      return { x: point.x, y: point.y - 1 };
    }
    if (direction === "left") {
      return { x: point.x - 1, y: point.y };
    }
    if (direction === "right") {
      return { x: point.x + 1, y: point.y };
    }
    throw new Error("invalid direction");
  }

  const point = { x: 0, y: 0 };
  const point2 = move(point, "up"); // { x: 0, y: 1 }
  const point3 = move(point2, "right"); // { x: 1, y: 1 }
  console.log("point", point);
  console.log("point2", point2);
  console.log("point3", point3);

  // union literals can be of any other type, not only string
  // for example, number
  type TRating = 1 | 2 | 3 | 4 | 5;
  function printRating(rating: TRating) {
    // print number of stars based on the rating
    console.log("".padStart(rating, "⭐"));
  }
  printRating(3); // ⭐⭐⭐
  printRating(5); // ⭐⭐⭐⭐⭐
  // printRating(6); // error
}
lessonLiteralTypes();

// Intersection types
function lessonIntersectionTypes() {
  // type Point
  type TPoint = {
    x: number;
    y: number;
  };

  type TPoint3D = {
    x: number;
    y: number;
    z: number;
  };

  // type intersection allows inheriting properties from multiple types
  // example
  type TPoint3DV2 = TPoint & {
    z: number;
  };

  // type intersection is used to combine multiple types
  // example
  type TPerson = {
    name: string;
  };
  type TEmail = {
    email: string;
  };
  type TPhone = {
    phone: string;
  };

  // type intersection is used to combine multiple types
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function sendMessage(data: any) {
    console.log(
      `dear ${data.name}, your email is ${data.email}, your phone is ${data.phone}`
    );
  }

  const data = {
    name: "John",
    email: "test@jhn.com",
    phone: "123-456-7890",
  };
  sendMessage(data);

  function sendMessageV2(data: TPerson & TEmail & TPhone) {
    console.log(
      `dear ${data.name}, your email is ${data.email}, your phone is ${data.phone}`
    );
  }
  sendMessageV2(data);

  type TContact = TPerson & TEmail & TPhone;
  function sendMessageV3(data: TContact) {
    console.log(
      `dear ${data.name}, your email is ${data.email}, your phone is ${data.phone}`
    );
  }

  sendMessageV3({
    name: "John",
    email: "asdf@asdf.com",
    phone: "123-456-7890", // if omitted, will trigger compile time error
  });
}
lessonIntersectionTypes();

// async/await
function lessonAssyncAwait() {
  // async await is a syntactic sugar for promises
  // - is used to write asynchronous code in synchronous style
  // - is used to avoid callback hell
  // - is used to avoid promise chaining
  // - is used to avoid promise error handling

  // example
  function printMessagesWithTimeout() {
    setTimeout(() => {
      console.log("1");

      setTimeout(() => {
        console.log("2");

        setTimeout(() => {
          console.log("3");
        }, 1000);
      }, 1000);
    }, 1000);
  }
  printMessagesWithTimeout();
  // the problem with the code above is that it is hard to read and maintain
  // it is hard to add more messages, change the order of the messages
  // it is hard to add error handling
  // example with async await

  async function printMessagesWithTimeoutV2() {
    await later(1000);
    console.log("1");
    await later(1000);
    console.log("2");
    await later(1000);
    console.log("3");
  }
  // const arrowAsync = async () => {}; // async arrow function syntax example
  const later = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  printMessagesWithTimeoutV2();

  // async await can be used to do asyncronous loops
  function calculateLargeSum() {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) {
      // this loop is blocking the main thread
      // UI is not responsive
      sum += i;
    }
    return sum;
  }
  calculateLargeSum();

  // async await can be used to do asyncronous loops
  async function calculateLargeSumAsync() {
    let sum = 0;
    for (let i = 0; i < 10000000000; i++) {
      if (i % 10000000 === 0) {
        await later(1);
      }
      sum += i;
    }
    return sum;
  }

  calculateLargeSumAsync().then((sum) => console.log(sum)); //
}
lessonAssyncAwait();
