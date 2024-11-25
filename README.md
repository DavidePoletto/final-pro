<div align="center">
  <img src="https://github.com/DavidePoletto/final-pro/blob/main/src/assets/IMG/icons/GAmeverse1.webp?raw=true" alt="GameVerse Logo" width="300">
</div>

**GameVerse** è una piattaforma completa per gli appassionati di videogiochi, che offre un vasto catalogo di giochi, notizie aggiornate sul mondo gaming, un sistema di registrazione/login per la gestione degli account utente e la possibilità di salvare ordini nel carrello.

---

## Demo Online

<div align="center">
  <img src="https://github.com/DavidePoletto/final-pro/blob/main/src/assets/IMG/backgrounds/Screenshot%202024-11-25%20022341.png?raw=true" alt="GameVerse Screenshot" width="800">
</div>
<div align="center">
Visita la demo del progetto all'indirizzo: [GameVerse](https://gameversee.netlify.app/)
</div>

---

## Caratteristiche

- **Catalogo Giochi**: Sfoglia giochi divisi in categorie come "Tendenze", "Novità", "Multiplayer", "Giochi Nintendo" e altro.
- **Ricerca Avanzata**: Filtra e trova rapidamente i tuoi giochi preferiti.
- **Dettagli Gioco**: Pagina dedicata con descrizioni, valutazioni Metacritic, screenshot e piattaforme supportate.
- **Notizie**: Rimani aggiornato con una sezione dedicata al mondo del gaming.
- **Carrello**: Aggiungi giochi al carrello per salvarli e consultarli in seguito.
- **Registrazione/Login**: Sistema di autenticazione per la gestione degli account utente.
- **Ordini Salvati**: Salva gli ordini effettuati nel carrello, pronti per essere consultati o completati.
- **Responsività**: Design ottimizzato per desktop e dispositivi mobili.
- **Swiper**: Showcase dinamico di giochi consigliati nella home page.

---

## Tecnologie Utilizzate

### Frontend
- **Vue.js** (Composition API, Vuex, Vue Router)
- **Swiper.js** (per slider dinamici)
- **CSS3** (per uno stile personalizzato e responsivo)

### Backend
- **Node.js** (Express)
- **Axios** (per chiamate API)
- **RAWG API** (per il catalogo dei giochi)
- **Newsdata.io API** (per le notizie)
- **SQL** (per la gestione degli account e degli ordini)

### Hosting
- **Netlify** (per il frontend)
- **Render** (per il backend)

---

## Installazione

### Requisiti
- **Node.js** (v16 o superiore)
- **NPM** o **Yarn**

### Istruzioni
1. Clona il repository:
   ```bash
   git clone https://github.com/DavidePoletto/final-pro.git
   
2. Installa le dipendenze:
   ```bash
   cd final-pro
   npm install

3. Avvia il server di sviluppo:
   ```bash
   npm run dev

4. Configura le variabili d'ambiente per il backend:
   Crea un file .env nella directory del server con le seguenti variabili:
   ```bash
   RAWG_API_KEY=tuo_api_key
   NEWSDATA_API_KEY=tuo_api_key
   DATABASE_URL=tuo_database_url

5. Avvia il backend:
   ```bash
   cd server
   node server.js

6. Accedi al sito:
   ```bash
   Frontend: http://localhost:3000
   Backend: http://localhost:5000

### Licenza
Questo progetto è rilasciato sotto la licenza MIT. Consulta il file LICENSE per ulteriori dettagli.





