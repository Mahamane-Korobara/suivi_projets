# 📊 Productivity-Pro

Une **plateforme moderne de gestion de productivité personnelle** construite avec Next.js 16, React 19 et Tailwind CSS. Suivez vos projets, gérez vos tâches et visualisez votre productivité en temps réel.

![Status](https://img.shields.io/badge/status-active-brightgreen)
![Version](https://img.shields.io/badge/version-0.1.0-blue)

## 🎯 Caractéristiques principales

### 📈 Dashboard Intelligent

- **Statistiques en temps réel** : Taux de complétion des tâches, santé des projets, progression hebdomadaire
- **Cartes de progression circulaires** : Visualisez vos objectifs en un coup d'œil
- **Graphiques de productivité** : Tendances semaine avec recharts
- **Carte de focus** : Concentrez-vous sur la tâche suivante

### 📁 Gestion complète des projets

- Créer, modifier et supprimer des projets
- Assigner des **couleurs personnalisées** (6 couleurs disponibles)
- Choisir parmi **12 icônes** différentes
- Définir les **priorités** (basse, moyenne, haute, urgente)
- Gérer les **statuts** (ACTIF, URGENT, TERMINÉ)
- Suivi de la progression avec barres de progression

### ✅ Gestion des tâches

- Ajouter des tâches à chaque projet
- Marquer les tâches comme complétées
- Définir le temps estimé pour chaque tâche
- Calcul automatique de la progression du projet
- Historique des tâches complétées

### 📅 Calendrier interactif

- Vue calendrier avec FullCalendar
- Visualiser vos tâches et événements
- Navigation intuitive jour/semaine/mois

### 👥 Page Équipe

- Interface dédiée à la gestion d'équipe
- Extensible pour les futures fonctionnalités

### 🎨 Interface utilisateur

- **Design moderne et épuré** avec thème sombre
- **Animations fluides** avec Framer Motion
- **Responsive design** : Fonctionne sur desktop, tablet et mobile
- **Icônes vectorielles** avec Lucide React

## 🚀 Démarrage rapide

### Prérequis

- Node.js 18.0 ou supérieur
- npm ou yarn

### Installation

```bash
# Cloner le repository
git clone <repository-url>
cd productivity-pro

# Installer les dépendances
npm install

# Lancer le serveur de développement
npm run dev
```

L'application sera accessible sur [http://localhost:3000](http://localhost:3000)

## 📦 Stack technologique

### Frontend

| Technologie          | Version | Utilité                      |
| -------------------- | ------- | ---------------------------- |
| **Next.js**          | 16.1.2  | Framework React avec SSR/SSG |
| **React**            | 19.2.3  | Bibliothèque UI              |
| **React DOM**        | 19.2.3  | Rendu DOM React              |
| **Tailwind CSS**     | 4.0     | Framework CSS utilitaire     |
| **Tailwind PostCSS** | 4.0     | Plugin PostCSS               |

### Visualisations & Animations

| Technologie              | Version | Utilité                    |
| ------------------------ | ------- | -------------------------- |
| **Recharts**             | 3.6.0   | Graphiques et charts       |
| **FullCalendar React**   | 6.1.20  | Calendrier interactif      |
| **FullCalendar DayGrid** | 6.1.20  | Vue du calendrier par jour |
| **Framer Motion**        | 12.26.2 | Animations fluides         |
| **Lucide React**         | 0.562.0 | Bibliothèque d'icônes      |

### Utilitaires

| Technologie  | Version | Utilité                 |
| ------------ | ------- | ----------------------- |
| **date-fns** | 4.1.0   | Manipulation des dates  |
| **uuid**     | 13.0.0  | Génération d'ID uniques |

### Développement

| Technologie            | Version | Utilité                           |
| ---------------------- | ------- | --------------------------------- |
| **ESLint**             | 9.0     | Linting du code                   |
| **ESLint Config Next** | 16.1.2  | Configuration ESLint pour Next.js |

## 📁 Structure du projet

```
productivity-pro/
├── src/
│   ├── app/
│   │   ├── layout.js              # Layout principal
│   │   ├── page.js                # Dashboard (accueil)
│   │   ├── globals.css            # Styles globaux
│   │   ├── calendar/
│   │   │   └── page.jsx           # Page calendrier
│   │   ├── projects/
│   │   │   └── page.jsx           # Page gestion des projets
│   │   └── team/
│   │       └── page.jsx           # Page équipe
│   │
│   ├── components/
│   │   ├── dashboard/             # Composants du dashboard
│   │   │   ├── CircularProgress.jsx
│   │   │   ├── FocusCard.jsx
│   │   │   └── ProductivityChart.jsx
│   │   │
│   │   ├── layout/                # Composants de mise en page
│   │   │   ├── Header.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── Layout.jsx
│   │   │   └── CreateProjectModal.jsx
│   │   │
│   │   ├── projects/              # Composants projets
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectModal.jsx
│   │   │
│   │   ├── calendar/              # Composants calendrier
│   │   │   └── CalendarView.jsx
│   │   │
│   │   └── ui/                    # Composants UI réutilisables
│   │       ├── Button.jsx
│   │       ├── Input.jsx
│   │       ├── Dropdown.jsx
│   │       └── ProgressBar.jsx
│   │
│   ├── hooks/                     # Hooks personnalisés
│   │   ├── useProjects.js         # Gestion des projets
│   │   └── useLocalStorage.js     # Persistance localStorage
│   │
│   └── lib/                       # Fonctions utilitaires
│       ├── constants.js           # Couleurs, icônes, priorités
│       ├── dateUtils.js           # Utilitaires de dates
│       └── localStorage.js        # Gestion du stockage local
│
├── public/                        # Fichiers statiques
├── next.config.mjs                # Configuration Next.js
├── tailwind.config.js             # Configuration Tailwind CSS
├── postcss.config.mjs             # Configuration PostCSS
├── jsconfig.json                  # Configuration JavaScript
├── package.json                   # Dépendances et scripts
└── README.md                      # Documentation

```

## 🎮 Utilisation

### Page d'accueil (Dashboard)

1. Consultez vos **statistiques globales** en temps réel
2. Visualisez votre **progression hebdomadaire** via graphiques
3. Identifiez votre **tâche prioritaire** dans la carte de focus
4. Accédez rapidement aux différentes sections via la sidebar

### Gestion des projets

```javascript
// Créer un nouveau projet
const { createProject } = useProjects();
createProject({
  name: 'Mon Projet',
  description: 'Description du projet',
  color: 'blue',
  icon: 'rocket',
  priority: 'haute',
});

// Obtenir tous les projets
const { projects } = useProjects();

// Récupérer les projets actifs
const { activeProjects } = useProjects();
```

### Ajout de tâches

1. Créez un projet
2. Cliquez sur le projet pour ouvrir les détails
3. Ajoutez des tâches avec un temps estimé
4. Marquez les tâches comme complétées

### Visualisation du calendrier

1. Accédez à la page **Calendrier**
2. Navigez entre les mois/semaines/jours
3. Cliquez sur une date pour voir les tâches

## 🔧 Scripts npm

```bash
# Démarrer le serveur de développement
npm run dev

# Compiler pour la production
npm run build

# Lancer le serveur production
npm start

# Vérifier la qualité du code avec ESLint
npm run lint
```

## 💾 Persistance des données

Toutes les données sont stockées **localement dans le navigateur** avec `localStorage` :

```javascript
// Les données sont automatiquement persistées
- Projets
- Tâches
- Progression
- Dates de modification
```

## 🎨 Personnalisation

### Couleurs disponibles

- 🔵 Bleu
- 💗 Rose
- 💚 Vert
- 💛 Jaune
- 💜 Violet
- 🟠 Orange

Modifier dans [src/lib/constants.js](src/lib/constants.js)

### Icônes disponibles

- Palette, Mégaphone, Code, Bouclier
- Document, Fusée, Utilisateurs, Paramètres
- Calendrier, Dashboard, Dossier, Check

Étendre la liste dans [src/lib/constants.js](src/lib/constants.js)

## 🚧 Statuts des projets

| Statut         | Description      | Couleur |
| -------------- | ---------------- | ------- |
| **ACTIF**      | Projet en cours  | Bleu    |
| **URGENT**     | Urgent à traiter | Rouge   |
| **TERMINÉ**    | Projet complété  | Gris    |
| **EN ATTENTE** | Projet suspendu  | Jaune   |

## 📊 Évolutions futures

- [ ] Authentification utilisateur
- [ ] Sync multi-appareils (cloud)
- [ ] Collaboration en équipe
- [ ] Notifications push
- [ ] Export PDF des rapports
- [ ] Intégration Slack/Teams
- [ ] Mode darkmode/lightmode
- [ ] Graphiques avancés
- [ ] Gestion du temps (Pomodoro)
- [ ] API REST complète

## 🤝 Contribution

Les contributions sont bienvenues ! Pour contribuer :

1. Fork le repository
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Committez vos changements (`git commit -m 'Add AmazingFeature'`)
4. Pushez la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 👨‍💻 Auteur

**Mahamane** - Développeur passionné par la productivité et les technologies modernes. Toujours à la recherche de nouvelles façons d'améliorer l'efficacité personnelle.

## 📚 Ressources

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation React](https://react.dev)
- [Documentation Tailwind CSS](https://tailwindcss.com/docs)
- [Documentation Recharts](https://recharts.org)
- [Documentation FullCalendar](https://fullcalendar.io/docs)

---

**Version** : 0.1.0 | **Dernière mise à jour** : Mars 2026

---

## 👤 Auteur

Développé par **Mahamane Korobara**, développeur full-stack.

- 🌐 Portfolio & blog technique : **[sahelstack.tech](https://www.sahelstack.tech)**
- 💼 GitHub : [@Mahamane-Korobara](https://github.com/Mahamane-Korobara)
