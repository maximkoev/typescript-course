// fix issues related to temporal uncertainty
function exercise40() {
    interface FetchDocument {
        date: number;
        hours: number;
    }

    type DataArray = FetchDocument[];

    interface GroupDocument {
        name: string;
        data: DataArray;
    }

    type TGroupDocuments = Array<GroupDocument> | null

    // TODO: fix the type of fetchResult variable to be union of array of GroupDocument objects / null
    let fetchResult: TGroupDocuments = null;

    // TODO: keep this code as is
    fetchResult = [
        {
            name: "John",
            data: [
                {
                    date: 13,
                    hours: 14,
                },
                {
                    date: 12,
                    hours: 433,
                },
            ],
        },
        {
            name: "Ringo",
            data: [
                {
                    date: 13,
                    hours: 41,
                },
                {
                    date: 11,
                    hours: 233,
                },
            ],
        },
    ];
    const userNames = ["John", "Ringo"];

    if (fetchResult !== null) {
        // NOTE: observe that type narrowing works here
        console.log(fetchResult.length);
        const result = fetchResult

        userNames.forEach((name) => {
            // TOOD: explain why type narrowing does not work here and fix the error (and remove any type annotations)
            // answer: foreach function could be async so typescript could not guarantee that variable still initialised
            // in the execution moment
            let resultWithName = result.find((obj: any) => obj.name === name);
            if (resultWithName) {
                console.log(resultWithName.data);
            }
        });
    }
}

exercise40();

// Use typeof operator
function exercise41() {
    // for this exercise, use the following data
    const user = {
        id: 1,
        firstName: "Terry",
        lastName: "Medhurst",
        maidenName: "Smitham",
        age: 50,
        gender: "male",
        email: "atuny0@sohu.com",
        phone: "+63 791 675 8914",
        username: "atuny0",
        password: "9uQFF1Lh",
        birthDate: "2000-12-25",
        image: "https://robohash.org/hicveldicta.png",
        bloodGroup: "A−",
        height: 189,
        weight: 75.4,
        eyeColor: "Green",
        hair: {
            color: "Black",
            type: "Strands",
        },
        domain: "slashdot.org",
        ip: "117.29.86.254",
        address: {
            address: "1745 T Street Southeast",
            city: "Washington",
            coordinates: {
                lat: 38.867033,
                lng: -76.979235,
            },
            postalCode: "20020",
            state: "DC",
        },
        macAddress: "13:69:BA:56:A3:74",
        university: "Capitol University",
        bank: {
            cardExpire: "06/22",
            cardNumbers: ["50380955204220685", "6762303175774717"],
            cardType: "maestro",
            currency: "Peso",
            iban: "NO17 0695 2754 967",
        },
        company: {
            address: {
                address: "629 Debbie Drive",
                city: "Nashville",
                coordinates: {
                    lat: 36.208114,
                    lng: -86.58621199999999,
                },
                postalCode: "37076",
                state: "TN",
            },
            department: "Marketing",
            name: "Blanda-O'Keefe",
            title: "Help Desk Operator",
        },
        ein: "20-9487066",
        ssn: "661-64-2976",
        userAgent:
            "Mozilla/5.0 (Windows NT 6.1) AppleWebKit/534.24 (KHTML, like Gecko) Chrome/12.0.702.0 Safari/534.24",
    };

    // TODO: for each property of the user object, print its type using js typeof operator
    type TUser = typeof user


    function printAllUserPropTypes() {
        // TODO: get lis of own keys of the user object
        // TODO: iterate over the keys with foreach
        // TODO: console.log the typeof for each property
        // Object.keys(user).forEach((key) => {
        //     console.log(`${key}: ${typeof user[key as keyof TUser]}`)
        // })
        Object.entries(user).forEach((key, value) => {
            console.log(`${key}: ${typeof value}`)
        })
    }

    printAllUserPropTypes();

    // TODO: create function that returns coordinates of the user company address,
    // TODO: set the return type of that function using typeof operator
    function getCoordinates(): typeof user.company.address.coordinates {
        return user.company.address.coordinates;
    }

    console.log(getCoordinates());
}

exercise41();

// Use lookup types
function exercise42() {
    // imagine you have a list of products received from the API
    // and you need to display the location coordinates of every product's warehouse
    const products: Array<TProduct> = [
        {
            id: 1,
            title: "iPhone 9",
            description: "An apple mobile which is nothing like apple",
            price: 549,
            discountPercentage: 12.96,
            rating: 4.69,
            stock: 94,
            brand: "Apple",
            category: "smartphones",
            thumbnail: "https://i.dummyjson.com/data/products/1/thumbnail.jpg",
            images: [
                {
                    url: "https://i.dummyjson.com/data/products/1/1.jpg",
                    title: "user photo 1",
                },
                {
                    url: "https://i.dummyjson.com/data/products/1/2.jpg",
                    title: "user photo 2",
                },
            ],
            warehouse: {
                address: {
                    address: "629 Debbie Drive",
                    city: "Nashville",
                    coordinates: {
                        lat: 36.208114,
                        lng: -86.58621199999999,
                    },
                    postalCode: "37076",
                    state: "TN",
                },
                name: "Blanda-O'Keefe",
                phoneNumbers: ["1-615-843-3426", "1-615-843-3427"],
            },
        },
    ];

    // TODO: for a given products data, implement a single TProduct type, write type annotation for every property

    type TProduct = {
        discountPercentage: number;
        thumbnail: string;
        price: number;
        rating: number;
        description: string;
        id: number;
        title: string;
        stock: number;
        category: string;
        brand: string;
        images: Array<{ title: string; url: string }>;
        warehouse: {
            address: {
                address: string;
                city: string;
                postalCode: string;
                coordinates: { lng: number; lat: number };
                state: string
            };
            name: string;
            phoneNumbers: Array<string>;
        };
    }


    // TODO: create a type TCoodinates that represents coordinates, using lookup type
    //  (product->warehouse->address->coordinates)
    type TCoordinates = TProduct["warehouse"]["address"]["coordinates"];

    // TODO: fix/add type annotation for the function (remove any type annotation)
    function printProductLocationCoordinates(coordinates: TCoordinates) {
        // NOTE: this could be using google map api to display the location on the map, but for now just console.log
        console.log(coordinates.lat);
        console.log(coordinates.lng);
    }

    printProductLocationCoordinates(products[0].warehouse.address.coordinates);

    // you also need a function which returns a phone number of given product's warehouse
    // TODO: add return type annotation using lookup type, instead of hardcoded string type
    type TProductWarehousePhoneNumber = TProduct["warehouse"]["phoneNumbers"][number]

    function getProductWarehousePhoneNumber(product: TProduct): TProductWarehousePhoneNumber {
        // TODO: fix the return value to be a type of a phone number for the product warehouse
        // HINT: use lookup types, and the result for that should equal to string type
        // TODO: make sure the function gets a phone number from product object
        return product.warehouse.phoneNumbers[0];
    }

    getProductWarehousePhoneNumber(products[0]);
}

exercise42();

// Use keyof type operators
function exercise43() {
    // TODO: implement functions to get and set property of an object in type safe way

    // TODO: for type sefety use generics and keyof type operator to ensure that key is a valid property of the object
    function getProperty<T>(obj: T, key: keyof T) {
        console.log(`exercise43. getProperty ${String(key)}:`, obj[key]);

        return obj[key];
    }

    // TODO: use generics and lookup type, add types T, K and use T[K] for value param type
    function setProperty<T, K extends keyof T>(obj: T, key: K, value: T[K]) {
        obj[key] = value;
        console.log("setProperty", obj, key, obj[key]);
    }

    const user = {
        firstName: "John",
        lastName: "Doe",
        role: "admin",
    };
    getProperty(user, "role"); // admin
    setProperty(user, "role", "user");
    //setProperty(user, "role1", "user"); throws error: Argument type "role1" is not assignable to parameter type keyof {firstName: string, lastName: string, role: string}
}

exercise43();

// Use conditional types
function exercise44() {
    // TODO: create a conditional type that will check if the type is a primitive type (unites all string, number, boolean)
    // TODO: if the type is primitive, return literal type 'primitive'
    // TODO: if the type is not primitive, return literal type 'not primitive'
    type TIsPrimitive<T> = T extends string | number | boolean ? "primitive" : "not primitive";

    // TODO uncomment the following lines
    type T1 = TIsPrimitive<number>; // Alias for: TIsPrimitive<number> Initial type:"primitive"
    type T2 = TIsPrimitive<string>;/*Alias for: TIsPrimitive<string> Initial type:"primitive"*/
    type T3 = TIsPrimitive<0>; // primitive
    type T4 = TIsPrimitive<{}>;  // hint: should be 'not primitive'
    type T5 = TIsPrimitive<Function>;  // hint: should be 'not primitive'
    type T6 = TIsPrimitive<true>; // primitive
    type T7 = TIsPrimitive<null>; // not primitive
    type T8 = TIsPrimitive<undefined>; // not primitive
    type T9 = TIsPrimitive<any>; // "primitive" | "not primitive"
}

exercise44();

// Use conditional types with unions and never
function exercise45() {
    // TODO: create a type that excludes number from a union type
    type ExcludeNumberFromType<T> = T extends number ? never : T; // TODO: replace with your code

    type TNumberOrString = number | string;

    type TExcludeNumberFromType = ExcludeNumberFromType<TNumberOrString>; // Hint - should equal to string

    // TODO: uncomment the following lines and make sure there are no errors
    const a: TExcludeNumberFromType = "test";
    console.log(a);
}

exercise45();

// Use infer keyword
function exercise46() {
    // create a type that extracts the type of the first argument of a function
    type FirstParameter<T> = T extends (first: infer FirstArg, ...args: any[]) => any ? FirstArg : never

    function createUser(firstName: string, lastName: string, age: number) {
        const id = (Math.random() * 100000).toString();

        return {
            firstName,
            lastName,
            age,
            id,
        };
    }

    // TODO: uncomment the following line and fix the error
    type TCreateUserFirstArg = FirstParameter<typeof createUser>; // string
}

exercise46();
