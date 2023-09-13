// use type narrowing to print the passanger info
function exercise23() {
    // TODO: define THuman type with properties name, age, driverLicenseId
    type THuman = { name: string, age: number, driverLicenseId: string };
    // TODO: define TAnimal type with properties name, age, species
    type TAnimal = { name: string, age: number, species: string };
    // TODO: define TPassanger type as union of THuman and TAnimal
    type TPassanger = THuman | TAnimal;

    // annotate the function to accept TPassanger type
    function printPassangerInfo(passanger: TPassanger) {
        console.log('===printPassangerInfo===')
        // TODO: use type narrowing to print the passanger info
        console.log(passanger.name);
        console.log(passanger.age);
        // TODO: print driverLicenseId if passanger is human
        if ('driverLicenseId' in passanger) {
            console.log("exercise23", passanger.driverLicenseId);
        } else if ('species' in passanger) {
            console.log("exercise23", passanger.species);
        } else throw new Error('Only Human and Animal types  eligible')
    }

    // TODO: add missing properties to human and animal objects
    const human: THuman = {age: 23, driverLicenseId: "uniq-123-id", name: "John"};
    const animal: TAnimal = {age: 3, name: "Teddy", species: "Labrador"};
    printPassangerInfo(human);
    printPassangerInfo(animal);
    // instanceof operator is not working with type alias, only with class
    // TODO: Implement function printPassangerInfo using instanceof operator to narrow the type of the passanger
    // TODO: Add implementation of the printPassangerInfo using property check to narrow the type of the passanger
    class Human {
        constructor(public name: string, public age: number, public driverLicenseId: string) {
        }
    }

    class Animal {
        constructor(public name: string, public age: number, public species: string) {
        }

    }

    type TPassanger2 = Human | Animal;

    function printPassangerInfo2(passanger: TPassanger2) {
        console.log('===printPassangerInfo2===')
        console.log("exercise23", passanger.name);
        console.log("exercise23", passanger.age);
        if (passanger instanceof Human) {
            console.log("exercise23", passanger.driverLicenseId)
        } else if (passanger instanceof Animal) {
            console.log("exercise23", passanger.species)
        } else throw new Error('exercise23,Only Human and Animal type eligible')
    }

    const human2: THuman = new Human("John", 23, "uniq-123-id")
    const animal2: TAnimal = new Animal('Teddy', 3, 'Golden retriever')
    printPassangerInfo2(human2);
    printPassangerInfo2(animal2);
    //printPassangerInfo2({message: "Hello"} as TPassanger2) Error: Only Human and Animal types  eligible
}

// TODO: compile and run the code
exercise23();

// use discriminated union to narrow the type of the object
function exercise24() {
    // TODO: add type property to TBlogMessage, TBlogImage, TBlogComment with literal type of 'message', 'image', 'comment'
    enum blogType {
        MESSAGE = 'message',
        IMAGE = 'image',
        COMMENT = 'comment'
    }

    type TBlogMessage = {
        type: blogType.MESSAGE;
        text: string;
    };
    type TBlogImage = {
        type: blogType.IMAGE;
        url: string;
    };
    type TBlogComment = {
        type: blogType.COMMENT;
        text: string;
        messageId: string;
    };

    type TBlogPost = TBlogMessage | TBlogImage | TBlogComment;

    function printBlogPost(post: TBlogPost) {
        // TODO: use discriminated union to narrow the type of the object
        switch (post.type) {
            case blogType.MESSAGE:
                console.log('exercise24. comment: ', post.text)
                break;
            case blogType.COMMENT:
                console.log("exercise24. comment: ", post.text);
                break;
            case blogType.IMAGE:
                console.log("exercise24. image: ", post.url);
                break;
            default:
                throw new Error('TBlogPost type expected');
        }
    }

    // TODO: add missing type property to the objects
    printBlogPost({type: blogType.MESSAGE, text: "Message text"});
    printBlogPost({type: blogType.IMAGE, url: "sources/images/image.png"});
    printBlogPost({type: blogType.COMMENT, text: "Some valuable comment from sofa expert", messageId: "123"});
}

// TODO: compile and run the code
exercise24();

// use non-null assertion operator
function exercise25() {
    type TPerson = {
        name: string;
        email?: string | null | undefined;
    };

    function sendEmail(email: string) {
        console.log("sending email to", email);
    }

    function ensureContactable(person: TPerson) {
        // TODO: add check for null and undefined - throw error if person.email is null or undefined
        if (!person.email) {
            throw new Error('person email could not be null or undefined')
        }
    }

    function contact(person: TPerson) {
        ensureContactable(person);
        // TODO: uncomment code below and check that it compiles,  use non-null assertion operator to fix compile time error
        sendEmail(person.email!);
    }

    function contact2(person: TPerson) {
        // Add inline check for null and undefined - throw error if person.email is null or undefined
        if (person.email === null || person.email === undefined) {
            throw new Error('email could not be null or undefined')
        }
        // TODO: uncomment code below and check that it compiles
        sendEmail(person.email);
    }

    const person1: TPerson = {
        name: "John",
        email: "asdf@asdf.com",
    };
    const person2: TPerson = {
        name: "John",
        email: null,
    };

    contact(person1);
    //contact({email: undefined} as any); //Error: person email could not be null or undefined
    //contact({email: null} as any); //Error: email person could not be null or undefined
    contact2(person1);
    //contact(person2); Error: person email could not be null or undefined
    //contact2({email: undefined} as any) Error: email could not be null or undefined

    // TODO: print the result to console
}

// TODO: compile and run the code
exercise25();

// Create an assertion function
function exercise26() {
    type TWidget = {
        name: string;
    };
    type TGadget = {
        os: string;
    };
    type TThing = TWidget | TGadget;

    // TODO: add your code to make the following function assert correctly
    function asserWidget(value: unknown): asserts value is TWidget {
        if (value && typeof value === 'object' && 'name' in value) {
            return;
        } else throw new Error('Value has another type from TWidget')
    }

    // TODO: add your code to make the following function assert correctly
    function asserGadget(value: unknown): asserts value is TGadget {
        if (value && typeof value === 'object' && 'os' in value) {
            return;
        } else throw new Error('Value has another type from TGadget')
    }

    const thing1 = {name: "widget"} as TThing;
    const thing2 = {os: "ubuntu"} as TThing;
    asserWidget(thing1);
    // TODO: uncomment the following lines after assertion is added
    thing1.name = 'weather widget';
    console.log(thing1.name);

    // TODO: uncomment the following lines after assertion is added
    asserGadget(thing2);
    thing2.os = 'android';
    console.log(thing2.os);
}

exercise26();

// use interface and compare with type alias
function exercise27() {
    type TPerson = {
        // name is string
        // age is number
        name: string;
        age: number;
    };

    // TODO: add TPersonWithPhone type definition - extend TPerson with phone property
    type TPersonWithPhone = TPerson & { phone: string }
    // phone is string

    // TODO: uncomment the code below and check that it compiles
    const person: TPersonWithPhone = {
        name: 'John',
        age: 18,
        phone: '123-456-7890',
    };
    console.log('exercise27. person data: ', person.name, person.age, person.phone);

    interface IPerson {
        // name is string
        // age is number
        name: string,
        age: number
    }

    // TODO: add IPersonWithPhone interface definition - extend IPerson with phone property
    interface IPersonWithPhone extends IPerson {
        //phone is string
        phone: string
    }


    // TODO: uncomment the code below and check that it compiles
    const person2: IPersonWithPhone = {
        name: 'John',
        age: 18,
        phone: '123-456-7890',
    };

    console.log('exercise27. person data: ', person2.name, person2.age, person2.phone);
}

// TODO: compile and run the code
exercise27();

// use implements keyword to implement interface
function exercise28() {
    // TODO: declare interface IWidget with name property
    interface IWidget {
        // name property
        name: string
    }

    // TODO: declare interface IWidgetWithSize which extends IWidget and adds width, height and color properties
    // TODO: add resize method to IWidgetWithSize interface
    interface IWidgetWithSize extends IWidget {
        // width, height and color properties
        // resize method
        width: number;
        height: number;
        color: string;
        resize: () => void;
    }

    // TODO: declare interface IDesktopWidget which extends IWidgetWithSize and adds os property
    // TODO: add open method to IDesktopWidget interface
    interface IDesktopWidget extends IWidgetWithSize {
        // os property
        // open method
        os: string;
        open: () => void;
    }

    // TODO: declare interface IMobileWidget which extends IWidgetWithSize and adds space property
    // TODO: add install method to IMobileWidget interface
    interface IMobileWidget extends IWidgetWithSize {
        // space property
        space: number;
        // install method
        install: () => void;
    }

    // TODO: declare class Widget which implements IWidget
    class Widget implements IWidget, IWidgetPrintable {


        constructor(public name: string) {

        }

        getStringifiedParams(): string {
            return `Class: ${this.constructor.name}, name: "${this.name}"`
        }

    }

    const wid = new Widget('name of widget');
    console.log('exercise28', wid.getStringifiedParams())

    // TODO: declare class WidgetWithSize which implements IWidgetWithSize
    class WidgetWithSize implements IWidgetWithSize, IWidgetPrintable {
        width: number;
        color: string;
        height: number;
        name: string;

        constructor(name: string, width: number, height: number, color: string) {
            this.name = name;
            this.color = color;
            this.width = width;
            this.height = height
        }

        resize(): void {
            this.width++;
            this.height++
        }

        getStringifiedParams(): string {
            return `Class: ${this.constructor.name},
             name: "${this.name},
             width: ${this.width},
             height: ${this.height},
             color: ${this.color}"`
        }
    }

    const widgetWithSize = new WidgetWithSize('Widget with size', 50, 100, 'red')
    console.log('exercise28', widgetWithSize.getStringifiedParams())

    // TODO: declare class DesktopWidget which implements IDesktopWidget
    class DesktopWidget implements IDesktopWidget, IWidgetPrintable {
        color: string;
        height: number;
        name: string;
        width: number;
        os: string;

        constructor(name: string, width: number, height: number, color: string, os: string) {
            this.name = name;
            this.height = height;
            this.width = width;
            this.color = color;
            this.os = os;
        }

        open(): void {
            console.log('widget is opened')
        }


        resize(): void {
            this.height++
            this.width++
        }

        getStringifiedParams(): string {
            return `Class: ${this.constructor.name},
             name: "${this.name},
             width: ${this.width},
             height: ${this.height},
             color: ${this.color},
             os: ${this.os}`
        }
    }

    const desktopWidget = new DesktopWidget('Desktop widget', 1000, 5000, 'green', 'Microsoft')
    console.log('Exercise 28 ', desktopWidget.getStringifiedParams())

    // TODO: declare class MobileWidget which implements IMobileWidget
    class MobileWidget implements IMobileWidget, IWidgetPrintable {
        color: string;
        height: number;
        space: number;
        width: number;
        name: string;

        constructor(name: string, width: number, height: number, color: string, space: number,) {
            this.color = color;
            this.height = height;
            this.width = width;
            this.name = name
            this.space = space

        }

        getStringifiedParams(): string {
            return `Class: ${this.constructor.name},
             name: "${this.name},
             width: ${this.width},
             height: ${this.height},
             color: ${this.color},
             space: ${this.space}`
        }

        install(): void {
            console.log('widget is installed')
        }

        resize(): void {
            this.width++
            this.height++
        }
    }

    const mobWid = new MobileWidget('Modbile widget', 600, 800, 'black', 5)
    console.log('Exercise 28', mobWid.getStringifiedParams())

    // TODO: declare class DesktopAndMobileWidget which implements IDesktopWidget and IMobileWidget
    class DesktopAndMobileWidget implements IDesktopWidget, IMobileWidget, IWidgetPrintable {
        color: string;
        height: number;
        name: string;
        space: number;
        width: number;
        os: string;

        constructor(name: string, width: number, height: number, color: string, space: number, os: string) {
            this.color = color;
            this.height = height;
            this.width = width;
            this.space = space;
            this.os = os;
            this.name = name;
        }

        getStringifiedParams(): string {
            return `Class: ${this.constructor.name},
             name: "${this.name},
             width: ${this.width},
             height: ${this.height},
             color: ${this.color},
             space: ${this.space}
             os: ${this.os}`
        }

        install(): void {
        }

        open(): void {
        }

        resize(): void {
        }
    }

    const deskNMobWid = new DesktopAndMobileWidget('Hybrid', 55, 110, 'blue', 15, 'IOS')
    console.log('Exercise 28 ', deskNMobWid.getStringifiedParams())


    // TODO: declare interface IWidgetPrintable which has toString method
    interface IWidgetPrintable {
        // toString method - returns string
        /**
         * Returns data in string format
         * note: I decided change name because toString is default method.
         * In this case typescript does not push me as a developer implement this function.
         * Obviously because this function is present in the base prototype
         * i.e. accessible through any object.
         * It looks unsafe for me in case developer will not implement function in the child class
         * typescript has no reaction on it. So I am not sure that I can rely on this function
         */
        getStringifiedParams(): string

    }

    // TODO: add IWidgetPrintable to each of the classes above
    // implementation returns class name and all properties

    // TODO: create instance of each class
    // TODO: print each instance to console
}

// TODO: compile and run the code
exercise28();
