import * as jwt from "jsonwebtoken";

class AuthToken {
  static encode = (
    payload: string | object | Buffer,
    expiresIn: string,
    jwtOption?: jwt.SignOptions & {
      algorithm: "none";
    }
  ): string => {
    try {
      return jwt.sign(payload, env("ACCESS_TOKEN_SECRET"), {
        ...jwtOption,
        expiresIn,
      });
    } catch (error) {
      throw new Exception(error, 500);
    }
  };

  static decode = (payload: string): string | jwt.JwtPayload => {
    try {
      return jwt.verify(payload, env("ACCESS_TOKEN_SECRET"));
    } catch (error) {
      throw Exception.unauthorized();
    }
  };

  static encodeRefresh = (
    payload: string | object | Buffer,
    expiresIn: string,
    jwtOption?: jwt.SignOptions & {
      algorithm: "none";
    }
  ): string => {
    try {
      return jwt.sign(payload, env("REFRESH_TOKEN_SECRET"), {
        ...jwtOption,
        expiresIn,
      });
    } catch (error) {
      throw new Exception(error, 500);
    }
  };

  static decodeRefresh = (payload: string): string | jwt.JwtPayload => {
    try {
      return jwt.verify(payload, env("REFRESH_TOKEN_SECRET"));
    } catch (error) {
      throw Exception.unauthorized();
    }
  };
}

export default AuthToken;
