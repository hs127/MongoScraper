var Comment = require("../models/comments");

module.exports = {
    get: function (data, cb) {
        Comment.find({
            _titleId: data._titleId
        }, cb)
    },

    save: function (data, cb) {
        var newComment = {
            _titleId: data._id,
            comment: data.comment
        };

        Comment.create(newComment, function (err, doc) {
            if (err) {
                console.log(err);
            } else {
                console.log(doc);
                cb(doc);
            }
        });
    },
    delete: function (data, cb) {
        Comment.remove({
            _id: data._id
        }, cb);
    }

}