// otp-login.js
import { auth } from './firebase-config.js';
import {
  RecaptchaVerifier,
  signInWithPhoneNumber
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

let confirmationResult;

window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
  'size': 'invisible',
  'callback': (response) => {
    console.log("reCAPTCHA resolved");
  }
});

// Call this function when user clicks "Send OTP"
window.sendOTP = function () {
  const phoneInput = document.getElementById("mobile");
  const phone = phoneInput.value.trim();

  if (!/^\d{10}$/.test(phone)) {
    alert("❌ Please enter a valid 10-digit phone number.");
    return;
  }

  const fullPhone = "+91" + phone;
  const appVerifier = window.recaptchaVerifier;

  signInWithPhoneNumber(auth, fullPhone, appVerifier)
    .then((result) => {
      confirmationResult = result;
      window.confirmationResult = result;
      alert("✅ OTP Sent!");
    })
    .catch((error) => {
      console.error("Error during signInWithPhoneNumber", error);
      alert("❌ Failed to send OTP. Check console.");
    });
};

// Call this function on "Verify OTP"
window.verifyOTP = function () {
  const otpInputs = document.querySelectorAll('.otp-box input');
  const enteredOTP = Array.from(otpInputs).map(input => input.value).join('');

  if (enteredOTP.length !== 6) {
    alert("❌ Please enter a 6-digit OTP.");
    return;
  }

  confirmationResult.confirm(enteredOTP)
    .then((result) => {
      alert("✅ Phone number verified! Logging in...");
      // Redirect or do something here
    })
    .catch((error) => {
      alert("❌ Invalid OTP");
      console.error("OTP Verification Error:", error);
    });
};
