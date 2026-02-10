import express from 'express';
import cors from 'cors';
import pokemonRoutes from './routes/pokemonRoutes.js';
import './connect.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir les fichiers statiques (images)
app.use('/assets', express.static('assets'));

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'API Pokemon - Backend',
    endpoints: {
      getPokemons: 'GET /api/pokemons?page=1',
      searchPokemon: 'GET /api/pokemons/search?name=pikachu',
      getPokemonById: 'GET /api/pokemons/:id',
      createPokemon: 'POST /api/pokemons',
      updatePokemon: 'PUT /api/pokemons/:id',
      partialUpdatePokemon: 'PATCH /api/pokemons/:id',
      deletePokemon: 'DELETE /api/pokemons/:id'
    }
  });
});

app.use('/api/pokemons', pokemonRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`📚 API Documentation available at http://localhost:${PORT}`);
});