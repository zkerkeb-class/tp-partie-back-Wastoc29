import mongoose from 'mongoose';
import Pokemon from '../schema/pokemon.js';
import { connectDB } from '../connect.js';

// Liste de pokemons simplifiée (sans dépendance à process.env)
const pokemonsList = [
    {
        "id": 1,
        "name": {
            "english": "Bulbasaur",
            "japanese": "フシギダネ",
            "chinese": "妙蛙种子",
            "french": "Bulbizarre"
        },
        "type": ["Grass", "Poison"],
        "base": {
            "HP": 45,
            "Attack": 49,
            "Defense": 49,
            "SpecialAttack": 65,
            "SpecialDefense": 65,
            "Speed": 45
        },
        "image": "http://localhost:3000/assets/pokemons/1.png"
    },
    {
        "id": 2,
        "name": {
            "english": "Ivysaur",
            "japanese": "フシギソウ",
            "chinese": "妙蛙草",
            "french": "Herbizarre"
        },
        "type": ["Grass", "Poison"],
        "base": {
            "HP": 60,
            "Attack": 62,
            "Defense": 63,
            "SpecialAttack": 80,
            "SpecialDefense": 80,
            "Speed": 60
        },
        "image": "http://localhost:3000/assets/pokemons/2.png"
    },
    {
        "id": 3,
        "name": {
            "english": "Venusaur",
            "japanese": "フシギバナ",
            "chinese": "妙蛙花",
            "french": "Florizarre"
        },
        "type": ["Grass", "Poison"],
        "base": {
            "HP": 80,
            "Attack": 82,
            "Defense": 83,
            "SpecialAttack": 100,
            "SpecialDefense": 100,
            "Speed": 80
        },
        "image": "http://localhost:3000/assets/pokemons/3.png"
    },
    {
        "id": 4,
        "name": {
            "english": "Charmander",
            "japanese": "ヒトカゲ",
            "chinese": "小火龙",
            "french": "Salamèche"
        },
        "type": ["Fire"],
        "base": {
            "HP": 39,
            "Attack": 52,
            "Defense": 43,
            "SpecialAttack": 60,
            "SpecialDefense": 50,
            "Speed": 65
        },
        "image": "http://localhost:3000/assets/pokemons/4.png"
    },
    {
        "id": 5,
        "name": {
            "english": "Charmeleon",
            "japanese": "リザード",
            "chinese": "火恐龙",
            "french": "Reptincel"
        },
        "type": ["Fire"],
        "base": {
            "HP": 58,
            "Attack": 64,
            "Defense": 58,
            "SpecialAttack": 80,
            "SpecialDefense": 65,
            "Speed": 80
        },
        "image": "http://localhost:3000/assets/pokemons/5.png"
    },
    {
        "id": 6,
        "name": {
            "english": "Charizard",
            "japanese": "リザードン",
            "chinese": "喷火龙",
            "french": "Dracaufeu"
        },
        "type": ["Fire", "Flying"],
        "base": {
            "HP": 78,
            "Attack": 84,
            "Defense": 78,
            "SpecialAttack": 109,
            "SpecialDefense": 85,
            "Speed": 100
        },
        "image": "http://localhost:3000/assets/pokemons/6.png"
    },
    {
        "id": 7,
        "name": {
            "english": "Squirtle",
            "japanese": "ゼニガメ",
            "chinese": "杰尼龟",
            "french": "Carapuce"
        },
        "type": ["Water"],
        "base": {
            "HP": 44,
            "Attack": 48,
            "Defense": 65,
            "SpecialAttack": 50,
            "SpecialDefense": 64,
            "Speed": 43
        },
        "image": "http://localhost:3000/assets/pokemons/7.png"
    },
    {
        "id": 8,
        "name": {
            "english": "Wartortle",
            "japanese": "カメール",
            "chinese": "卡咪龟",
            "french": "Carabaffe"
        },
        "type": ["Water"],
        "base": {
            "HP": 59,
            "Attack": 63,
            "Defense": 80,
            "SpecialAttack": 65,
            "SpecialDefense": 80,
            "Speed": 58
        },
        "image": "http://localhost:3000/assets/pokemons/8.png"
    },
    {
        "id": 9,
        "name": {
            "english": "Blastoise",
            "japanese": "カメックス",
            "chinese": "水箭龟",
            "french": "Tortank"
        },
        "type": ["Water"],
        "base": {
            "HP": 79,
            "Attack": 83,
            "Defense": 100,
            "SpecialAttack": 85,
            "SpecialDefense": 105,
            "Speed": 78
        },
        "image": "http://localhost:3000/assets/pokemons/9.png"
    },
    {
        "id": 10,
        "name": {
            "english": "Caterpie",
            "japanese": "キャタピー",
            "chinese": "绿毛虫",
            "french": "Chenipan"
        },
        "type": ["Bug"],
        "base": {
            "HP": 45,
            "Attack": 30,
            "Defense": 35,
            "SpecialAttack": 20,
            "SpecialDefense": 20,
            "Speed": 45
        },
        "image": "http://localhost:3000/assets/pokemons/10.png"
    },
    {
        "id": 25,
        "name": {
            "english": "Pikachu",
            "japanese": "ピカチュウ",
            "chinese": "皮卡丘",
            "french": "Pikachu"
        },
        "type": ["Electric"],
        "base": {
            "HP": 35,
            "Attack": 55,
            "Defense": 40,
            "SpecialAttack": 50,
            "SpecialDefense": 50,
            "Speed": 90
        },
        "image": "http://localhost:3000/assets/pokemons/25.png"
    }
];

const seedDatabase = async () => {
    try {
        console.log('🌱 Démarrage du seed de la base de données...');

        // Attendre la connexion
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Vider la collection
        await Pokemon.deleteMany({});
        console.log('🗑️  Collection vidée');

        // Insérer les pokemons
        await Pokemon.insertMany(pokemonsList);
        console.log(`✅ ${pokemonsList.length} Pokemons insérés avec succès!`);

        // Vérification
        const count = await Pokemon.countDocuments();
        console.log(`📊 Total de pokemons dans la base: ${count}`);

        process.exit(0);
    } catch (error) {
        console.error('❌ Erreur lors du seed:', error);
        process.exit(1);
    }
};

seedDatabase();
