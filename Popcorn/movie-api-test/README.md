# movie-api-test – Générateur & Recherche de Vecteurs de Films

Ce dossier contient un projet Node.js permettant de :
- Récupérer des données de films depuis OMDb / TMDb / Wikipedia
- Utiliser OpenAI pour générer (1) une description enrichie, (2) des tags d'ambiance/émotion, (3) des vecteurs d'embedding
- Écrire les résultats dans un dossier local externe via `LOCAL_DATA_PATH` (format NDJSON) pour la recherche sémantique

## Prérequis
- Node.js 18+
- Clés API requises (voir `.env.example`)

## Installation

1) Installer les dépendances

```bash
cd movie-api-test
npm install
```

2) Configurer les variables d'environnement

Copiez `.env.example` en `.env` et renseignez vos clés API.

⚠️ Définissez aussi `LOCAL_DATA_PATH` (dossier local hors repo), par exemple :

```bash
# Windows (PowerShell)
$env:LOCAL_DATA_PATH="C:\\Users\\Louis\\Visual Studio\\Popcorn\\Movie-data"
```

## Commandes

- Construire/mettre à jour la base de vecteurs (à partir de `LOCAL_DATA_PATH/movies/movie_titles.json`)

```bash
node fetchMovie.js build
```

- Construire/mettre à jour des films spécifiques

```bash
node fetchMovie.js build "The Matrix" "Inception"
```

- Recherche interactive (utilise les fichiers NDJSON déjà générés sous `LOCAL_DATA_PATH/`)

```bash
node fetchMovie.js search
```

## Fichiers
- `LOCAL_DATA_PATH/movies/movie_titles.json` : Liste des titres de films à traiter en batch
- `LOCAL_DATA_PATH/movies/movies.ndjson` : Métadonnées films (1 ligne JSON par film, append-only)
- `LOCAL_DATA_PATH/vectors/embeddings.ndjson` : Embeddings (1 ligne JSON par embedding, append-only)

Optionnel (cache de seeds) :
- `LOCAL_DATA_PATH/movies/build_popular_seeds.ndjson`
- `LOCAL_DATA_PATH/movies/build_top_rated_seeds.ndjson`

## Remarques
- `TMDB_API_KEY` est optionnelle : si absente, l'enrichissement TMDb (acteurs/mots-clés/genres) sera ignoré.
- La commande `search` utilise OpenAI pour transformer la requête en embedding (ne récupère pas de nouvelles données films lors de la recherche).
- Vous pouvez ajuster le seuil de pertinence via `SIMILARITY_THRESHOLD` (défaut: 0.40). En dessous, la recherche considère le résultat comme non pertinent.
