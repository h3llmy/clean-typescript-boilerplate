import * as crypto from "crypto";

class Random {
  static otp = () => {
    const randomNumber =
      parseInt(crypto.randomBytes(3).toString("hex"), 16) % 1000000;
    return randomNumber.toString().padStart(6, "0");
  };
}

export default Random;
