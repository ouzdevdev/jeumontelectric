// Authentification
module.exports.authRoutes = require('./auth.route');

// To config by administrator 
module.exports.rootRoutes = require('./root.route');
module.exports.customerRoutes = require('./customer.route');
module.exports.userRoutes = require('./user.route');
module.exports.fleetRoutes = require('./fleet.route');
module.exports.shipRoutes = require('./ship.route');
module.exports.tagRoutes = require('./tag.route');

// Tickets Management
module.exports.askedRoutes = require('./asked.route');
module.exports.prfmRoutes = require('./prfm.route');

// ??
module.exports.effectRoutes = require('./effect.route');
module.exports.effectTypeRoutes = require('./effectType.route');
module.exports.levelRoutes = require('./level.route');
module.exports.projectRoutes = require('./project.route');
module.exports.roleRoutes = require('./role.route');
module.exports.sideRoutes = require('./side.route');
module.exports.skillRoutes = require('./skill.route');
module.exports.statusRoutes = require('./status.route');
module.exports.customerProjectRoutes = require('./customerProject.route');
module.exports.userSkillRoutes = require('./userSkill.route');