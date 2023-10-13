require('dotenv').config()

const processEnv = (envName) => {
  return process.env[envName]
}

module.exports = {
  dbUsername : processEnv("DB_USERNAME"),
  dbPassword : processEnv("DB_PASSWORD"),
  dbName : processEnv("DB_NAME"),
  dbHost : processEnv("DB_HOST"),
  dbDialect : processEnv("DB_DIALECT")
}