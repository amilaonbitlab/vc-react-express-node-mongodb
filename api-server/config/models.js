/**
 *  config/models.js
 *
 * @description :: all model config here
 *
 * Usage:
 * :: inside Controllers or Services
 *
 * var Models = require('./../../config/models'),
 *     User   = Models.User;
 *
 * NOTE : More Details about Models.User pls check in api/models/User.js
 *
 * */

/**
 * npm libs
 */
const mongoose = require('mongoose');

/**
 * require models
 */
const   User    = require('./../api/models/User'),
        Video   = require('./../api/models/Video'),
        View    = require('./../api/models/View');

/**
 *  define models json
 */
const models = {
    User :      mongoose.model('User', User),
    Video :     mongoose.model('Video', Video),
    View :      mongoose.model('View', View)
};

/**
 * exports models
 */
module.exports = models;