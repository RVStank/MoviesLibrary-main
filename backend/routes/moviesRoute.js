import express from 'express';
import { Movie } from '../models/movieModel.js';

const router = express.Router();


// Save Movie
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.genre ||
            !request.body.director ||
            !request.body.yearPublished ||
            !request.body.ratingValue
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, genre, director, yearPublished, rating'
            });
        }
        const newMovie = {
            title: request.body.title,
            genre: request.body.genre,
            director: request.body.director,
            yearPublished: request.body.yearPublished,
            ratingValue: request.body.ratingValue
        };

        const movie = await Movie.create(newMovie);
        return response.status(201).send(movie);

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get a list of movies
 *     description: Returns a list of movies.
 *     responses:
 *       200:
 *         description: A list of movies.
 */
// Get all Movies
router.get('/', async (request, response) => {
    try {
        const movies = await Movie.find({});

        // Format the ratings for all movies in the response
        const formattedMovies = movies.map((movie) => {
            return {
                _id: movie._id,
                title: movie.title,
                genre: movie.genre,
                director: movie.director,
                yearPublished: movie.yearPublished,
                rating: movie.rating, // Access the virtual "rating" field
            };
        });

        return response.status(200).json({
            count: formattedMovies.length,
            data: formattedMovies,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});
// Get Movie by ID
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const movie = await Movie.findById(id);

        if (!movie) {
            return response.status(404).json({ message: 'Movie not found' })
        }

        const ratingOutOfTen = movie.rating;

        return response.status(200).json({
            title: movie.title,
            genre: movie.genre,
            director: movie.director,
            yearPublished: movie.yearPublished,
            rating: ratingOutOfTen
        });
    }
    catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Update Movie
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.genre ||
            !request.body.director ||
            !request.body.yearPublished ||
            !request.body.ratingValue
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, genre, director, yearPublished, rating'
            });
        }

        const { id } = request.params;
        const result = await Movie.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Movie not found' });
        }

        return response.status(200).send({ message: 'Movie updated successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Detele a movie
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const result = await Movie.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Movie not found' });
        }

        return response.status(200).send({ message: 'Movie deleted successfully' });

    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;