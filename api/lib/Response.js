const Enum = require("../config/Enum");
const CustomError = require("./Error");

class Response {
  constructor() {}

  static successResponse(data, code = 200) {
    if (!data) {
      return {
        code,
      };
    }

    return {
      data,
      code,
    };
  }

  static errorResponse(error, code) {
    if (error instanceof CustomError) {
      return {
        code: error.code,
        error: {
          message: error.message,
          description: error.description,
        },
      };
    }

    return {
      code: Enum.HTTP_CODES.INTERNAL_SERVER_ERROR,
      error: {
        message: "Unknown error!",
        description: error.message,
      },
    };
  }
}

module.exports = Response;
