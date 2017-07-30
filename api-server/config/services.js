/**
 *  config/services.js
 *
 * Usage:
 * :: inside Controllers
 *
 * var Services = require('./../../config/services'),
 *     DataFeedService  = Services.DataFeedService;
 *
 * NOTE : More Details about Services.DataFeedService pls check in api/services/DataFeedService.js
 * /

/**
 * require Services
 */
const Services = {
    DataFeedService : require('./../api/services/DataFeedService')
};

/**
 * exports Services
 */
module.exports = Services;
