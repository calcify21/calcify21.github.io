let contacts = JSON.parse(localStorage.getItem("jj_contacts")) || [
  { name: "Family Group", phone: "910000000000", notes: "Blessings for all" }
];
let isEditMode = false;
let searchQuery = "";
let deferredPrompt;

// --- PWA INSTALLATION ---
window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;
  const installBtn = document.getElementById("installBtn");
  if (installBtn) installBtn.style.display = "flex";
});

document.getElementById("installBtn")?.addEventListener("click", async () => {
  if (!deferredPrompt) return;
  deferredPrompt.prompt();
  const { outcome } = await deferredPrompt.userChoice;
  if (outcome === "accepted") {
    document.getElementById("installBtn").style.display = "none";
  }
  deferredPrompt = null;
});

// --- UTILITIES ---
function save() {
  localStorage.setItem("jj_contacts", JSON.stringify(contacts));
  renderContacts();
}

function showToast(message) {
  const container = document.getElementById("toast-container");
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerText = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

function triggerHaptic() {
  if (window.navigator && window.navigator.vibrate) {
    window.navigator.vibrate(50);
  }
}

// --- UI LOGIC ---
function toggleEditMode() {
  isEditMode = !isEditMode;
  const icon = document.getElementById("editIcon");
  icon.innerHTML = isEditMode ? '<i data-lucide="check"></i>' : '<i data-lucide="edit-3"></i>';
  lucide.createIcons();
  renderContacts();
  triggerHaptic();
}

function renderContacts() {
  const list = document.getElementById("contactList");
  const addForm = document.getElementById("addForm");
  list.innerHTML = "";
  
  addForm.style.display = isEditMode ? "block" : "none";

  const filtered = contacts.filter((c) => 
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (filtered.length === 0 && !isEditMode) {
    list.innerHTML = `<div style="text-align:center; padding:40px; opacity:0.5;">No contacts found</div>`;
    return;
  }

  filtered.forEach((c, index) => {
    const card = document.createElement("div");
    card.className = `contact-card ${isEditMode ? 'editing' : ''}`;
    
    if (isEditMode) {
      card.innerHTML = `
        <div class="edit-form">
          <input type="text" class="edit-input" value="${c.name}" onchange="updateContact(${index}, 'name', this.value)" placeholder="Name">
          <input type="text" class="edit-input" value="${c.notes || ''}" onchange="updateContact(${index}, 'notes', this.value)" placeholder="Notes">
          <input type="tel" class="edit-input" value="${c.phone}" onchange="updateContact(${index}, 'phone', this.value)" placeholder="Phone">
        </div>
        <div class="card-actions">
          <button class="delete-action" onclick="deleteContact(${index})">Delete</button>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div class="contact-info">
          <div class="contact-name">${c.name}</div>
          <div class="contact-notes">${c.notes || ''}</div>
        </div>
        <button class="send-btn" onclick="sendMessage('${c.phone}', '${c.name}')">
          <i data-lucide="send"></i>
        </button>
      `;
    }
    list.appendChild(card);
  });
  lucide.createIcons();
}

function sendMessage(phone, name) {
  triggerHaptic();
  const text = encodeURIComponent(`Jai Jinendra ${name} 🙏`);
  window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
}

function updateContact(index, field, value) {
  contacts[index][field] = value;
  localStorage.setItem("jj_contacts", JSON.stringify(contacts));
  showToast("Auto-saved");
}

function deleteContact(index) {
  triggerHaptic();
  contacts.splice(index, 1);
  save();
  showToast("Removed");
}

function addContact() {
  const n = document.getElementById("newName").value.trim();
  const notes = document.getElementById("newNotes").value.trim();
  let p = document.getElementById("newPhone").value.replace(/\D/g, "");

  if (n && p.length >= 10) {
    if (p.length === 10) p = "91" + p;
    contacts.push({ name: n, phone: p, notes: notes });
    save();
    document.getElementById("newName").value = "";
    document.getElementById("newNotes").value = "";
    document.getElementById("newPhone").value = "";
    showToast("Contact Added!");
  } else {
    showToast("Name and Phone required");
  }
}

// Search
document.getElementById("searchInput").addEventListener("input", (e) => {
  searchQuery = e.target.value;
  renderContacts();
});

// Init
renderContacts();
