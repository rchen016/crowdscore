const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RatingSystemSchema = new Schema({
    ratingStorage:{
        ratings: [
            {
                contentPath: String,
                rating: Number
            }
        ]
    },
    rater: String
    ///Rating System
    /// contentPath: /series/#
    /// rating: 1-100
    ///if show deosnt exist return 0

});
module.exports = RatingSystemSchema = mongoose.model("ratingsystem", RatingSystemSchema);
