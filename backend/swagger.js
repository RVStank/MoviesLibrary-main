import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    swaggerDefinition: {
        info: {
            title: 'Movies Library',
            version: '1.0.0',
            description: 'Library of movies with ratings'
        }
    },
    apis: ['./routes/moviesRoute.js', './routes/userRoutes.js', './routes/authRoutes.js']
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;

