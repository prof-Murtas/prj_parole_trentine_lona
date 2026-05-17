/* ============================================================
   e-Trentin — JavaScript specifico per HOME (home.js)
   ============================================================ */

/* ────────────────────────────────────────────
   DATASET DI ESEMPIO
   In produzione questo verrà sostituito con
   chiamate a un'API / database reale
   ──────────────────────────────────────────── */
const dizionario = [
  { id: 1,  dialetto: 'arar',       italiano: 'arare',          cat: 'vb',  def: 'Lavorare la terra con l\'aratro', fonetica: '/araˈr/' },
  { id: 2,  dialetto: 'baita',      italiano: 'casa di montagna', cat: 'sf', def: 'Abitazione tipica alpina', fonetica: '/ˈbaita/' },
  { id: 3,  dialetto: 'bocia',      italiano: 'bambino',         cat: 'sm',  def: 'Termine affettuoso per indicare un bambino', fonetica: '/ˈbotʃa/' },
  { id: 4,  dialetto: 'brìsa',      italiano: 'briciola',        cat: 'sf',  def: 'Piccolo frammento di pane o cibo', fonetica: '/ˈbrisa/' },
  { id: 5,  dialetto: 'ciapar',     italiano: 'prendere',        cat: 'vb',  def: 'Afferrare, prendere qualcosa', fonetica: '/tʃaˈpar/' },
  { id: 6,  dialetto: 'doman',      italiano: 'domani',          cat: 'avv', def: 'Il giorno successivo a oggi', fonetica: '/doˈman/' },
  { id: 7,  dialetto: 'fiocc',      italiano: 'fiocco di neve',  cat: 'sm',  def: 'Cristallo di neve', fonetica: '/fjɔkk/' },
  { id: 8,  dialetto: 'gat',        italiano: 'gatto',           cat: 'sm',  def: 'Felino domestico', fonetica: '/gat/' },
  { id: 9,  dialetto: 'Trento',     italiano: 'Trento',          cat: 'np',  def: 'Capoluogo della Provincia Autonoma di Trento', fonetica: '/ˈtrento/' },
  { id: 10, dialetto: 'laorar',     italiano: 'lavorare',        cat: 'vb',  def: 'Svolgere un\'attività produttiva', fonetica: '/laoˈrar/' },
  { id: 11, dialetto: 'mat',        italiano: 'matto / sciocco', cat: 'sm',  def: 'Persona strana o eccentrica', fonetica: '/mat/' },
  { id: 12, dialetto: 'nòto',       italiano: 'niente',          cat: 'avv', def: 'Assenza di cose o fatti', fonetica: '/ˈnɔto/' },
  { id: 13, dialetto: 'polenta',    italiano: 'polenta',         cat: 'sf',  def: 'Piatto tipico a base di farina di mais', fonetica: '/poˈlenta/' },
  { id: 14, dialetto: 'recia',      italiano: 'orecchio',        cat: 'sf',  def: 'Organo dell\'udito', fonetica: '/ˈretʃa/' },
  { id: 15, dialetto: 'spessar',    italiano: 'spingere',        cat: 'vb',  def: 'Esercitare una forza per spostare', fonetica: '/speˈsar/' },
  { id: 16, dialetto: 'taiant',     italiano: 'tagliente',       cat: 'avv', def: 'Che taglia, affilato', fonetica: '/taˈjant/' },
  { id: 17, dialetto: 'val',        italiano: 'valle',           cat: 'sf',  def: 'Depressione tra due rilievi montuosi', fonetica: '/val/' },
  { id: 18, dialetto: 'vecia',      italiano: 'vecchia',         cat: 'sf',  def: 'Donna anziana', fonetica: '/ˈvetʃa/' },
  { id: 19, dialetto: 'zogar',      italiano: 'giocare',         cat: 'vb',  def: 'Divertirsi con giochi', fonetica: '/tsoˈgar/' },
  { id: 20, dialetto: 'ades',       italiano: 'adesso',          cat: 'avv', def: 'In questo momento', fonetica: '/aˈdes/' },
];

/* Mappa leggibile delle categorie */
const categorieLabels = {
  'vb':  'Verbo',
  'sm':  'Sost. maschile',
  'sf':  'Sost. femminile',
  'np':  'Nome proprio',
  'avv': 'Avverbio',
};

/* Parole più cercate (simulate) */
const parolePiuCercate = [
  { word: 'bocia', rank: 1 },
  { word: 'ciapar', rank: 2 },
  { word: 'polenta', rank: 3 },
  { word: 'mat', rank: 4 },
  { word: 'nòto', rank: 5 },
  { word: 'baita', rank: 6 },
  { word: 'laorar', rank: 7 },
  { word: 'fiocc', rank: 8 },
];

/* ────────────────────────────────────────────
   STATO DELL'APPLICAZIONE
   ──────────────────────────────────────────── */
let statoRicerca = {
  query:     '',
  direzione: 'dialetto',   /* 'dialetto' | 'italiano' */
  categoria: 'tutte',
  lettera:   null,
};


/* ────────────────────────────────────────────
   1. RICERCA BIDIREZIONALE
   ──────────────────────────────────────────── */
(function initRicerca() {
  const input      = document.getElementById('search-input');
  const searchBtn  = document.getElementById('search-btn');
  const filterSel  = document.getElementById('filter-categoria');
  const dropdown   = document.getElementById('autocomplete-dropdown');
  const risultatiSec = document.getElementById('risultati');

  if (!input) return;

  /* ── Toggle direzione ── */
  document.querySelectorAll('.dir-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.dir-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      statoRicerca.direzione = btn.dataset.dir;
      /* Aggiorna placeholder */
      input.placeholder = statoRicerca.direzione === 'dialetto'
        ? 'Cerca in dialetto trentino…'
        : 'Cerca in italiano…';
      /* Ricerca al volo se c\'è già testo */
      if (statoRicerca.query) eseguiRicerca();
    });
  });

  /* ── Filtro categoria ── */
  if (filterSel) {
    filterSel.addEventListener('change', () => {
      statoRicerca.categoria = filterSel.value;
      if (statoRicerca.query || statoRicerca.lettera) eseguiRicerca();
    });
  }

  /* ── Input con autocomplete ── */
  input.addEventListener('input', () => {
    statoRicerca.query   = input.value.trim();
    statoRicerca.lettera = null; /* reset lettera alfabeto */
    mostraAutocomplete();
    if (statoRicerca.query.length === 0) svuotaRisultati();
  });

  /* ── Bottone Cerca ── */
  if (searchBtn) {
    searchBtn.addEventListener('click', () => {
      chiudiAutocomplete();
      eseguiRicerca();
    });
  }

  /* ── Cerca premendo Invio ── */
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      chiudiAutocomplete();
      eseguiRicerca();
    }
    if (e.key === 'Escape') chiudiAutocomplete();
  });

  /* ── Chiudi autocomplete cliccando fuori ── */
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.search-box')) chiudiAutocomplete();
  });

  /* ── Autocomplete ── */
  function mostraAutocomplete() {
    if (!dropdown) return;
    const q = statoRicerca.query.toLowerCase();
    if (q.length < 2) { chiudiAutocomplete(); return; }

    const suggerimenti = filtraVoci(q).slice(0, 6);

    if (!suggerimenti.length) { chiudiAutocomplete(); return; }

    dropdown.innerHTML = suggerimenti.map(v => `
      <div class="autocomplete-item" data-id="${v.id}" tabindex="0" role="option">
        <span class="item-word">${evidenziaMatch(v.dialetto, q)}</span>
        <span class="item-translation">${v.italiano}</span>
      </div>
    `).join('');

    dropdown.classList.add('visible');

    /* Click su un suggerimento */
    dropdown.querySelectorAll('.autocomplete-item').forEach(item => {
      item.addEventListener('click', () => {
        const voce = dizionario.find(v => v.id === parseInt(item.dataset.id));
        if (voce) {
          input.value = statoRicerca.direzione === 'dialetto' ? voce.dialetto : voce.italiano;
          chiudiAutocomplete();
          apriModale(voce);
        }
      });
    });
  }

  function chiudiAutocomplete() {
    if (dropdown) dropdown.classList.remove('visible');
  }

  /**
   * Evidenzia la parte che corrisponde alla query
   * @param {string} testo
   * @param {string} query
   */
  function evidenziaMatch(testo, query) {
    const idx = testo.toLowerCase().indexOf(query);
    if (idx === -1) return testo;
    return (
      testo.slice(0, idx) +
      `<strong style="color:var(--clr-forest)">${testo.slice(idx, idx + query.length)}</strong>` +
      testo.slice(idx + query.length)
    );
  }
})();


/* ────────────────────────────────────────────
   2. FILTRO E RENDERING RISULTATI
   ──────────────────────────────────────────── */

/**
 * Filtra le voci del dizionario in base allo stato corrente
 * @param {string} [queryOverride] - se fornita, usa questa query invece dello stato
 * @returns {Array}
 */
function filtraVoci(queryOverride) {
  const q   = (queryOverride !== undefined ? queryOverride : statoRicerca.query).toLowerCase();
  const dir = statoRicerca.direzione;
  const cat = statoRicerca.categoria;
  const let_= statoRicerca.lettera;

  return dizionario.filter(v => {
    /* Filtro per categoria */
    if (cat !== 'tutte' && v.cat !== cat) return false;

    /* Filtro per lettera iniziale */
    if (let_ && !v.dialetto.toLowerCase().startsWith(let_.toLowerCase())) return false;

    /* Filtro per query */
    if (q) {
      const campo = dir === 'dialetto' ? v.dialetto : v.italiano;
      return campo.toLowerCase().includes(q);
    }

    return true;
  });
}

/** Esegue la ricerca e aggiorna la UI */
function eseguiRicerca() {
  const risultati   = filtraVoci();
  const container   = document.getElementById('risultati');
  const resultsList = document.getElementById('results-list');
  const countEl     = document.getElementById('results-count');

  if (!container || !resultsList) return;

  /* Mostra la sezione risultati */
  container.hidden = false;
  container.scrollIntoView({ behavior: 'smooth', block: 'start' });

  /* Aggiorna conteggio */
  if (countEl) {
    countEl.textContent = risultati.length === 1
      ? '1 risultato trovato'
      : `${risultati.length} risultati trovati`;
  }

  if (risultati.length === 0) {
    resultsList.innerHTML = `
      <div style="text-align:center; padding:2rem; color:var(--clr-light-text); font-style:italic;">
        Nessuna parola trovata. Prova con un termine diverso.
      </div>`;
    return;
  }

  /* Renderizza le card risultato */
  resultsList.innerHTML = risultati.map(v => `
    <div class="result-card" data-id="${v.id}" tabindex="0" role="button"
         aria-label="Apri dettaglio di ${v.dialetto}">
      <span class="word-main">${v.dialetto}</span>
      <div class="word-badges">
        <span class="badge ${badgeClass(v.cat)}">${v.cat}</span>
      </div>
      <span class="word-def">${v.italiano} — ${v.def.slice(0, 60)}…</span>
    </div>
  `).join('');

  /* Click su una card */
  resultsList.querySelectorAll('.result-card').forEach(card => {
    const apri = () => {
      const voce = dizionario.find(v => v.id === parseInt(card.dataset.id));
      if (voce) apriModale(voce);
    };
    card.addEventListener('click', apri);
    card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') apri(); });
  });
}

/** Svuota la lista risultati */
function svuotaRisultati() {
  const container = document.getElementById('risultati');
  if (container) container.hidden = true;
}

/** Restituisce la classe CSS del badge in base alla categoria */
function badgeClass(cat) {
  const map = { vb: 'verb', sm: 'noun-m', sf: 'noun-f', avv: 'adv', np: 'prop' };
  return map[cat] || '';
}


/* ────────────────────────────────────────────
   3. NAVIGAZIONE ALFABETICA
   ──────────────────────────────────────────── */
(function initAlfabeto() {
  const alphaBtns = document.querySelectorAll('.alpha-btn');
  if (!alphaBtns.length) return;

  alphaBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const lettera = btn.dataset.letter;

      /* Toggle: ri-cliccare la stessa lettera deseleziona */
      if (statoRicerca.lettera === lettera) {
        statoRicerca.lettera = null;
        btn.classList.remove('active');
        svuotaRisultati();
      } else {
        statoRicerca.lettera = lettera;
        statoRicerca.query   = '';
        const inputEl = document.getElementById('search-input');
        if (inputEl) inputEl.value = '';

        alphaBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        eseguiRicerca();
      }
    });
  });
})();


/* ────────────────────────────────────────────
   4. MODALE DETTAGLIO PAROLA
   ──────────────────────────────────────────── */

/** Apre il modale con i dettagli di una voce */
function apriModale(voce) {
  const overlay = document.getElementById('word-modal-overlay');
  if (!overlay) return;

  /* Costruisce il contenuto */
  overlay.querySelector('.modal-word-title').textContent   = voce.dialetto;
  overlay.querySelector('.modal-word-phonetic').textContent = voce.fonetica || '';
  overlay.querySelector('#modal-categoria').textContent    = `${voce.cat} — ${categorieLabels[voce.cat] || voce.cat}`;
  overlay.querySelector('#modal-italiano').textContent     = voce.italiano;
  overlay.querySelector('#modal-definizione').textContent  = voce.def;

  /* Apri */
  overlay.classList.add('open');
  document.body.style.overflow = 'hidden'; /* blocca scroll di sfondo */

  /* Focus sul pulsante chiudi (accessibilità) */
  overlay.querySelector('.modal-close').focus();
}

/** Chiude il modale */
function chiudiModale() {
  const overlay = document.getElementById('word-modal-overlay');
  if (!overlay) return;
  overlay.classList.remove('open');
  document.body.style.overflow = '';
}

(function initModale() {
  const overlay   = document.getElementById('word-modal-overlay');
  const closeBtn  = document.getElementById('modal-close-btn');

  if (!overlay) return;

  /* Chiudi con il bottone X */
  if (closeBtn) closeBtn.addEventListener('click', chiudiModale);

  /* Chiudi cliccando sull'overlay (fuori dal modale) */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) chiudiModale();
  });

  /* Chiudi con ESC */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('open')) chiudiModale();
  });
})();


/* ────────────────────────────────────────────
   5. PAROLA DEL GIORNO
   Cambia ogni giorno usando la data come seed
   ──────────────────────────────────────────── */
(function initParolaDelGiorno() {
  const wordEl  = document.getElementById('pdg-word');
  const transEl = document.getElementById('pdg-translation');
  const defEl   = document.getElementById('pdg-definition');
  const btnEl   = document.getElementById('pdg-btn');

  if (!wordEl) return;

  /* Seed basato sulla data odierna (cambia ogni giorno) */
  const oggi  = new Date();
  const seed  = oggi.getFullYear() * 10000 + (oggi.getMonth() + 1) * 100 + oggi.getDate();
  const index = seed % dizionario.length;
  const voce  = dizionario[index];

  wordEl.textContent  = voce.dialetto;
  if (transEl) transEl.textContent = voce.italiano;
  if (defEl)   defEl.textContent   = voce.def;

  /* Pulsante "Scopri di più" apre il modale */
  if (btnEl) {
    btnEl.addEventListener('click', () => apriModale(voce));
  }
})();


/* ────────────────────────────────────────────
   6. PAROLE PIÙ CERCATE
   ──────────────────────────────────────────── */
(function initParolePiuCercate() {
  const container = document.getElementById('trending-chips');
  if (!container) return;

  container.innerHTML = parolePiuCercate.map(item => `
    <a href="#" class="trending-chip" data-word="${item.word}" role="button">
      <span class="trend-rank">#${item.rank}</span>
      ${item.word}
    </a>
  `).join('');

  /* Click su un chip avvia la ricerca */
  container.querySelectorAll('.trending-chip').forEach(chip => {
    chip.addEventListener('click', (e) => {
      e.preventDefault();
      const word  = chip.dataset.word;
      const inputEl = document.getElementById('search-input');
      if (inputEl) {
        inputEl.value      = word;
        statoRicerca.query = word;
        statoRicerca.lettera = null;
        eseguiRicerca();
        inputEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });
})();


/* ────────────────────────────────────────────
   7. FORM CONTATTI (home)
   ──────────────────────────────────────────── */
(function initFormContatti() {
  const form = document.getElementById('form-contatti');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    /* In produzione: inviare i dati a un endpoint reale */
    showToast('Messaggio inviato! Ti risponderemo presto.', 'success');
    form.reset();
  });
})();
