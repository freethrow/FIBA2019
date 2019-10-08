var dataset;
var chartData;
var country = "SRB";
var stat = "PPG";
var statName = "Points Per Game";

const mapper = {
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
  PHI: "Philippines",
  LTU: "Lithuania",
  NGR: "Nigeria",
  IRI: "Iran",
  ANG: "Angola",
  CHN: "China",
  MNE: "Montenegro",
  KOR: "South Korea",
  RUS: "Russia",
  PUR: "Puertorico",
  TUN: "Tunisia"
};

const flags = {
  BGD: "BD",
  BEL: "BE",
  BFA: "BF",
  BGR: "BG",
  BIH: "BA",
  BRB: "BB",
  WLF: "WF",
  BLM: "BL",
  BMU: "BM",
  BRN: "BN",
  BOL: "BO",
  BHR: "BH",
  BDI: "BI",
  BEN: "BJ",
  BTN: "BT",
  JAM: "JM",
  BVT: "BV",
  BWA: "BW",
  WSM: "WS",
  BES: "BQ",
  BRA: "BR",
  BHS: "BS",
  JEY: "JE",
  BLR: "BY",
  BLZ: "BZ",
  RUS: "RU",
  RWA: "RW",
  SRB: "RS",
  TLS: "TL",
  REU: "RE",
  TKM: "TM",
  TJK: "TJ",
  ROU: "RO",
  TKL: "TK",
  GNB: "GW",
  GUM: "GU",
  GTM: "GT",
  SGS: "GS",
  GRC: "GR",
  GNQ: "GQ",
  GLP: "GP",
  JPN: "JP",
  GUY: "GY",
  GGY: "GG",
  GUF: "GF",
  GEO: "GE",
  GRD: "GD",
  GBR: "GB",
  GAB: "GA",
  SLV: "SV",
  GIN: "GN",
  GMB: "GM",
  GRL: "GL",
  GIB: "GI",
  GHA: "GH",
  OMN: "OM",
  TUN: "TN",
  JOR: "JO",
  HRV: "HR",
  HTI: "HT",
  HUN: "HU",
  HKG: "HK",
  HND: "HN",
  HMD: "HM",
  VEN: "VE",
  PRI: "PR",
  PSE: "PS",
  PLW: "PW",
  PRT: "PT",
  SJM: "SJ",
  PRY: "PY",
  IRQ: "IQ",
  PAN: "PA",
  PYF: "PF",
  PNG: "PG",
  PER: "PE",
  PAK: "PK",
  PHL: "PH",
  PCN: "PN",
  POL: "PL",
  SPM: "PM",
  ZMB: "ZM",
  ESH: "EH",
  EST: "EE",
  EGY: "EG",
  ZAF: "ZA",
  ECU: "EC",
  ITA: "IT",
  VNM: "VN",
  SLB: "SB",
  ETH: "ET",
  SOM: "SO",
  ZWE: "ZW",
  SAU: "SA",
  ESP: "ES",
  ERI: "ER",
  MNE: "ME",
  MDA: "MD",
  MDG: "MG",
  MAF: "MF",
  MAR: "MA",
  MCO: "MC",
  UZB: "UZ",
  MMR: "MM",
  MLI: "ML",
  MAC: "MO",
  MNG: "MN",
  MHL: "MH",
  MKD: "MK",
  MUS: "MU",
  MLT: "MT",
  MWI: "MW",
  MDV: "MV",
  MTQ: "MQ",
  MNP: "MP",
  MSR: "MS",
  SEÑMRT: "OR",
  IMN: "IM",
  UGA: "UG",
  TZA: "TZ",
  MYS: "MIS",
  MEX: "MX",
  ISR: "IL",
  FRA: "FR",
  IOT: "IO",
  SHN: "SH",
  FIN: "FI",
  FJI: "FJ",
  FLK: "FK",
  FSM: "FM",
  FRO: "FO",
  NIC: "NI",
  NLD: "NL",
  NOR: "NO",
  NAM: "NA",
  VUT: "VU",
  NCL: "NC",
  NER: "NE",
  NFK: "NF",
  NGA: "NG",
  NZL: "NZ",
  NPL: "NP",
  NRU: "NR",
  NIU: "NU",
  COK: "CK",
  XKX: "XK",
  CIV: "CI",
  CHE: "CH",
  COL: "CO",
  CHN: "CN",
  CMR: "CM",
  CHL: "CL",
  CCK: "CC",
  CAN: "CA",
  COG: "CG",
  CAF: "CF",
  COD: "CD",
  CZE: "CZ",
  CYP: "CY",
  CXR: "CX",
  CRI: "CR",
  CUW: "CW",
  CPV: "CV",
  CUB: "CU",
  SWZ: "SZ",
  SYR: "SY",
  SXM: "SX",
  KGZ: "KG",
  KEN: "KE",
  SSD: "SS",
  SUR: "SR",
  KIR: "KI",
  KHM: "KH",
  KNA: "KN",
  COM: "KM",
  STP: "ST",
  SVK: "SK",
  KOR: "KR",
  SVN: "SI",
  PRK: "KP",
  KWT: "KW",
  SEN: "SN",
  SMR: "SM",
  SLE: "SL",
  SYC: "SC",
  KAZ: "KZ",
  CYM: "KY",
  SGP: "SG",
  SWE: "SE",
  SDN: "SD",
  DOM: "DO",
  DMA: "DM",
  DJI: "DJ",
  DNK: "DK",
  VGB: "VG",
  GER: "DE",
  YEM: "YE",
  DZA: "DZ",
  USA: "US",
  URY: "UY",
  MYT: "YT",
  UMI: "UM",
  LBN: "LB",
  LCA: "LC",
  LAO: "LA",
  TUV: "TV",
  TWN: "TW",
  TTO: "TT",
  TUR: "TR",
  LKA: "LK",
  LIE: "LI",
  LVA: "LV",
  TON: "TO",
  LTU: "LT",
  LUX: "LU",
  LBR: "LR",
  LSO: "LS",
  THA: "TH",
  ATF: "TF",
  TGO: "TG",
  TCD: "TD",
  TCA: "TC",
  LBY: "LY",
  VAT: "VA",
  VCT: "VC",
  ARE: "AE",
  AND: "AD",
  ATG: "AG",
  AFG: "AF",
  AIA: "AI",
  VIR: "VI",
  ISL: "IS",
  IRN: "IR",
  ARM: "AM",
  ALB: "AL",
  AGO: "AO",
  ATA: "AQ",
  ASM: "AS",
  ARG: "AR",
  AUS: "AU",
  AUT: "AT",
  ABW: "AW",
  IND: "IN",
  ALA: "AX",
  AZE: "AZ",
  IRL: "IE",
  IDN: "ID",
  UKR: "UA",
  QAT: "QA",
  MOZ: "MZ"
};

d3.csv("fiba_stats.csv").then(function(data) {
  data.forEach(function(d) {
    d.Assists = +d.AssistsTotal;
    d.Points = +d.PointsTotal;
    d.Games = +d.GamesPlayedTotal;
    d.PlusMinus = +d.PlusMinus;
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
  });

  dataset = data;
  //console.log(data);
  generateChart("SRB", "PPG");
});

d3.select("#team").on("change", function() {
  country = d3.select(this).property("value");
  console.log(country);
  generateChart(country, stat);
  // Get current event info
  sortButton = document.body.querySelector("#sort");
  sortButton.hidden = false;
});

d3.select("#stat").on("change", function() {
  stat = d3.select(this).property("value");
  statName = d3.select("#stat option:checked").text();

  generateChart(country, stat);
  sortButton = document.body.querySelector("#sort");
  sortButton.hidden = false;
});

// SETUP CHART
// margins

const margins = { top: 80, right: 40, bottom: 140, left: 40 };
const graphWidth = 800 - margins.left - margins.right;
const graphHeight = 600 - margins.top - margins.bottom;

const svg = d3
  .select("#chart-area")
  .append("svg")
  .attr("width", 800)
  .attr("height", 600);

const graph = svg
  .append("g")
  .attr("width", graphWidth)
  .attr("height", graphHeight)
  .attr("transform", `translate(${margins.left},${margins.top})`);

const xAxisGroup = graph
  .append("g")
  .attr("transform", `translate(0,${graphHeight})`);

const yAxisGroup = graph.append("g");

// scales - without domain-specific attributes

y = d3.scaleLinear().range([graphHeight, 0]);

x = d3
  .scaleBand()
  .paddingInner(0.2)
  .paddingOuter(0.2)
  .range([0, graphWidth]);

var color = d3.scaleSequential(d3.interpolateBlues);

const xaxis = d3.axisBottom(x);
const yaxis = d3.axisLeft(y).ticks(15);

generateChart = (country, stat) => {
  // fix the domains

  if (country == "WRLD") {
    chartData = dataset
      .sort(function(a, b) {
        return a[stat] - b[stat];
      })
      .reverse()
      .slice(0, 10);
  } else {
    chartData = dataset.filter(function(d) {
      return d.Country == country;
    });
  }

  console.log(chartData);

  /*
  chartData = chartData
    .sort(function(a, b) {
      return a[stat] - b[stat];
    })
    .reverse();
*/

  var maxDomain = d3.max(chartData, d => d[stat]);
  var minDomain = d3.min(chartData, d => d[stat]);

  if (minDomain > 0) {
    minDomain = 0;
  }

  y.domain([minDomain, maxDomain]);
  x.domain(chartData.map(item => item.FullName));

  console.log(x.bandwidth());

  color.domain([
    d3.min(chartData, d => d[stat]),
    d3.max(chartData, d => d[stat])
  ]);

  // Remove previous titles
  d3.select("#title").remove();

  // Add the flag
  if (country != "WRLD") {
    const flag = d3
      .select("#flag")
      .html(
        `<div class="flag-icon-background flag-icon-${flags[
          country
        ].toLowerCase()} flag-icon-squared"></div>`
      );
  }

  // Add some title
  const title = graph
    .append("text")
    .text(`${mapper[country]} - ${statName}`)
    .attr("x", graphWidth / 2 - 200)
    .attr("y", -10)
    .attr("width", 600)
    .attr("fill", "#777")
    .attr("id", "title");

  // join the data
  const rects = graph.selectAll("rect").data(chartData);
  const labels = graph.selectAll(".label").data(chartData);

  // remove exit selection
  rects.exit().remove();
  labels.exit().remove();

  // update current shapes
  rects
    //.attr("fill", d => color(d[stat]))
    .attr("fill", d => {
      if (d[stat] == maxDomain) {
        return "#90B4D2";
      }
      return "#ccc";
    })

    .attr("x", d => x(d.FullName))
    .attr("width", x.bandwidth)
    .attr("class", "bar")

    .transition()
    .duration(1000)
    .attr("height", d => graphHeight - y(d[stat]))
    .attr("y", d => y(d[stat]));

  labels
    .attr("fill", d => {
      if (d[stat] == maxDomain) {
        return "#fff";
      }
      return "#000";
    })

    .transition()
    .duration(1000)
    .attr("x", d => x(d.FullName) + x.bandwidth() / 2)
    .attr("y", d => y(d[stat]) + 20)
    .attr("text-anchor", "middle")

    .text(function(d) {
      return d[stat].toFixed(1);
    });

  // append the enter selection
  rects
    .enter()
    .append("rect")
    .attr("fill", d => {
      if (d[stat] == maxDomain) {
        return "#90B4D2";
      }
      return "#ccc";
    })

    .attr("height", 0)
    .attr("y", graphHeight)
    .attr("x", d => x(d.FullName))
    .attr("width", x.bandwidth)
    .attr("class", "bar")
    .transition()
    .duration(1000)
    .attr("y", d => y(d[stat]))
    .attr("height", d => graphHeight - y(d[stat]));

  labels
    .data(chartData)
    .enter()
    .append("text")
    .classed("label", true)

    .attr("fill", "#fff")
    .attr("y", graphHeight)
    .transition()
    .duration(1000)
    .attr("fill", d => {
      if (d[stat] == maxDomain) {
        return "#fff";
      }
      return "#000";
    })

    .attr("x", d => x(d.FullName) + x.bandwidth() / 2)
    .attr("y", d => y(d[stat]) + 20)
    .attr("text-anchor", "middle")
    .text(function(d) {
      return d[stat].toFixed(1);
    });

  xAxisGroup.call(xaxis);
  yAxisGroup.call(yaxis);

  xAxisGroup
    .selectAll("text")
    //.attr("transform", "rotate(-90)")
    .attr("transform", "translate(-12,80), rotate(-80)")
    .attr("text-anchor", "middle")
    .attr("font-family", "Montserrat")
    .attr("class", "xaxis")
    .attr("font-weight", "600")
    .style("font-size", "12");
};

/*
chartData = chartData
.sort(function(a, b) {
  return a[stat] - b[stat];
})
  */

d3.select("#sort").on("click", function() {
  // sort the data
  chartData = chartData.sort(function(a, b) {
    return b[stat] - a[stat];
  });

  // fix the x domain
  x.domain(chartData.map(item => item.FullName));

  // move the bars
  svg
    .selectAll(".bar")
    .transition()
    .duration(500)
    .attr("x", d => x(d.FullName));

  // move the text / number
  svg
    .selectAll(".label")
    .transition()
    .duration(500)
    .attr("x", d => x(d.FullName) + x.bandwidth() / 2)
    .attr("y", d => y(d[stat]) + 20);

  // move the x axis labels
  xAxisGroup.call(xaxis);
  sortButton = document.body.querySelector("#sort");
  sortButton.hidden = true;
});
