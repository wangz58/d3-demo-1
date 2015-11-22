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
            .style("height", function(d) { return "30px" })
            .text(function(d) { return d; })

    d3.select("body").transition()
        .delay(750)
        .style("background-color", "black");
}

$.getJSON('shyamalan.json').then(makeChart); // processes the JSON file