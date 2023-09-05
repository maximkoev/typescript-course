// Compiler options
function lesson3() {
  class Book {
    #title: string;
    #year: number;

    constructor(title: any, year: any) {
      this.#title = title;
      this.#year = year;
    }
    getInfo() {
      return `${this.#title} - ${this.#year}`;
    }
    getAge() {
      return new Date().getFullYear() - this.#year;
    }
  }
  // Generics classes and functions
  class QueueOfStrings {
    private data: string[] = [];
    push(item: string) {
      this.data.push(item);
    }
    pop() {
      return this.data.shift();
    }
  }

  class QueueOfNumbers {
    private data: number[] = [];
    push(item: number) {
      this.data.push(item);
    }
    pop() {
      return this.data.shift();
    }
  }

  type TUser = {
    name: string;
    age: number;
  };

  class QueueOfUsers {
    private data: TUser[] = [];
    push(item: TUser) {
      this.data.push(item);
    }
    pop() {
      return this.data.shift();
    }
  }

  class Queue<T> {
    private data: T[] = [];
    push(item: T) {
      this.data.push(item);
    }
    pop(): T | undefined {
      return this.data.shift();
    }
  }

  const q = new Queue<TUser>();
  q.push({ name: "Igor", age: 34 });
  let x = q.pop();

  function cloneShallow<T>(arg: T): T {
    if (typeof arg === "object") {
      return { ...arg };
    }

    return arg;
  }

  const obj: TUser = {
    name: "Igor",
    age: 34,
  };
  const res = cloneShallow(obj);

  function getFirstElement<T>(arr: T[]): T | undefined {
    return arr[0];
  }

  const arr = [1, 2, 3];
  const res2 = getFirstElement(arr);

  type TFunc = () => number;

  function findLargest<T extends { valueOf: TFunc }>(arr: T[]): T {
    if (arr.length === 0) {
      throw new Error("Array is empty");
    }

    let largest = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > largest) {
        largest = arr[i];
      }
    }

    return largest;
  }

  const o1 = { name: "bob", valueOf: () => 10 };
  const o2 = { name: "Joe", valueOf: () => 20 };

  const res3 = findLargest([o1, o2]);

  function largest<T extends number | string | { valueOf: TFunc }>(a: T, b: T) {
    return a > b ? a : b;
  }

  function largestString(a: string, b: string): string {
    return a > b ? a : b;
  }

  // Special Types: any and unknown
  function foo(arg: unknown) {
    if (typeof arg === "number") {
      console.log(arg.toFixed(2));
    }
  }

  // Type Assertions, Type Casting
  function fetchUser(): unknown {
    const response = '{"name": "John", "age": 18}';
    return JSON.parse(response);
  }
  const user1 = fetchUser() as { name: string; age: number };

  const user2 = fetchUser(); // as { name: string; age: number }

  if (
    typeof user2 === "object" &&
    user2 !== null &&
    "name" in user2 &&
    "age" in user2
  ) {
    console.log(user2.name);
    console.log(user2.age);
  }

  function getSomething(): unknown {
    return 1;
  }

  const x1 = getSomething();

  if (typeof x1 === "number") {
    console.log(x1.toFixed(2));
  }

  // if (typeof x1 !== "number") {
  //   throw new Error("Something went wrong");
  // }
  // console.log(x1.toFixed(2));

  let x2 = x1 as number;

  if (typeof x1 === "string" || typeof x1 === "boolean") {
    let x3 = +x1;
  }

  console.log(process.env.NODE_ENV);
  // const x2 = <number>getSomething();

  // Type Declarations, d.ts files

  // Npm package publishing
  // async/await
}
