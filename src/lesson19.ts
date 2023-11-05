import * as fs from "fs/promises";

function lesson19() {
  // ********* Lesson 19 *********
  // Structural Design Patterns
  // - Adapter
  function adapterDemo() {
    /**
     *
     * Need: Interact with a Taxi price calculator that works with miles and £
     * with a client that provide Kms and expect a price in €.
     *
     * Solution: Create an adapter that translates the input and output values
     * into the expected formats.
     */

    /**
     * In this case, the target is an interface that the application is
     * compatible with
     */
    interface TaxiCalculator {
      calculatePriceInEuros(km: number, isAirport: boolean): number;
    }

    /**
     * The Adaptee is an existing library that contains the logic that we want
     * to reuse.
     */
    class UKTaxiCalculatorLibrary {
      public getPriceInPounds(miles: number, fare: Fares): number {
        if (fare === Fares.Airport) {
          return 5 + miles * 2.15;
        }
        return miles * 1.95;
      }
    }

    enum Fares {
      Standard,
      Airport,
    }

    /**
     * The Taxi Calculator Adapter makes the Adaptee's interface compatible
     * with the one that the client expects.
     */
    class UKTaxiCalculatorLibraryAdapter implements TaxiCalculator {
      constructor(private adaptee: UKTaxiCalculatorLibrary) {}

      calculatePriceInEuros(km: number, isAirport: boolean): number {
        const miles = km * 1.609;
        const fare = isAirport ? Fares.Airport : Fares.Standard;
        const pounds = this.adaptee.getPriceInPounds(miles, fare);
        const euros = pounds * 1.15;
        return euros;
      }
    }

    const incompatibleLibrary = new UKTaxiCalculatorLibrary();
    const adaptedLibrary = new UKTaxiCalculatorLibraryAdapter(
      incompatibleLibrary
    );

    console.log("Calculating the price for a 15 Km run to the airport");
    const priceInEuros = adaptedLibrary.calculatePriceInEuros(15, true);
    console.log(`Total price: ${priceInEuros}€`);
  }
  adapterDemo();
  // - Composite
  function compositDemo() {
    /**
     * Need: Calculate the total price of a shipment of packages that can contain
     * other packages
     *
     * Solution: Create a common interface for the package that contains only
     * products (leafs) and the package that contains other packages
     */

    /**
     * The base Package (Component) class declares the common operations.
     */
    abstract class PackageComponent {
      constructor(public title: string) {}
      public add(packageComponent: PackageComponent): void {}
      public remove(packageComponent: PackageComponent): void {}

      public isComposite(): boolean {
        return false;
      }

      public abstract getPrice(): number;
    }

    /**
     * The Product (Leaf) class only has the getPrice implementation
     */
    class ProductLeaf extends PackageComponent {
      constructor(title: string, protected price: number) {
        super(title);
      }

      public getPrice(): number {
        return this.price;
      }
    }

    /**
     * The MultiPackage (Composite) class represents a complex package that
     * contains other packages
     */
    class MultiPackageComposite extends PackageComponent {
      protected childrenPackages: PackageComponent[] = [];

      public add(packageComponent: PackageComponent): void {
        this.childrenPackages.push(packageComponent);
      }

      public remove(packageComponent: PackageComponent): void {
        const index = this.childrenPackages.indexOf(packageComponent);
        this.childrenPackages.splice(index, 1);
      }

      public isComposite(): boolean {
        return true;
      }

      public getPrice(): number {
        return this.childrenPackages.reduce(
          (prev, curr) => prev + curr.getPrice(),
          0
        );
      }
    }

    /**
     * The client code always works with base Package components
     */
    const galaxyPackage: PackageComponent = getGalaxyS68Pack();
    const canonPackage: PackageComponent = getCanonM50Pack();
    const simpleHeadphonesPackage: PackageComponent = getHeadphones();

    const mainShipment: PackageComponent = new MultiPackageComposite(
      "Main Shipment"
    );
    mainShipment.add(galaxyPackage);
    mainShipment.add(canonPackage);
    mainShipment.add(simpleHeadphonesPackage);

    console.log(`Total shipment cost: ${mainShipment.getPrice()}€`);

    /**
     * Helper (builder) functions hide there are 2 concrete package components
     */
    function getGalaxyS68Pack(): PackageComponent {
      const complexMobilePackage = new MultiPackageComposite("Galaxy S68 Pack");
      complexMobilePackage.add(new ProductLeaf("Galaxy S68", 900));
      complexMobilePackage.add(new ProductLeaf("S68 Charger", 25));
      complexMobilePackage.add(new ProductLeaf("S68 Case", 15));
      return complexMobilePackage;
    }

    function getCanonM50Pack(): PackageComponent {
      const complexCameraPackage = new MultiPackageComposite("Canon M50 Pack");
      complexCameraPackage.add(new ProductLeaf("Canon M50", 600));
      complexCameraPackage.add(new ProductLeaf("A50 1.8 Lens", 250));
      complexCameraPackage.add(new ProductLeaf("128 Gb Micro SD", 40));
      complexCameraPackage.add(new ProductLeaf("Canon Generic Case", 150));
      return complexCameraPackage;
    }

    function getHeadphones(): PackageComponent {
      return new ProductLeaf("HyperX Cloud Flight", 150);
    }
  }
  compositDemo();
  // - Proxy
  async function proxyDemo() {
    /**
     *
     * Need: Cache and log access to an external weather service SDK
     *
     * Solution: Create a proxy class to cache the SDK calls and log the requests
     */

    /**
     * The WeatherService defines the SDK interface and response
     */
    interface WeatherService {
      request(): Promise<WeatherForecast>;
    }

    interface WeatherForecast {
      avgTemperature: number;
      maxPrecipitationProbability: number;
    }

    /**
     * The real service emulates a network request to an external service with
     * a 1 second delay
     */
    class RealWeatherServiceSDK implements WeatherService {
      public async request(): Promise<WeatherForecast> {
        const randomWeatherForecast = {
          avgTemperature: Math.random() * 35,
          maxPrecipitationProbability: Math.random() * 100,
        };

        return new Promise((resolve) => {
          setTimeout(() => resolve(randomWeatherForecast), 1000);
        });
      }
    }

    /**
     * The Proxy implements the same interface than the real service. However
     * the proxy uses an internal cache to store responses. Subsequent calls to the
     * proxied service will go faster as they won't call the real slow service. The
     * proxy also logs useful information about the cache usage and timmings.
     */
    class ProxyWeatherService implements WeatherService {
      private cachedResponse!: WeatherForecast;
      private cacheDate!: Date;
      private expirationTimeInMillis = 24 * 60 * 60 * 1000; // 24 hours

      constructor(private realWeatherService: WeatherService) {}

      public async request(): Promise<WeatherForecast> {
        console.log(`Requesting forecast on date ${new Date().toISOString()}.`);
        const initialTime = Date.now();
        if (this.isCacheExpired()) {
          console.log("Invalid cache. Calling real weather service...");
          this.setCache(await this.realWeatherService.request());
        }
        const requestTimeInMillis = Date.now() - initialTime;
        console.log(`Request processed in ${requestTimeInMillis} milliseconds`);
        return this.cachedResponse;
      }

      private isCacheExpired(): boolean {
        return this.cachedResponse
          ? Date.now() > this.cacheDate.getTime() + this.expirationTimeInMillis
          : true;
      }

      private setCache(weatherForecast: WeatherForecast) {
        this.cachedResponse = weatherForecast;
        this.cacheDate = new Date();
      }
    }

    /**
     * The client code works with real and proxied services
     */
    async function clientCode(weatherService: WeatherService) {
      for (let i = 0; i < 3; i += 1) {
        const weatherForecast = await weatherService.request();
        console.log(
          `The weather forecast is ${weatherForecast.avgTemperature}º average temperature and ${weatherForecast.maxPrecipitationProbability}% max precipitation probability.`
        );
      }
    }

    console.log(
      "Client: Executing the client code with a real weather service:"
    );
    const realWeatherService = new RealWeatherServiceSDK();
    await clientCode(realWeatherService);

    console.log("");

    console.log(
      "Client: Executing the same client code with a proxied weather service:"
    );
    const proxy = new ProxyWeatherService(realWeatherService);
    await clientCode(proxy);
  }
  proxyDemo();
  // - Facade
  function facadeDemo() {
    /**
     * Facade pattern for a ETL process.
     * In this demo we have three subsystems.
     * The first one is the Loader (DataSource), which is a file system.
     * The second one is the Parser (DataTransformer), which is a string parser.
     * The third one is the Writer (DataSink), which is a file system.
     */

    type Map = { [key: string]: any };

    interface Extractor {
      extract(): Promise<string>;
    }

    interface Transformer {
      transform(input: string): Map;
    }

    interface Loader {
      load(input: Map): Promise<any>;
    }

    class FileExtractor implements Extractor {
      filepath: string;
      constructor(filepath: string) {
        this.filepath = filepath;
      }

      public async extract() {
        //load file from this.filepath
        return fs.readFile(this.filepath, "utf8");
      }
    }

    class FileLoader implements Loader {
      filepath: string;
      constructor(filepath: string) {
        this.filepath = filepath;
      }
      public async load(input: Map) {
        return fs.writeFile(this.filepath, JSON.stringify(input, undefined, 4));
      }
    }

    class FileTransformer implements Transformer {
      public transform(input: string): Map {
        let result: Map = {};

        input.split("\n").forEach((line) => {
          if (line.trim().length === 0) return;

          const [key] = line.split(",");
          if (typeof result !== "undefined") {
          }
          if (typeof result[key] === "undefined") {
            result[key] = 0;
          }
          result[key] = result[key] + 1;
        });

        return result;
      }
    }

    /**
     * The Facade class is the main class of the Facade pattern.
     * It's responsible for creating the subsystems and calling their methods.
     * I'm injecting the subsystems in the constructor.
     * In the process method I'm calling the extract, transform and load methods of the subsystems.
     */
    class ETLProcessor {
      extractor: Extractor;
      transformer: Transformer;
      loader: Loader;

      constructor(
        extractor: Extractor,
        transformer: Transformer,
        loader: Loader
      ) {
        this.extractor = extractor;
        this.transformer = transformer;
        this.loader = loader;
      }

      public async process() {
        const input = await this.extractor.extract();
        const transformed = this.transformer.transform(input);
        return this.loader.load(transformed);
      }
    }

    const processor = new ETLProcessor(
      new FileExtractor("input.txt"),
      new FileTransformer(),
      new FileLoader("output.json")
    );

    processor.process().then(() => {
      console.log("Process completed");
    });
  }
  facadeDemo();
  // - Decorator
  function decoratorDemo() {
    /**
     * Need: Add telemetry to an existing controller
     *
     * Solution: Create a decorator that adds the telemetry logic
     */
    interface ControllerRequest {
      url: string;
      method: string;
      data?: any;
    }

    interface ControllerResponse {
      status: number;
      data: any;
    }

    interface Controller {
      process(req: ControllerRequest): Promise<ControllerResponse>;
    }

    class UserController implements Controller {
      public process(req: ControllerRequest): Promise<ControllerResponse> {
        const users = [
          { id: 1, name: "John" },
          { id: 2, name: "Bob" },
          { id: 3, name: "Alice" },
        ];

        const response: ControllerResponse = {
          status: 200,
          data: {},
        };

        if (req.method === "GET") {
          response.data = users;
        } else {
          response.status = 400;
          response.data = {
            message: "Bad request",
          };
        }

        return new Promise((resolve) => {
          setTimeout(() => {
            resolve(response);
          }, 200);
        });
      }
    }

    class Decorator implements Controller {
      protected controller: Controller;

      constructor(controller: Controller) {
        this.controller = controller;
      }

      public process(req: ControllerRequest): Promise<ControllerResponse> {
        return this.controller.process(req);
      }
    }

    class TelemetryDecorator extends Decorator {
      public async process(
        req: ControllerRequest
      ): Promise<ControllerResponse> {
        const start = new Date().getTime();

        const result = await super.process(req);

        const end = new Date().getTime();
        const time = end - start;

        /**
         * If you want, you can save this telemetry data in a log file
         */
        console.log(`${req.url} ${req.method} => ${time}ms`);

        return result;
      }
    }

    const userController = new TelemetryDecorator(new UserController());
    userController.process({ url: "/users", method: "GET" });
  }
  decoratorDemo();
}
lesson10();
