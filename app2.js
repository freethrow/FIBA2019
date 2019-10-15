var countryDataset;
var initialData;

var stat2 = "PPG";

var statName2 = "Points Per Game";

const margins2 = { top: 80, right: 80, bottom: 140, left: 120 };
const graphWidth2 = 880 - margins2.left - margins2.right;
const graphHeight2 = 880 - margins2.top - margins2.bottom;

d3.json("teams.json").then(function(data) {
  data.forEach(function(d) {
    d.Rebounds = +d.OffensiveReboundsTotal + +d.DefensiveReboundsTotal;
    d.APG = +d.AssistsTotal / +d.GamesPlayedTotal;
    d.PPG = +d.PointsTotal / +d.GamesPlayedTotal;
    d.RPG = +d.Rebounds / +d.GamesPlayedTotal;
    d.MinPG = +d.Minutes / +d.GamesPlayedTotal;
    d.TOPG = +d.TurnOversTotal / +d.GamesPlayedTotal;
    d.FoulsPG = +d.PersonalFoulsTotal / +d.GamesPlayedTotal;
    d.EffPG = +d.Efficiency / +d.GamesPlayedTotal;
    d.DefRebsPG = +d.DefensiveReboundsTotal / +d.GamesPlayedTotal;
    d.OffRebsPG = +d.OffensiveReboundsTotal / +d.GamesPlayedTotal;
    d.ThreePTSA = +d.FieldGoals3PointsAttemptedTotal / +d.GamesPlayedTotal;
    d.ThreePTSM = +d.FieldGoals3PointsMadeTotal / +d.GamesPlayedTotal;
    d.ThreePTSPCT =
      +d.FieldGoals3PointsMadeTotal / +d.FieldGoals3PointsAttemptedTotal;
  });

  countryDataset = data;
  initialData = data;

  console.log(data);
  generateChart2("PPG");
});

d3.select("#stat2").on("change", function() {
  stat2 = d3.select(this).property("value");
  statName2 = d3.select("#stat2 option:checked").text();

  generateChart2(stat2);

  sortButton2 = document.body.querySelector("#sort2");
  sortButton2.hidden = false;
});

// SETUP CHART
// margins

const svg2 = d3
  .select("#chart-two")
  .append("svg")
  .attr("width", 880)
  .attr("height", 880);

const graph2 = svg2
  .append("g")
  .attr("width", graphWidth2)
  .attr("height", graphHeight2)
  .attr("transform", `translate(${margins2.left},${margins2.top})`);

// the x-axis to accomodate the max value
const xAxisGroup2 = graph2
  .append("g")
  .attr("transform", `translate(0,${graphHeight2})`);

// the y-axis to accomodate the 32 teams
const yAxisGroup2 = graph2.append("g");

// scales - without domain-specific attributes

x2 = d3.scaleLinear().range([0, graphWidth2]);

y2 = d3
  .scaleBand()
  .paddingInner(0.2)
  .paddingOuter(0.2)
  .range([0, graphHeight2]);

var myColor = d3.scaleSequential()




const xaxis2 = d3.axisBottom(x2).ticks(10);
const yaxis2 = d3.axisLeft(y2);






// generate chart 2

generateChart2 = stat2 => {
  // We re working with the countryDataset


    // sort the data by rank
  countryDataset = countryDataset.sort(function(a, b) {
    return (a['Rank'] - b['Rank'])
  });


  var maxDomain2 = d3.max(countryDataset, d => d[stat2]);
  var minDomain2 = d3.min(countryDataset, d => d[stat2]);

  var avg = d3.mean(countryDataset, d => d[stat2]);

 myColor.domain([minDomain2, maxDomain2]);

  if (minDomain2 > 0) {
    minDomain2 = 0;
  }

  if (['FoulsPG','TOPG'].includes(stat2)){
  myColor.interpolator(d3.interpolateYlOrRd)
}
else
{
  myColor.interpolator(d3.interpolateYlGnBu);
}

  x2.domain([minDomain2, maxDomain2]);
  y2.domain(countryDataset.map(item => item.OfficialName));
  



  // join the data
  const rects2 = graph2.selectAll("rect").data(countryDataset);

  const label_two = graph2.selectAll(".lb2").data(countryDataset);



  // remove exit selection
  //rects2.exit().remove();

  // append the enter selection

  rects2
    .enter()
    .append("rect")


    .attr("fill", d => {
      return myColor(d[stat2]);
    })
    .attr("y", (d, i) => y2(d.OfficialName))
    .attr("class", "bar2")
    .attr("width", 0)
    .attr("x", 0)
    .attr("height", y2.bandwidth)
    .transition()
    .duration(1000)
    .attr("width", d => x2(d[stat2]))

  

  rects2.exit().remove();
  


  rects2
   .attr("fill", d => {
       return myColor(d[stat2]);
    })
    .attr("y", (d, i) => y2(d.OfficialName))
    .attr("class", "bar2")
    .attr("width", 0)
    .attr("x", 0)
    .attr("height", y2.bandwidth)
    .transition()
    .duration(1000)
    .attr("width", d => x2(d[stat2]));

  

d3.selectAll('.bar2').on("mouseover", function(d) {   
            tooltip.transition()    
                .duration(200)    
                .style("opacity", 1);    
            tooltip.html(d.OfficialName)  
                .style("left", (d3.event.pageX) + "px")   
                .style("top", (d3.event.pageY) + "px");  
            })          
        .on("mouseout", function(d) {   
            tooltip.transition()    
                .duration(500)    
                .style("opacity", 0); 
        });


    label_two
    .data(countryDataset)
    .enter()

    .append("text")
    .attr("y", d => y2(d.OfficialName)+12)
      .attr("fill", d => {
      if (d[stat2] == maxDomain2) {
        return "#fff";
      }
      return "#000";
    })

    .attr("x", 0)    
    .attr("text-anchor", "right")
    .attr("font-size","10px")
    .text(function(d) {
      return d[stat2].toFixed(2)
    })
    .attr("class","lb2")
    .transition()
    .duration(1000)
   .attr("x", function(d){
         return x2(d[stat2])+10}
  );



    label_two.exit().remove();


    label_two
    .text(function(d) {
      return d[stat2].toFixed(2)
    })    
    .transition()
    .duration(1000)
    .attr("y", d => y2(d.OfficialName)+12)
    .attr("fill", "#000")
    .attr("font-weight",700)
    .attr("class","lb2")
   .attr("x", function(d){
         return x2(d[stat2])+10});



    d3.selectAll(".avg-line").remove();
    d3.selectAll(".avgText").remove();


    graph2  
    .append("line")
    .attr('class','avg-line')
    .attr("y1",0)
    .attr("y2",graphHeight2)
    .style("z-index",3) 
    .attr("x1",0)
    .attr("x2",0) 
    .transition()
    .duration(1000)
    .attr("x1",x2(avg))
    .attr("x2",x2(avg))
    .style("stroke", "red");

    graph2  
    .append("text")
    .attr('class','avgText')
    .attr("font-size","12px")
    .attr("y",-10)
    .text(`Average = ${avg.toFixed(2)}`)
    .attr("x",x2(avg) - 50)  
    .style("stroke", "black");







  xAxisGroup2.call(xaxis2);
  yAxisGroup2.call(yaxis2);



    
};

// top 16

// sort the data

d3.select("#sort2").on("click", function() {
  // sort the data
  countryDataset = countryDataset.sort(function(a, b) {
    return b[stat2] - a[stat2];
  });

  // fix the x domain
  y2.domain(countryDataset.map(item => item.OfficialName));

console.log(countryDataset.map(item => item.OfficialName));
  // move the bars
  svg2
    .selectAll(".bar2")
    .transition()
    .duration(500)
    .attr("y", d => y2(d.OfficialName));

  svg2
    .selectAll(".lb2")
    .text(function(d) {
      return d[stat2].toFixed(2)
    })
    .attr("fill","#000")
    .transition()
    .duration(1000)
    .attr("y", d => y2(d.OfficialName)+12)
    .attr("class","lb2")
    .attr("x", function(d){
         return x2(d[stat2])+10});

  // move the y axis labels

  yAxisGroup2.call(yaxis2);
  sortButton2 = document.body.querySelector("#sort2");
  sortButton2.hidden = true;
    // the line
 
});
