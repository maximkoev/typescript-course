// Use double assertion
function exercise35() {
  // TODO:Create two types: TPoint2D and TPoint3D
  interface TPoint2D {
    /* TODO: add definition for x and y props for coordinates */
  }
  interface TPoint3D {
    /* TODO: add definition for x, y and z props for coordinates */
  }

  let point2D: TPoint2D = { x: 1, y: 2 };
  let point3D: TPoint3D = { x: 1, y: 2, z: 3 };

  // TODO: fix the error by adding double assertion
  // point3D = point2D;
}
exercise35();

// use this parameter type annotation to fix the error in this code
function exercise36() {
  // Note: this object does not have a name property
  // but the toString function expects it to be there, and there is no type check
  const data = {
    firstName: "Joe",
    lastName: "Doe",
    age: 30,
    role: "Developer",
  };
  // TODO: add this param annotation, to enforce that this function
  // can only be called on an object with name, age and role properties
  function toString() {
    // TODO: remove the following line
    return "";
    // TODO: uncomment the following line
    // return `${this.name}, ${this.age}, ${this.role}`;
  }
  data.toString = toString;

  console.log(data.toString());
  console.log(data + "");
}
exercise36();

// EXERCISE (pause the video and do): fix the following code, use generic constraints
function exercise37() {
  interface IPerson {
    firstName: string;
    lastName: string;
  }
  // // TODO: add generic constraints to enforce type checking, add return type annotation
  // function addGreeting<T>(obj: T) {
  //   // TODO: implement the method sayHello that returns a greeting string
  //   // TODO: in the function generate variable fullName = `${obj.firstName} ${obj.lastName}`;
  //   // TODO: use fullName variable to generate a greeting string, for example: "Hello Joe Smith"
  //   // TODO: make sure the obj is not modified, and new object is returned
  // }
  // TODO: add generic constraints to enforce type checking, add return type annotation
  function addGreeting<T>(obj: T) {
    // TODO: implement the method sayHello that returns a greeting string
    // TODO: use firstName lastName props to generate a greeting string, for example: "Hello Joe Smith"
    // TODO: make sure the obj is not modified, and new object is returned
  }

  const person = addGreeting({
    firstName: "Joe",
    lastName: "Smith",
    age: 30,
    email: "john@sample.com",
  });

  // TODO: uncomment the following line and fix the error
  // console.log(person.sayHello());
}
exercise37();
