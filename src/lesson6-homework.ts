// Create and use a type guard
function exercise29() {
  type TWidget = {
    name: string;
  };
  type TGadget = {
    os: string;
  };
  type TThing = TWidget | TGadget;

  // TODO: implement isWidget function to be a type guard
  function isWidget(arg: TThing) {
    return false;
  }

  function printThingDescription(arg: TThing) {
    // TODO: uncomment the following code
    // if (isWidget(arg)) {
    //   console.log(arg.name);
    // } else {
    //   console.log(arg.os);
    // }
  }
  printThingDescription({ name: "widget" });
  printThingDescription({ os: "android" });
}
exercise29();

// Create an overloaded function definitions
function exercise30() {
  type TWidget = {
    name: string;
    cost?: number;
  };
  type TGadget = {
    os: string;
    cost?: number;
  };
  type TThing = TWidget | TGadget;

  // TODO: add function overloading here to ensure that function return type matches the input value type
  function assignWidgetCost(obj: TThing): TThing {
    obj.cost = 100;

    return obj;
  }

  // TODO: fix problem - typeof a: TThing, not TWidget
  const a = assignWidgetCost({ name: "widget" } as TWidget);
  // TODO: fix same here - typeof b: TThing, not TGadget
  const b = assignWidgetCost({ os: "android" } as TGadget);

  console.log(a, b);
}
exercise30();

// Create call signatures
function exercise31() {
  function handleSaveUserSubmit(
    firstName: string,
    lastName: string,
    email?: string
  ) {}

  // TODO: add call signatures here. Add overrides for optional email param
  type TSaveUserCallback = { /* replace  with your code */ x: "" };
  // TODO: add call signatures here. Add overrides for optional email param
  interface ISaveUserCallback {}

  function createForm(onSubmit: TSaveUserCallback) {
    const firstName = "John";
    const lastName = "Smith";

    // TODO: uncomment the following line
    // onSubmit(firstName, lastName);
  }
  function createForm2(onSubmit: ISaveUserCallback) {
    const firstName = "John";
    const lastName = "Smith";
    const email = "jsmith@somemail.some.com";

    // TOOD: uncomment the following line
    // onSubmit(firstName, lastName, email);
  }

  // *** add constructor signatures here ***
  type TUserConstructor = { /* replace  with your code */ x: "" };
  interface IUserConstructor {}

  function createAndPrintUser(ctor: IUserConstructor) {
    // TOOD: uncomment the following lines
    // const user = new ctor('John Smith');
    // console.log(user);
  }
}
exercise31();

// Create an abstract class and concrete classes
function exercise32() {
  // TODO: make this class abstract
  class Animal {
    constructor(public name: string) {
      this.name = name;
    }
    // TODO: add abstract method named makeSound
    // makeSound ...
    eat(): void {
      console.log("eating");
    }
  }
  // TODO: inherit from Animal and implement makeSound method
  class Dog {}

  // TODO: uncomment the following lines, fix the errors
  // const myDog = new Dog('Buddy');
  // myDog.eat();
  // myDog.makeSound();
}
exercise32();

// Create a type for a dictionary with string keys and number values
function exercise33() {
  // TODO: create a type TDictionary
  // type TDictionary = {};

  // TODO: const dictionary variable of TDictionary type, assign some values (1, 2, 3)
  const dictionary = {};

  // TODO: uncomment the following lines, fix the errors
  // dictionary['c'] = 3;
  // dictionary['d'] = '3'; // should cause an error error

  // TODO: implement a function that calculates number of characters
  // in a string using the dictionary type, and returns a most frequent character
  function getMostFrequentCharacter(str: string): string {
    return "";
  }
  console.log(getMostFrequentCharacter("She sells seashells by the seashore."));
}
exercise33();

// Use index signature and caching
function exercise34() {
  // TODO: Define a dictionary of student grades, add type definition using index signature
  // key is a student name, value is an array of grades (numbers)
  const studentGrades = {};

  // TODO: Implement function to calculate the average grade for a student
  function calculateAverageGrade(studentName: string): number | string {
    const studentFound = false;
    if (studentFound) {
      // TODO: calculate average grade
      return 0;
    } else {
      return "Student not found";
    }
  }

  // TODO: Iterate through the dictionary and display each student's average grade
  for (const studentName in studentGrades) {
    // TODO: call calculateAverageGrade and print the result
  }

  // TODO: add caching for the average grade calculation to the calculateAverageGrade function
}
exercise34();
