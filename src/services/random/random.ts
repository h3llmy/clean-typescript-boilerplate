import * as crypto from "crypto";

class Random {
  /**
   * random the string
   */
  public stringNumber = (length: number = 6): string => {
    const max = Math.pow(10, length);
    const randomNumber =
      parseInt(
        crypto.randomBytes(Math.ceil(Math.log10(max) / 2)).toString("hex"),
        16
      ) % max;

    return randomNumber.toString().padStart(length, "0");
  };

  /**
   * random the lowercase string only
   */
  public lowercaseString = (length: number = 6): string => {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  /**
   * random the upercase string only
   */
  public uppercaseString = (length: number = 6): string => {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let randomString = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, characters.length);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  /**
   * random everything has symbol, uppercase, lowercase and number
   */
  public random = (length: number = 10): string => {
    const characters =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+[]{}|;:,.<>?";

    let randomString = "";
    const charactersLength = characters.length;

    for (let i = 0; i < length; i++) {
      const randomIndex = crypto.randomInt(0, charactersLength);
      randomString += characters.charAt(randomIndex);
    }

    return randomString;
  };

  /**
   * random number
   */
  public number = (length: number = 6): number => {
    const min = Math.pow(10, length - 1);
    const max = Math.pow(10, length);

    const randomNumber = crypto.randomInt(min, max);

    return randomNumber;
  };
}

export default Random;
