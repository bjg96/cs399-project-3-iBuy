/**
 * This is to be used as a template for each install/development machine
 */
const config = {};

config.database = {
  host: 'localhost',
  databaseName: 'groupwise',
  user: 'groupwise-app',
  password: 'abc123',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },
  logging: false,
  dialect: 'sqlite',
  storage: 'db.sqlite'
};

config.session = {
  secret: 'changeme',
  resave: false,
  saveUninitialized: true
};

module.exports = config;
