require("dotenv").config();

const processEnv = (envName) => {
  return process.env[envName];
};

module.exports = {
  dbUsername: processEnv("DB_USERNAME"),
  dbPassword: processEnv("DB_PASSWORD"),
  dbName: processEnv("DB_NAME"),
  dbHost: processEnv("DB_HOST"),
  dbDialect: processEnv("DB_DIALECT"),
  apiKey: processEnv("API_KEY"),
  authDomain: processEnv("AUTH_DOMAIN"),
  projectId: processEnv("PROJECT_ID"),
  storageBucket: processEnv("STORAGE_BUCKET"),
  messagingSenderId: processEnv("MESSAGING_SENDER_ID"),
  appId: processEnv("APP_ID"),
  firebaseUser: processEnv("FIREBASE_USER"),
  firebaseAuth: processEnv("FIREBASE_AUTH"),
};
