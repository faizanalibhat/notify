const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swagger.config')

module.exports = (app) => {
    app.use('/notify/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
}
