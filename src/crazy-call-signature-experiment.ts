type TUser1 = {
    name: string;
    age?: number;
};

interface IUserConstructor {
    debugName: string;
    callsCount: number;

    new(name: string): TUser1;

    new(name: string, age: number): TUser1;

    (name: string): TUser1;

    (name: string, age: number): TUser1;
}

// TODO: implement the instance side of the type IUserConstructor

// class User {
//   constructor(name: string, age?: number) {
//     // Your constructor implementation here
//   }
//   (name: string, age?: number) {
//     // Your constructor implementation here
//   }

//   static debugName: string;
//   static callsCount: number;
// }

// // Implement the static members
// User.debugName = "";
// User.callsCount = 0;

// // Factory function that mimics the constructor
// const createUser: IUserConstructor = function (name: string, age?: number) {
//   return new User(name, age);
// };

// createUser.debugName = User.debugName;
// createUser.callsCount = User.callsCount;

// // Example usage
// const user1 = createUser("John");
// const user2 = createUser("Alice", 30);

// console.log(createUser.debugName); // Outputs: ''
// console.log(createUser.callsCount); // Outputs: 0
