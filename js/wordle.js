const WORDS = [
  "APPLE", "BRAIN", "CRANE", "DREAM", "EAGLE", "FLAME", "GRAPE", "HEART", "IMAGE", "JUICE",
  "KNIFE", "LEMON", "MOUSE", "NIGHT", "OCEAN", "PEACH", "QUEEN", "RIVER", "SNAKE", "TRAIN",
  "UNION", "VOICE", "WATER", "YOUTH", "ZEBRA", "GHOST", "CHESS", "PIZZA", "STORM", "PLANT",
  "SLATE", "AUDIO", "ADIEU", "STARE", "ROAST", "REACT", "TRACK", "TRACE", "BLACK", "WHITE",
  "GREEN", "BROWN", "SMART", "SMILE", "LAUGH", "HAPPY", "LUCKY", "MAGIC", "MUSIC", "DANCE",
  "PARTY", "BEACH", "HOUSE", "TABLE", "CHAIR", "PHONE", "WATCH", "CLOCK", "PAPER", "PENCIL",
  "MONEY", "PRICE", "VALUE", "STORE", "BREAD", "SUGAR", "SWEET", "CANDY", "FRUIT", "BERRY",
  "MELON", "LEMON", "ONION", "SALAD", "SAUCE", "STEAK", "BACON", "CHICK", "SHEEP", "HORSE",
  "TIGER", "BEAST", "WHALE", "SHARK", "SQUID", "SNAIL", "INSECT", "SPIDER", "SNAKE", "FROGS",
  "RABBIT", "PUPPY", "KITTY", "ROBIN", "FINCH", "EAGLE", "HAWKS", "CROWS", "DOVES", "SWANS",
  "STORK", "GEESE", "DUCKS", "BUNNY", "BEARS", "DEERS", "MOOSE", "ELKES", "GOATS", "SHEEP",
  "PIGGY", "COWBO", "HORSE", "PONYS", "DONKY", "MULES", "CAMEL", "LLAMA", "ALPACA", "ZEBRA",
  "RHINO", "HIPPO", "ELEPH", "TIGER", "LIONS", "PANTH", "LEOPA", "CHEET", "JAGUA", "PUMAS",
  "LYNXE", "BOBCA", "COUGA", "TIGER", "LIONS", "BEARS", "WOLVE", "FOXES", "COYOT", "DINGO"
];

// Expanded valid guesses (typically much larger than solution words)
const EXTRA_GUESSES = [
  "AAHED", "AALII", "AARGH", "ABACA", "ABACI", "ABACK", "ABAFT", "ABAKA", "ABAMP", "ABASE",
  "ABASH", "ABATE", "ABAYA", "ABBAS", "ABBES", "ABBEY", "ABBOT", "ABEAM", "ABELE", "ABEAM", 
  "ABETS", "ABHOR", "ABIDE", "ABIES", "ABLED", "ABLER", "ABLES", "ABLET", "ABLOW", "ABMHO",
  "ABODE", "ABOHM", "ABOIL", "ABOMA", "ABOON", "ABORT", "ABOUT", "ABOVE", "ABRIS", "ABUSE",
  "ABUTS", "ABUZZ", "ABYES", "ABYSM", "ABYSS", "ACARI", "ACAST", "ACCED", "ACCEL", "ACCEP",
  "ARISE", "RAISE", "LEARN", "RENTS", "CARES", "DARES", "FARES", "PARES", "TARES", "WARES",
  "STAIR", "CHAIR", "FLAIR", "GLAIR", "PHAIR", "SHAIR", "THAIR", "ROUND", "SOUND", "BOUND",
  "HOUND", "MOUND", "POUND", "WOUND", "FOUND", "FIGHT", "LIGHT", "MIGHT", "NIGHT", "RIGHT",
  "SIGHT", "TIGHT", "WIGHT", "COULD", "WOULD", "SHOULD", "THERE", "WHERE", "EVERY", "NEVER",
  "UNDER", "OVER", "AFTER", "BEFORE", "AGAIN", "ALWAYS", "NEVER", "OFTEN", "SOMET", "TIMES",
  "EARTH", "WORLD", "SPACE", "STARS", "MOONS", "SUNNY", "RAINY", "WINDY", "SNOWY", "CLOUDY",
  "CLEAR", "STORM", "FLASH", "THUND", "LIGHT", "HEAVY", "SMALL", "LARGE", "SHORT", "TALLS"
];

let VALID_GUESSES = new Set([...WORDS, ...EXTRA_GUESSES]);

const GAME_STATE_KEY = 'wordle_state';
const STATS_KEY = 'wordle_stats';
const PREFS_KEY = 'wordle_prefs';

let state = {
  board: Array(6).fill(""),
  currentRow: 0,
  status: 'IN_PROGRESS', // IN_PROGRESS, WIN, FAIL
  lastPlayedDate: new Date().toDateString(),
  solution: ""
};

let stats = {
  played: 0,
  winPct: 0,
  currentStreak: 0,
  maxStreak: 0,
  wins: 0,
  distribution: { 1:0, 2:0, 3:0, 4:0, 5:0, 6:0 }
};

let prefs = { sound: true, hardMode: false };

async function loadDictionary() {
    const cachedDict = localStorage.getItem('wordle_full_dict');
    if (cachedDict) {
        const words = JSON.parse(cachedDict);
        words.forEach(w => VALID_GUESSES.add(w));
        return;
    }
    
    try {
        // Fetch the official 12.9k Wordle word list
        const res = await fetch('https://raw.githubusercontent.com/tabatkins/wordle-list/master/words');
        if (res.ok) {
            const text = await res.text();
            const words = text.split('\n').map(w => w.trim().toUpperCase()).filter(w => w.length === 5);
            words.forEach(w => VALID_GUESSES.add(w));
            localStorage.setItem('wordle_full_dict', JSON.stringify(words));
        }
    } catch (e) {
        console.warn("Failed to load extended dictionary from network.", e);
    }
}

function init() {
  loadData();
  loadDictionary();
  checkNewDay();
  setupUI();
  renderBoard();
  renderKeyboard();
  updateStatsUI();
  
  setTimeout(() => {
    document.getElementById('wordle-loader').classList.add('hidden');
    document.getElementById('wordle-app').style.display = 'flex';
  }, 1000);

  document.addEventListener('keydown', handleKeydown);
}

function getDailyWord() {
  const epochMs = new Date("2024-01-01T00:00:00").valueOf();
  const now = Date.now();
  const msInDay = 86400000;
  const index = Math.floor((now - epochMs) / msInDay);
  return WORDS[index % WORDS.length];
}

function loadData() {
  const savedState = localStorage.getItem(GAME_STATE_KEY);
  if (savedState) state = JSON.parse(savedState);
  
  const savedStats = localStorage.getItem(STATS_KEY);
  if (savedStats) stats = JSON.parse(savedStats);

  const savedPrefs = localStorage.getItem(PREFS_KEY);
  if (savedPrefs) prefs = JSON.parse(savedPrefs);
  
  if (!state.solution) state.solution = getDailyWord();
}

function saveData() {
  localStorage.setItem(GAME_STATE_KEY, JSON.stringify(state));
  localStorage.setItem(STATS_KEY, JSON.stringify(stats));
  localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
}

function checkNewDay() {
  const today = new Date().toDateString();
  if (state.lastPlayedDate !== today) {
    state = {
      board: Array(6).fill(""),
      currentRow: 0,
      status: 'IN_PROGRESS',
      lastPlayedDate: today,
      solution: getDailyWord()
    };
    saveData();
  }
}

function setupUI() {
  document.getElementById('helpBtn').onclick = () => showModal('helpModal');
  document.getElementById('statsBtn').onclick = () => showModal('statsModal');
  document.getElementById('settingsBtn').onclick = () => showModal('settingsModal');
  
  document.querySelectorAll('.modal-close').forEach(btn => {
    btn.onclick = (e) => hideModal(e.target.closest('.modal-overlay').id);
  });

  const soundToggle = document.getElementById('soundToggle');
  soundToggle.checked = prefs.sound;
  soundToggle.onchange = (e) => { prefs.sound = e.target.checked; saveData(); };

  const hardModeToggle = document.getElementById('hardModeToggle');
  hardModeToggle.checked = prefs.hardMode;
  hardModeToggle.onchange = (e) => { prefs.hardMode = e.target.checked; saveData(); };

  document.getElementById('resetGameBtn').onclick = () => {
    if(confirm('Reset today\'s progress?')) {
        localStorage.removeItem(GAME_STATE_KEY);
        location.reload();
    }
  };

  document.getElementById('shareBtn').onclick = shareResult;
}

function renderBoard() {
  const board = document.getElementById('wordleBoard');
  board.innerHTML = '';
  for (let r = 0; r < 6; r++) {
    const row = document.createElement('div');
    row.className = 'wordle-row';
    row.id = `row-${r}`;
    const word = state.board[r] || "";
    
    for (let c = 0; c < 5; c++) {
      const tile = document.createElement('div');
      tile.className = 'wordle-tile';
      tile.id = `tile-${r}-${c}`;
      
      const char = word[c] || "";
      tile.textContent = char;
      if (char) tile.classList.add('filled');
      
      row.appendChild(tile);
    }
    board.appendChild(row);
  }
  
  // Colorize past rows
  for (let r = 0; r < state.currentRow; r++) {
      colorizeRow(r, true);
  }
}

const KEYS = [
  ['Q','W','E','R','T','Y','U','I','O','P'],
  ['A','S','D','F','G','H','J','K','L'],
  ['ENTER','Z','X','C','V','B','N','M','BACKSPACE']
];

function renderKeyboard() {
  const kb = document.getElementById('wordleKeyboard');
  kb.innerHTML = '';
  
  const keyColors = getKeyColors();

  KEYS.forEach(row => {
    const rowDiv = document.createElement('div');
    rowDiv.className = 'keyboard-row';
    row.forEach(key => {
      const btn = document.createElement('button');
      btn.className = 'keyboard-key';
      btn.textContent = key === 'BACKSPACE' ? '⌫' : key;
      if (key === 'ENTER' || key === 'BACKSPACE') btn.classList.add('wide');
      
      btn.onclick = () => handleKey(key);
      
      if (keyColors[key]) btn.classList.add(keyColors[key]);
      
      rowDiv.appendChild(btn);
    });
    kb.appendChild(rowDiv);
  });
}

function getKeyColors() {
    const colors = {};
    for (let r = 0; r < state.currentRow; r++) {
        const word = state.board[r];
        const res = checkWord(word, state.solution);
        for (let i=0; i<5; i++) {
            const char = word[i];
            const color = res[i];
            if (colors[char] === 'correct') continue;
            if (colors[char] === 'present' && color === 'absent') continue;
            colors[char] = color;
        }
    }
    return colors;
}

function handleKeydown(e) {
  if (state.status !== 'IN_PROGRESS') return;
  if (document.querySelector('.modal-overlay.active')) return;

  if (e.key === 'Enter') handleKey('ENTER');
  else if (e.key === 'Backspace') handleKey('BACKSPACE');
  else if (/^[a-zA-Z]$/.test(e.key)) handleKey(e.key.toUpperCase());
}

function handleKey(key) {
  if (state.status !== 'IN_PROGRESS') return;

  const row = state.currentRow;
  let word = state.board[row] || "";

  if (key === 'BACKSPACE') {
    if (word.length > 0) {
      word = word.slice(0, -1);
      state.board[row] = word;
      updateRow(row);
      playSound('tap');
    }
  } else if (key === 'ENTER') {
    if (word.length === 5) {
      submitGuess();
    } else {
      shakeRow();
      showToast("Not enough letters");
    }
  } else {
    if (word.length < 5) {
      word += key;
      state.board[row] = word;
      updateRow(row);
      playSound('tap');
    }
  }
}

function updateRow(r) {
  const word = state.board[r];
  for (let c = 0; c < 5; c++) {
    const tile = document.getElementById(`tile-${r}-${c}`);
    const char = word[c] || "";
    tile.textContent = char;
    if (char) tile.classList.add('filled');
    else tile.classList.remove('filled');
  }
}

function shakeRow() {
    const rowDiv = document.getElementById(`row-${state.currentRow}`);
    rowDiv.classList.remove('shake-row');
    void rowDiv.offsetWidth; // trigger reflow
    rowDiv.classList.add('shake-row');
}

function submitGuess() {
  const row = state.currentRow;
  const word = state.board[row];
  
  if (!VALID_GUESSES.has(word)) {
      shakeRow();
      showToast("Not in word list");
      return;
  }

  colorizeRow(row, false, () => {
      state.currentRow++;
      
      if (word === state.solution) {
          state.status = 'WIN';
          winAnimation(row);
          updateStats(true, row + 1);
          setTimeout(() => { showToast("Magnificent!"); showModal('statsModal'); }, 2000);
      } else if (state.currentRow >= 6) {
          state.status = 'FAIL';
          updateStats(false);
          setTimeout(() => { showToast(state.solution); showModal('statsModal'); }, 1500);
      }
      
      saveData();
      renderKeyboard(); // Update key colors
  });
}

function checkWord(guess, solution) {
    const res = Array(5).fill('absent');
    const solChars = solution.split('');
    
    // First pass: Correct
    for(let i=0; i<5; i++) {
        if(guess[i] === solution[i]) {
            res[i] = 'correct';
            solChars[i] = null;
        }
    }
    // Second pass: Present
    for(let i=0; i<5; i++) {
        if(res[i] === 'correct') continue;
        const idx = solChars.indexOf(guess[i]);
        if(idx !== -1) {
            res[i] = 'present';
            solChars[idx] = null;
        }
    }
    return res;
}

function colorizeRow(r, instant=false, callback) {
    const word = state.board[r];
    const res = checkWord(word, state.solution);
    
    for (let c = 0; c < 5; c++) {
        const tile = document.getElementById(`tile-${r}-${c}`);
        if (instant) {
            tile.classList.add(res[c]);
            tile.style.color = "white";
            tile.style.borderColor = "transparent";
        } else {
            setTimeout(() => {
                tile.classList.add('reveal');
                setTimeout(() => {
                    tile.classList.add(res[c]);
                    tile.style.color = "white";
                    tile.style.borderColor = "transparent";
                }, 250); // Mid flip
            }, c * 300);
        }
    }
    if (!instant && callback) {
        setTimeout(callback, 5 * 300 + 300);
    }
}

function winAnimation(r) {
    for (let c = 0; c < 5; c++) {
        const tile = document.getElementById(`tile-${r}-${c}`);
        setTimeout(() => tile.classList.add('win-bounce'), c * 100);
    }
}

function updateStats(win, guesses) {
    stats.played++;
    if (win) {
        stats.wins++;
        stats.currentStreak++;
        stats.maxStreak = Math.max(stats.maxStreak, stats.currentStreak);
        stats.distribution[guesses]++;
    } else {
        stats.currentStreak = 0;
    }
    stats.winPct = Math.round((stats.wins / stats.played) * 100);
    saveData();
    updateStatsUI();
}

function updateStatsUI() {
    document.getElementById('statPlayed').textContent = stats.played;
    document.getElementById('statWinPct').textContent = stats.winPct;
    document.getElementById('statStreak').textContent = stats.currentStreak;
    document.getElementById('statMaxStreak').textContent = stats.maxStreak;

    const maxDist = Math.max(...Object.values(stats.distribution), 1);
    const distContainer = document.getElementById('guessDistribution');
    distContainer.innerHTML = '';
    
    for(let i=1; i<=6; i++) {
        const val = stats.distribution[i];
        const pct = Math.max(7, Math.round((val / maxDist) * 100)); // min 7% for visibility
        
        const row = document.createElement('div');
        row.className = 'guess-bar-row';
        
        const label = document.createElement('div');
        label.className = 'guess-bar-label';
        label.textContent = i;
        
        const barContainer = document.createElement('div');
        barContainer.className = 'guess-bar';
        
        const barFill = document.createElement('div');
        barFill.className = 'guess-bar-fill';
        if (state.status === 'WIN' && state.currentRow === i) barFill.classList.add('highlight');
        barFill.style.width = `${pct}%`;
        barFill.textContent = val;
        
        barContainer.appendChild(barFill);
        row.appendChild(label);
        row.appendChild(barContainer);
        distContainer.appendChild(row);
    }

    if (state.status !== 'IN_PROGRESS') {
        document.getElementById('gameOverActions').style.display = 'block';
        startTimer();
    }
}

function startTimer() {
    const update = () => {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setHours(24, 0, 0, 0);
        const diff = tomorrow - now;
        
        const h = Math.floor((diff / (1000 * 60 * 60)) % 24).toString().padStart(2, '0');
        const m = Math.floor((diff / 1000 / 60) % 60).toString().padStart(2, '0');
        const s = Math.floor((diff / 1000) % 60).toString().padStart(2, '0');
        
        document.getElementById('nextWordleTimer').textContent = `${h}:${m}:${s}`;
    };
    update();
    setInterval(update, 1000);
}

async function shareResult() {
    // Generate text emoji grid
    let text = `Calcify Wordle ${state.currentRow}/6\n\n`;
    for(let r=0; r<state.currentRow; r++) {
        const res = checkWord(state.board[r], state.solution);
        text += res.map(c => c==='correct' ? '🟩' : c==='present' ? '🟨' : '⬛').join('') + '\n';
    }
    
    showToast("Generating image...");

    try {
        // Capture screenshot of the game board
        const board = document.getElementById('wordleBoard');
        const theme = document.documentElement.getAttribute('data-theme');
        const bgColor = theme === 'dark' ? '#020617' : '#f8fafc';
        
        // Hide stats modal temporarily so it doesn't cover the board if z-index issues occur
        document.getElementById('statsModal').style.opacity = '0';
        
        const canvas = await html2canvas(board, {
            backgroundColor: bgColor,
            scale: 2, // High quality
            logging: false
        });
        
        document.getElementById('statsModal').style.opacity = '1';

        canvas.toBlob(async (blob) => {
            const file = new File([blob], 'wordle-result.png', { type: 'image/png' });

            // Check if Web Share API with files is supported
            if (navigator.canShare && navigator.canShare({ files: [file] })) {
                try {
                    await navigator.share({
                        title: 'Wordle Result',
                        text: text,
                        files: [file]
                    });
                } catch (err) {
                    console.log("Share canceled", err);
                }
            } else {
                // Fallback: copy text and download image
                navigator.clipboard.writeText(text).catch(() => {});
                
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'wordle-result.png';
                document.body.appendChild(a);
                a.click();
                document.body.removeChild(a);
                URL.revokeObjectURL(url);
                
                showToast("Grid copied & image downloaded!");
            }
        }, 'image/png');
        
    } catch (e) {
        console.error("Screenshot failed", e);
        // Fallback to purely text share
        if (navigator.share) {
            navigator.share({ title: 'Wordle Result', text: text }).catch(()=>{});
        } else {
            navigator.clipboard.writeText(text).then(() => showToast("Copied to clipboard"));
        }
    }
}

function showModal(id) {
    document.getElementById(id).classList.add('active');
}
function hideModal(id) {
    document.getElementById(id).classList.remove('active');
}

function showToast(msg) {
    const container = document.getElementById('wordleToastContainer');
    const toast = document.createElement('div');
    toast.className = 'wordle-toast';
    toast.textContent = msg;
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('fade-out');
        setTimeout(() => toast.remove(), 300);
    }, 2000);
}

function playSound(type) {
    if (!prefs.sound) return;
    // Simplified: in a real app, load Audio objects
}

document.addEventListener('DOMContentLoaded', init);
