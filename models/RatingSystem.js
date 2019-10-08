const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// Create Schema
const RatingSystemSchema = new Schema({
    ratingStorage:{
        showName: String,
        ratings: Array
    }
    ///Rating System
    /// Show
    /// [1,2,4,5,10]
    ///if show deosnt exist return 0

});
module.exports = RatingSystemSchema = mongoose.model("ratingsystem", RatingSystemSchema);
