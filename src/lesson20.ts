import { EventEmitter } from "events";
import * as fs from "fs/promises";
import * as path from "path";

function lesson20() {
  // ********* Lesson 20 *********
  // Behavioral Design Patterns
  // - Chain of Responsibility
  function chainOfResponsibilityDemo() {
    // Support desk > supervisor > manager > director

    enum ServiceLevel {
      LEVEL_ONE,
      LEVEL_TWO,
      LEVEL_THREE,
      LEVEL_FOUR,
      INVALID_REQUEST,
    }

    class ServiceRequest {
      private type!: ServiceLevel;
      private conclusion: string | null = null;

      getType(): ServiceLevel {
        return this.type;
      }

      setType(type: ServiceLevel) {
        this.type = type;
      }

      getConclusion(): string | null {
        return this.conclusion;
      }

      setConclusion(conclusion: string) {
        this.conclusion = conclusion;
      }
    }

    interface ISupportService {
      handleRequest(request: ServiceRequest): void;
    }

    class SupportService implements ISupportService {
      private handler!: ISupportService;

      getHandler(): ISupportService {
        return this.handler;
      }

      setHandler(handler: ISupportService) {
        this.handler = handler;
      }

      handleRequest(request: ServiceRequest) {
        this.handler.handleRequest(request);
      }
    }

    class FrontDeskSupport implements ISupportService {
      private next!: ISupportService;

      getNext(): ISupportService {
        return this.next;
      }

      setNext(next: ISupportService) {
        this.next = next;
        return this;
      }

      handleRequest(service: ServiceRequest) {
        if (service.getType() == ServiceLevel.LEVEL_ONE)
          service.setConclusion("Front desk solved level one request !!");
        else if (this.next != null) this.next.handleRequest(service);
        else throw new Error("No handler found for :: " + service.getType());
      }
    }

    class SupervisorSupport implements ISupportService {
      private next!: ISupportService;

      getNext(): ISupportService {
        return this.next;
      }

      setNext(next: ISupportService) {
        this.next = next;
        return this;
      }

      handleRequest(request: ServiceRequest) {
        if (request.getType() == ServiceLevel.LEVEL_TWO)
          request.setConclusion("Supervisor solved level two request !!");
        else if (this.next != null) this.next.handleRequest(request);
        else throw new Error("No handler found for :: " + request.getType());
      }
    }

    class ManagerSupport implements ISupportService {
      private next!: ISupportService;

      public getNext(): ISupportService {
        return this.next;
      }

      setNext(next: ISupportService) {
        this.next = next;
        return this;
      }

      handleRequest(request: ServiceRequest) {
        if (request.getType() == ServiceLevel.LEVEL_THREE) {
          request.setConclusion("Manager solved level three request !!");
        } else if (this.next != null) {
          this.next.handleRequest(request);
        } else {
          throw new Error("No handler found for :: " + request.getType());
        }
      }
    }

    class DirectorSupport implements ISupportService {
      private next!: ISupportService;

      getNext(): ISupportService {
        return this.next;
      }

      setNext(next: ISupportService) {
        this.next = next;
      }

      handleRequest(request: ServiceRequest) {
        debugger;
        if (request.getType() == ServiceLevel.LEVEL_FOUR)
          request.setConclusion("Director solved level four request !!");
        else if (this.next != null) this.next.handleRequest(request);
        else {
          request.setConclusion("You problem is none of our business");
          throw new Error(
            "You problem is none of our business :: " + request.getType()
          );
        }
      }
    }

    // How to use?
    class ChainOfResponsibilityTest {
      static test() {
        //// Support desk > supervisor > manager > director
        const frontendDeskSupport: FrontDeskSupport = new FrontDeskSupport();
        const supervisorSupport: SupervisorSupport = new SupervisorSupport();
        const managerSupport: ManagerSupport = new ManagerSupport();
        const directorSupport: DirectorSupport = new DirectorSupport();

        const supportService: SupportService = new SupportService();
        supportService.setHandler(
          frontendDeskSupport.setNext(
            supervisorSupport.setNext(managerSupport.setNext(directorSupport))
          )
        );

        let request: ServiceRequest = new ServiceRequest();
        request.setType(ServiceLevel.LEVEL_ONE);
        supportService.handleRequest(request);
        console.log(request.getConclusion());

        request = new ServiceRequest();
        request.setType(ServiceLevel.LEVEL_THREE);
        supportService.handleRequest(request);
        console.log(request.getConclusion());

        request = new ServiceRequest();
        request.setType(ServiceLevel.INVALID_REQUEST);
        supportService.handleRequest(request);
        console.log(request.getConclusion());
      }
    }
  }
  chainOfResponsibilityDemo();

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

      private volumeUpObserver(volume: number) {
        console.log(`Volume up, now the volume value is ${volume}`);
      }

      private volumeDownObserver(volume: number) {
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
     * Need: To have a messaging application to notify groups of users. Users
     * should not know about each other.
     *
     * Solution: Create a mediator to manage subscriptions and messages
     */

    // The observer pattern: Class A, can have zero or more observers of type O registered with it.
    // When something in A is changed it notifies all of the observers.

    // The mediator pattern: You have some number of instances of class X (or maybe even several different types:X, Y & Z),
    // and they wish to communicate with each other (but you don't want each to have explicit references to each other),
    // so you create a mediator class M. Each instance of X has a reference to a shared instance of M, through which it
    // can communicate with the other instances of X (or X, Y and Z).

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
            user.receiveMessage(payload || "");
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

  // - Template Method
  function templateMethodDemo() {
    abstract class House {
      buildhouse() {
        this.constructBase();
        this.constructRoof();
        this.constructWalls();
        this.constructWindows();
        this.constructDoors();
        this.paintHouse();
        this.decorateHouse();
      }

      abstract decorateHouse(): void;
      abstract paintHouse(): void;
      abstract constructDoors(): void;
      abstract constructWindows(): void;
      abstract constructWalls(): void;

      constructRoof() {
        console.log("Roof has been constructed.");
      }

      constructBase() {
        console.log("Base has been constructed.");
      }
    }

    class ConcreteWallHouse extends House {
      decorateHouse() {
        console.log("Decorating Concrete Wall House");
      }

      paintHouse() {
        console.log("Painting Concrete Wall House");
      }

      constructDoors() {
        console.log("Constructing Doors for Concrete Wall House");
      }

      constructWindows() {
        console.log("Constructing Windows for Concrete Wall House");
      }

      constructWalls() {
        console.log("Constructing Concrete Wall for my House");
      }
    }

    class GlassWallHouse extends House {
      decorateHouse() {
        console.log("Decorating Glass Wall House");
      }

      paintHouse() {
        console.log("Painting Glass Wall House");
      }

      constructDoors() {
        console.log("Constructing Doors for Glass Wall House");
      }

      constructWindows() {
        console.log("Constructing Windows for Glass Wall House");
      }

      constructWalls() {
        console.log("Constructing Glass Wall for my House");
      }
    }

    // how to use
    class TemplateMethodTest {
      static test() {
        console.log("Going to build Concrete Wall House");

        let house: House = new ConcreteWallHouse();
        house.buildhouse();

        console.log("Concrete Wall House constructed successfully");

        console.log("********************");

        console.log("Going to build Glass Wall House");

        house = new GlassWallHouse();
        house.buildhouse();

        console.log("Glass Wall House constructed successfully");
      }
    }
  }
  templateMethodDemo();

  // - Strategy
  function strategyDemo() {
    interface UploadResult {
      success: boolean;
      message: string;
    }

    interface UploadStrategy {
      checkPermissions(): Promise<boolean>;
      upload(
        filePath: string,
        name: string,
        content: string
      ): Promise<UploadResult>;
      checkSuccess(): Promise<boolean>;
    }

    /**
     * Strategy to upload a file to a local directory.
     */
    class LocalUpload implements UploadStrategy {
      public checkPermissions(): Promise<boolean> {
        return new Promise((resolve) => {
          resolve(true);
        });
      }
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
      public checkSuccess(): Promise<boolean> {
        return new Promise((resolve) => {
          resolve(true);
        });
      }
    }

    /**
     * This is only a mock implementation of the upload strategy.
     * It is not a real strategy, but it is enough for the example.
     */
    class AWSUpload implements UploadStrategy {
      public checkPermissions(): Promise<boolean> {
        return new Promise((resolve) => {
          resolve(true);
        });
      }
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
      public checkSuccess(): Promise<boolean> {
        return new Promise((resolve) => {
          resolve(true);
        });
      }
    }

    class UploaderService {
      private strategy: UploadStrategy;

      constructor(strategy: UploadStrategy) {
        this.strategy = strategy;
      }

      public setStrategy(strategy: UploadStrategy) {
        this.strategy = strategy;
      }

      /**
       * The UploaderService delegates some work to the Strategy object instead of
       * implementing multiple versions of the algorithm on its own.
       *
       */
      public async uploadFile(
        filePath: string,
        name: string,
        content: string
      ): Promise<UploadResult> {
        const permission = await this.strategy.checkPermissions();
        if (!permission) {
          throw new Error("You don't have permissions to upload");
        }

        const result = await this.strategy.upload(filePath, name, content);

        const success = await this.strategy.checkSuccess();
        if (!success) {
          throw new Error("Upload failed");
        }

        return result;
      }
    }

    /**
     * I'm creating to different strategies to upload a file to different places.
     */
    const localUpload = new LocalUpload();
    const awsUpload = new AWSUpload();

    const uploaderService = new UploaderService(localUpload);

    uploaderService
      .uploadFile("/", "Output.txt", "Hello World")
      .then((result) => {
        console.log(result);
      });
    // ususaly the client is in another file, so all changes are made in the client
  }
  strategyDemo();

  // - Command
  function commandDemo() {
    class Television {
      adjustVolumeUp() {
        console.log("TV -> adjustVolumeUp");
      }

      adjustVolumeDown() {
        console.log("TV -> adjustVolumeDown");
      }

      powerOff() {
        console.log("TV -> powerOff");
      }
    }

    interface Command {
      execute(): void;
    }

    class VolumeUpCommand implements Command {
      private tv: Television;

      constructor(tv: Television) {
        this.tv = tv;
      }

      public execute(): void {
        this.tv.adjustVolumeUp();
      }
    }

    class RemoteControlButton {
      private command!: Command;

      public setCommand(command: Command): void {
        this.command = command;
      }

      public buttonClicked(): void {
        this.command.execute();
      }
    }

    class VolumeDownCommand implements Command {
      private tv: Television;

      constructor(tv: Television) {
        this.tv = tv;
      }

      public execute(): void {
        this.tv.adjustVolumeDown();
      }
    }

    class PowerOffCommand implements Command {
      private tv: Television;

      constructor(tv: Television) {
        this.tv = tv;
      }

      public execute(): void {
        this.tv.powerOff();
      }
    }

    class RemoteControl {
      public volumeUpButton: RemoteControlButton;
      public volumeDownButton: RemoteControlButton;
      public powerOffButton: RemoteControlButton;

      constructor(tv: Television) {
        this.volumeUpButton = new RemoteControlButton();
        this.volumeDownButton = new RemoteControlButton();
        this.powerOffButton = new RemoteControlButton();

        this.volumeUpButton.setCommand(new VolumeUpCommand(tv));
        this.volumeDownButton.setCommand(new VolumeDownCommand(tv));
        this.powerOffButton.setCommand(new PowerOffCommand(tv));

        this.powerOffButton.buttonClicked();
      }
    }

    new RemoteControl(new Television());
  }
  commandDemo();

  // - Visitor
  function visitorDemo() {
    interface Router {
      // Visitable
      sendData(data: string): void;

      acceptData(data: string): void;

      accept(v: RouterVisitor): void;
    }

    class DLinkRouter implements Router {
      sendData(data: string) {
        console.log(`DLinkRouter: sendData ${data}`);
      }

      acceptData(data: string) {
        console.log(`DLinkRouter: acceptData ${data}`);
      }

      accept(v: RouterVisitor) {
        v.visit(this);
      }
    }

    class LinkSysRouter implements Router {
      sendData(data: string) {
        console.log(`LinkSysRouter: sendData ${data}`);
      }

      acceptData(data: string) {
        console.log(`LinkSysRouter: acceptData ${data}`);
      }

      accept(v: RouterVisitor) {
        v.visit(this);
      }
    }

    class TPLinkRouter implements Router {
      sendData(data: string) {
        console.log(`TPLinkRouter: sendData ${data}`);
      }

      acceptData(data: string) {
        console.log(`TPLinkRouter: acceptData ${data}`);
      }

      accept(v: RouterVisitor) {
        v.visit(this);
      }
    }

    interface RouterVisitor {
      visit(router: Router): void;
    }

    class LinuxConfigurator implements RouterVisitor {
      visit(router: Router) {
        if (router instanceof TPLinkRouter) {
          this.visitTPLinkRouter(router);
        } else if (router instanceof DLinkRouter) {
          this.visitDLinkRouter(router);
        } else if (router instanceof LinkSysRouter) {
          this.visitLinkSysRouter(router);
        }
      }

      private visitDLinkRouter(router: DLinkRouter) {
        console.log("DLinkRouter Configuration for Linux complete !!");
      }

      private visitTPLinkRouter(router: TPLinkRouter) {
        console.log("TPLinkRouter Configuration for Linux complete !!");
      }

      private visitLinkSysRouter(router: LinkSysRouter) {
        console.log("LinkSysRouter Configuration for Linux complete !!");
      }
    }

    class WindowsConfigurator implements RouterVisitor {
      visit(router: Router) {
        if (router instanceof TPLinkRouter) {
          this.visitTPLinkRouter(router);
        } else if (router instanceof DLinkRouter) {
          this.visitDLinkRouter(router);
        } else if (router instanceof LinkSysRouter) {
          this.visitLinkSysRouter(router);
        }
      }

      private visitDLinkRouter(router: DLinkRouter) {
        console.log("DLinkRouter Configuration for Windows complete !!");
      }

      private visitTPLinkRouter(router: TPLinkRouter) {
        console.log("TPLinkRouter Configuration for Windows complete !!");
      }

      private visitLinkSysRouter(router: LinkSysRouter) {
        console.log("LinkSysRouter Configuration for Windows complete !!");
      }
    }

    // How to use?
    class VisitorTest {
      static test() {
        let windowsConfigurator: WindowsConfigurator;
        let linuxConfigurator: LinuxConfigurator;
        let dlink: DLinkRouter;
        let tplink: TPLinkRouter;
        let linksys: LinkSysRouter;

        function setUp() {
          windowsConfigurator = new WindowsConfigurator();
          linuxConfigurator = new LinuxConfigurator();

          dlink = new DLinkRouter();
          tplink = new TPLinkRouter();
          linksys = new LinkSysRouter();
        }

        function testDlink() {
          dlink.accept(windowsConfigurator);
          dlink.accept(linuxConfigurator);
        }

        function testTPLink() {
          tplink.accept(windowsConfigurator);
          tplink.accept(linuxConfigurator);
        }

        function testLinkSys() {
          linksys.accept(windowsConfigurator);
          linksys.accept(linuxConfigurator);
        }

        setUp();

        testDlink();

        testLinkSys();

        testTPLink();
      }
    }
  }
  visitorDemo();

  // - State
  function stateDemo() {
    interface PackageState {
      updateState(context: DeliveryContext): void;
    }

    class Acknowledged implements PackageState {
      //Singleton
      private static instance: Acknowledged = new Acknowledged();

      private constructor() {}

      public static getInstance(): Acknowledged {
        return Acknowledged.instance;
      }

      //Business logic and state transition
      updateState(context: DeliveryContext) {
        console.log("Package is acknowledged !!");
        context.setCurrentState(Shipped.getInstance());
      }
    }

    class Shipped implements PackageState {
      //Singleton
      private static instance: Shipped = new Shipped();

      constructor() {}

      public static getInstance(): Shipped {
        return Shipped.instance;
      }

      //Business logic and state transition
      updateState(context: DeliveryContext) {
        console.log("Package is shipped !!");
        context.setCurrentState(InTransition.getInstance());
      }
    }

    class InTransition implements PackageState {
      //Singleton
      private static instance: InTransition = new InTransition();

      private constructor() {}

      public static getInstance(): InTransition {
        return InTransition.instance;
      }

      //Business logic and state transition
      updateState(context: DeliveryContext) {
        console.log("Package is in transition !!");
        context.setCurrentState(OutForDelivery.getInstance());
      }
    }

    class OutForDelivery implements PackageState {
      //Singleton
      private static instance: OutForDelivery = new OutForDelivery();

      private constructor() {}

      public static getInstance(): OutForDelivery {
        return OutForDelivery.instance;
      }

      //Business logic and state transition
      updateState(context: DeliveryContext) {
        console.log("Package is out of delivery !!");
        context.setCurrentState(Delivered.getInstance());
      }
    }

    class Delivered implements PackageState {
      //Singleton
      private static instance: Delivered = new Delivered();

      private constructor() {}

      public static getInstance() {
        return Delivered.instance;
      }

      //Business logic
      updateState(context: DeliveryContext) {
        console.log("Package is delivered!!");
      }
    }

    class DeliveryContext {
      constructor(
        private packageId: string,
        private currentState?: PackageState
      ) {
        if (!currentState) {
          this.currentState = Acknowledged.getInstance();
        }
      }

      getCurrentState(): PackageState | undefined {
        return this.currentState;
      }

      setCurrentState(currentState: PackageState) {
        this.currentState = currentState;
      }

      getPackageId(): string {
        return this.packageId;
      }

      setPackageId(packageId: string) {
        this.packageId = packageId;
      }

      update() {
        if (this.currentState) this.currentState.updateState(this);
      }
    }

    // How to use?

    class StateTest {
      static test() {
        const ctx: DeliveryContext = new DeliveryContext("Test123");

        ctx.update();
        ctx.update();
        ctx.update();
        ctx.update();
        ctx.update();
      }
    }
  }
  stateDemo();

  // - Memento
  function mementoDemo() {
    class Article {
      constructor(
        private id: number,
        private title: string,
        private content?: string
      ) {}

      setId(value: number) {
        this.id = value;
      }

      setTitle(value: string) {
        this.title = value;
      }

      setContent(value: string) {
        this.content = value;
      }

      createMemento(): ArticleMemento {
        return new ArticleMemento(this.id, this.title, this.content);
      }

      restore(m: ArticleMemento) {
        this.id = m.getId();
        this.title = m.getTitle();
        this.content = m.getContent();
      }

      toString(): string {
        return (
          "Article [id=" +
          this.id +
          ", title=" +
          this.title +
          ", content=" +
          this.content +
          "]"
        );
      }
    }

    class ArticleMemento {
      constructor(
        private id: number,
        private title: string,
        private content?: string
      ) {}

      getId(): number {
        return this.id;
      }

      getTitle(): string {
        return this.title;
      }

      getContent(): string {
        return this.content || "";
      }
    }

    // How to use?
    class MementoTest {
      static test() {
        const article: Article = new Article(1, "My Article");
        article.setContent("ABC");
        console.log(article);

        const memento: ArticleMemento = article.createMemento();
        article.setContent("123");
        console.log("Content updated to 123");
        console.log(article);

        article.restore(memento);
        console.log("Content restored");
        console.log(article);
      }
    }
  }
  mementoDemo();
}
lesson10();
