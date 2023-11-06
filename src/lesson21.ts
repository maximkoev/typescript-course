function lesson21() {
  // ********* Lesson 21 *********
  // Structural Patterns
  // - Adapter
  function adapterDemo() {
    /**
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

    /**
     * The client code works with objects that implements the TaxiCalculator
     * interface, so we can use the adapter to reuse the incompatible library
     */
    function client(taxiCalculator: TaxiCalculator): void {
      console.log("Calculating the price for a 15 Km run to the airport");
      const priceInEuros = taxiCalculator.calculatePriceInEuros(15, true);
      console.log(`Total price: ${priceInEuros}€`);
    }

    const incompatibleLibrary = new UKTaxiCalculatorLibrary();
    const adaptedLibrary = new UKTaxiCalculatorLibraryAdapter(
      incompatibleLibrary
    );
    client(adaptedLibrary);
  }
  adapterDemo();

  // - Proxy
  async function proxyDemo() {
    /**
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
      private expirationTimeInMillis = 24 * 60 * 60 * 1000;

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

  function proxyInCoreJs() {
    // get trap
    const targetObj = {
      message1: "hello",
      message2: "everyone",
    };

    const p = new Proxy(targetObj, {
      get(target: typeof targetObj, prop: keyof typeof targetObj) {
        if (prop === "message1") {
          return "hello";
        }
        if (prop === "message2") {
          return "world";
        }
        return target[prop];
      },
    });

    console.log(p.message1); // hello
    console.log(p.message2); // world

    // apply trap
    function sum(a: number, b: number) {
      return a + b;
    }

    const handler = {
      apply: function (
        target: Function,
        _thisArg: unknown,
        argumentsList: number[]
      ) {
        console.log(`Calculate sum: ${argumentsList}`);
        // Expected output: "Calculate sum: 1,2"

        return target(argumentsList[0], argumentsList[1]) * 10;
      },
    };

    const proxyApply = new Proxy(sum, handler);

    console.log(sum(1, 2));
    // Expected output: 3
    console.log(proxyApply(1, 2));
    // Expected output: 30

    // set trap
    const monster1 = { eyeCount: 4 };

    const handler1 = {
      set(obj: typeof monster1, prop: string, value: number) {
        if (prop === "eyeCount" && value % 2 !== 0) {
          console.log("Monsters must have an even number of eyes");
        } else {
          return Reflect.set(obj, prop, value);
        }

        return true;
      },
    };

    const proxy1 = new Proxy(monster1, handler1);

    proxy1.eyeCount = 1;
    // Expected output: "Monsters must have an even number of eyes"

    console.log(proxy1.eyeCount);
    // Expected output: 4

    proxy1.eyeCount = 2;
    console.log(proxy1.eyeCount);
    // Expected output: 2
  }
  proxyInCoreJs();

  // - Decorator
  function decoratorDemo() {}
  decoratorDemo();

  // - Bridge
  function bridgeDemo() {}
  bridgeDemo();

  // - Composite
  function compositeDemo() {}
  compositeDemo();

  // - Facade
  function facadeDemo() {}
  facadeDemo();

  // - Flyweight
  function flyweightDemo() {}
  flyweightDemo();

  // Javascript most difficult parts
  // promises
}
lesson10();
