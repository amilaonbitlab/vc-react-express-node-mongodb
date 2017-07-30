/**
 * View Model js
 */

/** npm lib */
const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

/** View Json  */
const View = {
    _u: {type: Schema.ObjectId, ref: 'User', index: true}, // User who views
    _v: {type: Schema.ObjectId, ref: 'Video', index: true}, // Video of view
    rem: {type: Boolean, default: false} // Removed
};

/** Options */
const Options = { autoIndex: false };

/** View Schema */
const ViewSchema = mongoose.Schema(View,Options);

const transform = function (doc, ret, options) {
    return {
        "user" : doc._u,
        "video" : doc._v,
        "is_removed" : doc.rem
    };
};
ViewSchema.statics.transform    = transform;
ViewSchema.options.toJSON       = {'transform': transform, 'virtuals': true};
ViewSchema.options.toObject     = {'transform': transform, 'virtuals': true};

/** exports **/
module.exports = ViewSchema;