/**
 * Video Model js
 */

/** npm lib */
const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

/** Video Json  */
const Video = {
    _u: {type: Schema.ObjectId, ref: 'User', index: true}, // Owner of the video
    cap: String, // Caption of the video
    url: String, // Url of the video
    rem: {type: Boolean, default: false}, // Removed
};

/** Options */
const Options = { autoIndex: false };

/** Video Schema */
const VideoSchema = Schema(Video,Options);

const transform = function (doc, ret, options) {
    return {
        'id': doc._id,
        'caption': doc.cap,
        'url': doc.url,
        'user': doc._u,
        'is_removed': doc.rem
    };
};
VideoSchema.statics.transform    = transform;
VideoSchema.options.toJSON       = {'transform': transform, 'virtuals': true};
VideoSchema.options.toObject     = {'transform': transform, 'virtuals': true};

/** exports **/
module.exports = VideoSchema;