# Hairdresser Website -- Technical Specification

## 1. Overview

Sviluppo di un sito web per una parrucchiera realizzato con **React**
utilizzando **Vite** come build tool. L'interfaccia utilizza **Material
UI (MUI)** dove possibile per componenti e layout.

Il sito è **multilingua (Italiano / Inglese)** gestito tramite
**i18next**.

Obiettivo: presentare il salone, i servizi offerti, il team e permettere
ai clienti di contattare facilmente il salone.

------------------------------------------------------------------------

# 2. Tech Stack

### Core

-   React
-   Vite
-   JavaScript / TypeScript (preferibile TypeScript)
-   CSS / Material UI styling

### UI

-   Material UI (MUI)
-   MUI Icons

### Internationalization

-   i18next
-   react-i18next

### Optional utilities

-   react-router-dom

------------------------------------------------------------------------

# 3. Project Structure

    hairdresser-site/
    │
    ├── public/
    │
    ├── src/
    │   ├── assets/
    │   │   ├── images
    │   │   └── icons
    │   │
    │   ├── components/
    │   │   ├── Navbar.jsx
    │   │   ├── Footer.jsx
    │   │   └── LanguageSwitcher.jsx
    │   │
    │   ├── sections/
    │   │   ├── Hero.jsx
    │   │   ├── Services.jsx
    │   │   ├── Gallery.jsx
    │   │   ├── Team.jsx
    │   │   └── Contact.jsx
    │   │
    │   ├── i18n/
    │   │   ├── i18n.js
    │   │   └── locales/
    │   │       ├── it.json
    │   │       └── en.json
    │   │
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── theme.js
    │
    ├── index.html
    ├── package.json
    └── vite.config.js

------------------------------------------------------------------------

# 4. Layout Structure

Il sito è strutturato come **single page** con navigazione tramite
scroll.

Navbar\
Hero / Presentazione\
Servizi\
Galleria\
Team\
Contatti\
Footer

------------------------------------------------------------------------

# 5. Navbar

Component: `Navbar.jsx`

Contenuto: - Logo del salone - Link alle sezioni - Language switcher

Material UI components: - AppBar - Toolbar - Button - IconButton - Menu
(mobile)

------------------------------------------------------------------------

# 6. Section: Presentazione (Hero)

Component: `Hero.jsx`

Contenuto: - Titolo principale - breve descrizione del salone - immagine
hero - call-to-action (Prenota)

Material UI: - Container - Typography - Button - Grid

------------------------------------------------------------------------

# 7. Section: Servizi

Component: `Services.jsx`

Esempi servizi: - Taglio - Piega - Colore - Trattamenti - Acconciature

Material UI: - Card - CardContent - CardMedia - Grid - Typography

------------------------------------------------------------------------

# 8. Section: Galleria

Component: `Gallery.jsx`

Layout a griglia con immagini dei lavori.

Material UI: - ImageList - ImageListItem - Dialog (preview immagine)

------------------------------------------------------------------------

# 9. Section: Team

Component: `Team.jsx`

Contenuto: - Foto staff - Nome - Ruolo - breve bio

Material UI: - Card - Avatar - Typography - Grid

------------------------------------------------------------------------

# 10. Section: Contatti

Component: `Contact.jsx`

Contenuto: - Indirizzo - telefono - email - orari - Google Maps embed

Form opzionale: - Nome - Email - Messaggio

Material UI: - TextField - Button - Grid - Typography

------------------------------------------------------------------------

# 11. Footer

Component: `Footer.jsx`

Contenuto: - copyright - indirizzo - social media - link rapidi

Material UI: - Box - Typography - IconButton

------------------------------------------------------------------------

# 12. Internationalization

Gestione lingue tramite **i18next**.

Lingue: - Italiano (default) - Inglese

Struttura:

    i18n/
       i18n.js
       locales/
           it.json
           en.json

Esempio utilizzo:

``` javascript
const { t } = useTranslation()
<Typography>{t("hero.title")}</Typography>
```

------------------------------------------------------------------------

# 13. Styling

Uso di **Material UI Theme** tramite `theme.js`: - colori brand -
tipografia - spacing

------------------------------------------------------------------------

# 14. Responsiveness

Gestito con: - Grid MUI - breakpoints - useMediaQuery

------------------------------------------------------------------------

# 15. Deployment

Piattaforme consigliate: - Vercel - Netlify - GitHub Pages

Build:

    npm run build

Output:

    dist/
