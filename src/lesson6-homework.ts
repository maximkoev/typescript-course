// Create and use a type guard
import {type} from "os";

function exercise29() {
    type TWidget = {
        name: string;
    };
    type TGadget = {
        os: string;
    };
    type TThing = TWidget | TGadget;

    // TODO: implement isWidget function to be a type guard
    function isWidget(arg: TThing): arg is TWidget {
        return arg && typeof arg === 'object' && 'name' in arg;
    }

    function printThingDescription(arg: TThing) {
        // TODO: uncomment the following code
        if (isWidget(arg)) {
            console.log(arg.name);
        } else {
            console.log(arg.os);
        }
    }

    printThingDescription({name: "widget"});
    printThingDescription({os: "android"});

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
    function assignWidgetCost(obj: TWidget): TWidget
    function assignWidgetCost(obj: TGadget): TGadget
    function assignWidgetCost(obj: TThing): TThing {
        obj.cost = 100;

        return obj;
    }

    // TODO: fix problem - typeof a: TThing, not TWidget
    const a: TWidget = assignWidgetCost({name: "widget"});
    // TODO: fix same here - typeof b: TThing, not TGadget
    const b: TGadget = assignWidgetCost({os: "android"});
    console.log(a, b);
}

exercise30();

// Create call signatures
function exercise31() {
    function handleSaveUserSubmit(
        firstName: string,
        lastName: string,
        email?: string
    ) {
        const submitString = `Name: ${firstName}, Surname: ${lastName}`;
        email ? console.log(submitString.concat(`, email: ${email}`)) : console.log(submitString);
    }

    // TODO: add call signatures here. Add overrides for optional email param
    type TSaveUserCallback = {
        (firstname: string, lastname: string): void
        (firstname: string, lastname: string, email?: string): void
    };


    // TODO: add call signatures here. Add overrides for optional email param
    interface ISaveUserCallback {
        (firstname: string, lastname: string): void

        (firstname: string, lastname: string, email?: string): void
    }

    function createForm(onSubmit: TSaveUserCallback) {
        const firstName = "John";
        const lastName = "Smith";

        // TODO: uncomment the following line
        onSubmit(firstName, lastName, 'email');
    }

    createForm(handleSaveUserSubmit)

    function createForm2(onSubmit: ISaveUserCallback) {
        const firstName = "John";
        const lastName = "Smith";
        const email = "jsmith@somemail.some.com";

        // TOOD: uncomment the following line
        onSubmit(firstName, lastName, email);
    }

    createForm2(handleSaveUserSubmit)

    type TUser = {
        name: string
    }

    // *** add constructor signatures here ***
    type TUserConstructor = {
        new(name: string): TUser
    };

    interface IUserConstructor {
        new(name: string): TUser
    }

    function createAndPrintUser(ctor: IUserConstructor) {
        // TOOD: uncomment the following lines
        const user = new ctor('John Smith');
        console.log(user);
    }

    class Ctor implements TUser {
        constructor(public name: string) {
        }
    }

    createAndPrintUser(Ctor)

}

exercise31();

// Create an abstract class and concrete classes
abstract class Animal {
    constructor(public name: string) {
        this.name = name;
    }

    // TODO: add abstract method named makeSound
    abstract makeSound(): void;

    eat(): void {
        console.log("eating");
    }
}

function exercise32() {
    // TODO: make this class abstract


    // TODO: inherit from Animal and implement makeSound method
    class Dog extends Animal {
        constructor(name: string) {
            super(name)
        }

        makeSound(): void {
            console.log('Angry barking');
        }
    }

    // TODO: uncomment the following lines, fix the errors
    const myDog = new Dog('Buddy');
    myDog.eat();
    myDog.makeSound();
}

exercise32();

// Create a type for a dictionary with string keys and number values
function exercise33() {
    // TODO: create a type TDictionary
    type TDictionary = { [key: string]: number };

    // TODO: const dictionary variable of TDictionary type, assign some values (1, 2, 3)
    const dictionary: TDictionary = {'End of USSR': 1992, "WW2 begin": 1939, "WW2 end": 1945, 'a': 1, 'c': 8};

    // TODO: uncomment the following lines, fix the errors
    dictionary['d'] = 3;
    //dictionary['d'] = '3'; // should cause an error - Assigned expression type "3" is not assignable to type number

    // TODO: implement a function that calculates number of characters
    // in a string using the dictionary type, and returns a most frequent character
    // What if more then 1 characters have the maximum number of appearence.
    // Here is no requirement that covers such case so I decided return all
    // most frequent characters.
    // p.s. I did not change function naming intentionally.
    function getMostFrequentCharacter(str: string): string {
        const quantityOfChars: TDictionary = {}
        str.split('').forEach(char => {
            if (quantityOfChars[char]) {
                quantityOfChars[char]++
            } else quantityOfChars[char] = 1
        })
        // delete quantityOfChars[' ']
        //delete quantityOfChars['.']
        const maxValue = Object.entries(quantityOfChars).reduce((acc, curr) => {
            if (acc[1] < curr[1]) {
                acc = curr
            }
            return acc
        }, ['', 0])[1]
        return Object.entries(quantityOfChars)
            .filter(([key, value]) => maxValue === value)
            .flat()
            .filter(el => typeof el === 'string').join(', ').trim()
    }

    console.log("The most frequent char(s)", getMostFrequentCharacter("She sells seashells by the seashore."));
}

exercise33();

// Use index signature and caching
function exercise34() {
    // TODO: Define a dictionary of student grades, add type definition using index signature
    // key is a student name, value is an array of grades (numbers)
    type TStudentGrades = { [name: string]: number[] }
    type TStudentAverage = { [name: string]: number }
    const studentGrades: TStudentGrades = {
        John: [5, 4, 8, 9, 10, 4, 5, 3],
        Bill: [5, 4, 8, 9, 10, 4, 5, 3],
        Bob: [5, 4, 8, 9, 10, 4, 5, 3],
        Linkoln: [5, 4, 8, 9, 10, 4, 5, 3],
        Luke: [5, 4, 8, 9, 10, 4, 5, 3],
        Dart: [5, 4, 8, 9, 10, 4, 5, 3],
        Wader: [2, 2, 3, 9],
    };
    const cashedStudentsAverageGrade: TStudentAverage = {};

    function cashStudent(name: string, grade: number) {
        cashedStudentsAverageGrade[name] = grade;
    }

    function isCashedStudent(name: string): boolean {
        const grade = cashedStudentsAverageGrade[name]
        return grade != undefined && typeof grade === 'number'
    }

    function calculateAverage(grades: number[]) {
        return grades
            .reduce((acc, curr) => acc + curr) / grades.length
    }

    // TODO: Implement function to calculate the average grade for a student
    function calculateAverageGrade(studentName: string): number | string {
        const grades = studentGrades[studentName]
        const studentFound = Array.isArray(grades) && grades.length > 0
        if (isCashedStudent(studentName)) {
            console.log("Return cashed student")
            return cashedStudentsAverageGrade[studentName]
        }
        if (studentFound) {
            const averageGrade = calculateAverage(grades)
            cashStudent(studentName, averageGrade)
            return averageGrade
        } else {
            return "Student not found";
        }
    }

    // TODO: Iterate through the dictionary and display each student's average grade
    for (const studentName in studentGrades) {
        // TODO: call calculateAverageGrade and print the result
        const grade = calculateAverageGrade(studentName);
        console.log(`name: ${studentName}, average grade: ${grade}`)
    }
    for (const studentName in studentGrades) {
        const grade = calculateAverageGrade(studentName);
        console.log(`name: ${studentName}, average grade: ${grade}`)
    }

    // TODO: add caching for the average grade calculation to the calculateAverageGrade function
}

exercise34();
