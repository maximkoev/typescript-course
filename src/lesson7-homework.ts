// Use double assertion
function exercise35() {
    // TODO:Create two types: TUser and TProduct
    interface TUser {
        /* TODO: add definition for user name, title and email */
        user: string,
        title: string,
        email: string
    }

    interface TProduct {
        /* TODO: add definition for product title, price and quantity */
        title: string,
        price: number,
        quantity: number,
        definition: string
    }

    let product: TProduct; //{title: "Phone", price: 5000, quantity: 10000, definition: "Some defs"};
    const user: TUser = {user: 'Developer', title: "Junior", email: "joe.doe@domain.com"};

    // TODO: fix the error by adding double assertion
    product = user as unknown as TProduct;
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
        name: "Joe Doe"
    };
    // TODO: add this param annotation, to enforce that this function
    // can only be called on an object with name, age and role properties
    function toString(this: { name: string, age: number, role: string }) {
        // TODO: remove the following line
        //return "";
        // TODO: uncomment the following line
        return `exercise36. ${this.name}, ${this.age}, ${this.role}`;
    }

    data.toString = toString;

    console.log(data.toString());
    console.log(data + "");
}

exercise36();

// Use generic constraints
function exercise37() {
    interface IPerson {
        firstName: string;
        lastName: string;
    }

    // TODO: add generic constraints to enforce type checking, add return type annotation
    function addGreeting<T extends IPerson>(obj: T) {
        // TODO: implement the method sayHello that returns a greeting string
        // TODO: use firstName lastName props to generate a greeting string,
        //  for example: "Hello Joe Smith"
        // TODO: make sure the obj is not modified, and new object is returned
        const sayHello = function (): string {
            return `Hello ${(obj as T).firstName} ${(obj as T).lastName}`
        }
        return {sayHello, ...obj}
    }

    const obj = {
        firstName: "Joe",
        lastName: "Smith",
        age: 30,
        email: "john@sample.com",
    }

    const person = addGreeting(obj);

    // TODO: uncomment the following line and fix the error
    console.log(person.sayHello());
}

exercise37();

// Use experimental decorators
// function exercise38() {
//     // TODO: implement decorator to print call count of the function
//     function count(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         // add params here
//         let callCount = 0;
//
//         // TODO: implement decorator
//
//         const originalFunc = descriptor.value
//         descriptor.value = function (...args: any[]) {
//             // TODO: before calling the function increment callCount
//             callCount++
//             const res = originalFunc.apply(this, args)
//             // TODO: after calling the function print callCount
//             console.log(`Function called ${callCount} times`)
//             return res;
//         }
//         return descriptor
//     }
//
//     // TODO: implement decorator to print execution time of the function
//     function time(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
//         // add params here
//         const original = descriptor.value
//         descriptor.value = function (this, ...args: any[]) {
//             // TODO: before calling the function get current time
//             const currentTimeBefore = Date.now()
//             const resp = original.apply(this, args)
//             // TODO: after calling the function get current time
//             const currentTimeAfter = Date.now()
//             // TODO: print the difference between the two times after calling the function
//             const diff = currentTimeAfter - currentTimeBefore
//             console.log(`Execute time is: ${diff}ms`)
//             return resp
//         }
//         return descriptor;
//     }
//
//     class Calculation {
//         // TODO: add both decorators to the following method
//         @count
//         @time
//         static add(a: number, b: number): number {
//             console.log('Inside func')
//             return a + b
//         }
//     }
//
//     // TODO: create instance of Calculation class and call add method
//     // const cals = new Calculation()
//     console.log(Calculation.add(1, 2))
//     console.log(Calculation.add(1, 2))
//     console.log(Calculation.add(1, 2))
// }

///exercise38();

// Use 2023 decorators (Stage 3 decorator)
function exercise39() {
    // TODO: implement decorator to print call count of the function
    function count(originalMethod: Function, _context: ClassMethodDecoratorContext) {
        let counter: number = 0;
        return function (this: any, ...args: any[]) {
            counter++
            const resp = originalMethod.apply(this, args)
            console.log(`function called ${counter} times`)
            return resp
        }
    }

    // TODO: implement decorator to print execution time of the function
    function time(originalMethod: Function, _context: ClassMethodDecoratorContext) {
        return function (this: any, ...args: any[]) {
            const kind = _context.kind.toString()
            const name = _context.name.toString().concat("()")
            const label = `${kind} ${name}`
            console.time(label)
            const resp = originalMethod.apply(this, args)
            console.timeEnd(label)
            return resp
        }
    }

    class Calculation {
        // TODO: add both decorators to the following method
        @count
        @time
        static add(a: number, b: number) {
            console.log("Inside func")
            return a + b;
        }
    }

    // TODO: create instance of Calculation class and call add method
    console.log(Calculation.add(2, 5))
    console.log(Calculation.add(2, 5))
    console.log(Calculation.add(2, 5))
    console.log(Calculation.add(2, 5))
}

exercise39();
