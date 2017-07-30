/**
 *  AggregationController.js
 *
 *  @description :: Aggregation related logic
 *
 */

/** npm libs */

/**  define Models */
const   Models  = require('./../../config/models');
const   View    = Models.View;

/**  define Services */

/** define config */
const   CONSTANT    = require('./../../config/constants');

/**  init */
const AggregationController = {};

/**  set functions */
AggregationController.topVideoViewUsersGivenDataRange = topVideoViewUsersGivenDataRange;

/**  exports */
module.exports = AggregationController;

/** ***************************************************************************************************************** */
/** ********************* Start Aggregation Controller Function ***************************************************** */
/** ***************************************************************************************************************** */

/**
 * @Description :: Top Video View Users Given Data Range
 */
function topVideoViewUsersGivenDataRange() {

    // Aggregation Query
    View.aggregate([
            { $group: { _id : '$_u', count : { $sum : 1 } } } ,
            { $sort : { 'count' : -1 } },
            {
                $lookup:
                    {
                        from: 'users',
                        localField: '_id',
                        foreignField: '_id',
                        as: '_id'
                    }
            },
            { $limit : CONSTANT.LIMIT_TOP_TOTAL_USER }
            ],
        function (err,result) {
            console.log(result[0]);
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
            console.log('| Id | First Name  | Last Name | Video Count | ');
            let i = 1;
            result.forEach((view) => {
               console.log('|' + i +' | ' + view._id[0].fn + ' | ' +  view._id[0].ln + ' | ' + view.count + ' | ');
               i++;
            });
            console.log('+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++');
    })
}

/** ***************************************************************************************************************** */
/** ********************* End Aggregation Controller Function ******************************************************* */
/** ***************************************************************************************************************** */
