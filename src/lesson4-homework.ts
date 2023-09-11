// add readonly modifier to prevent props reassignment
function exercise17() {
    // TODO: define class Student with properties name, age, studentId
    class Student {
        name: string;
        age: number;

        // TODO: add constructor to initialize the properties
        constructor(name: string, age: number, readonly studentId: string) {
            this.name = name;
            this.age = age;
        }

        // TODO: add method printStudent to print the student info to console
        printStudent() {
            console.log(`Exercise 17.
             Student name is ${this.name} \n Student age is ${this.age} \n Student id is ${this.studentId}`)
        }
    }

    // TODO: create an instance of the class Student
    const ivanStudent = new Student('Ivan', 23, 'uniq-id-1234')
    // TODO: print the student info to console
    ivanStudent.printStudent()
    // TODO: try to change the studentId property
    // TODO: change the studentId property to readonly, make sure that changing the property is not allowed
    //ivanStudent.studentId = 'new-id'// error TS2540: Cannot assign to 'studentId' because it is a read-only property.
}

// TODO: compile and run the code
exercise17();

// use optional modifier to fix compile time error
function exercise18() {
    type TWidget = {
        name: string;
        width: number;
        height: number;
        color?: string;
        os?: string;
        space: number;
    };

    // TODO: uncomment the code below and update the type definition to fix compile time error

    const widgetWithSize: TWidget = {
        name: 'widget',
        width: 10,
        height: 20,
        color: 'red',
        space: 100,
    }

    const desktopWidget: TWidget = {
        name: 'widget',
        width: 10,
        height: 20,
        os: 'windows',
        space: 100,
    }

    // TODO: print the result to console
    console.log('===exercise17===')
    console.log(widgetWithSize)
    console.log(desktopWidget)
    console.log('================')
}

// TODO: compile and run the code
exercise18();

// use union types to replace unknown type for compile time type checking
function exercise19() {
    function formatCommandLine(command: string | string[]) {
        if (typeof command === "string") {
            return command.trim();
        } else if (Array.isArray(command)) {
            return command.map((arg) => arg.trim()).join(" ");
        }
        //throw new Error("command must be string or string[]");
    }

    console.log(formatCommandLine("  git status  ")); // git status
    console.log(formatCommandLine(["git ", " status "])); // git status
    //console.log(formatCommandLine(false)); // run time error - error TS2345: Argument of type 'boolean' is not assignable to parameter of type 'string | string[]'.
}

// TODO: compile and run the code
exercise19();

// use literal types for type checking
function exercise20() {
    // TODO: define rock, paper, scissors literal type and assign it to TMove type
    const moves = ['rock', 'paper', 'scissors'] as const
    type TMove = typeof moves[number]

    // TODO: add type check to the function below
    function rockPaperScissorsWins(me: TMove, other: TMove) {
        console.log(`me: ${me}, ${moves.includes(me) && moves.includes(other)}`)
        if (!(moves.includes(me) && moves.includes(other))) {
            throw new Error(`Only ${moves} values allowed`)
        }
        if (me === "rock" && other === "paper") {
            return false;
        }
        if (me === "paper" && other === "scissors") {
            return false;
        }
        if (me === "scissors" && other === "rock") {
            return false;
        }
        return true;
    }

    console.log(rockPaperScissorsWins("rock", "paper")); // false
    console.log(rockPaperScissorsWins("paper", "scissors")); // false
    console.log(rockPaperScissorsWins("scissors", "rock")); // false
    console.log(rockPaperScissorsWins("rock", "scissors")); // true
    // TODO: make sure that the following calls are not allowed
    // console.log(rockPaperScissorsWins("papapaper", "scissors")); // Argument of type '"papapaper"' is not assignable to parameter of type '"rock" | "paper" | "scissors" | "literal"'.
    //console.log(rockPaperScissorsWins(<TMove>"papapaper", "scissors")); //Error: Only rock,paper,scissors,literal values allowed

}

// TODO: compile and run the code
exercise20();

// use intersection types to improve code readability
function exercise21() {
    // TODO: improve the types definitions to remove code duplication (for example to avoid declaring name property multiple times). Use intersection types

    type TWidget = {
        name: string;
    };

    type TWidgetWithSize = {
        width: number;
        height: number;
        color: string;
    } & TWidget;

    type TDesktopWidget = {
        os: string;
    } & TWidgetWithSize;

    type TMobileWidget = {
        space: number;
    } & TWidgetWithSize;


    const widget: TWidget = {
        name: "widget",
    };
    const widgetWithSize: TWidgetWithSize = {
        name: "widget",
        width: 10,
        height: 20,
        color: "red",
    };
    const desktopWidget: TDesktopWidget = {
        name: "widget",
        width: 10,
        height: 20,
        color: "red",
        os: "windows",
    };
    const mobileWidget: TMobileWidget = {
        name: "widget",
        width: 10,
        height: 20,
        color: "red",
        space: 100,
    };
    console.log(widget.name);
    console.log(
        widgetWithSize.name +
        " " +
        widgetWithSize.width +
        " " +
        widgetWithSize.height +
        " " +
        widgetWithSize.color
    );
    console.log(
        desktopWidget.name +
        " " +
        desktopWidget.width +
        " " +
        desktopWidget.height +
        " " +
        desktopWidget.color +
        " " +
        desktopWidget.os
    );
    console.log(
        mobileWidget.name +
        " " +
        mobileWidget.width +
        " " +
        mobileWidget.height +
        " " +
        mobileWidget.color +
        " " +
        mobileWidget.space
    );
    // TODO: print the result to console
}

// TODO: compile and run the code
exercise21();

// rewrite the code using async await
function exercise22() {
    const later = async (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

    async function printMessagesWithTimeout(): Promise<void> {
        await later(1000);
        console.log(1);
        await later(1000);
        console.log(2);
        await later(1000);
        console.log(3);
    }

    printMessagesWithTimeout()
}

// TODO: compile and run the code
exercise22();
