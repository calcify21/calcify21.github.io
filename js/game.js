let players = [], scores = {}, shuffledOrder = [], pIdx = 0, spyName = "", currentMode = 0, citizenWord = "", spyWord = "";

        const wordPool = [["Dog", "Cat"], ["Apple", "Banana"], ["Car", "Bus"], ["School", "Home"], ["Ball", "Bat"], ["Milk", "Juice"], ["Pen", "Pencil"], ["Chair", "Table"], ["Sun", "Moon"], ["Ice Cream", "Cake"], ["Phone", "TV"], ["Shoes", "Slippers"], ["Book", "Notebook"], ["Bed", "Sofa"], ["Fan", "AC"], ["Train", "Aeroplane"], ["Park", "Playground"], ["Doctor", "Nurse"], ["Rice", "Roti"], ["Bottle", "Glass"], ["Bag", "Purse"], ["Clock", "Watch"], ["Door", "Window"], ["Rain", "Snow"], ["Lion", "Tiger"], ["Cricket", "Football"], ["Morning", "Night"], ["Chocolate", "Biscuit"], ["Shirt", "T-shirt"], ["Cup", "Plate"]];

        const questionPool = [
            ["What food do you like?", "What drink do you like?"],
            ["What game do you play?", "What toy do you like?"],
            ["What do you watch?", "What do you listen to?"],
            ["What do you eat in the morning?", "What do you eat at night?"],
            ["What do you wear outside?", "What do you wear at home?"],
            ["What do you do after school?", "What do you do before school?"],
            ["What animal do you like?", "What bird do you like?"],
            ["What do you play inside?", "What do you play outside?"],
            ["What do you do when happy?", "What do you do when sad?"],
            ["What do you see at night?", "What do you see in the morning?"],
            ["What do you draw with?", "What do you write with?"],
            ["What do you use to drink water?", "What do you use to eat food?"],
            ["What do you wear in winter?", "What do you wear in summer?"],
            ["What do you do on Sunday?", "What do you do on school days?"],
            ["What do you play with friends?", "What do you play alone?"],
            ["What do you like on TV?", "What do you like on phone?"],
            ["What do you eat at home?", "What do you eat outside?"],
            ["What do you do in a park?", "What do you do at home?"],
            ["What do you use to clean hands?", "What do you use to clean teeth?"],
            ["What makes you laugh?", "What makes you angry?"],
            ["What do you keep in your bag?", "What do you keep in your pocket?"],
            ["What do you do before sleep?", "What do you do after sleep?"],
            ["What game do you like most?", "What food do you like most?"],
            ["What do you wear on feet?", "What do you wear on head?"],
            ["What do you do when it rains?", "What do you do when it is hot?"]
        ];

        let usedWordsIdx = [], usedQuestionsIdx = [];

        function triggerAlert(msg) {
            const el = document.getElementById("custom-alert");
            el.innerText = msg; el.style.top = "20px";
            setTimeout(() => (el.style.top = "-100px"), 2500);
        }

        function openInstructions() { document.getElementById("modal-overlay").style.display = "flex"; }
        function closeInstructions() { document.getElementById("modal-overlay").style.display = "none"; }

        function goBack(screenId) {
            document.querySelectorAll(".card > div").forEach((div) => div.classList.add("hidden"));
            document.getElementById(screenId).classList.remove("hidden");
            document.getElementById("sequence-panel").classList.add("hidden");
        }

        function addNameInput() {
            const container = document.getElementById("name-container");
            const div = document.createElement("div");
            div.className = "name-row";
            div.innerHTML = `
                <input type="text" class="p-name" placeholder="Player ${container.children.length + 1}" />
                <button class="del-btn" onclick="this.parentElement.remove()">×</button>
            `;
            container.appendChild(div);
        }

        function resetScores() {
            Object.keys(scores).forEach((n) => (scores[n] = 0));
            triggerAlert("Scores Reset! 🔄");
        }

        function saveNames() {
            const names = Array.from(document.querySelectorAll(".p-name")).map((i) => i.value.trim()).filter((v) => v !== "");
            if (names.length < 3) return triggerAlert("Minimum 3 players! ✋");
            if (new Set(names).size !== names.length) return triggerAlert("Unique names only! ✋");
            players = names;
            players.forEach((n) => { if (scores[n] === undefined) scores[n] = 0; });
            goBack("mode-screen");
        }

        function startGame(mode) {
            currentMode = mode; pIdx = 0;
            shuffledOrder = [...players].sort(() => Math.random() - 0.5);
            if (mode === 0) { do { spyName = players[Math.floor(Math.random() * players.length)]; } while (spyName === shuffledOrder[0]); }
            else { spyName = players[Math.floor(Math.random() * players.length)]; }

            document.getElementById("mode-label").innerText = ["MODE: BLANK CHIT", "MODE: RELATED WORDS", "MODE: QUESTIONS"][mode];
            let pair;
            if (mode === 2) {
                if (usedQuestionsIdx.length >= questionPool.length) usedQuestionsIdx = [];
                let qIdx; do { qIdx = Math.floor(Math.random() * questionPool.length); } while (usedQuestionsIdx.includes(qIdx));
                usedQuestionsIdx.push(qIdx); pair = questionPool[qIdx];
            } else {
                if (usedWordsIdx.length >= wordPool.length) usedWordsIdx = [];
                let wIdx; do { wIdx = Math.floor(Math.random() * wordPool.length); } while (usedWordsIdx.includes(wIdx));
                usedWordsIdx.push(wIdx); pair = wordPool[wIdx];
            }
            if (mode === 0) {
                citizenWord = pair[Math.floor(Math.random() * 2)];
                spyWord = "BLANK!";
            } else {
                citizenWord = pair[0];
                spyWord = pair[1];
            }
            goBack("handover-screen"); updateHandover();
        }

        function updateHandover() {
            document.getElementById("target-player").innerText = shuffledOrder[pIdx];
            document.getElementById("chit-area").style.display = "none";
            document.getElementById("chit-area").classList.remove("open");
            document.getElementById("reveal-btn").classList.remove("hidden");
            document.getElementById("next-btn").classList.add("hidden");
        }

        function showSecret() {
            document.getElementById("secret-text").innerText = shuffledOrder[pIdx] === spyName ? spyWord : citizenWord;
            document.getElementById("chit-area").style.display = "flex";
            setTimeout(() => document.getElementById("chit-area").classList.add("open"), 50);
            document.getElementById("reveal-btn").classList.add("hidden");
            document.getElementById("next-btn").classList.remove("hidden");
        }

        function nextPlayerStep() { if (++pIdx < shuffledOrder.length) updateHandover(); else showDiscuss(); }

        function showDiscuss() {
            goBack("discuss-screen");

            // Hide sequence panel for Questions mode (Mode 2)
            if (currentMode === 2) {
                document.getElementById("sequence-panel").classList.add("hidden");
            } else {
                document.getElementById("sequence-panel").classList.remove("hidden");
                const list = document.getElementById("chip-list"); list.innerHTML = "";
                shuffledOrder.forEach((name, i) => { list.innerHTML += `<div class="order-chip">${i + 1}. ${name}</div>`; });
            }
        }

        // --- NEW: Reminder System ---
        function openReminderMenu() {
            // Re-using the modal-overlay to show player list for reminders
            const modal = document.getElementById("modal-overlay");
            const content = document.querySelector(".modal-content");

            // Save current content to restore later (hacky but effective for single file)
            if (!window.savedRulesContent) window.savedRulesContent = content.innerHTML;

            let html = `
                <div style="text-align:center">
                    <h2 style="color:var(--primary)">🤫 Who needs a reminder?</h2>
                    <p>Pass the phone to the player, then tap your name.</p>
                    <div style="display:flex; flex-direction:column; gap:10px; margin-top:20px">
            `;

            players.forEach(name => {
                html += `<button onclick="revealFor('${name}')">${name}</button>`;
            });

            html += `
                    </div>
                    <button class="btn-danger" style="margin-top:20px" onclick="restoreRulesAndClose()">Cancel</button>
                </div>
            `;

            content.innerHTML = html;
            modal.style.display = "flex";
        }

        function revealFor(name) {
            // Determine secret based on mode and role
            let secret = "";

            // Logic must match startGame() distribution
            // We need to know if this specific player is the Spy
            const isSpy = (name === spyName);

            if (isSpy) {
                if (currentMode === 1 || currentMode === 2) {
                    // In Related Words (1) and Questions (2), Spy doesn't know they are the spy!
                    secret = spyWord;
                } else {
                    secret = "BLANK! (You are the Spy)";
                }
            } else {
                secret = citizenWord;
            }

            const content = document.querySelector(".modal-content");
            content.innerHTML = `
                <div style="text-align:center; padding: 20px 0;">
                    <h3>${name}'s Secret:</h3>
                    <h1 style="color:var(--primary); font-size:2.5rem; margin:20px 0">${secret}</h1>
                    <button onclick="openReminderMenu()">Back to List</button>
                    <button class="btn-danger" onclick="restoreRulesAndClose()">Close</button>
                </div>
            `;
        }

        function restoreRulesAndClose() {
            if (window.savedRulesContent) {
                document.querySelector(".modal-content").innerHTML = window.savedRulesContent;
            }
            closeInstructions();
        }

        function finishRound(winner) {
            if (winner === "Citizens") {
                players.forEach((n) => { if (n !== spyName) scores[n]++; });
                confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
            } else {
                scores[spyName] += 2; // Spy gets +2 points for winning
            }
            showScores();
        }

        function showScores() {
            goBack("result-screen");
            document.getElementById("post-round-btns").classList.remove("hidden");
            document.getElementById("final-winner-btns").classList.add("hidden");
            document.getElementById("reveal-text").innerHTML = `🕵️ The Spy was <b>${spyName}</b>`;
            updateScoreboard();
        }

        function updateScoreboard() {
            const board = document.getElementById("scoreboard"); board.innerHTML = "";
            const max = Math.max(...Object.values(scores));
            Object.keys(scores).sort((a, b) => scores[b] - scores[a]).forEach((n) => {
                const isTop = scores[n] === max && max > 0;
                board.innerHTML += `<div class="score-row ${isTop ? "winner-highlight" : ""}"><span>${n}</span><span>${scores[n]} pts</span></div>`;
            });
        }

        function declareFinalWinner() {
            const maxScore = Math.max(...Object.values(scores));
            const winners = Object.keys(scores).filter((n) => scores[n] === maxScore);
            document.getElementById("result-title").innerText = "🏆 Final Winner 🏆";
            document.getElementById("reveal-text").innerHTML = `Congratulations <b>${winners.join(" & ")}</b>!`;
            document.getElementById("post-round-btns").classList.add("hidden");
            document.getElementById("final-winner-btns").classList.remove("hidden");
            updateScoreboard(); confetti({ particleCount: 400, spread: 100, origin: { y: 0.5 } });
        }

        function replayCurrentMode() { startGame(currentMode); }
        // --- Theme Toggle Logic ---
        function toggleTheme() {
            const body = document.body;
            const isLight = body.getAttribute('data-theme') === 'light';
            const icon = document.getElementById('theme-icon');

            if (isLight) {
                body.removeAttribute('data-theme');
                icon.innerText = "☀️";
                localStorage.setItem('spyGameTheme', 'dark');
            } else {
                body.setAttribute('data-theme', 'light');
                icon.innerText = "🌙";
                localStorage.setItem('spyGameTheme', 'light');
            }
        }

        // Initialize Theme & Modal Listeners
        (function init() {
            // Theme
            const savedTheme = localStorage.getItem('spyGameTheme');
            if (savedTheme === 'light') {
                document.body.setAttribute('data-theme', 'light');
                document.getElementById('theme-icon').innerText = "🌙";
            }

            // Modal Listeners
            const modal = document.getElementById('modal-overlay');
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    // Check if we need to restore content (if 'Forgot Secret' was active)
                    if (window.savedRulesContent) restoreRulesAndClose();
                    else closeInstructions();
                }
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === "Escape" && modal.style.display === "flex") {
                    if (window.savedRulesContent) restoreRulesAndClose();
                    else closeInstructions();
                }
            });
        })();