'use strict';

var makeChart = function(data) {
    var ratings = [];
    var movies = [];
    for (var i = 0; i < data.length; i++) {
        ratings.push(data[i].imdbRating);
        movies.push(data[i].Title);
    }

    var chart = d3.select(".chart")
        .selectAll("div")
            .data(ratings)
        .enter().append("div")
            .style("width", function(d) { return d*100 + "px"; })
            .style("height", "30px")
            .text(function(d) {return d; })
}


$.getJSON('shyamalan.json').then(makeChart); // processes the JSON file