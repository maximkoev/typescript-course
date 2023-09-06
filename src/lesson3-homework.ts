// try different target compiler options
// try different target compiler options
import {isArray} from "util";
import {it} from "node:test";

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
        ) {
        }

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

// create a generic Stack class (Stack is a FILO data structure, push and pop methods are used to add and remove items from the top of the stack)
function excercise11() {
    // TODO: create a generic Stack class
    class Stack<T> {
        // TODO: add a private data property of type array of T
        private data: Array<T> = []

        /**
         * Returns quantity of elements in stack
         */
        get length(): number {
            return this.data.length
        }

        /**
         * Read the head element of stack
         */
        get peek(): T {
            return this.data[0]
        }

        /**
         * Prints all data in the stack
         * TODO: only for debug reasons, remove it before merge
         */
        stackData(): void {
            console.log(`Exercise 11. Stack data: ${this.data}`)
        }

        // TODO: add a push method which takes an item of type T as a parameter and adds it to the top of the stack
        /**
         * Add item on the top of stack
         * @param item
         */
        push(item: T) {
            this.data.unshift(item)
        }

        // TODO: add a pop method which removes and returns the item from the top of the stack
        pop(): T {
            const element = this.data.splice(0, 1)
            if (Array.isArray(element) && element.length === 1) {
                return element[0]
            } else throw new Error('Stack is empty');
        }

    }

    // TODO: create an instance of the Stack class with number type
    const stackOfNumbers = new Stack<number>()

    // TODO: push two numbers to the stack
    stackOfNumbers.push(1);
    stackOfNumbers.push(2);
    // TODO: pop an item from the stack and print it to console, calling toFixed method on it
    console.log(`Exercise 11. pop: ${stackOfNumbers.pop().toFixed()}`);
    // TODO: create an instance of the Stack class with string type
    const stackOfStrings = new Stack<string>()
    // TODO: push two strings to the stack
    stackOfStrings.push('stack element number 1');
    stackOfStrings.push('stack element number 2');
    // TODO: pop an item from the stack and print it to console,
    //  calling toUpperCase method on it
    console.log(`Exercise 11. stack of the strings pop: ${stackOfStrings.pop().toUpperCase}`);
    type TEvent = { name: string, execute: () => void };
    const stackOfEvents = new Stack<TEvent>();
    stackOfEvents.push({name: 'Log out', execute: () => console.log('Exercise 11.User is logged out')});
    stackOfEvents.push({name: 'Print greeting', execute: () => console.log('Exercise 11. Hello world')});
    stackOfEvents.push({name: 'Log in ', execute: () => console.log('Exercise 11. User is logged in')});
    while (stackOfEvents.length > 0) {
        const event = stackOfEvents.pop();
        if (event) {
            console.log(`Exercise 11. fire event: ${event.name}`);
            event.execute();
        }
    }
}

// TODO: compile and run the code
excercise11();

// create a generic function which takes an array of items of type T and returns the random item from the array
function excercise12() {
    function randomIntFromInterval(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    // TODO: create a function that takes an array of numbers and returns a random number from the array
    function randomizerOfNumbers(arr: Array<number>): number {
        return arr[randomIntFromInterval(0, arr.length - 1)]
    }

    // TODO: create a function that takes an array of strings and returns a random string from the array
    function randomizerOfStrings(arr: Array<string>): string {
        return arr[randomIntFromInterval(0, arr.length - 1)]
    }

    // TODO: create a function that takes an array of objects and returns a random object from the array
    function randomizerOfObjects(arr: Array<Object>): Object {
        return arr[randomIntFromInterval(0, arr.length - 1)]
    }

    // TODO: observe the same structure of the functions above,
    //  and create a generic function which takes an array of items of type T
    //  and returns the random item from the array
    function randomizer<T>(arr: Array<T>): T {
        return arr[randomIntFromInterval(0, arr.length - 1)]
    }

    console.log(`Exercise 12. Random value from numbers array: ${randomizer<number>([1, 2, 3, 4, 5])}`)
    console.log(`Exercise 12. Random value from string array: ${randomizer<string>(["name1", "name2"])}`)
    type TUser = { name: string, age: number }
    console.log(`Exercise 12. Random value from TUser array: ${randomizer<TUser>([
        {name: 'Jhon', age: 23},
        {name: "Frodo", age: 87},
        {name: "Gendalf", age: 187},
        {name: "Doe", age: 17},
    ]).age}`)
}

// TODO: compile and run the code
excercise12();

// add type assertion to the code
function excercise13() {
    // NOTE: do not change this function
    function fetchUserAge(): unknown {
        const responseText = '{"name": "John", "age": 18}';
        return JSON.parse(responseText).age;
    }

    const userAge = fetchUserAge();
    // TODO: uncomment the following code and add type assertion to fix the error
    console.log(<number>userAge + 1);
    if (typeof userAge === 'number') {
        console.log(userAge + 1)
    }
    if (typeof userAge != 'number') {
        throw new Error('Type missmathing, age is not number')
    }
    console.log(userAge + 1)
}

// TODO: compile and run the code
excercise13();

// use type casting to fix the mistake in the code
// run the code before and after adding type casting to see the difference
function excercise14() {
    function fetchUserAge(): number {
        const responseText = '{"name": "John", "age": "16"}';

        return +JSON.parse(responseText).age;
    }

    const userAge = fetchUserAge();
    // TODO: run the code below and observe the result, explain why it is happening,
    // TODO: add type casting to the function above, to fix the error
    if (userAge === 16) {
        console.log("Time to get your driver license");
    } else if (userAge > 16) {
        console.log("You are old enough to drive");
    } else {
        console.log("You are not old enough to drive");
    }
}

// TODO: compile and run the code
excercise14();

// add type safety to the code which uses any
function excercise15() {
    // TODO: declare a type for user object, which has a name property of type string
    type TUser = { name: string }

    // TODO: fix the fetchUsers function to return an array of users, not any type
    function fetchUsers(): Array<TUser> {
        // TODO: add type safety to the data variable, annotate it with the type of users
        const data: unknown = JSON.parse(
            '{"users": [{"name": "John"}, {"name": "Jane"}]}'
        );
        if (typeof data === 'object'
            && data != null
            && 'users' in data
            && data.users != null
            && Array.isArray(data.users)) {
            data.users.forEach(item => {
                if ('name' in item && typeof item.name === 'string') {

                } else throw new Error('One or more items in array dont match user type')

            })
            return data.users;
        }
        throw new Error('Received object that does not match on user type')
        // TODO: add check for the data type to contain list of users
    }

    // TODO: fix typings of the users variable (currently it is of type any)
    const users: Array<TUser> = fetchUsers();
    // TODO: add type safety to the code to print the names of the users to console
    users.forEach((user: TUser) => console.log(user.name));
}

// TODO: compile and run the code
excercise15();

// use type declarations to fix the comments in the code
function excercise16() {
    // TODO: add code which uses process.env.NODE_ENV variable,
    const nodeenv = process.env.NODE_ENV
    console.log(`Exercise 16. NODE_ENV: ${nodeenv}`)
    // TODO: try to compile and see the error
    // TODO: add type declaration for process.env.NODE_ENV variable in global.d.ts file
    // TODO: try to compile and see the error fixed
    // TODO: remove global.d.ts file, compile and see the error again
    // TODO: install type declarations from error message -  @types/node
    // NOTE: For the most part, type declaration packages should always have the same name as the package name on npm, but prefixed with @types/
}

// TODO: compile and run the code
excercise16();
