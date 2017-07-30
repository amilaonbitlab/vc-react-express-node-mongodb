/**
 * User Model js
 */

/** npm lib */
const   mongoose    = require('mongoose'),
        Schema      = mongoose.Schema;

/** User Json  */
const User = {
    un: String, // username
    e: String, // email
    fn: String, // first name
    ln: String, // last name
};

/** Options */
const Options = { autoIndex: false };

/** User Schema */
const UserSchema = Schema(User,Options);

const transform = function (doc, ret, options) {
    return {
        'id': doc._id,
        'joined_at': doc._id.getTimestamp(),
        'first_name': doc.fn.trim(),
        'last_name': doc.ln.trim(),
        'username': doc.un,
        'email': doc.e
    };
};
UserSchema.statics.transform    = transform;
UserSchema.options.toJSON       = {'transform': transform, 'virtuals': true};
UserSchema.options.toObject     = {'transform': transform, 'virtuals': true};

/** exports **/
module.exports = UserSchema;