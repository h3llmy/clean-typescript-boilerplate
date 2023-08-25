import * as bcrypt from "bcrypt";

class Encript {
  static hash = (password: string) => {
    return bcrypt.hash(password, 10);
  };
  static compare = (enteredPassword: string, currentPassword: string) => {
    return bcrypt.compareSync(enteredPassword, currentPassword);
  };
}

export default Encript;
