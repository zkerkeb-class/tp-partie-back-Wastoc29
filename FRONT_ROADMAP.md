# 🎨 FICHE TECHNIQUE - DÉVELOPPEMENT FRONT-END POKEMON

## 📋 Cahier des Charges

### Fonctionnalités Requises

1. **Liste des Pokémons avec Pagination**
   - Afficher 20 Pokémons par page
   - Boutons de navigation (Précédent/Suivant)
   - Indicateur de page actuelle
   - Design en grille/cartes

2. **Recherche de Pokémon**
   - Barre de recherche par nom
   - Résultats en temps réel
   - Gestion des erreurs (non trouvé)

3. **Page Détails d'un Pokémon**
   - Clic sur carte → navigation vers page détails
   - Affichage complet des informations
   - Image du Pokémon
   - Statistiques (HP, Attack, Defense, etc.)

4. **Modification d'un Pokémon**
   - Formulaire d'édition sur page détails
   - Validation des champs
   - Feedback visuel (succès/erreur)

5. **Suppression d'un Pokémon**
   - Bouton de suppression sur page détails
   - Modale de confirmation
   - Redirection après suppression

6. **Création d'un Nouveau Pokémon**
   - Formulaire de création
   - Validation des données
   - Upload d'image (optionnel)
   - Retour à la liste après création

7. **Fonctionnalité Bonus** (au choix)
   - Système de favoris
   - Filtrage par type
   - Mode sombre
   - Comparateur de Pokémons
   - Statistiques globales

---

## 🛠️ Stack Technique Recommandée

### Option 1 : React + Vite
```bash
npm create vite@latest pokemon-front -- --template react
cd pokemon-front
npm install
npm install axios react-router-dom
```

### Option 2 : Next.js
```bash
npx create-next-app@latest pokemon-front
cd pokemon-front
npm install axios
```

### Option 3 : Vue.js
```bash
npm create vue@latest pokemon-front
cd pokemon-front
npm install axios vue-router
```

---

## 📁 Structure du Projet (React)

```
pokemon-front/
├── src/
│   ├── components/
│   │   ├── PokemonCard.jsx         # Carte individuelle
│   │   ├── PokemonList.jsx         # Liste avec pagination
│   │   ├── PokemonDetails.jsx      # Page détails
│   │   ├── PokemonForm.jsx         # Formulaire création/édition
│   │   ├── SearchBar.jsx           # Barre de recherche
│   │   ├── Pagination.jsx          # Composant pagination
│   │   ├── Modal.jsx               # Modale de confirmation
│   │   └── Navbar.jsx              # Navigation
│   ├── services/
│   │   └── api.js                  # Service API (axios)
│   ├── pages/
│   │   ├── Home.jsx                # Page d'accueil (liste)
│   │   ├── Details.jsx             # Page détails
│   │   ├── Create.jsx              # Page création
│   │   └── NotFound.jsx            # Page 404
│   ├── hooks/
│   │   ├── usePokemon.js           # Hook custom
│   │   └── usePagination.js        # Hook pagination
│   ├── utils/
│   │   ├── constants.js            # Constantes
│   │   └── helpers.js              # Fonctions utilitaires
│   ├── styles/
│   │   └── App.css                 # Styles globaux
│   ├── App.jsx                     # Composant principal
│   └── main.jsx                    # Point d'entrée
└── package.json
```

---

## 🔌 Service API (api.js)

```javascript
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/api';

export const pokemonAPI = {
  // GET tous les pokemons avec pagination
  getAllPokemons: async (page = 1) => {
    const response = await axios.get(`${API_BASE_URL}/pokemons?page=${page}`);
    return response.data;
  },

  // GET un pokemon par ID
  getPokemonById: async (id) => {
    const response = await axios.get(`${API_BASE_URL}/pokemons/${id}`);
    return response.data;
  },

  // GET recherche par nom
  searchPokemon: async (name) => {
    const response = await axios.get(`${API_BASE_URL}/pokemons/search?name=${name}`);
    return response.data;
  },

  // POST créer un pokemon
  createPokemon: async (pokemonData) => {
    const response = await axios.post(`${API_BASE_URL}/pokemons`, pokemonData);
    return response.data;
  },

  // PUT mettre à jour un pokemon
  updatePokemon: async (id, pokemonData) => {
    const response = await axios.put(`${API_BASE_URL}/pokemons/${id}`, pokemonData);
    return response.data;
  },

  // PATCH modification partielle
  patchPokemon: async (id, partialData) => {
    const response = await axios.patch(`${API_BASE_URL}/pokemons/${id}`, partialData);
    return response.data;
  },

  // DELETE supprimer un pokemon
  deletePokemon: async (id) => {
    const response = await axios.delete(`${API_BASE_URL}/pokemons/${id}`);
    return response.data;
  }
};
```

---

## 📝 Exemple de Composants

### PokemonCard.jsx
```jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const PokemonCard = ({ pokemon }) => {
  const navigate = useNavigate();

  return (
    <div
      className="pokemon-card"
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
    >
      <img src={pokemon.image} alt={pokemon.name.french} />
      <h3>#{pokemon.id} - {pokemon.name.french}</h3>
      <div className="types">
        {pokemon.type.map(type => (
          <span key={type} className={`type ${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>
      <div className="stats">
        <p>HP: {pokemon.base.HP}</p>
        <p>Attack: {pokemon.base.Attack}</p>
      </div>
    </div>
  );
};

export default PokemonCard;
```

### Pagination.jsx
```jsx
const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Précédent
      </button>

      <span>Page {currentPage} sur {totalPages}</span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        Suivant
      </button>
    </div>
  );
};
```

### Modal.jsx (Confirmation de suppression)
```jsx
const Modal = ({ isOpen, onClose, onConfirm, title, message }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>{title}</h2>
        <p>{message}</p>
        <div className="modal-actions">
          <button onClick={onClose} className="btn-cancel">
            Annuler
          </button>
          <button onClick={onConfirm} className="btn-confirm">
            Confirmer
          </button>
        </div>
      </div>
    </div>
  );
};
```

---

## 🎨 Styles CSS (Exemples)

### Palette de Couleurs Pokémon
```css
:root {
  --primary: #EE1515;
  --secondary: #3B4CCA;
  --grass: #7AC74C;
  --fire: #EE8130;
  --water: #6390F0;
  --electric: #F7D02C;
  --psychic: #F95587;
  --dark: #705746;
  --normal: #A8A77A;
}
```

### Carte Pokemon
```css
.pokemon-card {
  border: 2px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
  background: white;
}

.pokemon-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 16px rgba(0,0,0,0.2);
}

.pokemon-card img {
  width: 150px;
  height: 150px;
  object-fit: contain;
}
```

---

## ✅ Checklist de Développement

### Phase 1 : Setup
- [ ] Créer le projet front-end
- [ ] Installer les dépendances (axios, react-router-dom)
- [ ] Configurer le service API
- [ ] Configurer le routing

### Phase 2 : Liste & Pagination
- [ ] Créer PokemonCard component
- [ ] Créer PokemonList component
- [ ] Implémenter la pagination
- [ ] Gérer les états de chargement
- [ ] Gérer les erreurs

### Phase 3 : Recherche
- [ ] Créer SearchBar component
- [ ] Implémenter la recherche
- [ ] Afficher les résultats
- [ ] Gérer les cas "non trouvé"

### Phase 4 : Page Détails
- [ ] Créer PokemonDetails component
- [ ] Récupérer les données depuis l'API
- [ ] Afficher toutes les informations
- [ ] Ajouter navigation retour

### Phase 5 : Modification
- [ ] Créer formulaire d'édition
- [ ] Pré-remplir avec données existantes
- [ ] Validation des champs
- [ ] Appel API PUT/PATCH
- [ ] Feedback utilisateur

### Phase 6 : Suppression
- [ ] Créer Modal component
- [ ] Bouton de suppression
- [ ] Confirmation avant suppression
- [ ] Appel API DELETE
- [ ] Redirection après suppression

### Phase 7 : Création
- [ ] Créer PokemonForm component
- [ ] Validation du formulaire
- [ ] Appel API POST
- [ ] Redirection vers détails

### Phase 8 : Fonctionnalité Bonus
- [ ] Choisir une fonctionnalité
- [ ] Implémenter
- [ ] Tester

### Phase 9 : Polish
- [ ] Responsive design
- [ ] Loading states
- [ ] Error handling
- [ ] Animations
- [ ] Tests utilisateur

---

## 🚀 Commandes de Démarrage

### Backend
```bash
cd tp-partie-back-Wastoc29
npm run seed    # Initialiser la DB
npm run dev     # Port 3000
```

### Frontend
```bash
cd pokemon-front
npm run dev     # Port 5173 (Vite) ou 3001
```

---

## 🔍 Points d'Attention

1. **CORS** : Assurez-vous que le backend accepte les requêtes du front
2. **Error Handling** : Gérer tous les cas d'erreur (404, 500, network)
3. **Loading States** : Afficher des loaders pendant les requêtes
4. **Validation** : Valider les formulaires côté client ET serveur
5. **UX** : Feedback utilisateur pour chaque action
6. **Responsive** : Mobile-first design
7. **Performance** : Optimiser les images, lazy loading

---

## 🎯 Fonctionnalité Bonus (Suggestions)

### Option A : Système de Favoris
- LocalStorage pour sauvegarder les favoris
- Icône cœur sur les cartes
- Page dédiée aux favoris

### Option B : Filtres Avancés
- Filtre par type (Feu, Eau, Plante, etc.)
- Filtre par statistiques (HP > 100)
- Tri (A-Z, ID, Stats)

### Option C : Comparateur
- Sélectionner 2-3 Pokémons
- Comparer leurs statistiques
- Graphiques de comparaison

### Option D : Mode Sombre
- Toggle light/dark mode
- Sauvegarde de la préférence
- Transition smooth

---

## 📚 Ressources Utiles

- [React Router](https://reactrouter.com/)
- [Axios Documentation](https://axios-http.com/)
- [CSS Grid & Flexbox](https://css-tricks.com/snippets/css/complete-guide-grid/)
- [Pokemon Type Colors](https://gist.github.com/apaleslimghost/0d25ec801ca4fc43317bcff298af43c3)

---

**Bon développement ! 🎉**
