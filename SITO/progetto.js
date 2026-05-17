/* ============================================================
   e-Trentin — JavaScript per la pagina IL PROGETTO (progetto.js)
   ============================================================ */

/* ────────────────────────────────────────────
   1. FORM "SUGGERISCI UNA PAROLA"
   ──────────────────────────────────────────── */
(function initSuggerisciParola() {
  const form       = document.getElementById('form-suggerisci');
  const successMsg = document.getElementById('form-success');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    /* Raccoglie i dati del form */
    const data = {
      dialetto:   form.querySelector('#sg-dialetto').value.trim(),
      italiano:   form.querySelector('#sg-italiano').value.trim(),
      categoria:  form.querySelector('#sg-categoria').value,
      definizione:form.querySelector('#sg-definizione').value.trim(),
      fonte:      form.querySelector('#sg-fonte').value.trim(),
      nome:       form.querySelector('#sg-nome').value.trim(),
      email:      form.querySelector('#sg-email').value.trim(),
    };

    /* Validazione minima */
    if (!data.dialetto || !data.italiano) {
      showToast('Compila almeno la parola in dialetto e la traduzione in italiano.', 'error');
      return;
    }

    /* In produzione: POST verso un endpoint backend */
    console.log('[Suggerisci] Parola proposta:', data);

    /* Feedback visivo */
    form.style.opacity = '0.4';
    form.style.pointerEvents = 'none';

    if (successMsg) {
      successMsg.classList.add('visible');
      successMsg.textContent = `✓ Grazie! La parola "${data.dialetto}" è stata ricevuta e sarà valutata dai curatori.`;
    }

    showToast(`Grazie per il tuo contributo!`, 'success', 4000);
  });
})();


/* ────────────────────────────────────────────
   2. ACCORDION PER LE ABBREVIAZIONI
   Permette di mostrare/nascondere le righe
   filtrate della tabella
   ──────────────────────────────────────────── */
(function initAbbrFiltro() {
  const filterInput = document.getElementById('abbr-filter');
  const tbody       = document.querySelector('#abbr-table tbody');

  if (!filterInput || !tbody) return;

  filterInput.addEventListener('input', () => {
    const q = filterInput.value.trim().toLowerCase();
    tbody.querySelectorAll('tr').forEach(row => {
      /* Cerca sia nella colonna sigla che nella descrizione */
      const text = row.textContent.toLowerCase();
      row.style.display = text.includes(q) ? '' : 'none';
    });
  });
})();


/* ────────────────────────────────────────────
   3. LINK ADMIN — protezione basilare
   In produzione usare un vero sistema di auth
   ──────────────────────────────────────────── */
(function initAdminLink() {
  const adminLink = document.getElementById('admin-link');
  if (!adminLink) return;

  adminLink.addEventListener('click', (e) => {
    e.preventDefault();
    /* Chiede una password di accesso (demo) */
    const pwd = prompt('Inserisci la password amministratore:');
    if (pwd === 'admin2024') {
      /* In produzione: redirect sicuro verso pannello admin */
      window.location.href = 'admin/index.html';
    } else if (pwd !== null) {
      showToast('Password errata.', 'error');
    }
  });
})();
