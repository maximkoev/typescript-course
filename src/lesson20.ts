import { EventEmitter } from "node:events";
import * as fs from "fs/promises";
import * as path from "path";

function lesson20() {
  // ********* Lesson 18 *********
  // Behavioral Design Patterns
  // - Observer
  function observerDemo() {
    /**
     * Need: Log any modification of the device volume that the user do.
     *
     * Solution: We will use the Observer pattern implemented by Node and its
     * Events.
     */

    /**
     * The subject will extend the EventEmitter class. We will automatically
     * subscribe to any new listener added or removed to log activity
     */
    class VolumeControllerSubject extends EventEmitter {
      private _volume: number = 50;

      public get volume(): number {
        return this._volume;
      }

      constructor() {
        super();
        this.on("newListener", (eventName) => {
          console.log(`Added a new listener to the '${eventName}' event`);
        });
        this.on("removeListener", (eventName) => {
          console.log(
            `Removed a listener of the ${eventName} event from the list`
          );
        });
      }

      volumeUp(): void {
        this._volume += 5;
        this.emit("volumeUp", this._volume);
      }

      volumeDown(): void {
        this._volume -= 5;
        this.emit("volumeDown", this._volume);
      }
    }

    /**
     * We will define a custom class for an observer. It will keep an
     * instance of the subject received on the constructor. Also in the constructor
     * it will automatically subscribe to the 2 events available.
     */
    class LoggingObserver {
      constructor(private volumeController: VolumeControllerSubject) {
        this.volumeController.on("volumeUp", this.volumeUpObserver);
        this.volumeController.on("volumeDown", this.volumeDownObserver);
      }

      private volumeUpObserver(volume) {
        console.log(`Volume up, now the volume value is ${volume}`);
      }

      private volumeDownObserver(volume) {
        console.log(`Volume down, now the volume value is ${volume}`);
      }

      /**
       * We will also include a method to unsubscribe from one of the events
       */
      public stopObservingVolumeDown() {
        this.volumeController.removeListener(
          "volumeDown",
          this.volumeDownObserver
        );
      }
    }

    /**
     * The client code will declare instances for the subject and the observer
     * and start interacting with the device volume
     */
    const volumeController = new VolumeControllerSubject();
    const loggingObserver = new LoggingObserver(volumeController);

    volumeController.volumeUp();
    volumeController.volumeDown();
    volumeController.volumeUp();
    volumeController.volumeDown();

    /**
     * It is expected that if we stop observing one of the events, then we will
     * only observe the other event
     */
    loggingObserver.stopObservingVolumeDown();

    volumeController.volumeUp();
    volumeController.volumeDown();
    volumeController.volumeUp();
    volumeController.volumeDown();
  }
  observerDemo();
  // - Mediator
  function mediatorDemo() {
    /**
     * Need: To have a messaging application to notify groups of people. Users
     * should not know about each other.
     *
     * Solution: Create a mediator to manage subscriptions and messages
     */

    /**
     * Extending the Mediator interface to have a payload to include messages
     */
    interface Mediator {
      notify(sender: object, event: string, payload?: string): void;
    }

    /**
     * The user plays the role of the independent component. It has an
     * instance of the mediator.
     */
    class User {
      constructor(public name: string, private mediator: Mediator) {
        this.mediator.notify(this, "subscribe");
      }

      receiveMessage(message: string) {
        console.log(`Message received by ${this.name}: ${message}`);
      }

      publishMessage(message: string) {
        this.mediator.notify(this, "publish", message);
      }
    }

    /**
     * The app is the concrete Mediator and implements all the events that
     * collaborators can notify: subscribe and publish
     */
    class ChatAppMediator implements Mediator {
      private users: User[] = [];

      public notify(sender: object, event: string, payload?: string): void {
        if (event === "subscribe") {
          const user = sender as User;
          console.log(`Subscribing ${user.name}`);
          this.users.push(user);
        }

        if (event === "publish") {
          console.log(`Publishing message "${payload}" to the group`);
          const usersExcludingSender = this.users.filter((u) => u !== sender);
          for (const user of usersExcludingSender) {
            user.receiveMessage(payload);
          }
        }
      }
    }

    /**
     * The client code. Creating a user automatically subscribes them to the
     * group.
     */
    const chatAppMediator = new ChatAppMediator();
    const user1 = new User("Lightning", chatAppMediator);
    const user2 = new User("Doc", chatAppMediator);
    const user3 = new User("Mater", chatAppMediator);

    user1.publishMessage("Catchaw");
    user2.publishMessage("Ey kid");
    user3.publishMessage("Tomato");
  }
  mediatorDemo();
  // - Iterator
  function iteratorDemo() {
    /**
     * Need: Provide a standard way of traversing a collection of contacts to a
     * certain depth.
     *
     * Solution: Create an abstract factory to supply variants of file systems,
     * databases and log providers. There is a concrete factory for each
     * environment. This factory is configured to provide different concrete
     * connectors for each type of environment. For example, in development we
     * use the console to log messages, whereas in production we use the Sentry
     * service.
     */

    class Contact implements IterableIterator<Contact> {
      private contacts: Contact[] = [];
      private iteratorFirstLevelIndex: number = 0;
      private iteratorSecondLevelIndex: number = 0;

      constructor(public name: string) {}

      addContact(contact: Contact) {
        this.contacts.push(contact);
      }

      next(): IteratorResult<Contact> {
        const done = this.iteratorFirstLevelIndex === this.contacts.length;
        if (done) {
          return { value: null, done: true };
        }
        const firstLevelContact = this.contacts[this.iteratorFirstLevelIndex];
        const value = firstLevelContact.contacts[this.iteratorSecondLevelIndex];
        if (
          this.iteratorSecondLevelIndex ===
          firstLevelContact.contacts.length - 1
        ) {
          this.iteratorFirstLevelIndex += 1;
          this.iteratorSecondLevelIndex = 0;
        } else {
          this.iteratorSecondLevelIndex += 1;
        }
        return { value, done };
      }

      // tslint:disable-next-line
      [Symbol.iterator]() {
        return this;
      }
    }

    /**
     * The client code can use the for..of syntax to traverse the first 2
     * levels of the contact tree
     */

    const superboss = new Contact("Super Boss");
    const boss1 = new Contact("Boss One");
    const boss2 = new Contact("Boss Two");
    const boss3 = new Contact("Boss Three");
    const employee11 = new Contact("Employee One One");
    const employee12 = new Contact("Employee One Two");
    const employee13 = new Contact("Employee One Three");
    const employee21 = new Contact("Employee Two One");
    const employee22 = new Contact("Employee Two Two");
    const employee23 = new Contact("Employee Two Three");
    const employee31 = new Contact("Employee Three One");
    const employee32 = new Contact("Employee Three Two");
    const employee33 = new Contact("Employee Three Three");
    const tooLowInTheTree = new Contact("Contact too low in the tree");

    superboss.addContact(boss1);
    superboss.addContact(boss2);
    superboss.addContact(boss3);

    boss1.addContact(employee11);
    boss1.addContact(employee12);
    boss1.addContact(employee13);

    boss2.addContact(employee21);
    boss2.addContact(employee22);
    boss2.addContact(employee23);

    boss3.addContact(employee31);
    boss3.addContact(employee32);
    boss3.addContact(employee33);

    employee33.addContact(tooLowInTheTree);

    for (const contact of superboss) {
      console.log(contact.name);
    }
  }
  iteratorDemo();
  // - Strategy
  function strategyDemo() {
    interface UploadResult {
      success: boolean;
      message: string;
    }

    interface UploadStrategy {
      upload(
        filePath: string,
        name: string,
        content: string
      ): Promise<UploadResult>;
    }

    /**
     * Working implementation of the strategy to upload a file to a local directory.
     */
    class LocalUpload implements UploadStrategy {
      /**
       * Uploads a file to a local directory.
       * @param filePath The path to the directory to upload to.
       * @param name The name of the file to upload.
       * @param content The content of the file to upload.
       * @returns A promise that resolves to the result of the upload.
       */
      public upload(
        filePath: string,
        name: string,
        content: string
      ): Promise<UploadResult> {
        return new Promise((resolve, reject) => {
          const result: UploadResult = {
            success: true,
            message: "Uploaded to local storage",
          };

          fs.writeFile(path.join(__dirname, filePath, name), content)
            .then(() => {
              resolve(result);
            })
            .catch((e) => {
              result.success = false;
              result.message = "Error uploading to local storage";
              reject(result);
            });
        });
      }
    }

    /**
     * This is only a mock implementation of the upload strategy.
     * It is not a real strategy, but it is enough for the example.
     */
    class AWSUpload implements UploadStrategy {
      public upload(
        filePath: string,
        name: string,
        content: string
      ): Promise<UploadResult> {
        return new Promise((resolve, reject) => {
          const result: UploadResult = {
            success: true,
            message: "Uploaded to AWS storage",
          };

          setTimeout(() => {
            resolve(result);
          }, 1000);
        });
      }
    }

    class Context {
      private strategy: UploadStrategy;

      constructor(strategy: UploadStrategy) {
        this.strategy = strategy;
      }

      public setStrategy(strategy: UploadStrategy) {
        this.strategy = strategy;
      }

      /**
       * EN: The Context delegates some work to the Strategy object instead of
       * implementing multiple versions of the algorithm on its own.
       *
       */
      public fileUpload(
        filePath: string,
        name: string,
        content: string
      ): Promise<UploadResult> {
        return this.strategy.upload(filePath, name, content);
      }
    }

    /**
     * I'm creating to different strategies to upload a file to different places.
     */
    const localUpload = new LocalUpload();
    const awsUpload = new AWSUpload();

    const context = new Context(localUpload);

    context.fileUpload("/", "Output.txt", "Hello World").then((result) => {
      console.log(result);
    });
  }
  strategyDemo();
  // - Command
  function commandDemo() {}
  commandDemo();
  // - Chain of Responsibility
  function chainOfResponsibility() {
    // example 1
    // Unethical behavior by an employee, who is to blame?
    // - The employee
    // - The manager
    // - The CEO
    // Clicking on a button in a GUI, finding the correct handler
    // - The button
    // - The form
    // - The window
    // - The application
    // Error handling in a program, finding the right handler
    // - The code that caused the error
    // - The component that called the code that caused the error
    // - The page that the component is on
    // - The whole application
  }
  // - Visitor
  // - State
  // - Memento
  // - Template Method
}
lesson10();
