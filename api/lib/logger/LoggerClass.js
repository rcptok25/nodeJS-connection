const Logger = require("./logger");

let instance = null;

class LoggerClass {
  constructor() {
    if (!instance) {
      instance = this;
    }

    return instance;
  }

  #createLogObject(user, location, procType, log) {
    return {
      user,
      location,
      proc_type: procType,
      log,
    };
  }

  info(user, location, procType, log) {
    let logs = this.#createLogObject(user, location, procType, log);
    Logger.info(logs);
  }

  error(user, location, procType, log) {
    let logs = this.#createLogObject(user, location, procType, log);
    Logger.error(logs);
  }

  warn(user, location, procType, log) {
    let logs = this.#createLogObject(user, location, procType, log);
    Logger.warn(logs);
  }

  debug(user, location, procType, log) {
    let logs = this.#createLogObject(user, location, procType, log);
    Logger.debug(logs);
  }

  verbose(user, location, procType, log) {
    let logs = this.#createLogObject(user, location, procType, log);
    Logger.verbose(logs);
  }

  silly(user, location, procType, log) {
    let logs = this.#createLogObject(user, location, procType, log);
    Logger.silly(logs);
  }
}

module.exports = new LoggerClass();
