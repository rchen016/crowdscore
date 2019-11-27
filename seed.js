var mongoose         = require("mongoose")
    RatingSystem     = require("./models/RatingSystem");
var ratingSeed = [
    {
        contentPath: "/series/1859",
        rating: 89
    },
    {
        contentPath: "/series/161",
        rating: 99
    }
];

function seedDB(){
    RatingSystem.remove({},function(){
	 console.log("removed all ratings");
   });
}
