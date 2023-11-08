import mongoose from "mongoose";

const movieSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true
        },
        genre: {
            type: String,
            required: true
        },
        director: {
            type: String,
            required: true
        },
        yearPublished: {
            type: Number,
            required: true
        },
        ratingValue: {
            type: Number,
            required: true
        }
    }
)

movieSchema.virtual('rating').get(function(){
    return `${this.ratingValue}/ 10`;
});

export const Movie = mongoose.model('Movie', movieSchema);
//test