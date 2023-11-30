import { StatusCodes } from "http-status-codes";
export class NotFoundError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "NotFoundError";
    this.message = msg;
    this.StatusCodes = StatusCodes.NOT_FOUND;
  }
}
export class BadRequestError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "BadRequestError";
    this.message = msg;
    this.StatusCodes = StatusCodes.BAD_REQUEST;
  }
}
export class NotAuthinticationError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "NotAuthinticationError";
    this.message = msg;
    this.StatusCodes = StatusCodes.UNAUTHINTICATED;
  }
}
export class UnAuthorizedError extends Error {
  constructor(msg) {
    super(msg);
    this.name = "UnAuthorizedError";
    this.message = msg;
    this.StatusCodes = StatusCodes.UNAUTHORIZED;
  }
}
