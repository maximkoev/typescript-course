# SOLID 

SOLID

OOP principles - problems and solutions
    Objects - journal example
    Classes - header/titles example
    Incapsulation - hiding methods/fields from being used
    Inheritance - reusing code, extending functionality
    Polymorphism - same contract/need, different things
    class User {
        virtual getName(){}
    }
    const u:User = new User();
    class Admin extends User {
        override getName(){}
    }
    const u2:User = new Admin();

    class Product {
        getName(){}
    }
    const u:User = new Product();

    Composition - has-a relationship
    class Widget {
        public readonly renderHeader(){};
        public readonly renderFooter(){};
        public readonly renderContent(){};

        public readonly render(){
            this.renderHeader();
            this.renderContent();
            this.renderFooter();
        }
    }
    class WidgetWithSidebar extends Widget {
        private readonly renderSidebar(){}

        public readonly render(){
            this.renderHeader();
            this.renderSidebar();
            this.renderContent();
            this.renderFooter();
        }
    }
    class WidgetWithHeader {
        private readonly widget: Widget;

        public readonly constructor(w: IWidget) {
            this.widget = w;
        }

        public readonly render(){
            const w = this.widget.render();
            return (
                <div>
                    <h1>Header</h1>
                    {w}
                </div>
            )
        }
    }

    Interface - contract, no implementation
    Abstract classes - like interface, but can have some implementation
    Dependency Injection - passing dependencies to the class, not creating them inside

DRY - Don't repeat yourself (WET - Write everything twice, We enjoy typing)
KISS - Keep it simple
YAGNI - You ain't gonna need it

SOLID 
    Single responsibility principle
        - one class should have one responsibility, one reason to change
        - smaller files, easier to maintain
        - easier to test
        - easier to reuse, extend
        - example
            ```typescript
            class User {
                constructor(
                    private readonly name: string,
                    private readonly email: string,
                    private readonly password: string,
                ) {}

                public getName(): string {
                    return this.name;
                }

                public getEmail(): string {
                    return this.email;
                }

                public getPassword(): string {
                    return this.password;
                }

                public getFullName(): string {
                    return `${this.name} ${this.email}`;
                }

                public login(): void {
                    // login user
                }

                public logout(): void {
                    // logout user
                }

                public save(): void {
                    // save user to database
                }

                public delete(): void {
                    // delete user from database
                }

                public sendEmail(): void {
                    // send email to user
                }

                public exportToPDF(): void {
                    // save user to pdf
                }

                public logUserActivity(): void {
                    // log user activity
                }

                public logUserError(): void {
                    // log user error
                }
            }
            ```

            ```typescript
            class User {
                constructor(
                    private readonly name: string,
                    private readonly email: string,
                    private readonly password: string,
                ) {}

                public getName(): string {
                    return this.name;
                }

                public getEmail(): string {
                    return this.email;
                }

                public getPassword(): string {
                    return this.password;
                }

                public getFullName(): string {
                    return `${this.name} ${this.email}`;
                }

                public login(): void {
                    // login user
                }

                public logout(): void {
                    // logout user
                }
            }
            ```

            ```typescript
            class UserDatabase {
                public save(user: User): void {
                    // save user to database
                }

                public delete(user: User): void {
                    // delete user from database
                }
            }
            ```

            ```typescript
            class UserEmail {
                public sendEmail(user: User): void {
                    // send email to user
                }
            }
            ```

            ```typescript
            class UserPDF {
                public exportToPDF(user: User): void {
                    // save user to pdf
                }
            }
            ```

            ```typescript
            class UserLogger {
                public logUserActivity(user: User): void {
                    // log user activity
                }

                public logUserError(user: User): void {
                    // log user error
                }
            }
            ```

    Open/closed principle
        - open for extension, closed for modification
        - example - add ability to export user to excel 
            ```typescript
            class User {
                constructor(
                    private readonly name: string,
                    private readonly email: string,
                    private readonly password: string,
                ) {}

                public getName(): string {
                    return this.name;
                }

                public getEmail(): string {
                    return this.email;
                }

                public getPassword(): string {
                    return this.password;
                }

                public getFullName(): string {
                    return `${this.name} ${this.email}`;
                }

                public login(): void {
                    // login user
                }

                public logout(): void {
                    // logout user
                }

                public save(): void {
                    // save user to database
                }

                public delete(): void {
                    // delete user from database
                }

                public sendEmail(): void {
                    // send email to user
                }

                public exportToPDF(): void {
                    // save user to pdf
                }

                public logUserActivity(): void {
                    // log user activity
                }

                public logUserError(): void {
                    // log user error
                }
            }
            ```
            
            ```typescript
            class ExcelExporter {
                public exportToExcel(user: User): void {
                    // save user to excel
                }
            }
            ```

            ```typescript
            class UserExportableToExcel extends User {
                public exportToExcel(): void {
                    // save user to excel
                }
            }
            ```


    Liskov substitution principle
        - if you have a class A and class B extends class A, then you should be able to replace A with B without breaking the code

        - example 
        ```typescript
        class Rectangle {
            constructor(
                private readonly width: number,
                private readonly height: number,
            ) {}

            public getWidth(): number {
                return this.width;
            }

            public getHeight(): number {
                return this.height;
            }

            public getArea(): number {
                return this.width * this.height;
            }
        }
        ```

        ```typescript
        class Square extends Rectangle {
            constructor(
                private readonly width: number,
            ) {
                super(width, width);
            }
        }
        ```

        ```typescript
        abstract class Shape {
            abstract getArea(): number;
        }
        ```

        ```typescript
        class Rectangle extends Shape {
            constructor(
                private readonly width: number,
                private readonly height: number,
            ) {
                super();
            }

            public getWidth(): number {
                return this.width;
            }

            public getHeight(): number {
                return this.height;
            }

            public getArea(): number {
                return this.width * this.height;
            }
        }
        ```

        ```typescript
        class Square extends Shape {
            constructor(
                private readonly width: number,
            ) {
                super();
            }

            public getWidth(): number {
                return this.width;
            }

            public getArea(): number {
                return this.width * this.width;
            }
        }
        ```

    Interface segregation principle
        - many specific interfaces are better than one general interface
        - example

            ```typescript
            interface User {
                getName(): string;
                getEmail(): string;
                getPassword(): string;
                getFullName(): string;
                login(): void;
                logout(): void;
                save(): void;
                delete(): void;
                sendEmail(): void;
                exportToPDF(): void;
                logUserActivity(): void;
                logUserError(): void;
            }

            const handleExportClick() {
                this.exportableObject.exportToPDF();
            }
            ```

            ```typescript
            interface User {
                getName(): string;
                getEmail(): string;
                getPassword(): string;
                getFullName(): string;
                login(): void;
                logout(): void;
            }
            ```

            ```typescript
            interface UserDatabase {
                save(user: User): void;
                delete(user: User): void;
            }
            ```

            ```typescript
            interface UserEmail {
                sendEmail(user: User): void;
            }
            ```

            ```typescript
            interface UserPDF {
                exportToPDF(user: User): void;
            }
            ```

            ```typescript
            interface UserLogger {
                logUserActivity(user: User): void;
                logUserError(user: User): void;
            }
            ```
    Dependency inversion principle
        - high level modules should not depend on low level modules, both should depend on abstractions
        - paralel with press machine 
        - example 
            ```typescript
            class User implements IUser{
                constructor(
                    private readonly name: string,
                    private readonly email: string,
                    private readonly password: string,
                ) {}

                public getName(): string {
                    return this.name;
                }

                public getEmail(): string {
                    return this.email;
                }

                public getPassword(): string {
                    return this.password;
                }

                public getFullName(): string {
                    return `${this.name}
                    ${this.email}`;
                }
            }

            class UserDatabase {
                public save(user: IUser): void {
                    // save user to database
                }

                public delete(user: IUser): void {
                    // delete user from database
                }
            }

            class UserEmail {
                public sendEmail(user: IUser): void {
                    // send email to user
                }
            }
            ```
