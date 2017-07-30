/**
 * DataFeedService.js
 *
 * @description :: Data Feed login here
 *
 * Usage:
 * var Services = require('./../../config/Services'),
 *     DataFeed = Service.DataFeed;
 *
 */

/** npm lib **/

/** define config */
const   CONSTANTS   = require('./../../config/constants')

/**  define Models */
const   Models  = require('./../../config/models');
const   User    = Models.User;
const   Video   = Models.Video;
const   View    = Models.View;

/** init */
const DataFeedService = {};

/** set function */
DataFeedService.feedAllCollections = feedAllCollections;

/** exports */
module.exports = DataFeedService;


/** ***************************************************************************************************************** */
/** ********************* Start DataFeed Service Function *********************************************************** */
/** ***************************************************************************************************************** */


/**
 *  @description :: When Server Starting Feed Data To DB
 *
 *  User, Video, View
 *
 *  */
function feedAllCollections() {

    // Checking User Collection Count
    User.count({},function (err,count) {
        console.log('------------------------------------------');
        console.log('Total User Collections Count => '+count);
       if(count === 0){
           console.log('------------------------------------------');
           console.log('Starting Feed Data To DB');
           console.log('------------------------------------------');

           /** Users Feed here ---------------------------------- */
           const userArray = [],
                totalCount = CONSTANTS.TOTAL_USER_COUNT;

           for(let i = 0; i < totalCount ; i ++){
               userArray.push({
                   un: 'User_'+ i,
                   e: 'user'+i+'@vc.com',
                   fn: 'f-Name'+i,
                   ln: 'l-Name'+i
               })
           }
           const newUser = new User();
           newUser.collection.insert(userArray,function (err,records) {
               console.log('Total User Count : '+records.result.n);
               console.log('------------------------------------------');
               console.log(records.ops[0]);
               console.log('------------------------------------------');

               /** Video Feed here ---------------------------------- */
               const user = records.ops;
               const videoArray = [];
               
               user.forEach((u) => {
                   videoArray.push({ _u : u._id, cap : 'VC', url : 'URL' });
                   if(videoArray.length % 5 === 2){
                       videoArray.push({ _u : u._id, cap : 'VC', url : 'URL' });
                   }
               });

               const newVideo = new Video();
               newVideo.collection.insert(videoArray,function (err,videoRecords) {
                   console.log('Total Video Count : '+videoRecords.result.n);
                   console.log('------------------------------------------');
                   console.log(videoRecords.ops[0]);
                   console.log('------------------------------------------');

                   /** View Feed here ---------------------------------- */
                   const video = videoRecords.ops;
                   const viewArray = [];

                   video.forEach((v) => {
                       viewArray.push({ _u : v._u, _v : v._id });
                       viewArray.push({ _u : v._u, _v : v._id });
                       if(viewArray.length % 5 === 3){
                           viewArray.push({ _u : v._u, _v : v._id });
                       }
                       if(viewArray.length % 7 === 5){
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                       }
                       if(viewArray.length % 25 === 23){
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                           viewArray.push({ _u : v._u, _v : v._id });
                       }
                   });

                   const newView = new View();
                   newView.collection.insert(viewArray,function (err,viewRecords) {
                       console.log('Total View Count : ' + viewRecords.result.n);
                       console.log('------------------------------------------');
                       console.log(viewRecords.ops[0]);
                       console.log('------------------------------------------');
                   });
               });
           });
       }else{
           console.log('------------------------------------------');
           console.log('Already Feed Data To DB');
           console.log('------------------------------------------');
       }
    })
}

/** ***************************************************************************************************************** */
/** ********************* End DataFeed Service Function ************************************************************* */
/** ***************************************************************************************************************** */