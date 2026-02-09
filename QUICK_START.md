# 🚀 QUICK START GUIDE

## Backend Pokemon - Démarrage Rapide

### 📦 Installation (1 fois)
```bash
npm install
```

### 🗄️ Initialiser la base de données
```bash
npm run seed
```
> Crée 11 Pokemons dans MongoDB

### ▶️ Lancer le serveur
```bash
npm run dev
```
> Démarre sur http://localhost:3000

---

## ✅ Vérification Rapide

### 1. Tester dans le navigateur
```
http://localhost:3000/api/pokemons?page=1
```

### 2. Tester tous les endpoints
- Ouvrir le fichier `api-tests.http`
- Installer l'extension "REST Client" dans VS Code
- Cliquer sur "Send Request" pour chaque test

---

## 📚 Documentation Complète

| Fichier | Description |
|---------|-------------|
| `README.md` | Documentation complète de l'API |
| `BACKEND_COMPLETE.md` | Récapitulatif de ce qui a été fait |
| `FRONT_ROADMAP.md` | Guide pour développer le front-end |
| `api-tests.http` | Tests des endpoints |

---

## 🎯 Endpoints Disponibles

```
GET    /api/pokemons?page=1           # Liste (20 par page)
GET    /api/pokemons/search?name=...  # Recherche par nom
GET    /api/pokemons/:id               # Un pokemon
POST   /api/pokemons                   # Créer
PUT    /api/pokemons/:id               # Modifier (complet)
PATCH  /api/pokemons/:id               # Modifier (partiel)
DELETE /api/pokemons/:id               # Supprimer
```

---

## 🔧 Commandes Utiles

```bash
npm run dev    # Démarrer en mode développement
npm start      # Démarrer en production
npm run seed   # Réinitialiser la base
```

---

**🎉 Backend prêt! Passez au front-end avec `FRONT_ROADMAP.md`**
