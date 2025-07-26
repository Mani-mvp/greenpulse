// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAOJrjM1Kgxjc_qiigje8XI7hWkQ8sStwg",
  authDomain: "greenpulse-otp-e2cf6.firebaseapp.com",
  projectId: "greenpulse-otp-e2cf6",
  storageBucket: "greenpulse-otp-e2cf6.appspot.com",
  messagingSenderId: "477659108496",
  appId: "1:477659108496:web:b44ddaa840ee7381bdf415",
  measurementId: "G-NVX6PZG7EY"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };
