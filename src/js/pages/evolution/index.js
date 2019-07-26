// -------------------------------------------------------------------
// Dependencies

// Import

// Mine
 import * as HistoricalMap from "./historical-map";
 import * as KmEvolutionChart from "./km-evolution-chart";


// -------------------------------------------------------------------
// Properties
const translations = require('../../../assets/i18n/evolution.json');




// -------------------------------------------------------------------
// Exports

export const name = "evolution";

export const isActive = () => document.getElementById('historical-map') != null;

/**
 * Load the page with the necessary content (map, chart, ...)
 */
export function init(callback) {

  if (isActive()) {
    const mapContainer = document.getElementById('js-map-historical');
    HistoricalMap.showMap(mapContainer);

    const chartContainer =  document.getElementById(`js-canvas-evolution`);
    KmEvolutionChart.init(chartContainer);

    if (callback) {
      return callback(translations)
    }
  }
}


/**
 *
 * @param {string} lang  - The language selected
 */
export function changeLanguage(lang){
  HistoricalMap.onChangeLanguage(lang, translations);
  KmEvolutionChart.onChangeLanguage(
    translations['graph_legend']['region'][lang],
    translations['graph_legend']['gfr'][lang],
    );
}
