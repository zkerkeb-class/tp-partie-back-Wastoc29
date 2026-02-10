import express from 'express';
import Pokemon from '../schema/pokemon.js';

const router = express.Router();

// GET tous les pokemons avec pagination (20 par 20)
router.get('/', async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = 20;
        const skip = (page - 1) * limit;

        const pokemons = await Pokemon.find({})
            .skip(skip)
            .limit(limit)
            .sort({ id: 1 });

        const total = await Pokemon.countDocuments();
        const totalPages = Math.ceil(total / limit);

        res.json({
            pokemons,
            currentPage: page,
            totalPages,
            totalPokemons: total,
            hasNextPage: page < totalPages,
            hasPrevPage: page > 1
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET un pokemon par nom (recherche)
router.get('/search', async (req, res) => {
    try {
        const { name } = req.query;

        if (!name) {
            return res.status(400).json({ message: 'Le paramètre "name" est requis' });
        }

        const pokemon = await Pokemon.findOne({
            'name.english': { $regex: new RegExp(name, 'i') }
        });

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon non trouvé' });
        }

        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET un pokemon par ID
router.get('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ id: req.params.id });

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon non trouvé' });
        }

        res.json(pokemon);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST créer un nouveau pokemon
router.post('/', async (req, res) => {
    try {
        // Trouver le plus grand ID existant
        const lastPokemon = await Pokemon.findOne().sort({ id: -1 });
        const newId = lastPokemon ? lastPokemon.id + 1 : 1;

        const pokemonData = {
            id: newId,
            name: req.body.name,
            type: req.body.type,
            base: req.body.base,
            image: req.body.image || `http://localhost:3000/assets/pokemons/${newId}.png`
        };

        const newPokemon = new Pokemon(pokemonData);
        await newPokemon.save();

        res.status(201).json({
            message: 'Pokemon créé avec succès',
            pokemon: newPokemon
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// UPDATE modifier un pokemon
router.put('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ id: req.params.id });

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon non trouvé' });
        }

        // Mettre à jour les champs fournis
        if (req.body.name) pokemon.name = req.body.name;
        if (req.body.type) pokemon.type = req.body.type;
        if (req.body.base) pokemon.base = req.body.base;
        if (req.body.image) pokemon.image = req.body.image;

        await pokemon.save();

        res.json({
            message: 'Pokemon mis à jour avec succès',
            pokemon
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PATCH modifier partiellement un pokemon
router.patch('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOne({ id: req.params.id });

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon non trouvé' });
        }

        // Mettre à jour uniquement les champs fournis
        Object.keys(req.body).forEach(key => {
            if (key !== 'id') {
                pokemon[key] = req.body[key];
            }
        });

        await pokemon.save();

        res.json({
            message: 'Pokemon modifié avec succès',
            pokemon
        });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE supprimer un pokemon
router.delete('/:id', async (req, res) => {
    try {
        const pokemon = await Pokemon.findOneAndDelete({ id: req.params.id });

        if (!pokemon) {
            return res.status(404).json({ message: 'Pokemon non trouvé' });
        }

        res.json({
            message: 'Pokemon supprimé avec succès',
            pokemon
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
