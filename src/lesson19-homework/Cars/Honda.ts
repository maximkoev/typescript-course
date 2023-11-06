import { Car } from "./BaseCar";

export class Honda extends Car {
  override go() {
    console.log("Honda going");
  }

  override stop() {
    console.log("Honda stops");
  }
}
