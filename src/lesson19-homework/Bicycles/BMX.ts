import { Bicycle } from "./BaseBicycle";

export class BMX extends Bicycle {
  override go() {
    console.log("BMX going");
  }

  override stop() {
    console.log("BMX stops");
  }
}
