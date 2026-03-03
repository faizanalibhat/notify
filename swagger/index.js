const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger.config')

module.exports = (app) => {
    app.get("/notify/swagger.json", (req, res) => {
        res.setHeader("Content-Type", "application/json");
        res.send(swaggerSpec);
    });

    app.use('/notify/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
