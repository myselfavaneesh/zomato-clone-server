import swaggerJsdoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zomato Clone API',
      version: '1.0.0',
      description: 'A comprehensive API for a Zomato clone application with authentication, restaurant management, and cuisine management',
      contact: {
        name: 'API Support',
        email: 'support@zomatoclone.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Development server'
      },
      {
        url: 'https://api.zomatoclone.com',
        description: 'Production server'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Enter your JWT token'
        },
        cookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'token',
          description: 'JWT token stored in cookie'
        }
      },
      schemas: {
        User: {
          type: 'object',
          required: ['name', 'email', 'password'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated user ID'
            },
            name: {
              type: 'string',
              description: 'User full name',
              example: 'John Doe'
            },
            email: {
              type: 'string',
              format: 'email',
              description: 'User email address',
              example: 'john@example.com'
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'User password (hashed)',
              example: 'Password123!'
            },
            role: {
              type: 'string',
              enum: ['user', 'admin', 'owner'],
              default: 'user',
              description: 'User role'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Account creation timestamp'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              description: 'Last update timestamp'
            }
          }
        },
        Restaurant: {
          type: 'object',
          required: ['name', 'address', 'phone'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated restaurant ID'
            },
            name: {
              type: 'string',
              description: 'Restaurant name',
              example: 'The Italian Corner'
            },
            address: {
              type: 'string',
              description: 'Restaurant address',
              example: '123 Main Street, New York, NY 10001'
            },
            phone: {
              type: 'string',
              description: 'Restaurant phone number',
              example: '+1-234-567-8900'
            },
            description: {
              type: 'string',
              description: 'Restaurant description',
              example: 'Authentic Italian cuisine in the heart of the city'
            },
            rating: {
              type: 'number',
              format: 'float',
              minimum: 0,
              maximum: 5,
              description: 'Restaurant rating',
              example: 4.5
            },
            image: {
              type: 'string',
              description: 'Restaurant image URL',
              example: 'https://example.com/images/restaurant.jpg'
            },
            owner: {
              type: 'string',
              description: 'Owner user ID reference'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Cuisine: {
          type: 'object',
          required: ['name', 'restaurant'],
          properties: {
            _id: {
              type: 'string',
              description: 'Auto-generated cuisine ID'
            },
            name: {
              type: 'string',
              description: 'Cuisine name',
              example: 'Margherita Pizza'
            },
            description: {
              type: 'string',
              description: 'Cuisine description',
              example: 'Classic Italian pizza with tomato, mozzarella, and basil'
            },
            price: {
              type: 'number',
              format: 'float',
              description: 'Cuisine price',
              example: 12.99
            },
            category: {
              type: 'string',
              description: 'Cuisine category',
              example: 'Pizza'
            },
            image: {
              type: 'string',
              description: 'Cuisine image URL',
              example: 'https://example.com/images/pizza.jpg'
            },
            restaurant: {
              type: 'string',
              description: 'Restaurant ID reference'
            },
            isAvailable: {
              type: 'boolean',
              default: true,
              description: 'Availability status'
            },
            createdAt: {
              type: 'string',
              format: 'date-time'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: false
            },
            message: {
              type: 'string',
              example: 'Error message'
            },
            errors: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  field: {
                    type: 'string'
                  },
                  message: {
                    type: 'string'
                  }
                }
              }
            }
          }
        },
        Success: {
          type: 'object',
          properties: {
            success: {
              type: 'boolean',
              example: true
            },
            message: {
              type: 'string',
              example: 'Operation successful'
            },
            data: {
              type: 'object'
            }
          }
        }
      },
      responses: {
        UnauthorizedError: {
          description: 'Authentication token is missing or invalid',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Unauthorized access'
              }
            }
          }
        },
        ForbiddenError: {
          description: 'User does not have permission to access this resource',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Forbidden: Insufficient permissions'
              }
            }
          }
        },
        NotFoundError: {
          description: 'Resource not found',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Resource not found'
              }
            }
          }
        },
        ValidationError: {
          description: 'Validation error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                success: false,
                message: 'Validation failed',
                errors: [
                  {
                    field: 'email',
                    message: 'Invalid email format'
                  }
                ]
              }
            }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'User authentication and authorization endpoints'
      },
      {
        name: 'Restaurants',
        description: 'Restaurant management endpoints'
      },
      {
        name: 'Cuisines',
        description: 'Cuisine/Menu item management endpoints'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Path to the API routes
};

const swaggerSpec = swaggerJsdoc(options);

export default swaggerSpec;
