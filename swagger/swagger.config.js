const swaggerJsDoc = require('swagger-jsdoc')

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Notify Service API',
      version: '1.0.0',
      description: 'API documentation for the Notify Service'
    },
    servers: [
      {
        url: appConfig.BASE_URL || 'http://localhost:3000',
        description: 'Notify Service Server'
      }
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      }
    }
  },
  apis: ['./swagger/routes/*.js']
}

module.exports = swaggerJsDoc(options)
