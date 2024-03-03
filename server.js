// server.js
// imporatation
require('dotenv').config();
require('express-async-errors');
const express = require('express');
const session = require('express-session');
const passport = require('passport');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// cors
const cors = require('cors');

// swagger
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

// logging
const { 
  logIncomingRequests, 
  logOutgoingResponses, 
  errorHandler 
} = require('./middlewares/logMiddleware');

// rest json
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors())

// passport
app.use(session({
  secret: 'secret-key',
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());

// routes
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
  prfmRoutes,
  prfsRoutes,
  prmaRoutes,
  weekRoutes,
  yearRoutes,
  planifierRoutes,
  conversationRoutes,
  messageRoutes,
  askedTagRoutes,
  askedEffectRoutes,
  askedLogRoutes,
  askedLogTypeRoutes,
  askedUserInChargeOfRoutes,
  twilioRoutes,
  pieceRoutes,
  documentRoutes,
  categorieRoutes,
  prmaEqpInternalRoute,
  equipementInterneRoute,
  documentInterneShipRoutes
} = require('./routes');

// middleware logger
app.use(logIncomingRequests);
app.use(logOutgoingResponses);
app.use(errorHandler);

app.use(bodyParser.json());

// public paths
app.use('/', express.static(path.join(__dirname, 'public')))
app.use('/', rootRoutes);

// routes 
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/twilio', twilioRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/documents', documentRoutes);
app.use('/api/v1/fleets', fleetRoutes);
app.use('/api/v1/ships', shipRoutes);
app.use('/api/v1/tags', tagRoutes);
app.use('/api/v1/piece', pieceRoutes);
app.use('/api/v1/asked', askedRoutes);
app.use('/api/v1/prfm', prfmRoutes);
app.use('/api/v1/prfs', prfsRoutes);
app.use('/api/v1/prma', prmaRoutes);
app.use('/api/v1/messages', messageRoutes);
app.use('/api/v1/conversations', conversationRoutes);
app.use('/api/v1/askedTag', askedTagRoutes);
app.use('/api/v1/askedEffect', askedEffectRoutes);
app.use('/api/v1/askedlogs', askedLogRoutes);
app.use('/api/v1/askedlogtypes', askedLogTypeRoutes);
app.use('/api/v1/effects', effectRoutes);
app.use('/api/v1/effectTypes', effectTypeRoutes);
app.use('/api/v1/levels', levelRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/roles', roleRoutes);
app.use('/api/v1/sides', sideRoutes);
app.use('/api/v1/skills', skillRoutes);
app.use('/api/v1/status', statusRoutes);
app.use('/api/v1/customerProjects', customerProjectRoutes);
app.use('/api/v1/userSkills', userSkillRoutes);
app.use('/api/v1/weeks', weekRoutes);
app.use('/api/v1/years', yearRoutes);
app.use('/api/v1/oncall', planifierRoutes);
app.use('/api/v1/askedusersincharge', askedUserInChargeOfRoutes);
app.use('/api/v1/categories', categorieRoutes);
app.use('/api/v1/prmaeqpinternal', prmaEqpInternalRoute);
app.use('/api/v1/equipementinterne', equipementInterneRoute);
app.use('/api/v1/documentinterneship', documentInterneShipRoutes);

// swagger configuration
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Jeumont electric',
      version: '1.0.0',
      description: 'Restful api create with nodejs (expressjs) and database postgres about application support',
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer',
        },
      },
    },
  },
  apis: ['./routes/*.js'],
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);

// path swagger
app.use('/api/v1', swaggerUi.serve, swaggerUi.setup(swaggerSpecs, {
  customSiteTitle: 'Jeumont electric',
}));

app.all('*', (req, res) => {
  res.status(404)
  if(req.accepts('html')) { res.sendFile(path.join(__dirname, 'views', '404.html'))
  } else if (req.accepts('json')) { res.json({ message: "404 Not Found" }) 
  } else { res.type('txt').send('404 Not Found') }
});

module.exports = app;