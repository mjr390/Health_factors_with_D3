// @TODO: YOUR CODE HERE!
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // Import Data ####### hairData
d3.csv("../assets/data/data.csv").then(function(stateData) {
    // if (err) throw err;
  
    // Step 1: Parse Data/Cast as numbers
     // ==============================
     stateData.forEach(function(data) {
      data.poverty = +data.poverty;
      data.povertyMoe = +data.povertyMoe;
      data.age = +data.age;
      data.ageMoe = +data.ageMoe;
      data.income = +data.income;
      data.incomeMoe = +data.incomeMoe;
      data.healthcare = +data.healthcare;
      data.healthcareLow = +data.healthcareLow;
      data.healthcareHigh = +data.healthcareHigh;
      data.obesity = +data.obesity;
      data.obesityLow = +data.obesityLow;
      data.obesityHigh = +data.obesityHigh;
      data.smokes = +data.smokes;
      data.smokesLow = +data.smokesLow;
      data.smokesHigh = +data.smokesHigh;
      
    });
  
    // Step 2: Create scale functions
    // ==============================
    var xLinearScale = d3.scaleLinear()
      .domain([20, d3.max(stateData, d => d.age)])
      .range([0, width]);
  
    var yLinearScale = d3.scaleLinear()
      .domain([0, d3.max(stateData, d => d.obesity)])
      .range([height, 0]);
  
    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);
  
    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);
  
    chartGroup.append("g")
      .call(leftAxis);
  
     // Step 5: Create Circles
    // ==============================
    var circlesGroup = chartGroup.selectAll("circle")
    .data(stateData)
    .enter()
    .append("circle")
    .attr("cx", d => xLinearScale(d.age))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", "15")
    .attr("fill", "lightblue")
    .text( d => (d.abbr)) // Maybe here? Doesn't currently do anything
    .attr("opacity", ".5");


    // stateData.forEach(function(data) {
    var testText = chartGroup.selectAll("here")
    // .append("text")
    .data(stateData)
    .enter()
    .append("text")
    .text(function(d){
        return d.abbr;
    })
    .attr("x", d => xLinearScale(d.age)-(margin.right/3))
    
    .attr("y", d => yLinearScale(d.obesity)
    )
    // .attr("fill", "white")
    ;
// });
  
    // Step 6: Initialize tool tip
    // ==============================
    // var toolTip = d3.tip()
    //   .attr("class", "tooltip")
    //   .offset([80, -60])
    //   .html(function(d) {
    //     return (`${d.abbr}<br>Age: ${d.age}<br>Obesity: ${d.obesity}`);
    //   });
  
    // // Step 7: Create tooltip in the chart
    // // ==============================
    // chartGroup.call(toolTip);
  
    // Step 8: Create event listeners to display and hide the tooltip
    // ==============================
    // circlesGroup.on("click", function(data) {
    //   toolTip.show(data);
    // })
    //   // onmouseout event
    //   .on("mouseout", function(data, index) {
    //     toolTip.hide(data);
    //   });
  
    // Create axes labels
    chartGroup.append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 0 - margin.left + 40)
      .attr("x", 0 - (height / 2))
      .attr("dy", "1em")
      .attr("class", "axisText")
      .text("Obesity (%)");
  
    chartGroup.append("text")
      .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
      .attr("class", "axisText")
      .text("Age (Years)");
  });