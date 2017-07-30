/**
 *  UserController.js
 *
 *  @description :: User related logic
 *
 */

/** npm libs */

/**  define Models */
const Models  = require('./../../config/models');
const User    = Models.User;

/**  define Services */

/** define config */
const   Response = require('./../../config/responses');
const   CONSTANT = require('./../../config/constants');


/**  init */
const UserController = {};

/**  set functions */
/* CREATE ----------------------------------------------------------------------------------------------------------- */

/* READ / GET ------------------------------------------------------------------------------------------------------- */
UserController.getUserAll           = getUserAll;
UserController.getUserPage          = getUserPage;
UserController.getTotalUserCount    = getTotalUserCount;

/* DELETE ----------------------------------------------------------------------------------------------------------- */


/* UPDATE ----------------------------------------------------------------------------------------------------------- */

/**  exports */
module.exports = UserController;

/** ***************************************************************************************************************** */
/** ********************* Start User Controller Function *********************************************************** */
/** ***************************************************************************************************************** */

/* CREATE ----------------------------------------------------------------------------------------------------------- */

/* READ / GET ------------------------------------------------------------------------------------------------------- */

/**
 * @description :: Get All Users
 *
 */
function getUserAll(req, res) {

    // get user all
    User.aggregate([
            {
                $lookup:
                    {
                        from: 'videos',
                        localField: '_id',
                        foreignField: '_u',
                        as: 'count'
                    }
            },
            { $limit : CONSTANT.LIMIT_TOP_TOTAL_USER }
        ],
        function (err,result) {
            return Response.ok(res,result);
        })
}

/**
 * @description :: Get Users for Page
 *
 */
function getUserPage(req, res) {

    const pageId        = req.params.id;
    let   skipCount     = 0;
    if(pageId > 0){
        skipCount = CONSTANT.LIMIT_PAGE_USER_COUNT * pageId;
    }
    // get user all
    User.aggregate([
            {
                $lookup:
                    {
                        from: 'videos',
                        localField: '_id',
                        foreignField: '_u',
                        as: 'count'
                    }
            },
            { $skip :  skipCount },
            { $limit : CONSTANT.LIMIT_PAGE_USER_COUNT }
        ],
        function (err,result) {
            return Response.ok(res,result);
        })
}

/**
 * @description :: Get Total User Count
 *
 */
function getTotalUserCount(req, res) {

    // get user all
    User.count({},function (err,result) {
            return Response.ok(res,result);
        })
}
/* DELETE ----------------------------------------------------------------------------------------------------------- */

/* UPDATE ----------------------------------------------------------------------------------------------------------- */

/** ***************************************************************************************************************** */
/** ********************* End User Controller Function ************************************************************** */
/** ***************************************************************************************************************** */
