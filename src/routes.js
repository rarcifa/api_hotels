const hotel_controller = require('./controllers/hotel_controller');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./../doc/openapi.json');

module.exports = {
    route: app => {
        // route for Swagger openAPI doc
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        app.route('/hotel')
            .get(hotel_controller.getAll)
            .post(hotel_controller.add);

        app.route('/hotel/:id')
            .get(hotel_controller.get)
            .patch(hotel_controller.patch)
            .delete(hotel_controller.remove);

        app.post('/hotel/:id/book', hotel_controller.book);
    }
}
