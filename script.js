let contacts = JSON.parse(localStorage.getItem('jj_contacts')) || [
            { name: "Rohit Beta", phone: "919000000000" }
        ];
        let isDeleteMode = false;
        let deferredPrompt;

        // --- PWA INSTALL LOGIC ---
        const installBtn = document.getElementById('installBtn');
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            deferredPrompt = e;
            installBtn.style.display = 'block'; // Show button when install is possible
        });

        installBtn.addEventListener('click', async () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                const { outcome } = await deferredPrompt.userChoice;
                if (outcome === 'accepted') installBtn.style.display = 'none';
                deferredPrompt = null;
            }
        });

        // --- CORE APP LOGIC ---
        function renderContacts() {
            const list = document.getElementById('contactList');
            list.innerHTML = '';
            contacts.forEach((c, index) => {
                const container = document.createElement('div');
                container.className = 'btn-wrapper';
                
                const btn = document.createElement('button');
                btn.className = 'contact-btn';
                btn.innerHTML = `<div class="btn-content"><span class="emoji">🌸</span> <span class="name">${c.name}</span></div>`;
                
                btn.onclick = () => {
                    if(!isDeleteMode) {
                        window.open(`https://wa.me/${c.phone}?text=${encodeURIComponent('Jai Jinendra ' + c.name)}`, '_blank');
                    }
                };

                if (isDeleteMode) {
                    const del = document.createElement('span');
                    del.className = 'del-icon';
                    del.innerHTML = '✕';
                    del.onclick = (e) => { e.stopPropagation(); deleteContact(index); };
                    container.appendChild(del);
                }

                container.appendChild(btn);
                list.appendChild(container);
            });
        }

       

        function deleteContact(i) {
    const wrappers = document.querySelectorAll('.btn-wrapper');
    if (wrappers[i]) {
        wrappers[i].classList.add('removing'); // Start animation
        
        // Match the 0.4s CSS animation time (400ms)
        setTimeout(() => {
            contacts.splice(i, 1);
            save();
        }, 400); 
    }
}

function addContact() {
    const nameInput = document.getElementById('newName');
    const phoneInput = document.getElementById('newPhone');
    
    const n = nameInput.value.trim();
    const p = phoneInput.value.replace(/\D/g, ''); // Keep only numbers
    
    if (n && p.length >= 10) {
        contacts.push({ name: n, phone: p });
        save();
        nameInput.value = '';
        phoneInput.value = '';
    } else {
        alert("Please enter a valid name and phone number.");
    }
}

        function save() { localStorage.setItem('jj_contacts', JSON.stringify(contacts)); renderContacts(); }
        function toggleAdmin() {
            const f = document.getElementById('adminForm');
            f.style.display = f.style.display === 'none' ? 'block' : 'none';
        }
        function toggleDeleteMode() {
            isDeleteMode = !isDeleteMode;
            document.getElementById('editBtn').innerText = isDeleteMode ? "🗑️ Delete Mode: ON" : "🗑️ Delete Mode: OFF";
            renderContacts();
        }
	// Add a subtle shake to the install button every 5 seconds to catch eye
	setInterval(() => {
	    const btn = document.getElementById('installBtn');
	    if (btn && btn.style.display !== 'none') {
	        btn.style.animation = 'none';
	        btn.offsetHeight; /* trigger reflow */
	        btn.style.animation = 'shake 0.5s';
	    }
	}, 5000);

        if ('serviceWorker' in navigator) navigator.serviceWorker.register('./sw.js');
        renderContacts();