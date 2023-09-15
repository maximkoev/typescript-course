// ********* Lesson 7 *********

// Double assertions
function doubleAssertions() {
  type TPoint2D = {
    x: number;
    y: number;
  };
  type TPoint3D = {
    x: number;
    y: number;
    z: number;
  };
  // same as
  // type TPoint3DV2 = TPoint2D & {
  //     z: number;
  // }

  let point2D: TPoint2D = { x: 1, y: 2 };
  let point3D: TPoint3D = { x: 1, y: 2, z: 3 };

  // OK
  point2D = point3D;
  // Error: Type 'TPoint2D' is not assignable to type 'TPoint3D'.
  // point3D = point2D;
  point3D = point2D as TPoint3D; // type assertion - single assertion

  type TPerson = {
    name: string;
    dateOfBirth: Date;
  };

  // Error: Type 'TPoint2D' is not assignable to type 'TPoint3D'.
  // const person2: TPerson = point3D as TPerson;

  // double assertion -  convert tounknown type first
  // anything can be converted to unknown
  const person2: TPerson = point3D as unknown as TPerson;
}
doubleAssertions();

// This function parameter type
function thisFunctionParameter() {
  // a. this as param type name
  const data = {
    name: "Joe",
    age: 30,
    role: "Developer",
  };

  function toStringBad() {
    // no type check for this to be defined, this.name, this.age, this.role
    // type of this is any
    // return `${this.name}, ${this.age}, ${this.role}`;
    return "";
  }

  data.toString = toStringBad;
  // no type check
  toStringBad(); // undefined, undefined, undefined - or throws an error in strict mode

  function toStringGood(this: { name: string; age: number; role: string }) {
    // no type check for this to be defined, this.name, this.age, this.role
    return `${this.name}, ${this.age}, ${this.role}`;
  }
  data.toString = toStringGood;
  // Error: The 'this' context of type 'void' is not assignable to method's 'this' of type '{ name: string; age: number; role: string; }'.
  // toStringGood();
  // OK
  toStringGood.call(data); // Joe, 30, Developer
  data.toString(); // Joe, 30, Developer

  const badData = {
    name: "Joe",
    toString: toStringGood,
  };
  // Error: Cannot read property 'name' of undefined
  // badData.toString();

  // Note: this parameter should be the first parameter of the function, only used in type checking

  // b. this in a class type alias
  class Box {
    width = "";
    height = "";
    constructor(width: string, height: string) {
      this.width = width;
      this.height = height;
    }

    // "this" here - is a type alias for the class
    equal(other: this) {
      return other.width === this.width && other.height === this.height;
    }
  }

  const box1 = new Box("10px", "20px");
  // Error: Argument of type '{}' is not assignable to parameter of type 'Box'.
  // box1.equal({});
  box1.equal(new Box("10px", "20px")); // true
}
thisFunctionParameter();

// Generic constraints
function genericConstraints() {
  function addFullNameV1<T>(obj: T) {
    // Error: Property 'fullName' does not exist on type 'T'.
    //   obj.fullName = `${obj.firstName} ${obj.lastName}`;
  }

  function addFullNameV2<T>(obj: T): T & { fullName: string } {
    // Error: Property 'fullName' does not exist on type 'T'.
    // return { ...obj, fullName: `${obj.firstName} ${obj.lastName}` };
    return {
      ...obj,
      fullName: `${(obj as any).firstName} ${(obj as any).lastName}`,
    };
  }

  interface IPerson {
    firstName: string;
    lastName: string;
  }
  function addFullNameV3<T extends IPerson>(obj: T): T & { fullName: string } {
    return { ...obj, fullName: `${obj.firstName} ${obj.lastName}` };
  }

  const person3 = addFullNameV3({
    firstName: "Joe",
    lastName: "Smith",
    age: 30,
    email: "john@sample.com",
  });

  // Error: Argument of type '{ firstName: string; }' is not assignable to parameter of type 'IPerson'.
  // const person4 = addFullNameV3({ firstName: 'Joe' });
}
genericConstraints();
