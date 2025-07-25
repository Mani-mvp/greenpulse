// profile.js

// Load saved profile info when profile modal is opened
export function loadProfile() {
  const name = localStorage.getItem("profile-name") || "";
  const email = localStorage.getItem("profile-email") || "";
  const phone = localStorage.getItem("profile-phone") || "";
  const address = localStorage.getItem("profile-address") || "";
  const pic = localStorage.getItem("profile-pic") || "assets/default.jpg";

  document.getElementById("name").value = name;
  document.getElementById("email").value = email;
  document.getElementById("phone").value = phone;
  document.getElementById("address").value = address;
  document.getElementById("profile-pic").src = pic;

  const navPic = document.getElementById("nav-profile-pic");
  if (navPic) navPic.src = pic;
}

// Save profile info
document.addEventListener("DOMContentLoaded", () => {
  const saveBtn = document.getElementById("saveBtn");
  if (saveBtn) {
    saveBtn.addEventListener("click", () => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const phone = document.getElementById("phone").value;
      const address = document.getElementById("address").value;
      const pic = document.getElementById("profile-pic").src;

      localStorage.setItem("profile-name", name);
      localStorage.setItem("profile-email", email);
      localStorage.setItem("profile-phone", phone);
      localStorage.setItem("profile-address", address);
      localStorage.setItem("profile-pic", pic);

      // Update nav pic
      const navPic = document.getElementById("nav-profile-pic");
      if (navPic) navPic.src = pic;

      // Close modal
      document.getElementById("profileModal").classList.add("hidden");
    });
  }

  // Handle profile picture upload
  const uploadInput = document.getElementById("uploadPic");
  if (uploadInput) {
    uploadInput.addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onload = function (event) {
        const dataUrl = event.target.result;
        document.getElementById("profile-pic").src = dataUrl;
      };
      reader.readAsDataURL(file);
    });
  }
});
