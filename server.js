// server.js
require('dotenv').config();
require('express-async-errors');
const session = require('express-session');
const passport = require('passport');
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser'); 
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


const { logIncomingRequests, logOutgoingResponses, errorHandler } = require('./middlewares/logMiddleware');


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors())
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

const { 
  customerProjectRoutes, 
  customerRoutes, 
  effectRoutes, 
  effectTypeRoutes,
  fleetRoutes, 
  levelRoutes, 
  projectRoutes, 
  roleRoutes, 
  rootRoutes, 
  shipRoutes, 
  sideRoutes, 
  skillRoutes,
  statusRoutes,
  authRoutes, 
  userRoutes, 
  userSkillRoutes,
  tagRoutes,
  askedRoutes,
  prfmRoutes
} = require('./routes');

app.use(logIncomingRequests);
app.use(logOutgoingResponses);
app.use(errorHandler);


// Utilisez le middleware body-parser pour analyser le corps de la requête en JSON
app.use(bodyParser.json());

// Utilisez les routes
app.use('/', express.static(path.join(__dirname, 'public')))


app.use('/', rootRoutes);
// Authentication
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);

// To config by administrator  
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/fleets', fleetRoutes);
app.use('/api/v1/ships', shipRoutes);
app.use('/api/v1/tags', tagRoutes);

// Tickets Management
app.use('/api/v1/asked', askedRoutes);
app.use('/api/v1/prfm', prfmRoutes);

// CRUD FOR ADMINISTRATOR TO CHANGE THE DATA
app.use('/api/v1/effects', effectRoutes);
app.use('/api/v1/effectTypes', effectTypeRoutes);
app.use('/api/v1/levels', levelRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/sides', sideRoutes);
app.use('/api/v1/skills', skillRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api/v1/customerpj', customerProjectRoutes);
app.use('/api/v1/usersk', userSkillRoutes);

// swagger
const options = {
  definition: {
    openapi: '3.0.0', // Spécification OpenAPI (Swagger) que vous souhaitez utiliser
    info: {
      title: 'API SUPPORT', // Titre de votre API
      version: '1.0.0', // Version de votre API
      description: 'Restful api create with nodejs (expressjs) and database postgres about application support', // Description de votre API
    },
  },
  // Chemin vers les fichiers de routes contenant les annotations JSDoc
  apis: ['./routes/*.js'], 
};

// Générer la spécification Swagger à partir des annotations JSDoc
const specs = swaggerJsdoc(options);

// Utiliser Swagger UI au chemin /api-docs
app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(specs));


app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) {
    res.json({ message: "404 Not Found" })
  } else {
    res.type('txt').send('404 Not Found')
  }
});


module.exports = app;