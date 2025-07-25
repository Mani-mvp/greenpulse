// coins.js

// Fetch and update green coins
function updateCoins() {
  const coins = localStorage.getItem('greenCoins') || 0;
  document.getElementById('coin-count').innerText = coins;
}

// Save coins after report submission
function addCoins(amount) {
  let coins = parseInt(localStorage.getItem('greenCoins') || 0);
  coins += amount;
  localStorage.setItem('greenCoins', coins);
  saveCoinHistory(amount);
  updateCoins();
}

function saveCoinHistory(amount) {
  const history = JSON.parse(localStorage.getItem('coinHistory') || '[]');
  const timestamp = new Date().toLocaleString();
  history.push({ amount, timestamp });
  localStorage.setItem('coinHistory', JSON.stringify(history));
}

function showCoinHistory() {
  const history = JSON.parse(localStorage.getItem('coinHistory') || '[]');
  const container = document.getElementById('coin-history');
  container.innerHTML = history.map(item => `<li>+${item.amount} coins on ${item.timestamp}</li>`).join('');
}

updateCoins();


// notification.js

function loadNotifications() {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  const container = document.getElementById('notification-list');
  const bellDot = document.getElementById('notification-dot');

  if (notifications.length > 0) {
    bellDot.style.display = 'inline';
    container.innerHTML = notifications.map(n => `<li>${n.message} <span>${n.date}</span></li>`).join('');
  } else {
    bellDot.style.display = 'none';
    container.innerHTML = '<li>No notifications yet.</li>';
  }
}

function addNotification(message) {
  const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
  notifications.unshift({ message, date: new Date().toLocaleString() });
  localStorage.setItem('notifications', JSON.stringify(notifications));
  loadNotifications();
}

loadNotifications();


// profile.js

function loadProfile() {
  const profile = JSON.parse(localStorage.getItem('userProfile') || '{}');
  document.getElementById('profile-name').value = profile.name || '';
  document.getElementById('profile-email').value = profile.email || '';
  document.getElementById('profile-phone').value = profile.phone || '';
  document.getElementById('profile-address').value = profile.address || '';
  if (profile.image) {
    document.getElementById('profile-pic').src = profile.image;
  }
}

function saveProfile() {
  const profile = {
    name: document.getElementById('profile-name').value,
    email: document.getElementById('profile-email').value,
    phone: document.getElementById('profile-phone').value,
    address: document.getElementById('profile-address').value,
    image: document.getElementById('profile-pic').src
  };
  localStorage.setItem('userProfile', JSON.stringify(profile));
  alert('Profile saved successfully!');
  document.getElementById('profile-section').style.display = 'none';
}

function uploadProfilePic(event) {
  const reader = new FileReader();
  reader.onload = function () {
    document.getElementById('profile-pic').src = reader.result;
  };
  reader.readAsDataURL(event.target.files[0]);
}

loadProfile();
