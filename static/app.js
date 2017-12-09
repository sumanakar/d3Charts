
var margin = {top: 20, right: 20, bottom: 40, left: 60},
width = 960 - margin.left - margin.right,
height = 500 - margin.top - margin.bottom;

// setup x 
var xValue = function(d) { return d.Proverty;}, // data -> value
  xScale = d3.scale.linear().range([0, width]), // value -> display
  xMap = function(d) { return xScale(xValue(d));}, // data -> display
  xAxis = d3.svg.axis().scale(xScale).orient("bottom");

// setup y
var yValue = function(d) { return d.HealthCare;}, // data -> value
  yScale = d3.scale.linear().range([height, 0]), // value -> display
  yMap = function(d) { return yScale(yValue(d));}, // data -> display
  yAxis = d3.svg.axis().scale(yScale).orient("left");

// add the graph canvas to the body of the webpage
var svg = d3.select("body").append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


// load data
d3.csv("data/data.csv", function(error, data) {

// change string (from CSV) into number format
data.forEach(function(d) {
  d.Proverty = +d.Proverty;
  d.HealthCare = +d.HealthCare;
});

// To avoid dots overlapping axis, add in buffer to data domain
xScale.domain([d3.min(data, xValue)-1, d3.max(data, xValue)+1]);
yScale.domain([d3.min(data, yValue)-1, d3.max(data, yValue)+1]);

// x-axis
svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width/1.5)
    .attr("y", 30)
    .style("text-anchor", "end")
    .text("Proverty(%)")
    .attr({
      "font-size": 15,
      "font-weight":"bold"
    });


// y-axis
svg.append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left + 20)
    .attr("x", 0 - (height / 4))
    .attr("dy", ".71em")
    .style("text-anchor", "end")
    .text("Lack of Healthcare(%)")
    .attr({
      "font-size": 15,
      "font-weight":"bold"
    });

// draw dots
var node = svg.selectAll(".chart")
.data(data)
.enter()
.append('g');

node.append("circle")
.attr("class", "dot")
.attr("cx", xMap)
.attr("cy", yMap)
.attr("r", 20)
.style("fill","lightblue") 
.style("opacity", .9)
.style("stroke-width", ".2")


node.append("text").text(function(d){
  return d.Abbr;
})
.attr("x", xMap)
.attr("y", yMap)
.attr({
  "text-anchor": "middle",
  "font-size": 9,
  "font-weight":"bold",
  "fill":"white"
});

});


 