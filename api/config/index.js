module.exports = {
  LOG_LEVEL: process.env.LOG_LEVEL || "debug",
  DB_CONNECTION_STRING:
    process.env.DB_CONNECTION_STRING ||
    "mongodb://host.docker.internal:27017/to_do_list",
};
