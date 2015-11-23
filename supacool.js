'use strict';

var makeChart = function(data) {
    var ratings = [];
    var movies = [];
    for (var i = 0; i < data.length; i++) {
        ratings.push(data[i].imdbRating);
        movies.push(data[i].Title);
    }

    var width = 900,
        height = 450;

    var y = d3.scale.linear()
        .range([height, 0])
        .domain([0, d3.max(ratings)]);

    var chart = d3.select(".chart")
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / ratings.length;
    
    // var tip = d3.tip()
    //   .attr('class', 'd3-tip')
    //   .offset([-10, 0])
    //   .html(function(d) { return d; })

    // chart.call(tip);

    var bar = chart.selectAll("g.transform")
        .data(ratings)
        .enter().append("g")
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; })
        // .on('mouseover', tip.show)
        // .on('mouseout', tip.hide);

    bar.append("rect")
        .attr("y", function(d) { return y(d); })
        .attr("height", function(d) { return height - y(d); })
        .attr("width", barWidth - 1)
        .attr("fill", function(d) {
            return "rgb( " + (d*20) + " , 0, 0)"
        });

    bar.append("text")
        .attr("x", barWidth / 2)  
        .attr("y", function(d) { return y(d) + 3; })
        .attr("dy", "1em")
        .text(function(d) { return d; });

    bar.append("text")
        .data(movies)
        .attr("x", barWidth/2)
        .attr("y", height-30)
        .text(function(d) { return d; })
        .style("font-size", function(d) {
            if (d.length > 10) {
                return "8px"
            } else {
                return "12px"
            }
        });
}


$.getJSON('shyamalan.json').then(makeChart); // processes the JSON file