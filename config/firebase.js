// Import the functions you need from the SDKs you need
const { initializeApp } = require("firebase/app");
const { getAuth } = require("firebase/auth");
const { getStorage } = require("firebase/storage");
const {
  apiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = require("./config");

const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app);

module.exports = {
  auth,
  storage,
};
