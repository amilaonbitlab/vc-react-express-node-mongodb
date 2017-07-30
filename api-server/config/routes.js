/**
 *  config/routes.js
 *
 */

/**
 * require Controllers
 */
const UserController = require('./../api/controllers/UserController');

/**
 * exports routes
 */
module.exports = function(app) {

    /** --- init routes --**/

    /** ---//--  User Api -------------------------------------------------------------------------------------------**/
    /* CREATE ------------------------------------------------------------------------------------------------------- */

    /* READ / GET --------------------------------------------------------------------------------------------------- */
    app.get('/api/get/user/all',         UserController.getUserAll);
    app.get('/api/get/user/page/:id',    UserController.getUserPage);
    app.get('/api/get/total/user/count', UserController.getTotalUserCount);

    /* DELETE ------------------------------------------------------------------------------------------------------- */

    /* UPDATE ------------------------------------------------------------------------------------------------------- */

    /** Any Request *****/
    app.get('*',function (req,res) {

        console.log('Unknown Request : '+ req.url);

        res.sendStatus(404);
    })
};
