const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({

    post : {
        type: String,
        required : true
    },

    like: {
        type: Number,
        default: 0
    },

    retweet: {
        type: Number,
        default: 0
    },

    user : {
        type : mongoose.Types.ObjectId, ref: "Users"
    },

},
{
    timestamps: true
}
)

module.exports = mongoose.model('Post', postSchema)