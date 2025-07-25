import { getDatabase, ref, onValue } from "firebase/database";
const db = getDatabase();
const notifIcon = document.getElementById("notifIcon");
const notifDot = document.getElementById("notifDot");
const notifList = document.getElementById("notifList");

function loadNotifications() {
  const notifRef = ref(db, "notifications");
  onValue(notifRef, (snapshot) => {
    notifList.innerHTML = '';
    let hasUnread = false;
    snapshot.forEach(item => {
      const data = item.val();
      const li = document.createElement("li");
      li.textContent = `${data.date} - ${data.message}`;
      notifList.appendChild(li);

      if (!data.read) hasUnread = true;
    });

    notifDot.style.display = hasUnread ? "inline-block" : "none";
  });
}

loadNotifications();
