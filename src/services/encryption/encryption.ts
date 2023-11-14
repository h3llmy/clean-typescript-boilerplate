import * as bcrypt from "bcrypt";

class Encript {
  /**
   * encrypt the password using bcrypt
   *
   * @param password string
   *
   * @returns string
   */
  public hash = (password: string): string => {
    return bcrypt.hashSync(password, 10);
  };

  /**
   * compare the encrypted password and password string
   *
   * @param enteredPassword string
   *
   * @param currentPassword string (encript password)
   *
   * @returns boolean
   */
  public compare = (
    enteredPassword: string,
    currentPassword: string
  ): boolean => {
    return bcrypt.compareSync(enteredPassword, currentPassword);
  };
}

export default Encript;
