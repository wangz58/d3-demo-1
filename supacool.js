'use strict';

var makeChart = function(data) {
    var ratings = []; //stores the ratings
    var movies = []; //stores the titles of each movie
    for (var i = 0; i < data.length; i++) {
        ratings.push(data[i].imdbRating);
        movies.push(data[i].Title);
    }

    //defining the width and height of our graph
    var width = 900, 
        height = 450;

    var y = d3.scale.linear() //creates a linear scale for the y variable
        .range([height, 0]) //the set of acceptable output
        .domain([0, d3.max(ratings)]); //the set of acceptable input values

    var chart = d3.select(".chart") //creating the chart and setting its length and width
        .attr("width", width)
        .attr("height", height);

    var barWidth = width / ratings.length; //setting the width of each bar in the bar graph

    //adding our data to the bar graph
    var bar = chart.selectAll("g.transform") 
        .data(ratings) //passing in our ratings array
        .enter().append("g") //creating a new g element for every data point
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; }) //positioning the bars correctly


    //each of these rect elements will represent a data point
    bar.append("rect")
        .attr("y", function(d) { return y(d); }) //setting the y-value of each rect to the corresponding rating value
        .attr("height", function(d) { return height - y(d); }) //setting the height of each rect
        .attr("width", barWidth - 1) 
        .attr("fill", function(d) { //simple formula that sets the fill of each bar to be redder the higher the rating is
            return "rgb( " + (d*20) + " , 0, 0)"
        });

    //adding the labels to each bar 
    bar.append("text")
        .attr("x", barWidth / 2)  //making the width of each label half the width of each bar
        .attr("y", function(d) { return y(d) + 3; }) //adding the label near the top of each bar
        .attr("dy", "1em")
        .text(function(d) { return d; }); //setting the text of the label to the rating

    //adding the movie title label near the bottom of each bar
    bar.append("text")
        .data(movies) //passing in our movies array which contains the title of each movie
        .attr("x", barWidth/2)
        .attr("y", height-30) //adding the label near the bottom
        .text(function(d) { return d; })
        .style("font-size", function(d) { //if/else to shrink the font-size if the title is too long
            if (d.length > 10) {
                return "8px"
            } else {
                return "12px"
            }
        });
}


$.getJSON('shyamalan.json').then(makeChart); // processes the JSON file



