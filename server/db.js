const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const config = require("./config");

const app = initializeApp(config.firebaseConfig);
const firestore = getFirestore(app);

const { getStorage } = require("firebase/storage");
const { getAuth, GoogleAuthProvider } = require("firebase/auth");

const storage = getStorage(app);
const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();

module.exports = {
  app,
  firestore,
  storage,
  auth,
  googleAuthProvider,
};
