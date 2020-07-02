// @TODO: YOUR CODE HERE!

var svgWidth = 700;
var svgHeight = 550;

//chart margins 
var margin = {
    top: 20, 
    right: 40, 
    bottom: 70, 
    left: 100
};

var char_width = svgWidth - margin.left - margin.right;
var char_height = svgHeight - margin.top - margin.bottom;

// SVG wrapper
var SVG = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight)
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

// Append
var char_group = SVG.append("g")

// Pull csv 
d3.csv("data.csv").then(function(Data) {

  // format
  Data.forEach(function(data) {
    data.poverty = +data.poverty;
    data.healthcare = +data.healthcare;
  });
  console.log(Data);

//scales for x & y
var xLinearScale=d3.scaleLinear().range([0, char_width])
              .domain([8.1, d3.max(Data, d=> d.poverty)+2]);
            
var yLinearScale = d3.scaleLinear().range([char_height,0])
              .domain([4.1, d3.max(Data, d => d.healthcare)+2]);

// axes
var yAxis = d3.axisLeft(yLinearScale); 
var xAxis = d3.axisBottom(xLinearScale).ticks();

//Set x & y
char_group.append("g")
  .attr("transform", `translate(0, ${char_height})`)
  .call(xAxis);
char_group.append("g")
  .call(yAxis);

//Set values as circles
char_group
      .selectAll("circle")
      .data(Data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r",8)
      .style("fill", "#581845")
      .attr("opacity",'.7');

 //Set state 
  char_group
    .selectAll("#scatter")
    .data(Data)
    .enter()
    .append("text")
    .text(d=>d.abbr)
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare)) 
    .attr("font-size", "7px")
    .attr("text-anchor", "middle")
    .style("fill", "#00FFF7");

  //Append x-axis
  char_group.append("g")
    .attr("transform", `translate(${char_width/2}, ${char_height+20})`);

  char_group.append("text")
    .attr("y", char_height +1.5 *margin.bottom/2)
    .attr("x", char_width/ 2)
    .classed("axis-text", true)
    .text("In Poverty (%)");

  //Append y-axis label
  char_group.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0-margin.left)
    .attr("x", 0 - (char_height / 2))
    .attr("dy", "1em")
    .classed("axis-text", true)
    .text("Lacks Healthcare (%)");
});
