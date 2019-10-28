

var dataset3;
var chartData3;
var country3 = "SRB";
var stat3x = "PPG";
var stat3y = "RPG";
var stat3r = "None";
var stat3c = "None";
var statName3x = "Points Per Game";
var statName3y = "Rebounds Per Game";

const mapper3 = {
  SRB: "Serbia",
  USA: "United States",
  FRA: "France",
  ITA: "Italy",
  BRA: "Brazil",
  ARG: "Argentina",
  GER: "Germany",
  ESP: "Spain",
  AUS: "Australia",
  CAN: "Canada",
  WRLD: "World",
  SEN: "Senegal",
  TUR: "Turkey",
  JOR: "Jordan",
  CIV: "Cote d'Ivoire",
  DOM: "Dominican Republic",
  VEN: "Venezuela",
  PHI: "Philippines",
  GRE: "Greece",
  LTU: "Lithuania",
  CZE: "Czech Republic",
  NGR: "Nigeria",
  IRI: "Iran",
  ANG: "Angola",
  CHN: "China",
  MNE: "Montenegro",
  KOR: "South Korea",
  RUS: "Russia",
  PUR: "Puertorico",
  TUN: "Tunisia",

};


/*

SCATTER PLOT - 2D x and y
- radius and color optional

x - points per game
y - rebounds per game


*/


d3.csv("fiba_stats.csv").then(function(data3) {
  data3.forEach(function(d) {
    d.Assists = +d.AssistsTotal;
    d.Points = +d.PointsTotal;
    d.Games = +d.GamesPlayedTotal;
    d.PlusMinus = +d.PlusMinus;
    d.PlusMinusPG = +d.PlusMinus / +d.GamesPlayedTotal;
    d.Minutes = +d.MinutesTotal;
    d.Rebounds = +d.OffensiveReboundsTotal + +d.DefensiveReboundsTotal;
    d.APG = +d.AssistsTotal / +d.GamesPlayedTotal;
    d.PPG = +d.PointsTotal / +d.GamesPlayedTotal;
    d.RPG = +d.Rebounds / +d.GamesPlayedTotal;
    d.MinPG = +d.Minutes / +d.GamesPlayedTotal;
    d.FoulsPG = +d.PersonalFoulsTotal / +d.GamesPlayedTotal;
    d.EffPG = +d.Efficiency / +d.GamesPlayedTotal;
    d.DefRebsPG = +d.DefensiveReboundsTotal / +d.GamesPlayedTotal;
    d.OffRebsPG = +d.OffensiveReboundsTotal / +d.GamesPlayedTotal;
    d.fg2pct = +d.FieldGoals2PointsAttemptedTotal? +d.FieldGoals2PointsMadeTotal / +d.FieldGoals2PointsAttemptedTotal:0;
    d.fg3pct =  +d.FieldGoals3PointsAttemptedTotal? +d.FieldGoals3PointsMadeTotal/+d.FieldGoals3PointsAttemptedTotal:0;
    d.ftpct = +d.FreeThrowsAttemptedTotal? +d.FreeThrowsMadeTotal/+d.FreeThrowsAttemptedTotal:0;
    d.ftPG = +d.FreeThrowsAttemptedTotal / d.GamesPlayedTotal;
    d.efgpct = (+d.FieldGoals2PointsMadeTotal + +d.FieldGoals3PointsMadeTotal*1.5) / (+d.FieldGoals2PointsAttemptedTotal + +d.FieldGoals3PointsAttemptedTotal);
  });

  dataset3 = data3;

  generateChart3("SRB", "PPG", "RPG", "None", "None");
});

d3.select("#team3").on("change", function() {
  country3 = d3.select(this).property("value");
  console.log(country3);
  generateChart3(country3, stat3x, stat3y, stat3r, stat3c);

});

d3.select("#stat3x").on("change", function() {
  stat3x = d3.select(this).property("value");
  statName3x = d3.select("#stat3x option:checked").text();
  console.log("stat3x:",stat3x, "stat3y:", stat3y, "country:",country3);
  generateChart3(country3, stat3x, stat3y, stat3r, stat3c);

});

d3.select("#stat3y").on("change", function() {
  stat3y = d3.select(this).property("value");
  statName3y = d3.select("#stat3y option:checked").text();
  console.log("stat3x:",stat3x, "stat3y:", stat3y, "country:",country3);
  generateChart3(country3, stat3x, stat3y, stat3r, stat3c);

});

d3.select("#stat3r").on("change", function() {
  stat3r = d3.select(this).property("value");
  statName3r = d3.select("#stat3r option:checked").text();
  generateChart3(country3, stat3x, stat3y, stat3r, stat3c);

});

d3.select("#stat3c").on("change", function() {
  stat3c = d3.select(this).property("value");
  statName3c = d3.select("#stat3c option:checked").text();

  generateChart3(country3, stat3x, stat3y, stat3r, stat3c);
});


// SETUP CHART
// margins

const margins3 = { top: 80, right: 80, bottom: 140, left: 40 };
const graphWidth3 = 800 - margins3.left - margins3.right;
const graphHeight3 = 600 - margins3.top - margins3.bottom;

const svg3 = d3
  .select("#chart-three")
  .append("svg")
  .attr("width", 800)
  .attr("height", 600);

const graph3 = svg3
  .append("g")
  .attr("width", graphWidth3)
  .attr("height", graphHeight3)
  .attr("transform", `translate(${margins3.left},${margins3.top})`);

const xAxisGroup3 = graph3
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);

const yAxisGroup3 = graph3.append("g");

// scales - without domain-specific attributes

y3 = d3.scaleLinear().range([graphHeight3, 0]);
x3 = d3.scaleLinear().range([0, graphWidth3]);


radius = d3.scaleLinear().range([10, 40]);

color3 = d3.scaleSequential(d3.interpolatePuBuGn);

const xaxis3 = d3.axisBottom(x3);
const yaxis3 = d3.axisLeft(y3).ticks(15);




generateChart3 = (country3, stat3x, stat3y, stat3r, stat3c) => {
  // fix the domains

    chartData3 = dataset3.filter(function(d) {
      return d.Country == country3;
    });
 
    console.log("CALLED WITH: ",country3, stat3x, stat3y, stat3r, stat3c);

  var y_maxDomain = d3.max(chartData3, d => d[stat3y]);
  var y_minDomain = d3.min(chartData3, d => d[stat3y]);

  console.log('Y domain: ', y_maxDomain,y_minDomain);
  

  var x_maxDomain = d3.max(chartData3, d => d[stat3x]);
  var x_minDomain = d3.min(chartData3, d => d[stat3x]);
 

  // later
  var radius_max = d3.max(chartData3, d => d[stat3r]);
  var radius_min = d3.min(chartData3, d => d[stat3r]);

  

  
  y3.domain([y_minDomain, y_maxDomain]);  
  x3.domain([x_minDomain, x_maxDomain]);

  radius.domain([radius_min, radius_max]);

  color3.domain([
    d3.min(chartData3, d => d[stat3c]),
    d3.max(chartData3, d => d[stat3c])
  ]);





  console.log('Color domain: ', d3.min(chartData3, d => d[stat3c]),d3.max(chartData3, d => d[stat3c]));

  var tip = d3.tip().attr('class', 'd3-tip').direction('e').offset([0,5])
  .html(function(d) {
      var content = `<strong>${d.FullName}</strong><br/>PointsPG:<strong>${d.PPG.toFixed(1)}</strong>
      <br/>AssPG:<strong>${d.APG.toFixed(1)}</strong>
      <br/>RebPG:<strong>${d.RPG.toFixed(1)}</strong>
      <br/>Eff %:<strong>${parseFloat(100*d.efgpct).toFixed(0)}%</strong>`           
      return content;
  });

svg.call(tip);


  // join the data
  const circles = graph3.selectAll("circle").data(chartData3);
 

  // remove exit selection
  circles.exit().remove();


  // update current shapes
  circles    
 
    .attr("stroke-width",1)
    .attr("stroke","black")
    .attr("opacity",0.75)
    .transition()
    .duration(1000)
    .attr("fill", d => {
      if (stat3c=='None'){
        return "steelblue"
      }
      return color3(d[stat3c]);
    })
      .attr("r",d => {
        if (stat3r=='None'){
          return 20
        }
        return radius(d[stat3r]);
      })
    .attr("cx", d => x3(d[stat3x]))
    .attr("cy",d => y3(d[stat3y]));



  // append the enter selection
  circles
    .enter()
    .append("circle")

    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)

    .attr("fill", d => {
      if (stat3c=='None'){
        return "steelblue"
      }
      return color3(d[stat3c]);
    })
    .attr("r",d => {
      if (stat3r=='None'){
        return "20"
      }
      return radius(d[stat3r]);
    })
    .attr("stroke-width",1)
    .attr("stroke","black")
    .attr("opacity",0.75)
    .attr("cx", d => x3(d[stat3x]))
    .attr("cy",d => y3(d[stat3y])); 



    xAxisGroup3.call(xaxis3);
    yAxisGroup3.call(yaxis3);

  xAxisGroup3
    .selectAll("text")
    //.attr("transform", "rotate(-90)")
    .attr("transform", "translate(0,0), rotate(0)")
    .attr("text-anchor", "middle")
    .attr("font-family", "Montserrat")
    .attr("class", "xaxis")
    .attr("font-weight", "600")
    .style("font-size", "12");
};


