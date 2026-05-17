<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="e-Trentin — Dizionario del dialetto di Trento online. Cerca parole in dialetto trentino o in italiano." />
  <title>e-Trentin | Dizionario del dialetto di Trento</title>

  <!-- Favicon (puoi sostituire con un file .ico reale) -->
  <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🏔</text></svg>" />

  <!-- CSS: foglio principale + home -->
  <link rel="stylesheet" href="style.css" />
  <link rel="stylesheet" href="home.css" />
</head>
<body>

  <!-- ══════════════════════════════════════════
       NAVBAR
       ══════════════════════════════════════════ -->
  <nav id="navbar" role="navigation" aria-label="Navigazione principale">
    <div class="container nav-inner">

      <!-- Logo testuale -->
      <a href="index.html" class="nav-logo" aria-label="e-Trentin — torna alla home">
        <span class="logo-title">e -Trentin</span>
        <span class="logo-sub">Dizionario del dialetto</span>
      </a>

      <!-- Hamburger (mobile) -->
      <button id="nav-toggle" class="nav-toggle" aria-label="Apri menu" aria-expanded="false" aria-controls="nav-links">
        <span></span>
        <span></span>
        <span></span>
      </button>

      <!-- Voci di menu -->
      <ul id="nav-links" class="nav-links" role="menubar">
        <li role="none"><a href="index.html"    role="menuitem" class="active">Home</a></li>
        <li role="none"><a href="progetto.html" role="menuitem">Il Progetto</a></li>
        <li role="none"><a href="chi-siamo.html" role="menuitem">Chi Siamo</a></li>
      </ul>
    </div>
  </nav>


  <!-- ══════════════════════════════════════════
       HEADER HERO
       ══════════════════════════════════════════ -->
  <header id="site-header" role="banner">
    <div class="container header-content">
      <p class="header-pretitle animate-fade-up delay-1">Provincia Autonoma di Trento</p>
      <h1 class="site-title animate-fade-up delay-2">
        <em>e</em> - Trentin
      </h1>
      <p class="site-subtitle animate-fade-up delay-3">
        Dizionario del dialetto di Trento on line
      </p>
    </div>
  </header>


  <!-- ══════════════════════════════════════════
       SEZIONE RICERCA
       ══════════════════════════════════════════ -->
  <main id="main-content">
    <section id="cerca" aria-labelledby="cerca-title">
      <div class="container">

        <div class="search-wrapper">
          <p class="search-intro" id="cerca-title">Cerca nel dizionario</p>

          <!-- Toggle direzione: dialetto ↔ italiano -->
          <div class="search-direction" role="group" aria-label="Direzione di ricerca">
            <button class="dir-btn active" data-dir="dialetto" aria-pressed="true">
              Dialetto
            </button>
            <span class="dir-arrow" aria-hidden="true">⇄</span>
            <button class="dir-btn" data-dir="italiano" aria-pressed="false">
              Italiano
            </button>
          </div>

          <!-- Barra di ricerca con autocomplete -->
          <div class="search-box" role="search">
            <label for="search-input" class="visually-hidden">Inserisci il termine da cercare</label>
            <input
              type="search"
              id="search-input"
              class="search-input"
              placeholder="Cerca in dialetto trentino…"
              autocomplete="off"
              autocorrect="off"
              spellcheck="false"
              aria-autocomplete="list"
              aria-controls="autocomplete-dropdown"
            />
            <button id="search-btn" class="search-btn" aria-label="Avvia ricerca">
              Cerca
            </button>
            <!-- Dropdown autocomplete -->
            <div
              id="autocomplete-dropdown"
              class="autocomplete-dropdown"
              role="listbox"
              aria-label="Suggerimenti"
            ></div>
          </div>

          <!-- Filtro per categoria grammaticale -->
          <div class="filter-row">
            <span class="filter-label" id="filter-label">Filtra per:</span>
            <label for="filter-categoria" class="visually-hidden">Categoria grammaticale</label>
            <select id="filter-categoria" class="filter-select" aria-labelledby="filter-label">
              <option value="tutte">Tutte le categorie</option>
              <option value="sm">sm — Sostantivo maschile</option>
              <option value="sf">sf — Sostantivo femminile</option>
              <option value="np">np — Nome proprio</option>
              <option value="vb">vb — Verbo</option>
              <option value="avv">avv — Avverbio</option>
            </select>
          </div>
        </div><!-- /.search-wrapper -->

      </div><!-- /.container -->
    </section><!-- /#cerca -->


    <!-- ══════════════════════════════════════════
         NAVIGAZIONE ALFABETICA
         ══════════════════════════════════════════ -->
    <section id="alfabeto" aria-label="Sfoglia per lettera">
      <div class="container">
        <nav class="alphabet-nav" role="navigation" aria-label="Alfabeto">
          <!-- Le lettere vengono generate per comodità,
               ma potresti anche scriverle a mano -->
          <script>
            (function() {
              const lettere = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
              lettere.forEach(l => {
                document.write(
                  `<button class="alpha-btn" data-letter="${l}" aria-label="Parole che iniziano con ${l}">${l}</button>`
                );
              });
            })();
          </script>
        </nav>
      </div>
    </section>

    <?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "etrentin";

try {
    // Creazione della connessione
    $HOST =   
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    // Impostazione dell'errore PDO su eccezione
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $stm = $conn->prepare("SELECT * FROM voci_dizionario WHERE id < 10;");
    $stm->execute();
    $result = $stm->fetchAll(PDO::FETCH_ASSOC);
    foreach ($result as $row) {
    echo "<table border=2><tr><td>" . $row['voce'] . "</td></tr></table>";

}

    echo "Connessione riuscita";
} catch(PDOException $e) {
    echo "Connessione fallita: " . $e->getMessage();
}
// Chiusura connessione
$conn = null;

?>



    <!-- ══════════════════════════════════════════
         RISULTATI RICERCA (nascosta all'inizio)
         ══════════════════════════════════════════ -->
    <section id="risultati" aria-live="polite" aria-label="Risultati della ricerca" hidden>
      <div class="container">
        <div class="results-header">
          <h2 class="section-title">Risultati</h2>
          <span id="results-count" class="results-count" aria-atomic="true"></span>
        </div>
        <div id="results-list" class="results-list" role="list"></div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         PAROLA DEL GIORNO
         ══════════════════════════════════════════ -->
    <section id="parola-giorno" aria-labelledby="pdg-heading">
      <div class="container parola-giorno-inner">
        <p class="pdg-label">La parola del giorno</p>
        <h2 class="pdg-word" id="pdg-word" aria-atomic="true">—</h2>
        <p class="pdg-translation" id="pdg-translation"></p>
        <p style="font-size:.88rem; color:rgba(245,240,232,.6); margin-bottom:1.2rem;" id="pdg-definition"></p>
        <button id="pdg-btn" class="btn btn-accent">
          Scopri di più →
        </button>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         I NUMERI DEL DIZIONARIO
         ══════════════════════════════════════════ -->
    <section id="numeri" aria-labelledby="numeri-title">
      <div class="container">
        <h2 class="section-title centered" id="numeri-title">I numeri del dizionario</h2>
        <p style="text-align:center; color:var(--clr-light-text); font-style:italic; margin-bottom:2rem; font-size:.9rem;">
          Aggiornato continuamente grazie al contributo della comunità
        </p>
        <div class="stats-grid">
          <!-- data-count: valore finale animato da JS -->
          <div class="stat-item card">
            <span class="stat-number" id="count-lemmi" data-count="3240">0</span>
            <span class="stat-label">Lemmi totali</span>
          </div>
          <div class="stat-item card">
            <span class="stat-number" id="count-nomi" data-count="1850">0</span>
            <span class="stat-label">Nomi</span>
          </div>
          <div class="stat-item card">
            <span class="stat-number" id="count-verbi" data-count="720">0</span>
            <span class="stat-label">Verbi</span>
          </div>
          <div class="stat-item card">
            <span class="stat-number" id="count-avv" data-count="310">0</span>
            <span class="stat-label">Avverbi</span>
          </div>
          <div class="stat-item card">
            <span class="stat-number" id="count-np" data-count="160">0</span>
            <span class="stat-label">Nomi propri</span>
          </div>
          <div class="stat-item card">
            <span class="stat-number" id="count-audio" data-count="980">0</span>
            <span class="stat-label">Voci audio</span>
          </div>
        </div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         PAROLE PIÙ CERCATE
         ══════════════════════════════════════════ -->
    <section id="piu-cercate" aria-labelledby="trending-title">
      <div class="container">
        <h2 class="section-title" id="trending-title">Le parole più cercate</h2>
        <div id="trending-chips" class="trending-grid" role="list" aria-label="Parole più cercate"></div>
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         LINK E CONTATTI
         ══════════════════════════════════════════ -->
    <section id="link-contatti" aria-labelledby="link-title">
      <div class="container">
        <h2 class="section-title" id="link-title">Link utili &amp; Contatti</h2>

        <div class="link-contatti-grid">

          <!-- Link esterni -->
          <div>
            <h3 class="section-title" style="font-size:1.1rem; margin-bottom:1rem;">Link</h3>
            <ul class="external-links-list" aria-label="Link esterni">
              <li><a href="https://www.trentinocultura.net" target="_blank" rel="noopener">Trentino Cultura</a></li>
              <li><a href="https://www.museostorico.it" target="_blank" rel="noopener">Museo Storico del Trentino</a></li>
              <li><a href="https://www.archivioprovinciale.provincia.tn.it" target="_blank" rel="noopener">Archivio Provinciale</a></li>
              <li><a href="https://www.biblioteche.provincia.tn.it" target="_blank" rel="noopener">Biblioteche del Trentino</a></li>
              <!-- Aggiungere altri link secondo l'allegato -->
            </ul>
          </div>

          <!-- Form contatti -->
          <div>
            <h3 class="section-title" style="font-size:1.1rem; margin-bottom:1rem;">Contatti</h3>
            <form id="form-contatti" class="contact-form" novalidate>
              <div class="form-field">
                <label for="contact-nome">Nome</label>
                <input type="text" id="contact-nome" name="nome" placeholder="Il tuo nome" />
              </div>
              <div class="form-field">
                <label for="contact-email">Email</label>
                <input type="email" id="contact-email" name="email" placeholder="la@tua.email" required />
              </div>
              <div class="form-field">
                <label for="contact-msg">Messaggio</label>
                <textarea id="contact-msg" name="messaggio" rows="4" placeholder="Scrivi qui…" required></textarea>
              </div>
              <button type="submit" class="btn btn-primary" style="margin-top:.5rem;">
                Invia messaggio
              </button>
            </form>
          </div>

        </div><!-- /.link-contatti-grid -->
      </div>
    </section>


    <!-- ══════════════════════════════════════════
         LOGHI
         ══════════════════════════════════════════ -->
    <section id="loghi" aria-label="Partner e sostenitori">
      <div class="container">
        <h2 class="visually-hidden">Partner e sostenitori</h2>
        <div class="loghi-row">
          <!-- Sostituire i placeholder con i tag <img> reali -->
          <div class="logo-placeholder" role="img" aria-label="Logo partner 1">Logo 1</div>
          <div class="logo-placeholder" role="img" aria-label="Logo partner 2">Logo 2</div>
          <div class="logo-placeholder" role="img" aria-label="Logo partner 3">Logo 3</div>
          <div class="logo-placeholder" role="img" aria-label="Logo partner 4">Logo 4</div>
        </div>
      </div>
    </section>

  </main><!-- /#main-content -->


  <!-- ══════════════════════════════════════════
       MODALE DETTAGLIO PAROLA
       (nascosto; aperto da JS)
       ══════════════════════════════════════════ -->
  <div
    id="word-modal-overlay"
    class="word-modal-overlay"
    role="dialog"
    aria-modal="true"
    aria-labelledby="modal-word-title"
  >
    <div class="word-modal">
      <button id="modal-close-btn" class="modal-close" aria-label="Chiudi dettaglio">✕</button>

      <!-- Intestazione -->
      <h2 class="modal-word-title" id="modal-word-title">—</h2>
      <p class="modal-word-phonetic"></p>

      <!-- Categoria -->
      <div class="modal-section">
        <h3>Categoria grammaticale</h3>
        <p><span class="badge" id="modal-categoria"></span></p>
      </div>

      <!-- Traduzione -->
      <div class="modal-section">
        <h3>Traduzione italiana</h3>
        <p id="modal-italiano" style="font-weight:500; color:var(--clr-dark);"></p>
      </div>

      <!-- Definizione -->
      <div class="modal-section">
        <h3>Definizione / Nota d'uso</h3>
        <p id="modal-definizione"></p>
      </div>

      <!-- Audio (placeholder) -->
      <div class="modal-section">
        <h3>Pronuncia audio</h3>
        <button class="audio-btn" aria-label="Ascolta la pronuncia">
          🔊 Ascolta la pronuncia
        </button>
        <p style="font-size:.78rem; color:var(--clr-light-text); margin-top:.4rem; font-style:italic;">
          Lettura a cura di: Paola Bortolameotti, Alberto Cosa, Giordano Dainese
        </p>
      </div>

    </div>
  </div>


  <!-- ══════════════════════════════════════════
       FOOTER
       ══════════════════════════════════════════ -->
  <footer id="site-footer" role="contentinfo">
    <div class="container">
      <div class="footer-grid">

        <!-- Brand -->
        <div class="footer-brand">
          <p class="logo-title"><em>e</em>-Trentin</p>
        </div>

        <!-- Navigazione -->
        <div class="footer-col">
          <h4>Navigazione</h4>
          <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="progetto.html">Il Progetto</a></li>
            <li><a href="chi-siamo.html">Chi Siamo</a></li>
          </ul>
        </div>

        <!-- Progetto -->
        <div class="footer-col">
          <h4>Il progetto</h4>
          <ul>
            <li><a href="progetto.html#presentazione">Presentazione</a></li>
            <li><a href="progetto.html#fonti">Fonti</a></li>
            <li><a href="progetto.html#abbreviazioni">Abbreviazioni</a></li>
            <li><a href="progetto.html#suggerisci-parola">Suggerisci una parola</a></li>
          </ul>
        </div>

        <!-- Supporto -->
        <div class="footer-col">
          <h4>Con il supporto di</h4>
          <div class="footer-logos">
            <img src="Foto/logo3.png" alt="Logo 3" class="footer-logo">
            <img src="Foto/logoBilingualism.png" alt="Logo Bilingualism" class="footer-logo">
            <img src="Foto/logoBuonarroti.png" alt="Logo Buonarroti" class="footer-logo">
          </div>
        </div>

      </div>

      <div class="footer-bottom">
        <span>© <script>document.write(new Date().getFullYear())</script> e-Trentin — Ideazione: Alfredo Gonella</span>
        <span>Consulenza linguistica: Patrizia Cordin</span>
      </div>
    </div>
  </footer>


  <!-- ══════════════════════════════════════════
       SCRIPT
       Caricati in fondo per performance
       ══════════════════════════════════════════ -->
  <script src="main.js"></script>
  <script src="home.js"></script>

</body>
</html>





