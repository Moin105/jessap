import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD7JEp8b4wPPj9QJlwlwE1nArVPQhWNUBg",
  authDomain: "jessop.firebaseapp.com",
  projectId: "jessop",
  storageBucket: "jessop.appspot.com",
  messagingSenderId: "250468406311",
  appId: "1:250468406311:web:c61d0cc6bf4e3df1786a02",
  measurementId: "G-FB373N4XB7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider};
// export default  app;
// const analytics = getAnalytics(app);