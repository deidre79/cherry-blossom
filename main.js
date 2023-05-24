// set the dimensions and margins of the graph
const margin = {top: 10, right: 50, bottom: 50, left: 60},
        width = 600 - margin.left - margin.right,
        height = 450 - margin.top - margin.bottom;

// append the svg object to the body of the page
const svg = d3.select("#my_dataviz")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

//Read the data
d3.csv("https://raw.githubusercontent.com/deidre79/cherry-blossom/main/sakura.csv").then( function(data) {

    // Parse the date and convert other necessary fields
    const parseYear = d3.timeParse("%Y");
    const parseDate = d3.timeParse("%m/%d");
    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.year = parseYear(d.year);
    });

    // Add X axis
    const x = d3.scaleTime()
    .domain(d3.extent(data, function (d) {return d.year;}))
    .range([ 0, width ]);
    svg.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x).tickFormat(d3.timeFormat("%Y")));

    // Add Y axis
    const y = d3.scaleTime()
    .domain(d3.extent(data, function (d) {return d.date;}))
    .range([ 0, height]);
    svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d3.timeFormat("%b %d")));

    // adding an x-axis label    
    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 240)
    .attr("y", height + 40)
    .text("year");

    // adding a y-axis label
    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", - 60)
    .attr("x", - 145)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("date of peak bloom");

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        .attr("cx", function (d) { return x(d.year); } )
        .attr("cy", function (d) { return y(d.date); } )
        .attr("r", 2.5)
        .style("fill", "#fed2da")

     // Add horizontal line
    const horizontalLineY = y(parseDate("04/04")); // Y position of the horizontal line
    svg.append("line")
        .style("stroke", "#ff4f71")
        .style("stroke-width", 2)
        .style("stroke-dasharray", "6.5,3") // Set the line to be dashed, value represents a pattern of 6.5 units of stroke followed by 3 units of space
        .attr("x1", 0)
        .attr("y1", horizontalLineY)
        .attr("x2", width)
        .attr("y2", horizontalLineY);

    // above and below color, like .style("fill") but with a function instead of a value (if?)
    

})