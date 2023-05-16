// set the dimensions and margins of the graph
const margin = {top: 10, right: 30, bottom: 30, left: 30},
        width = 600 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

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
    var parseDate = d3.timeParse("%Y,%b,%d");
    data.forEach(function (d) {
        d.date = parseDate(d.date);
        d.year = +d.year;
        d.month = +d.month;
        d.day = +d.day;
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
    .range([ height, 0]);
    svg.append("g")
    .call(d3.axisLeft(y).tickFormat(d3.timeFormat("%b,%d")));

    // Add dots
    svg.append('g')
    .selectAll("dot")
    .data(data)
    .join("circle")
        .attr("cx", function (d) { return x(d.year); } )
        .attr("cy", function (d) { return y(d.date); } )
        .attr("r", 1.5)
        .style("fill", "#ff375d")

    // similar to above for svg.append line but don't need to call data(data)
    // above and below color, like .style("fill") but with a function instead of a value (if?)
    

})