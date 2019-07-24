import Chart from 'chart.js';
// Our labels along the x-axis
let years = [
  1998,
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017
];
// For drawing the lines
let count = [
  2030,
  1973,
  2181,
  2396,
  2607,
  2218,
  2474,
  4500,
  4697,
  5099,
  6002,
  6736,
  7380,
  9050,
  8959,
  9205,
  11908,
  12215,
  15200,
  14926
];

const API_BIKE_DATA_BY_ID = process.env.API_URL + "bike_count/";

let bikeCountChart;

export function showChart (ctx) {

  if (ctx) {
    bikeCountChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: years,
        datasets: [
          {
            data: count,
            label: 'number of cyclists per year',
            borderColor: 'rgba(185, 206, 228, .1)',
            fill: '#f9b138',
            backgroundColor: '#f9b138'
          }
        ]
      },
      options: {
        responsive: true,
      }
    });
  }
}


export function onChangeLanguage(lang, translation) {
  if (!bikeCountChart) {
    return;
  }

  bikeCountChart.data.datasets[0].label = translation['graph_legend'][lang];
  bikeCountChart.update;
}

export function onSelectedBikeStation(stationId, stationName) {
  // fetch(API_BIKE_DATA_BY_ID + stationId)
  // .then(res => res.json())
  // .then(data => {

  // })
}
