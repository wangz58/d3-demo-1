'use strict';

var makeChart = function(data) {
    var ratings = [];
    var movies = [];
    for (var i = 0; i < data.length; i++) {
        ratings.push(data[i].imdbRating);
        movies.push(data[i].Title);
    }

    var width = 960,
        height = 500;

    var x = d3.scale.ordinal()
        .domain(movies)
        .rangePoints([0, width]);

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(ratings)]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / ratings.length;
    //x.domain(data.map(function(d) { return d.Title; }));

    var bar = chart.selectAll("g.transform")
        .data(ratings)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);

    bar.append("rect")
        //.attr("x", function(d) { return x(d); })
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); })
        .attr("width", barWidth - 1);

    bar.append("text")
        .attr("x", barWidth / 2)
        .attr("y", function(d) { return y(d) + 3; })
        .attr("dy", ".75em")
        .text(function(d) { return d; });




    // var chart = d3.select(".chart")
    //     .selectAll("div")
    //         .data(ratings)
    //     .enter().append("div")
    //         .style("width", function(d) { return d*100 + "px"; })
    //         .style("height", function(d) { return "30px" })
    //         .text(function(d) { return d; })

    // d3.select("body").transition()
    //     .delay(750)
    //     .style("background-color", "black");
}

function type(d) {
  d.value = +d.value; // coerce to number
  return d;
}

$.getJSON('shyamalan.json').then(makeChart); // processes the JSON file