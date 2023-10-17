import * as bcrypt from "bcrypt";

class Encript {
  /**
   * encrypt the password using bcrypt
   */
  public hash = (password: string) => {
    return bcrypt.hashSync(password, 10);
  };

  /**
   * compare the encrypted password and password string
   */
  public compare = (enteredPassword: string, currentPassword: string) => {
    return bcrypt.compareSync(enteredPassword, currentPassword);
  };
}

export default Encript;
