import * as jwt from "jsonwebtoken";

export const encodeToken = (
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

export const decodeToken = (payload: string): string | jwt.JwtPayload => {
  try {
    return jwt.verify(payload, env("ACCESS_TOKEN_SECRET"));
  } catch (error) {
    throw new Exception(error);
  }
};

export const encodeRefreshToken = (
  payload: string | object | Buffer,
  expiresIn: string,
  jwtOption?: jwt.SignOptions & {
    algorithm: "none";
  }
): string => {
  try {
    return jwt.sign(payload, env("ACCESS_REFRESH_SECRET"), {
      ...jwtOption,
      expiresIn,
    });
  } catch (error) {
    throw new Exception(error, 500);
  }
};

export const decodeRefreshToken = (
  payload: string
): string | jwt.JwtPayload => {
  try {
    return jwt.verify(payload, env("ACCESS_REFRESH_SECRET"));
  } catch (error) {
    throw new Exception(error);
  }
};
