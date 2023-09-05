// install node.js
// install VSCode
// check if all installed - check node version
// open terminal
// % node -v
// % node --version
// check npm version
// % npm -v
// check npx version
// % npx -v
// version is not important, but it should be installed

// create a folder for the project
// % mkdir ts-learning
// % cd ts-learning
// init npm project
// % npm init -y
// install typescript - install typescript compiler tsc
// % npm i typescript
// create tsconfig.json
// % npx tsc --init --rootdir src --outdir dist
// % npx tsc --watch

let greetingText: string = "Hello World";
console.log(greetingText);

function example1() {
  let isDone: boolean = false;
  let age: number = 23;
  let firstName: string = "John";
  let nothing: null = null;
  let notDefined: undefined = undefined;
  // let largeNUmber: bigint = 100n;
  let id: symbol = Symbol("id");
  let id2: symbol = Symbol("id");
}

function example2() {
  // Array, Date, RegExp, Map and Set
  let a = [];
  let pricesList: number[] = [1, 2, 3];
  let pricesList2: Array<number> = [1, 2, 3];
  let todayDate: Date = new Date();
  let regExp: RegExp = /ab+c/;
  let set: Set<number> = new Set([1, 2, 3, 3, 2, 1]);

  class Queue {
    private data: any[] = [];

    push(item: any) {
      this.data.push(item);
    }
    pop() {
      this.data.shift();
    }
  }

  const queue: Queue = new Queue();
}

example2();
