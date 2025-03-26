/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css":
/*!****************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/main.css ***!
  \****************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Main styles for the Trump-Russia Timeline visualization */\n\n/* ===== Base styling ===== */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: 'Roboto', sans-serif;\n  line-height: 1.6;\n  color: #333;\n  background-color: #f5f5f5;\n  padding: 0;\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.container {\n  flex: 1;\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n/* ===== Header ===== */\nheader {\n  background-color: #1a237e;\n  color: white;\n  padding: 12px 0;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n.header-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.header-title {\n  font-size: 1.6rem;\n  margin: 0;\n  text-align: center;\n}\n\n/* ===== Main visualization layout ===== */\n.visualization-wrapper {\n  display: flex;\n  height: 85vh;\n  min-height: 400px;\n  margin-bottom: 0;\n  position: relative;\n  width: 100%;\n}\n\n.center-container {\n  flex: 1;\n  width: 100%;\n  background: transparent;\n  position: relative;\n  overflow: hidden;\n  min-height: 400px;\n  height: 100%;\n}\n\n.money-container {\n  position: absolute;\n  top: 20px;\n  left: 30px;\n  z-index: 10;\n  background: transparent;\n  overflow: hidden;\n  width: 200px;\n  height: 300px;\n}\n\n/* Remove box styling for money container */\n.money-container.floating {\n  box-shadow: none;\n  border: none;\n}\n\n/* ===== Timeline Controls ===== */\n.timeline-controls {\n  background: white;\n  border-radius: 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);\n  padding: 10px 20px;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.timeline-year-slider {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  gap: 15px;\n}\n\n.timeline-year-slider input {\n  flex: 1;\n  height: 8px;\n  -webkit-appearance: none;\n  background: #ddd;\n  border-radius: 4px;\n  outline: none;\n}\n\n.timeline-year-slider input::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #1a237e;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n\n.timeline-year-slider input::-moz-range-thumb {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #1a237e;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none;\n}\n\n#current-year {\n  font-size: 1.2rem;\n  font-weight: bold;\n  color: #1a237e;\n  min-width: 60px;\n  text-align: center;\n}\n\n/* ===== Filters ===== */\n.filter-row {\n  background: white;\n  border-radius: 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);\n  padding: 12px;\n  display: flex;\n  justify-content: center;\n}\n\n.category-filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  justify-content: center;\n}\n\n.category-filters label {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  background-color: #f1f1f1;\n  font-size: 0.9rem;\n  transition: background-color 0.2s;\n  cursor: pointer;\n}\n\n.category-filters label:hover {\n  background-color: #e0e0e0;\n}\n\n.category-filters input[type=\"checkbox\"] {\n  margin-right: 4px;\n}\n\n/* Category colors */\n.category-filters label[data-category=\"financial\"] {\n  color: #4CAF50;\n  border: 1px solid #4CAF50;\n}\n\n.category-filters label[data-category=\"intelligence\"] {\n  color: #9C27B0;\n  border: 1px solid #9C27B0;\n}\n\n.category-filters label[data-category=\"business\"] {\n  color: #3498db;\n  border: 1px solid #3498db;\n}\n\n.category-filters label[data-category=\"political\"] {\n  color: #e74c3c;\n  border: 1px solid #e74c3c;\n}\n\n.category-filters label[data-category=\"legal\"] {\n  color: #f39c12;\n  border: 1px solid #f39c12;\n}\n\n.category-filters label[data-category=\"personal\"] {\n  color: #7f8c8d;\n  border: 1px solid #7f8c8d;\n}\n\n/* ===== Footer ===== */\nfooter {\n  background-color: #1a237e;\n  color: #fff;\n  text-align: center;\n  padding: 10px 0;\n  font-size: 0.8rem;\n  margin-top: auto;\n}\n\n/* ===== Responsive design ===== */\n@media (max-width: 768px) {\n  .visualization-wrapper {\n    flex-direction: column;\n    height: 80vh;\n  }\n  \n  .center-container {\n    flex: none;\n    height: 100%;\n    width: 100%;\n  }\n  \n  .money-container {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    width: 150px;\n    height: 200px;\n  }\n  \n  .timeline-controls {\n    padding: 10px;\n  }\n  \n  .timeline-year-slider {\n    width: 100%;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/css/main.css"],"names":[],"mappings":"AAAA,4DAA4D;;AAE5D,6BAA6B;AAC7B;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,iCAAiC;EACjC,gBAAgB;EAChB,WAAW;EACX,yBAAyB;EACzB,UAAU;EACV,SAAS;EACT,iBAAiB;EACjB,aAAa;EACb,sBAAsB;AACxB;;AAEA;EACE,OAAO;EACP,WAAW;EACX,eAAe;EACf,cAAc;EACd,UAAU;EACV,aAAa;EACb,sBAAsB;AACxB;;AAEA,uBAAuB;AACvB;EACE,yBAAyB;EACzB,YAAY;EACZ,eAAe;EACf,wCAAwC;AAC1C;;AAEA;EACE,iBAAiB;EACjB,cAAc;EACd,eAAe;EACf,aAAa;EACb,uBAAuB;EACvB,mBAAmB;AACrB;;AAEA;EACE,iBAAiB;EACjB,SAAS;EACT,kBAAkB;AACpB;;AAEA,0CAA0C;AAC1C;EACE,aAAa;EACb,YAAY;EACZ,iBAAiB;EACjB,gBAAgB;EAChB,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,OAAO;EACP,WAAW;EACX,uBAAuB;EACvB,kBAAkB;EAClB,gBAAgB;EAChB,iBAAiB;EACjB,YAAY;AACd;;AAEA;EACE,kBAAkB;EAClB,SAAS;EACT,UAAU;EACV,WAAW;EACX,uBAAuB;EACvB,gBAAgB;EAChB,YAAY;EACZ,aAAa;AACf;;AAEA,2CAA2C;AAC3C;EACE,gBAAgB;EAChB,YAAY;AACd;;AAEA,kCAAkC;AAClC;EACE,iBAAiB;EACjB,gBAAgB;EAChB,yCAAyC;EACzC,kBAAkB;EAClB,SAAS;EACT,aAAa;EACb,mBAAmB;EACnB,SAAS;AACX;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,OAAO;EACP,SAAS;AACX;;AAEA;EACE,OAAO;EACP,WAAW;EACX,wBAAwB;EACxB,gBAAgB;EAChB,kBAAkB;EAClB,aAAa;AACf;;AAEA;EACE,wBAAwB;EACxB,gBAAgB;EAChB,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,wCAAwC;AAC1C;;AAEA;EACE,WAAW;EACX,YAAY;EACZ,kBAAkB;EAClB,mBAAmB;EACnB,eAAe;EACf,wCAAwC;EACxC,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,iBAAiB;EACjB,cAAc;EACd,eAAe;EACf,kBAAkB;AACpB;;AAEA,wBAAwB;AACxB;EACE,iBAAiB;EACjB,gBAAgB;EAChB,yCAAyC;EACzC,aAAa;EACb,aAAa;EACb,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,SAAS;EACT,uBAAuB;AACzB;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,QAAQ;EACR,iBAAiB;EACjB,mBAAmB;EACnB,yBAAyB;EACzB,iBAAiB;EACjB,iCAAiC;EACjC,eAAe;AACjB;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,iBAAiB;AACnB;;AAEA,oBAAoB;AACpB;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA;EACE,cAAc;EACd,yBAAyB;AAC3B;;AAEA,uBAAuB;AACvB;EACE,yBAAyB;EACzB,WAAW;EACX,kBAAkB;EAClB,eAAe;EACf,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA,kCAAkC;AAClC;EACE;IACE,sBAAsB;IACtB,YAAY;EACd;;EAEA;IACE,UAAU;IACV,YAAY;IACZ,WAAW;EACb;;EAEA;IACE,kBAAkB;IAClB,SAAS;IACT,UAAU;IACV,YAAY;IACZ,aAAa;EACf;;EAEA;IACE,aAAa;EACf;;EAEA;IACE,WAAW;EACb;AACF","sourcesContent":["/* Main styles for the Trump-Russia Timeline visualization */\n\n/* ===== Base styling ===== */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nbody {\n  font-family: 'Roboto', sans-serif;\n  line-height: 1.6;\n  color: #333;\n  background-color: #f5f5f5;\n  padding: 0;\n  margin: 0;\n  min-height: 100vh;\n  display: flex;\n  flex-direction: column;\n}\n\n.container {\n  flex: 1;\n  width: 100%;\n  max-width: 100%;\n  margin: 0 auto;\n  padding: 0;\n  display: flex;\n  flex-direction: column;\n}\n\n/* ===== Header ===== */\nheader {\n  background-color: #1a237e;\n  color: white;\n  padding: 12px 0;\n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n.header-content {\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: 0 20px;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n}\n\n.header-title {\n  font-size: 1.6rem;\n  margin: 0;\n  text-align: center;\n}\n\n/* ===== Main visualization layout ===== */\n.visualization-wrapper {\n  display: flex;\n  height: 85vh;\n  min-height: 400px;\n  margin-bottom: 0;\n  position: relative;\n  width: 100%;\n}\n\n.center-container {\n  flex: 1;\n  width: 100%;\n  background: transparent;\n  position: relative;\n  overflow: hidden;\n  min-height: 400px;\n  height: 100%;\n}\n\n.money-container {\n  position: absolute;\n  top: 20px;\n  left: 30px;\n  z-index: 10;\n  background: transparent;\n  overflow: hidden;\n  width: 200px;\n  height: 300px;\n}\n\n/* Remove box styling for money container */\n.money-container.floating {\n  box-shadow: none;\n  border: none;\n}\n\n/* ===== Timeline Controls ===== */\n.timeline-controls {\n  background: white;\n  border-radius: 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);\n  padding: 10px 20px;\n  margin: 0;\n  display: flex;\n  align-items: center;\n  gap: 15px;\n}\n\n.timeline-year-slider {\n  display: flex;\n  align-items: center;\n  flex: 1;\n  gap: 15px;\n}\n\n.timeline-year-slider input {\n  flex: 1;\n  height: 8px;\n  -webkit-appearance: none;\n  background: #ddd;\n  border-radius: 4px;\n  outline: none;\n}\n\n.timeline-year-slider input::-webkit-slider-thumb {\n  -webkit-appearance: none;\n  appearance: none;\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #1a237e;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n}\n\n.timeline-year-slider input::-moz-range-thumb {\n  width: 20px;\n  height: 20px;\n  border-radius: 50%;\n  background: #1a237e;\n  cursor: pointer;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);\n  border: none;\n}\n\n#current-year {\n  font-size: 1.2rem;\n  font-weight: bold;\n  color: #1a237e;\n  min-width: 60px;\n  text-align: center;\n}\n\n/* ===== Filters ===== */\n.filter-row {\n  background: white;\n  border-radius: 0;\n  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12);\n  padding: 12px;\n  display: flex;\n  justify-content: center;\n}\n\n.category-filters {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 15px;\n  justify-content: center;\n}\n\n.category-filters label {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n  padding: 4px 10px;\n  border-radius: 20px;\n  background-color: #f1f1f1;\n  font-size: 0.9rem;\n  transition: background-color 0.2s;\n  cursor: pointer;\n}\n\n.category-filters label:hover {\n  background-color: #e0e0e0;\n}\n\n.category-filters input[type=\"checkbox\"] {\n  margin-right: 4px;\n}\n\n/* Category colors */\n.category-filters label[data-category=\"financial\"] {\n  color: #4CAF50;\n  border: 1px solid #4CAF50;\n}\n\n.category-filters label[data-category=\"intelligence\"] {\n  color: #9C27B0;\n  border: 1px solid #9C27B0;\n}\n\n.category-filters label[data-category=\"business\"] {\n  color: #3498db;\n  border: 1px solid #3498db;\n}\n\n.category-filters label[data-category=\"political\"] {\n  color: #e74c3c;\n  border: 1px solid #e74c3c;\n}\n\n.category-filters label[data-category=\"legal\"] {\n  color: #f39c12;\n  border: 1px solid #f39c12;\n}\n\n.category-filters label[data-category=\"personal\"] {\n  color: #7f8c8d;\n  border: 1px solid #7f8c8d;\n}\n\n/* ===== Footer ===== */\nfooter {\n  background-color: #1a237e;\n  color: #fff;\n  text-align: center;\n  padding: 10px 0;\n  font-size: 0.8rem;\n  margin-top: auto;\n}\n\n/* ===== Responsive design ===== */\n@media (max-width: 768px) {\n  .visualization-wrapper {\n    flex-direction: column;\n    height: 80vh;\n  }\n  \n  .center-container {\n    flex: none;\n    height: 100%;\n    width: 100%;\n  }\n  \n  .money-container {\n    position: absolute;\n    top: 10px;\n    left: 10px;\n    width: 150px;\n    height: 200px;\n  }\n  \n  .timeline-controls {\n    padding: 10px;\n  }\n  \n  .timeline-year-slider {\n    width: 100%;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/css/network-effects.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/css/network-effects.css ***!
  \***************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* \n * Network visualization effects\n * CSS for the network graph visualization, primarily opacity transitions\n */\n\n/* Base network node styling - Cytoscape uses node (not .node) */\nnode {\n  transition: opacity 0.3s ease-in-out;\n}\n\n/* Base network edge styling */\nedge {\n  transition: opacity 0.3s ease-in-out;\n}\n\n/* ========== UMBRELLA STYLING ========== */\n\n/* Trump node - the umbrella handle */\nnode.trump-node {\n  background-color: #ffa500 !important;\n  border-width: 3px !important;\n  border-color: #cc5500 !important;\n  border-style: solid !important;\n  width: 40px !important;\n  height: 40px !important;\n  font-size: 18px !important;\n  font-weight: bold !important;\n  position: fixed !important;\n  z-index: 1000 !important;\n  bottom: 50px !important;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;\n}\n\n/* Event nodes - the umbrella ribs */\n.event-node {\n  border-style: dashed !important;\n  border-width: 2px !important;\n  background-color: #4299e1 !important;\n  color: white !important;\n  text-shadow: 0 0 2px black !important;\n  font-weight: bold !important;\n  z-index: 900 !important;\n  text-overflow: ellipsis !important;\n  max-width: 120px !important;\n  min-width: 30px !important;\n  transition: all 0.3s ease-in-out !important;\n}\n\n.event-node:hover {\n  transform: scale(1.2) !important;\n  z-index: 999 !important;\n}\n\n/* Event connections - umbrella spokes */\n.event-connection {\n  stroke-width: 3px !important;\n  line-color: #718096 !important;\n  curve-style: straight !important;\n  target-arrow-shape: none !important;\n  opacity: 0.9 !important;\n  z-index: 800 !important;\n}\n\n/* Entity connections */\n.entity-connection {\n  stroke-width: 1.5px !important;\n  line-color: #a0aec0 !important;\n  opacity: 0.7 !important;\n  z-index: 700 !important;\n}\n\n/* Different opacity levels for temporal relevance */\n.node-opacity-100 { opacity: 1 !important; }\n.node-opacity-90 { opacity: 0.9 !important; }\n.node-opacity-80 { opacity: 0.8 !important; }\n.node-opacity-70 { opacity: 0.7 !important; }\n.node-opacity-60 { opacity: 0.6 !important; }\n.node-opacity-50 { opacity: 0.5 !important; }\n.node-opacity-40 { opacity: 0.4 !important; }\n.node-opacity-30 { opacity: 0.3 !important; }\n.node-opacity-20 { opacity: 0.2 !important; }\n.node-opacity-10 { opacity: 0.1 !important; }\n\n/* Edge opacity classes match their connected nodes */\n.edge-opacity-100 { opacity: 1 !important; }\n.edge-opacity-90 { opacity: 0.9 !important; }\n.edge-opacity-80 { opacity: 0.8 !important; }\n.edge-opacity-70 { opacity: 0.7 !important; }\n.edge-opacity-60 { opacity: 0.6 !important; }\n.edge-opacity-50 { opacity: 0.5 !important; }\n.edge-opacity-40 { opacity: 0.4 !important; }\n.edge-opacity-30 { opacity: 0.3 !important; }\n.edge-opacity-20 { opacity: 0.2 !important; }\n.edge-opacity-10 { opacity: 0.1 !important; }\n\n/* Date display */\n.date-display {\n  font-size: 24px;\n  font-weight: bold;\n  text-align: center;\n  margin: 10px 0;\n}\n\n/* Event info panel */\n.event-info {\n  position: absolute;\n  bottom: 80px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 8px;\n  padding: 15px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n  max-width: 400px;\n  z-index: 1000;\n}\n\n.event-info h3 {\n  margin-top: 0;\n  margin-bottom: 5px;\n  color: #333;\n}\n\n.event-date {\n  color: #666;\n  font-size: 0.9em;\n  margin-bottom: 10px;\n}\n\n.filtered {\n  opacity: 0 !important;\n  visibility: hidden !important;\n  display: none !important;\n}\n", "",{"version":3,"sources":["webpack://./src/css/network-effects.css"],"names":[],"mappings":"AAAA;;;EAGE;;AAEF,gEAAgE;AAChE;EACE,oCAAoC;AACtC;;AAEA,8BAA8B;AAC9B;EACE,oCAAoC;AACtC;;AAEA,2CAA2C;;AAE3C,qCAAqC;AACrC;EACE,oCAAoC;EACpC,4BAA4B;EAC5B,gCAAgC;EAChC,8BAA8B;EAC9B,sBAAsB;EACtB,uBAAuB;EACvB,0BAA0B;EAC1B,4BAA4B;EAC5B,0BAA0B;EAC1B,wBAAwB;EACxB,uBAAuB;EACvB,oDAAoD;AACtD;;AAEA,oCAAoC;AACpC;EACE,+BAA+B;EAC/B,4BAA4B;EAC5B,oCAAoC;EACpC,uBAAuB;EACvB,qCAAqC;EACrC,4BAA4B;EAC5B,uBAAuB;EACvB,kCAAkC;EAClC,2BAA2B;EAC3B,0BAA0B;EAC1B,2CAA2C;AAC7C;;AAEA;EACE,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA,wCAAwC;AACxC;EACE,4BAA4B;EAC5B,8BAA8B;EAC9B,gCAAgC;EAChC,mCAAmC;EACnC,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA,uBAAuB;AACvB;EACE,8BAA8B;EAC9B,8BAA8B;EAC9B,uBAAuB;EACvB,uBAAuB;AACzB;;AAEA,oDAAoD;AACpD,oBAAoB,qBAAqB,EAAE;AAC3C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;;AAE5C,qDAAqD;AACrD,oBAAoB,qBAAqB,EAAE;AAC3C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;AAC5C,mBAAmB,uBAAuB,EAAE;;AAE5C,iBAAiB;AACjB;EACE,eAAe;EACf,iBAAiB;EACjB,kBAAkB;EAClB,cAAc;AAChB;;AAEA,qBAAqB;AACrB;EACE,kBAAkB;EAClB,YAAY;EACZ,SAAS;EACT,2BAA2B;EAC3B,oCAAoC;EACpC,kBAAkB;EAClB,aAAa;EACb,yCAAyC;EACzC,gBAAgB;EAChB,aAAa;AACf;;AAEA;EACE,aAAa;EACb,kBAAkB;EAClB,WAAW;AACb;;AAEA;EACE,WAAW;EACX,gBAAgB;EAChB,mBAAmB;AACrB;;AAEA;EACE,qBAAqB;EACrB,6BAA6B;EAC7B,wBAAwB;AAC1B","sourcesContent":["/* \n * Network visualization effects\n * CSS for the network graph visualization, primarily opacity transitions\n */\n\n/* Base network node styling - Cytoscape uses node (not .node) */\nnode {\n  transition: opacity 0.3s ease-in-out;\n}\n\n/* Base network edge styling */\nedge {\n  transition: opacity 0.3s ease-in-out;\n}\n\n/* ========== UMBRELLA STYLING ========== */\n\n/* Trump node - the umbrella handle */\nnode.trump-node {\n  background-color: #ffa500 !important;\n  border-width: 3px !important;\n  border-color: #cc5500 !important;\n  border-style: solid !important;\n  width: 40px !important;\n  height: 40px !important;\n  font-size: 18px !important;\n  font-weight: bold !important;\n  position: fixed !important;\n  z-index: 1000 !important;\n  bottom: 50px !important;\n  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3) !important;\n}\n\n/* Event nodes - the umbrella ribs */\n.event-node {\n  border-style: dashed !important;\n  border-width: 2px !important;\n  background-color: #4299e1 !important;\n  color: white !important;\n  text-shadow: 0 0 2px black !important;\n  font-weight: bold !important;\n  z-index: 900 !important;\n  text-overflow: ellipsis !important;\n  max-width: 120px !important;\n  min-width: 30px !important;\n  transition: all 0.3s ease-in-out !important;\n}\n\n.event-node:hover {\n  transform: scale(1.2) !important;\n  z-index: 999 !important;\n}\n\n/* Event connections - umbrella spokes */\n.event-connection {\n  stroke-width: 3px !important;\n  line-color: #718096 !important;\n  curve-style: straight !important;\n  target-arrow-shape: none !important;\n  opacity: 0.9 !important;\n  z-index: 800 !important;\n}\n\n/* Entity connections */\n.entity-connection {\n  stroke-width: 1.5px !important;\n  line-color: #a0aec0 !important;\n  opacity: 0.7 !important;\n  z-index: 700 !important;\n}\n\n/* Different opacity levels for temporal relevance */\n.node-opacity-100 { opacity: 1 !important; }\n.node-opacity-90 { opacity: 0.9 !important; }\n.node-opacity-80 { opacity: 0.8 !important; }\n.node-opacity-70 { opacity: 0.7 !important; }\n.node-opacity-60 { opacity: 0.6 !important; }\n.node-opacity-50 { opacity: 0.5 !important; }\n.node-opacity-40 { opacity: 0.4 !important; }\n.node-opacity-30 { opacity: 0.3 !important; }\n.node-opacity-20 { opacity: 0.2 !important; }\n.node-opacity-10 { opacity: 0.1 !important; }\n\n/* Edge opacity classes match their connected nodes */\n.edge-opacity-100 { opacity: 1 !important; }\n.edge-opacity-90 { opacity: 0.9 !important; }\n.edge-opacity-80 { opacity: 0.8 !important; }\n.edge-opacity-70 { opacity: 0.7 !important; }\n.edge-opacity-60 { opacity: 0.6 !important; }\n.edge-opacity-50 { opacity: 0.5 !important; }\n.edge-opacity-40 { opacity: 0.4 !important; }\n.edge-opacity-30 { opacity: 0.3 !important; }\n.edge-opacity-20 { opacity: 0.2 !important; }\n.edge-opacity-10 { opacity: 0.1 !important; }\n\n/* Date display */\n.date-display {\n  font-size: 24px;\n  font-weight: bold;\n  text-align: center;\n  margin: 10px 0;\n}\n\n/* Event info panel */\n.event-info {\n  position: absolute;\n  bottom: 80px;\n  left: 50%;\n  transform: translateX(-50%);\n  background: rgba(255, 255, 255, 0.9);\n  border-radius: 8px;\n  padding: 15px;\n  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);\n  max-width: 400px;\n  z-index: 1000;\n}\n\n.event-info h3 {\n  margin-top: 0;\n  margin-bottom: 5px;\n  color: #333;\n}\n\n.event-date {\n  color: #666;\n  font-size: 0.9em;\n  margin-bottom: 10px;\n}\n\n.filtered {\n  opacity: 0 !important;\n  visibility: hidden !important;\n  display: none !important;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/main.css ***!
  \*******************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* \n * Trump-Russia Timeline Visualization\n * Main CSS file for general site styling\n */\n\n:root {\n  /* Color palette */\n  --color-primary: #2c3e50;\n  --color-secondary: #34495e;\n  --color-accent: #3498db;\n  --color-light: #ecf0f1;\n  --color-dark: #1a252f;\n  --color-warning: #e74c3c;\n  --color-success: #27ae60;\n  --color-info: #3498db;\n  \n  /* Category colors */\n  --color-financial: #27ae60;   /* Green */\n  --color-intelligence: #8e44ad; /* Purple */\n  --color-business: #3498db;    /* Blue */\n  --color-political: #e74c3c;   /* Red */\n  --color-legal: #f39c12;       /* Orange */\n  --color-personal: #7f8c8d;    /* Gray */\n  \n  /* Typography */\n  --font-primary: 'Roboto', 'Helvetica Neue', Arial, sans-serif;\n  --font-secondary: 'Georgia', 'Times New Roman', serif;\n  --font-size-small: 0.875rem;\n  --font-size-normal: 1rem;\n  --font-size-medium: 1.25rem;\n  --font-size-large: 1.5rem;\n  --font-size-xlarge: 2rem;\n  \n  /* Spacing */\n  --spacing-xs: 0.25rem;\n  --spacing-sm: 0.5rem;\n  --spacing-md: 1rem;\n  --spacing-lg: 1.5rem;\n  --spacing-xl: 2.5rem;\n  \n  /* Borders and shadows */\n  --border-radius-sm: 3px;\n  --border-radius-md: 5px;\n  --border-radius-lg: 10px;\n  --box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n  --box-shadow-hover: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n\n/* Base styling */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml, body {\n  height: 100%;\n  font-family: var(--font-primary);\n  font-size: 16px;\n  line-height: 1.5;\n  color: var(--color-primary);\n  background-color: var(--color-light);\n  overflow-x: hidden;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n}\n\n/* Typography */\nh1, h2, h3, h4, h5, h6 {\n  margin-bottom: var(--spacing-md);\n  font-weight: 700;\n  line-height: 1.2;\n  color: var(--color-primary);\n}\n\nh1 {\n  font-size: var(--font-size-xlarge);\n  margin-top: var(--spacing-lg);\n}\n\nh2 {\n  font-size: var(--font-size-large);\n  margin-top: var(--spacing-lg);\n  padding-bottom: var(--spacing-sm);\n  border-bottom: 1px solid var(--color-secondary);\n}\n\nh3 {\n  font-size: var(--font-size-medium);\n}\n\np {\n  margin-bottom: var(--spacing-md);\n}\n\na {\n  color: var(--color-accent);\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n\na:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n\n/* Page structure */\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--spacing-lg);\n}\n\nheader {\n  background-color: var(--color-primary);\n  color: white;\n  padding: var(--spacing-md) 0;\n}\n\n.header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 var(--spacing-lg);\n}\n\n.header-title {\n  font-size: var(--font-size-large);\n  margin: 0;\n}\n\nmain {\n  margin: var(--spacing-lg) 0;\n}\n\nsection {\n  margin-bottom: var(--spacing-xl);\n}\n\nfooter {\n  background-color: var(--color-secondary);\n  color: white;\n  padding: var(--spacing-lg) 0;\n  text-align: center;\n  margin-top: var(--spacing-xl);\n}\n\n/* Controls and form elements */\n.controls {\n  margin-bottom: var(--spacing-lg);\n  padding: var(--spacing-md);\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n}\n\n.timeline-controls {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-md);\n  margin-bottom: var(--spacing-md);\n}\n\n.filter-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-md);\n}\n\nbutton, .button {\n  display: inline-block;\n  padding: var(--spacing-sm) var(--spacing-md);\n  background-color: var(--color-accent);\n  color: white;\n  border: none;\n  border-radius: var(--border-radius-sm);\n  cursor: pointer;\n  font-size: var(--font-size-normal);\n  transition: background-color 0.2s ease, transform 0.1s ease;\n}\n\nbutton:hover, .button:hover {\n  background-color: var(--color-primary);\n  transform: translateY(-1px);\n}\n\nbutton:active, .button:active {\n  transform: translateY(1px);\n}\n\ninput[type=\"range\"] {\n  width: 100%;\n  flex-grow: 1;\n}\n\ninput[type=\"text\"], select {\n  padding: var(--spacing-sm) var(--spacing-md);\n  border: 1px solid #ddd;\n  border-radius: var(--border-radius-sm);\n  font-size: var(--font-size-normal);\n}\n\ninput[type=\"checkbox\"] {\n  margin-right: var(--spacing-xs);\n}\n\n/* Card styling */\n.card {\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-md);\n  transition: box-shadow 0.2s ease;\n}\n\n.card:hover {\n  box-shadow: var(--box-shadow-hover);\n}\n\n.card-title {\n  margin-top: 0;\n  margin-bottom: var(--spacing-sm);\n}\n\n/* Visualization sections */\n.visualization-container {\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-lg);\n  min-height: 300px;\n}\n\n.details-panel {\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-lg);\n  max-height: 500px;\n  overflow-y: auto;\n}\n\n/* Category badges */\n.category-tag {\n  display: inline-block;\n  padding: var(--spacing-xs) var(--spacing-sm);\n  margin-right: var(--spacing-xs);\n  margin-bottom: var(--spacing-xs);\n  border-radius: var(--border-radius-sm);\n  color: white;\n  font-size: var(--font-size-small);\n  text-transform: uppercase;\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .container {\n    padding: var(--spacing-md);\n  }\n  \n  .timeline-controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n/* Utility classes */\n.text-center { text-align: center; }\n.text-right { text-align: right; }\n.text-left { text-align: left; }\n\n.mt-0 { margin-top: 0; }\n.mb-0 { margin-bottom: 0; }\n.mt-1 { margin-top: var(--spacing-sm); }\n.mb-1 { margin-bottom: var(--spacing-sm); }\n.mt-2 { margin-top: var(--spacing-md); }\n.mb-2 { margin-bottom: var(--spacing-md); }\n.mt-3 { margin-top: var(--spacing-lg); }\n.mb-3 { margin-bottom: var(--spacing-lg); }\n\n.w-100 { width: 100%; }\n.h-100 { height: 100%; }\n\n.flex { display: flex; }\n.flex-wrap { flex-wrap: wrap; }\n.flex-center { justify-content: center; align-items: center; }\n.flex-between { justify-content: space-between; }\n.flex-around { justify-content: space-around; }\n\n.hidden { display: none; }\n.invisible { visibility: hidden; }\n\n/* Error message */\n.error-message {\n  background-color: rgba(231, 76, 60, 0.1);\n  border-left: 4px solid var(--color-warning);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-md);\n  color: var(--color-warning);\n}\n\n/* Loading indicator */\n.loading {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 300px;\n}\n\n.loading::after {\n  content: \"\";\n  width: 50px;\n  height: 50px;\n  border: 5px solid #ddd;\n  border-top-color: var(--color-accent);\n  border-radius: 50%;\n  animation: loading 1s linear infinite;\n}\n\n@keyframes loading {\n  to { transform: rotate(360deg); }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/main.css"],"names":[],"mappings":"AAAA;;;EAGE;;AAEF;EACE,kBAAkB;EAClB,wBAAwB;EACxB,0BAA0B;EAC1B,uBAAuB;EACvB,sBAAsB;EACtB,qBAAqB;EACrB,wBAAwB;EACxB,wBAAwB;EACxB,qBAAqB;;EAErB,oBAAoB;EACpB,0BAA0B,IAAI,UAAU;EACxC,6BAA6B,EAAE,WAAW;EAC1C,yBAAyB,KAAK,SAAS;EACvC,0BAA0B,IAAI,QAAQ;EACtC,sBAAsB,QAAQ,WAAW;EACzC,yBAAyB,KAAK,SAAS;;EAEvC,eAAe;EACf,6DAA6D;EAC7D,qDAAqD;EACrD,2BAA2B;EAC3B,wBAAwB;EACxB,2BAA2B;EAC3B,yBAAyB;EACzB,wBAAwB;;EAExB,YAAY;EACZ,qBAAqB;EACrB,oBAAoB;EACpB,kBAAkB;EAClB,oBAAoB;EACpB,oBAAoB;;EAEpB,wBAAwB;EACxB,uBAAuB;EACvB,uBAAuB;EACvB,wBAAwB;EACxB,0CAA0C;EAC1C,kDAAkD;AACpD;;AAEA,iBAAiB;AACjB;EACE,sBAAsB;EACtB,SAAS;EACT,UAAU;AACZ;;AAEA;EACE,YAAY;EACZ,gCAAgC;EAChC,eAAe;EACf,gBAAgB;EAChB,2BAA2B;EAC3B,oCAAoC;EACpC,kBAAkB;AACpB;;AAEA;EACE,UAAU;EACV,SAAS;AACX;;AAEA,eAAe;AACf;EACE,gCAAgC;EAChC,gBAAgB;EAChB,gBAAgB;EAChB,2BAA2B;AAC7B;;AAEA;EACE,kCAAkC;EAClC,6BAA6B;AAC/B;;AAEA;EACE,iCAAiC;EACjC,6BAA6B;EAC7B,iCAAiC;EACjC,+CAA+C;AACjD;;AAEA;EACE,kCAAkC;AACpC;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,0BAA0B;EAC1B,qBAAqB;EACrB,2BAA2B;AAC7B;;AAEA;EACE,6BAA6B;EAC7B,0BAA0B;AAC5B;;AAEA,mBAAmB;AACnB;EACE,WAAW;EACX,iBAAiB;EACjB,cAAc;EACd,0BAA0B;AAC5B;;AAEA;EACE,sCAAsC;EACtC,YAAY;EACZ,4BAA4B;AAC9B;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,4BAA4B;AAC9B;;AAEA;EACE,iCAAiC;EACjC,SAAS;AACX;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,wCAAwC;EACxC,YAAY;EACZ,4BAA4B;EAC5B,kBAAkB;EAClB,6BAA6B;AAC/B;;AAEA,+BAA+B;AAC/B;EACE,gCAAgC;EAChC,0BAA0B;EAC1B,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;AAC/B;;AAEA;EACE,aAAa;EACb,mBAAmB;EACnB,sBAAsB;EACtB,gCAAgC;AAClC;;AAEA;EACE,aAAa;EACb,eAAe;EACf,sBAAsB;AACxB;;AAEA;EACE,qBAAqB;EACrB,4CAA4C;EAC5C,qCAAqC;EACrC,YAAY;EACZ,YAAY;EACZ,sCAAsC;EACtC,eAAe;EACf,kCAAkC;EAClC,2DAA2D;AAC7D;;AAEA;EACE,sCAAsC;EACtC,2BAA2B;AAC7B;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,WAAW;EACX,YAAY;AACd;;AAEA;EACE,4CAA4C;EAC5C,sBAAsB;EACtB,sCAAsC;EACtC,kCAAkC;AACpC;;AAEA;EACE,+BAA+B;AACjC;;AAEA,iBAAiB;AACjB;EACE,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;EAC7B,0BAA0B;EAC1B,gCAAgC;EAChC,gCAAgC;AAClC;;AAEA;EACE,mCAAmC;AACrC;;AAEA;EACE,aAAa;EACb,gCAAgC;AAClC;;AAEA,2BAA2B;AAC3B;EACE,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;EAC7B,0BAA0B;EAC1B,gCAAgC;EAChC,iBAAiB;AACnB;;AAEA;EACE,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;EAC7B,0BAA0B;EAC1B,gCAAgC;EAChC,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA,oBAAoB;AACpB;EACE,qBAAqB;EACrB,4CAA4C;EAC5C,+BAA+B;EAC/B,gCAAgC;EAChC,sCAAsC;EACtC,YAAY;EACZ,iCAAiC;EACjC,yBAAyB;AAC3B;;AAEA,sBAAsB;AACtB;EACE;IACE,0BAA0B;EAC5B;;EAEA;IACE,sBAAsB;IACtB,oBAAoB;EACtB;AACF;;AAEA,oBAAoB;AACpB,eAAe,kBAAkB,EAAE;AACnC,cAAc,iBAAiB,EAAE;AACjC,aAAa,gBAAgB,EAAE;;AAE/B,QAAQ,aAAa,EAAE;AACvB,QAAQ,gBAAgB,EAAE;AAC1B,QAAQ,6BAA6B,EAAE;AACvC,QAAQ,gCAAgC,EAAE;AAC1C,QAAQ,6BAA6B,EAAE;AACvC,QAAQ,gCAAgC,EAAE;AAC1C,QAAQ,6BAA6B,EAAE;AACvC,QAAQ,gCAAgC,EAAE;;AAE1C,SAAS,WAAW,EAAE;AACtB,SAAS,YAAY,EAAE;;AAEvB,QAAQ,aAAa,EAAE;AACvB,aAAa,eAAe,EAAE;AAC9B,eAAe,uBAAuB,EAAE,mBAAmB,EAAE;AAC7D,gBAAgB,8BAA8B,EAAE;AAChD,eAAe,6BAA6B,EAAE;;AAE9C,UAAU,aAAa,EAAE;AACzB,aAAa,kBAAkB,EAAE;;AAEjC,kBAAkB;AAClB;EACE,wCAAwC;EACxC,2CAA2C;EAC3C,0BAA0B;EAC1B,gCAAgC;EAChC,2BAA2B;AAC7B;;AAEA,sBAAsB;AACtB;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,WAAW;EACX,WAAW;EACX,YAAY;EACZ,sBAAsB;EACtB,qCAAqC;EACrC,kBAAkB;EAClB,qCAAqC;AACvC;;AAEA;EACE,KAAK,yBAAyB,EAAE;AAClC","sourcesContent":["/* \n * Trump-Russia Timeline Visualization\n * Main CSS file for general site styling\n */\n\n:root {\n  /* Color palette */\n  --color-primary: #2c3e50;\n  --color-secondary: #34495e;\n  --color-accent: #3498db;\n  --color-light: #ecf0f1;\n  --color-dark: #1a252f;\n  --color-warning: #e74c3c;\n  --color-success: #27ae60;\n  --color-info: #3498db;\n  \n  /* Category colors */\n  --color-financial: #27ae60;   /* Green */\n  --color-intelligence: #8e44ad; /* Purple */\n  --color-business: #3498db;    /* Blue */\n  --color-political: #e74c3c;   /* Red */\n  --color-legal: #f39c12;       /* Orange */\n  --color-personal: #7f8c8d;    /* Gray */\n  \n  /* Typography */\n  --font-primary: 'Roboto', 'Helvetica Neue', Arial, sans-serif;\n  --font-secondary: 'Georgia', 'Times New Roman', serif;\n  --font-size-small: 0.875rem;\n  --font-size-normal: 1rem;\n  --font-size-medium: 1.25rem;\n  --font-size-large: 1.5rem;\n  --font-size-xlarge: 2rem;\n  \n  /* Spacing */\n  --spacing-xs: 0.25rem;\n  --spacing-sm: 0.5rem;\n  --spacing-md: 1rem;\n  --spacing-lg: 1.5rem;\n  --spacing-xl: 2.5rem;\n  \n  /* Borders and shadows */\n  --border-radius-sm: 3px;\n  --border-radius-md: 5px;\n  --border-radius-lg: 10px;\n  --box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);\n  --box-shadow-hover: 0 4px 10px rgba(0, 0, 0, 0.15);\n}\n\n/* Base styling */\n* {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n}\n\nhtml, body {\n  height: 100%;\n  font-family: var(--font-primary);\n  font-size: 16px;\n  line-height: 1.5;\n  color: var(--color-primary);\n  background-color: var(--color-light);\n  overflow-x: hidden;\n}\n\nbody {\n  padding: 0;\n  margin: 0;\n}\n\n/* Typography */\nh1, h2, h3, h4, h5, h6 {\n  margin-bottom: var(--spacing-md);\n  font-weight: 700;\n  line-height: 1.2;\n  color: var(--color-primary);\n}\n\nh1 {\n  font-size: var(--font-size-xlarge);\n  margin-top: var(--spacing-lg);\n}\n\nh2 {\n  font-size: var(--font-size-large);\n  margin-top: var(--spacing-lg);\n  padding-bottom: var(--spacing-sm);\n  border-bottom: 1px solid var(--color-secondary);\n}\n\nh3 {\n  font-size: var(--font-size-medium);\n}\n\np {\n  margin-bottom: var(--spacing-md);\n}\n\na {\n  color: var(--color-accent);\n  text-decoration: none;\n  transition: color 0.2s ease;\n}\n\na:hover {\n  color: var(--color-secondary);\n  text-decoration: underline;\n}\n\n/* Page structure */\n.container {\n  width: 100%;\n  max-width: 1200px;\n  margin: 0 auto;\n  padding: var(--spacing-lg);\n}\n\nheader {\n  background-color: var(--color-primary);\n  color: white;\n  padding: var(--spacing-md) 0;\n}\n\n.header-content {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: 0 var(--spacing-lg);\n}\n\n.header-title {\n  font-size: var(--font-size-large);\n  margin: 0;\n}\n\nmain {\n  margin: var(--spacing-lg) 0;\n}\n\nsection {\n  margin-bottom: var(--spacing-xl);\n}\n\nfooter {\n  background-color: var(--color-secondary);\n  color: white;\n  padding: var(--spacing-lg) 0;\n  text-align: center;\n  margin-top: var(--spacing-xl);\n}\n\n/* Controls and form elements */\n.controls {\n  margin-bottom: var(--spacing-lg);\n  padding: var(--spacing-md);\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n}\n\n.timeline-controls {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-md);\n  margin-bottom: var(--spacing-md);\n}\n\n.filter-controls {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-md);\n}\n\nbutton, .button {\n  display: inline-block;\n  padding: var(--spacing-sm) var(--spacing-md);\n  background-color: var(--color-accent);\n  color: white;\n  border: none;\n  border-radius: var(--border-radius-sm);\n  cursor: pointer;\n  font-size: var(--font-size-normal);\n  transition: background-color 0.2s ease, transform 0.1s ease;\n}\n\nbutton:hover, .button:hover {\n  background-color: var(--color-primary);\n  transform: translateY(-1px);\n}\n\nbutton:active, .button:active {\n  transform: translateY(1px);\n}\n\ninput[type=\"range\"] {\n  width: 100%;\n  flex-grow: 1;\n}\n\ninput[type=\"text\"], select {\n  padding: var(--spacing-sm) var(--spacing-md);\n  border: 1px solid #ddd;\n  border-radius: var(--border-radius-sm);\n  font-size: var(--font-size-normal);\n}\n\ninput[type=\"checkbox\"] {\n  margin-right: var(--spacing-xs);\n}\n\n/* Card styling */\n.card {\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-md);\n  transition: box-shadow 0.2s ease;\n}\n\n.card:hover {\n  box-shadow: var(--box-shadow-hover);\n}\n\n.card-title {\n  margin-top: 0;\n  margin-bottom: var(--spacing-sm);\n}\n\n/* Visualization sections */\n.visualization-container {\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-lg);\n  min-height: 300px;\n}\n\n.details-panel {\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  box-shadow: var(--box-shadow);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-lg);\n  max-height: 500px;\n  overflow-y: auto;\n}\n\n/* Category badges */\n.category-tag {\n  display: inline-block;\n  padding: var(--spacing-xs) var(--spacing-sm);\n  margin-right: var(--spacing-xs);\n  margin-bottom: var(--spacing-xs);\n  border-radius: var(--border-radius-sm);\n  color: white;\n  font-size: var(--font-size-small);\n  text-transform: uppercase;\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  .container {\n    padding: var(--spacing-md);\n  }\n  \n  .timeline-controls {\n    flex-direction: column;\n    align-items: stretch;\n  }\n}\n\n/* Utility classes */\n.text-center { text-align: center; }\n.text-right { text-align: right; }\n.text-left { text-align: left; }\n\n.mt-0 { margin-top: 0; }\n.mb-0 { margin-bottom: 0; }\n.mt-1 { margin-top: var(--spacing-sm); }\n.mb-1 { margin-bottom: var(--spacing-sm); }\n.mt-2 { margin-top: var(--spacing-md); }\n.mb-2 { margin-bottom: var(--spacing-md); }\n.mt-3 { margin-top: var(--spacing-lg); }\n.mb-3 { margin-bottom: var(--spacing-lg); }\n\n.w-100 { width: 100%; }\n.h-100 { height: 100%; }\n\n.flex { display: flex; }\n.flex-wrap { flex-wrap: wrap; }\n.flex-center { justify-content: center; align-items: center; }\n.flex-between { justify-content: space-between; }\n.flex-around { justify-content: space-around; }\n\n.hidden { display: none; }\n.invisible { visibility: hidden; }\n\n/* Error message */\n.error-message {\n  background-color: rgba(231, 76, 60, 0.1);\n  border-left: 4px solid var(--color-warning);\n  padding: var(--spacing-md);\n  margin-bottom: var(--spacing-md);\n  color: var(--color-warning);\n}\n\n/* Loading indicator */\n.loading {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 300px;\n}\n\n.loading::after {\n  content: \"\";\n  width: 50px;\n  height: 50px;\n  border: 5px solid #ddd;\n  border-top-color: var(--color-accent);\n  border-radius: 50%;\n  animation: loading 1s linear infinite;\n}\n\n@keyframes loading {\n  to { transform: rotate(360deg); }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/moneyCounter.css":
/*!***************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/moneyCounter.css ***!
  \***************************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* \n * Trump-Russia Timeline Visualization\n * CSS for money counter (piggy bank) visualization\n */\n\n/* Container for money counter visualization */\n#piggyBankContainer {\n  width: 100%;\n  height: 300px;\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  position: relative;\n  overflow: hidden;\n}\n\n/* SVG container */\n.money-counter-svg {\n  width: 100%;\n  height: 100%;\n}\n\n/* Main counter text */\n.money-counter-text {\n  font-family: var(--font-primary);\n  font-weight: bold;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  transition: color 0.5s ease;\n}\n\n/* Counter label */\n.money-counter-label {\n  font-family: var(--font-primary);\n  font-weight: normal;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  opacity: 0.8;\n}\n\n/* Money statistics group */\n.money-counter-stats {\n  font-family: var(--font-primary);\n}\n\n/* Coins */\n.coin {\n  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));\n}\n\n/* Piggy bank animation */\n@keyframes piggyBankHappy {\n  0% { transform: rotate(0deg); }\n  25% { transform: rotate(-5deg); }\n  50% { transform: rotate(0deg); }\n  75% { transform: rotate(5deg); }\n  100% { transform: rotate(0deg); }\n}\n\n/* Eyes blinking animation */\n@keyframes blinkEyes {\n  0% { transform: scaleY(1); }\n  50% { transform: scaleY(0.1); }\n  100% { transform: scaleY(1); }\n}\n\n/* Coin drop animation */\n@keyframes coinDrop {\n  0% { \n    transform: translateY(-50px) rotate(0deg); \n    opacity: 0;\n  }\n  10% { \n    opacity: 1; \n  }\n  100% { \n    transform: translateY(200px) rotate(720deg); \n    opacity: 0;\n  }\n}\n\n/* Glow effect for large transactions */\n@keyframes moneyGlow {\n  0% { filter: drop-shadow(0 0 5px rgba(39, 174, 96, 0)); }\n  50% { filter: drop-shadow(0 0 15px rgba(39, 174, 96, 0.5)); }\n  100% { filter: drop-shadow(0 0 5px rgba(39, 174, 96, 0)); }\n}\n\n/* Controls for the money counter */\n.money-counter-controls {\n  display: flex;\n  justify-content: center;\n  gap: var(--spacing-md);\n  margin-top: var(--spacing-md);\n}\n\n.money-counter-controls button {\n  padding: var(--spacing-xs) var(--spacing-md);\n  border-radius: var(--border-radius-sm);\n  background-color: var(--color-accent);\n  color: white;\n  border: none;\n  font-size: var(--font-size-small);\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n\n.money-counter-controls button:hover {\n  background-color: var(--color-primary);\n}\n\n.money-counter-controls button:active {\n  transform: translateY(1px);\n}\n\n.money-counter-controls button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\n.money-counter-controls .play-button {\n  background-color: var(--color-success);\n}\n\n.money-counter-controls .play-button:hover {\n  background-color: #219653;\n}\n\n.money-counter-controls .reset-button {\n  background-color: var(--color-warning);\n}\n\n.money-counter-controls .reset-button:hover {\n  background-color: #c0392b;\n}\n\n/* Speed selector */\n.speed-selector {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n}\n\n.speed-selector label {\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n}\n\n.speed-selector select {\n  padding: 2px 5px;\n  border-radius: var(--border-radius-sm);\n  border: 1px solid #ddd;\n  font-size: var(--font-size-small);\n}\n\n/* Transaction details popup */\n.transaction-details {\n  position: absolute;\n  background-color: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: var(--border-radius-sm);\n  padding: var(--spacing-sm);\n  box-shadow: var(--box-shadow);\n  max-width: 300px;\n  z-index: 10;\n  font-size: var(--font-size-small);\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n\n.transaction-details.visible {\n  opacity: 1;\n}\n\n.transaction-details .transaction-title {\n  font-weight: bold;\n  margin-bottom: var(--spacing-xs);\n}\n\n.transaction-details .transaction-date {\n  color: var(--color-secondary);\n  font-style: italic;\n  margin-bottom: var(--spacing-xs);\n}\n\n.transaction-details .transaction-amount {\n  font-weight: bold;\n  margin-bottom: var(--spacing-xs);\n}\n\n.transaction-details .transaction-amount.positive {\n  color: var(--color-success);\n}\n\n.transaction-details .transaction-amount.negative {\n  color: var(--color-warning);\n}\n\n.transaction-details .transaction-description {\n  margin-top: var(--spacing-xs);\n}\n\n/* Transaction history */\n.transaction-history {\n  margin-top: var(--spacing-md);\n  max-height: 200px;\n  overflow-y: auto;\n  background-color: white;\n  border-radius: var(--border-radius-sm);\n  box-shadow: var(--box-shadow);\n}\n\n.transaction-history-title {\n  padding: var(--spacing-sm);\n  background-color: var(--color-primary);\n  color: white;\n  font-weight: bold;\n  border-top-left-radius: var(--border-radius-sm);\n  border-top-right-radius: var(--border-radius-sm);\n}\n\n.transaction-list {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\n.transaction-item {\n  padding: var(--spacing-sm);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.transaction-item:last-child {\n  border-bottom: none;\n}\n\n.transaction-item-details {\n  flex-grow: 1;\n}\n\n.transaction-item-title {\n  font-weight: bold;\n  font-size: var(--font-size-small);\n}\n\n.transaction-item-date {\n  color: var(--color-secondary);\n  font-size: var(--font-size-small);\n}\n\n.transaction-item-amount {\n  font-weight: bold;\n  font-size: var(--font-size-small);\n}\n\n.transaction-item-amount.positive {\n  color: var(--color-success);\n}\n\n.transaction-item-amount.negative {\n  color: var(--color-warning);\n}\n\n/* Progress bar for animation playback */\n.transaction-progress {\n  margin-top: var(--spacing-sm);\n  width: 100%;\n  height: 5px;\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n\n.transaction-progress-bar {\n  height: 100%;\n  background-color: var(--color-accent);\n  width: 0%;\n  transition: width 0.3s ease;\n}\n\n/* Status text */\n.transaction-status {\n  margin-top: var(--spacing-xs);\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n  text-align: center;\n}\n\n/* Time period selector */\n.time-period-selector {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: var(--spacing-md);\n  padding: var(--spacing-sm);\n  background-color: white;\n  border-radius: var(--border-radius-sm);\n  box-shadow: var(--box-shadow);\n}\n\n.time-period-selector label {\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n}\n\n.time-period-selector select {\n  padding: var(--spacing-xs) var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  border: 1px solid #ddd;\n  font-size: var(--font-size-small);\n}\n\n/* Tooltips */\n.money-tooltip {\n  position: absolute;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: var(--spacing-xs) var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  font-size: var(--font-size-small);\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  z-index: 100;\n}\n\n.money-tooltip.visible {\n  opacity: 1;\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  #piggyBankContainer {\n    height: 250px;\n  }\n  \n  .money-counter-controls {\n    flex-direction: column;\n    align-items: center;\n    gap: var(--spacing-xs);\n  }\n  \n  .money-counter-controls button {\n    width: 100%;\n  }\n  \n  .time-period-selector {\n    flex-direction: column;\n    gap: var(--spacing-xs);\n  }\n  \n  .money-counter-stats {\n    font-size: 10px;\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/moneyCounter.css"],"names":[],"mappings":"AAAA;;;EAGE;;AAEF,8CAA8C;AAC9C;EACE,WAAW;EACX,aAAa;EACb,uBAAuB;EACvB,sCAAsC;EACtC,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA,kBAAkB;AAClB;EACE,WAAW;EACX,YAAY;AACd;;AAEA,sBAAsB;AACtB;EACE,gCAAgC;EAChC,iBAAiB;EACjB,2CAA2C;EAC3C,2BAA2B;AAC7B;;AAEA,kBAAkB;AAClB;EACE,gCAAgC;EAChC,mBAAmB;EACnB,yBAAyB;EACzB,mBAAmB;EACnB,YAAY;AACd;;AAEA,2BAA2B;AAC3B;EACE,gCAAgC;AAClC;;AAEA,UAAU;AACV;EACE,iDAAiD;AACnD;;AAEA,yBAAyB;AACzB;EACE,KAAK,uBAAuB,EAAE;EAC9B,MAAM,wBAAwB,EAAE;EAChC,MAAM,uBAAuB,EAAE;EAC/B,MAAM,uBAAuB,EAAE;EAC/B,OAAO,uBAAuB,EAAE;AAClC;;AAEA,4BAA4B;AAC5B;EACE,KAAK,oBAAoB,EAAE;EAC3B,MAAM,sBAAsB,EAAE;EAC9B,OAAO,oBAAoB,EAAE;AAC/B;;AAEA,wBAAwB;AACxB;EACE;IACE,yCAAyC;IACzC,UAAU;EACZ;EACA;IACE,UAAU;EACZ;EACA;IACE,2CAA2C;IAC3C,UAAU;EACZ;AACF;;AAEA,uCAAuC;AACvC;EACE,KAAK,iDAAiD,EAAE;EACxD,MAAM,oDAAoD,EAAE;EAC5D,OAAO,iDAAiD,EAAE;AAC5D;;AAEA,mCAAmC;AACnC;EACE,aAAa;EACb,uBAAuB;EACvB,sBAAsB;EACtB,6BAA6B;AAC/B;;AAEA;EACE,4CAA4C;EAC5C,sCAAsC;EACtC,qCAAqC;EACrC,YAAY;EACZ,YAAY;EACZ,iCAAiC;EACjC,eAAe;EACf,sCAAsC;AACxC;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,0BAA0B;AAC5B;;AAEA;EACE,sBAAsB;EACtB,mBAAmB;AACrB;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA;EACE,sCAAsC;AACxC;;AAEA;EACE,yBAAyB;AAC3B;;AAEA,mBAAmB;AACnB;EACE,aAAa;EACb,mBAAmB;EACnB,sBAAsB;AACxB;;AAEA;EACE,iCAAiC;EACjC,6BAA6B;AAC/B;;AAEA;EACE,gBAAgB;EAChB,sCAAsC;EACtC,sBAAsB;EACtB,iCAAiC;AACnC;;AAEA,8BAA8B;AAC9B;EACE,kBAAkB;EAClB,uBAAuB;EACvB,oCAAoC;EACpC,sCAAsC;EACtC,0BAA0B;EAC1B,6BAA6B;EAC7B,gBAAgB;EAChB,WAAW;EACX,iCAAiC;EACjC,oBAAoB;EACpB,UAAU;EACV,6BAA6B;AAC/B;;AAEA;EACE,UAAU;AACZ;;AAEA;EACE,iBAAiB;EACjB,gCAAgC;AAClC;;AAEA;EACE,6BAA6B;EAC7B,kBAAkB;EAClB,gCAAgC;AAClC;;AAEA;EACE,iBAAiB;EACjB,gCAAgC;AAClC;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,6BAA6B;AAC/B;;AAEA,wBAAwB;AACxB;EACE,6BAA6B;EAC7B,iBAAiB;EACjB,gBAAgB;EAChB,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;AAC/B;;AAEA;EACE,0BAA0B;EAC1B,sCAAsC;EACtC,YAAY;EACZ,iBAAiB;EACjB,+CAA+C;EAC/C,gDAAgD;AAClD;;AAEA;EACE,qBAAqB;EACrB,UAAU;EACV,SAAS;AACX;;AAEA;EACE,0BAA0B;EAC1B,4CAA4C;EAC5C,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;AACrB;;AAEA;EACE,mBAAmB;AACrB;;AAEA;EACE,YAAY;AACd;;AAEA;EACE,iBAAiB;EACjB,iCAAiC;AACnC;;AAEA;EACE,6BAA6B;EAC7B,iCAAiC;AACnC;;AAEA;EACE,iBAAiB;EACjB,iCAAiC;AACnC;;AAEA;EACE,2BAA2B;AAC7B;;AAEA;EACE,2BAA2B;AAC7B;;AAEA,wCAAwC;AACxC;EACE,6BAA6B;EAC7B,WAAW;EACX,WAAW;EACX,oCAAoC;EACpC,kBAAkB;EAClB,gBAAgB;AAClB;;AAEA;EACE,YAAY;EACZ,qCAAqC;EACrC,SAAS;EACT,2BAA2B;AAC7B;;AAEA,gBAAgB;AAChB;EACE,6BAA6B;EAC7B,iCAAiC;EACjC,6BAA6B;EAC7B,kBAAkB;AACpB;;AAEA,yBAAyB;AACzB;EACE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,6BAA6B;EAC7B,0BAA0B;EAC1B,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;AAC/B;;AAEA;EACE,iCAAiC;EACjC,6BAA6B;AAC/B;;AAEA;EACE,4CAA4C;EAC5C,sCAAsC;EACtC,sBAAsB;EACtB,iCAAiC;AACnC;;AAEA,aAAa;AACb;EACE,kBAAkB;EAClB,oCAAoC;EACpC,YAAY;EACZ,4CAA4C;EAC5C,sCAAsC;EACtC,iCAAiC;EACjC,oBAAoB;EACpB,UAAU;EACV,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,UAAU;AACZ;;AAEA,sBAAsB;AACtB;EACE;IACE,aAAa;EACf;;EAEA;IACE,sBAAsB;IACtB,mBAAmB;IACnB,sBAAsB;EACxB;;EAEA;IACE,WAAW;EACb;;EAEA;IACE,sBAAsB;IACtB,sBAAsB;EACxB;;EAEA;IACE,eAAe;EACjB;AACF","sourcesContent":["/* \n * Trump-Russia Timeline Visualization\n * CSS for money counter (piggy bank) visualization\n */\n\n/* Container for money counter visualization */\n#piggyBankContainer {\n  width: 100%;\n  height: 300px;\n  background-color: white;\n  border-radius: var(--border-radius-md);\n  position: relative;\n  overflow: hidden;\n}\n\n/* SVG container */\n.money-counter-svg {\n  width: 100%;\n  height: 100%;\n}\n\n/* Main counter text */\n.money-counter-text {\n  font-family: var(--font-primary);\n  font-weight: bold;\n  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);\n  transition: color 0.5s ease;\n}\n\n/* Counter label */\n.money-counter-label {\n  font-family: var(--font-primary);\n  font-weight: normal;\n  text-transform: uppercase;\n  letter-spacing: 1px;\n  opacity: 0.8;\n}\n\n/* Money statistics group */\n.money-counter-stats {\n  font-family: var(--font-primary);\n}\n\n/* Coins */\n.coin {\n  filter: drop-shadow(0 3px 3px rgba(0, 0, 0, 0.2));\n}\n\n/* Piggy bank animation */\n@keyframes piggyBankHappy {\n  0% { transform: rotate(0deg); }\n  25% { transform: rotate(-5deg); }\n  50% { transform: rotate(0deg); }\n  75% { transform: rotate(5deg); }\n  100% { transform: rotate(0deg); }\n}\n\n/* Eyes blinking animation */\n@keyframes blinkEyes {\n  0% { transform: scaleY(1); }\n  50% { transform: scaleY(0.1); }\n  100% { transform: scaleY(1); }\n}\n\n/* Coin drop animation */\n@keyframes coinDrop {\n  0% { \n    transform: translateY(-50px) rotate(0deg); \n    opacity: 0;\n  }\n  10% { \n    opacity: 1; \n  }\n  100% { \n    transform: translateY(200px) rotate(720deg); \n    opacity: 0;\n  }\n}\n\n/* Glow effect for large transactions */\n@keyframes moneyGlow {\n  0% { filter: drop-shadow(0 0 5px rgba(39, 174, 96, 0)); }\n  50% { filter: drop-shadow(0 0 15px rgba(39, 174, 96, 0.5)); }\n  100% { filter: drop-shadow(0 0 5px rgba(39, 174, 96, 0)); }\n}\n\n/* Controls for the money counter */\n.money-counter-controls {\n  display: flex;\n  justify-content: center;\n  gap: var(--spacing-md);\n  margin-top: var(--spacing-md);\n}\n\n.money-counter-controls button {\n  padding: var(--spacing-xs) var(--spacing-md);\n  border-radius: var(--border-radius-sm);\n  background-color: var(--color-accent);\n  color: white;\n  border: none;\n  font-size: var(--font-size-small);\n  cursor: pointer;\n  transition: background-color 0.2s ease;\n}\n\n.money-counter-controls button:hover {\n  background-color: var(--color-primary);\n}\n\n.money-counter-controls button:active {\n  transform: translateY(1px);\n}\n\n.money-counter-controls button:disabled {\n  background-color: #ccc;\n  cursor: not-allowed;\n}\n\n.money-counter-controls .play-button {\n  background-color: var(--color-success);\n}\n\n.money-counter-controls .play-button:hover {\n  background-color: #219653;\n}\n\n.money-counter-controls .reset-button {\n  background-color: var(--color-warning);\n}\n\n.money-counter-controls .reset-button:hover {\n  background-color: #c0392b;\n}\n\n/* Speed selector */\n.speed-selector {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-xs);\n}\n\n.speed-selector label {\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n}\n\n.speed-selector select {\n  padding: 2px 5px;\n  border-radius: var(--border-radius-sm);\n  border: 1px solid #ddd;\n  font-size: var(--font-size-small);\n}\n\n/* Transaction details popup */\n.transaction-details {\n  position: absolute;\n  background-color: white;\n  border: 1px solid rgba(0, 0, 0, 0.1);\n  border-radius: var(--border-radius-sm);\n  padding: var(--spacing-sm);\n  box-shadow: var(--box-shadow);\n  max-width: 300px;\n  z-index: 10;\n  font-size: var(--font-size-small);\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n}\n\n.transaction-details.visible {\n  opacity: 1;\n}\n\n.transaction-details .transaction-title {\n  font-weight: bold;\n  margin-bottom: var(--spacing-xs);\n}\n\n.transaction-details .transaction-date {\n  color: var(--color-secondary);\n  font-style: italic;\n  margin-bottom: var(--spacing-xs);\n}\n\n.transaction-details .transaction-amount {\n  font-weight: bold;\n  margin-bottom: var(--spacing-xs);\n}\n\n.transaction-details .transaction-amount.positive {\n  color: var(--color-success);\n}\n\n.transaction-details .transaction-amount.negative {\n  color: var(--color-warning);\n}\n\n.transaction-details .transaction-description {\n  margin-top: var(--spacing-xs);\n}\n\n/* Transaction history */\n.transaction-history {\n  margin-top: var(--spacing-md);\n  max-height: 200px;\n  overflow-y: auto;\n  background-color: white;\n  border-radius: var(--border-radius-sm);\n  box-shadow: var(--box-shadow);\n}\n\n.transaction-history-title {\n  padding: var(--spacing-sm);\n  background-color: var(--color-primary);\n  color: white;\n  font-weight: bold;\n  border-top-left-radius: var(--border-radius-sm);\n  border-top-right-radius: var(--border-radius-sm);\n}\n\n.transaction-list {\n  list-style-type: none;\n  padding: 0;\n  margin: 0;\n}\n\n.transaction-item {\n  padding: var(--spacing-sm);\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n\n.transaction-item:last-child {\n  border-bottom: none;\n}\n\n.transaction-item-details {\n  flex-grow: 1;\n}\n\n.transaction-item-title {\n  font-weight: bold;\n  font-size: var(--font-size-small);\n}\n\n.transaction-item-date {\n  color: var(--color-secondary);\n  font-size: var(--font-size-small);\n}\n\n.transaction-item-amount {\n  font-weight: bold;\n  font-size: var(--font-size-small);\n}\n\n.transaction-item-amount.positive {\n  color: var(--color-success);\n}\n\n.transaction-item-amount.negative {\n  color: var(--color-warning);\n}\n\n/* Progress bar for animation playback */\n.transaction-progress {\n  margin-top: var(--spacing-sm);\n  width: 100%;\n  height: 5px;\n  background-color: rgba(0, 0, 0, 0.1);\n  border-radius: 2px;\n  overflow: hidden;\n}\n\n.transaction-progress-bar {\n  height: 100%;\n  background-color: var(--color-accent);\n  width: 0%;\n  transition: width 0.3s ease;\n}\n\n/* Status text */\n.transaction-status {\n  margin-top: var(--spacing-xs);\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n  text-align: center;\n}\n\n/* Time period selector */\n.time-period-selector {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-top: var(--spacing-md);\n  padding: var(--spacing-sm);\n  background-color: white;\n  border-radius: var(--border-radius-sm);\n  box-shadow: var(--box-shadow);\n}\n\n.time-period-selector label {\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n}\n\n.time-period-selector select {\n  padding: var(--spacing-xs) var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  border: 1px solid #ddd;\n  font-size: var(--font-size-small);\n}\n\n/* Tooltips */\n.money-tooltip {\n  position: absolute;\n  background-color: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: var(--spacing-xs) var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  font-size: var(--font-size-small);\n  pointer-events: none;\n  opacity: 0;\n  transition: opacity 0.2s ease;\n  z-index: 100;\n}\n\n.money-tooltip.visible {\n  opacity: 1;\n}\n\n/* Responsive design */\n@media (max-width: 768px) {\n  #piggyBankContainer {\n    height: 250px;\n  }\n  \n  .money-counter-controls {\n    flex-direction: column;\n    align-items: center;\n    gap: var(--spacing-xs);\n  }\n  \n  .money-counter-controls button {\n    width: 100%;\n  }\n  \n  .time-period-selector {\n    flex-direction: column;\n    gap: var(--spacing-xs);\n  }\n  \n  .money-counter-stats {\n    font-size: 10px;\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/network.css":
/*!**********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/network.css ***!
  \**********************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* Network Visualization Styles */\n\n/* Make the umbrella layout more obvious */\n#network-container {\n  background-color: #f9f9f9;\n  background-image: linear-gradient(to bottom, rgba(173, 216, 230, 0.2), rgba(255, 255, 255, 0.9));\n}\n\n/* Umbrella specific styles - Make Trump node more distinctive and fixed at bottom */\n.trump-node {\n  background-color: #FFA500 !important; /* Orange */\n  border-width: 4px !important;\n  border-color: #d93025 !important;\n  height: 35px !important;\n  width: 35px !important;\n  font-size: 16px !important;\n  font-weight: bold !important;\n  z-index: 100 !important;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;\n  position: absolute !important; \n  bottom: 50px !important;\n}\n\n/* Event nodes in umbrella layout */\n.event-node {\n  background-color: #3498db !important;\n  border-style: dashed !important;\n  border-width: 2px !important;\n  border-color: #2980b9 !important;\n  transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out !important;\n}\n\n.event-node:hover {\n  transform: scale(1.1) !important;\n  z-index: 10 !important;\n}\n\n/* Event connections (umbrella spokes) */\n.event-connection {\n  width: 2px !important;\n  line-color: #7f8c8d !important;\n  target-arrow-color: #7f8c8d !important;\n  curve-style: straight !important;\n  opacity: 0.7 !important;\n}\n\n/* Entity connections */\n.entity-connection {\n  width: 1.5px !important;\n  line-color: #95a5a6 !important;\n  target-arrow-color: #95a5a6 !important;\n  curve-style: bezier !important;\n  opacity: 0.6 !important;\n}\n\n/* Container */\n#network-container {\n  width: 100%;\n  height: 500px;\n  background-color: #f9f9f9;\n  border-radius: 5px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  position: relative;\n}\n\n/* Node Styles */\n.network-node {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n/* Trump Node (T) */\n.trump-node {\n  background-color: #FFA500 !important; /* Orange */\n}\n\n/* Russian Node (R) */\n.russian-node {\n  background-color: #FF0000 !important; /* Red */\n}\n\n/* Intermediary Node (T/R) */\n.intermediary-node {\n  background-color: #FF6347 !important; /* Tomato */\n}\n\n/* Edge Styles */\n.network-edge {\n  opacity: 0.7;\n  transition: opacity 0.2s ease;\n}\n\n/* Hide filtered elements */\n.filtered {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n/* Fade non-highlighted elements */\n.faded {\n  opacity: 0.2 !important;\n}\n\n/* Highlight styles */\n.highlighted {\n  z-index: 999 !important;\n}\n\n/* Add a label for the timeline bottom */\n.timeline-year-label {\n  text-align: center;\n  font-weight: bold;\n  margin-top: 10px;\n  font-size: 18px;\n}\n\n/* Custom style to make node labels more readable */\n.node-label {\n  text-shadow: 0 0 3px #000;\n  font-weight: bold;\n}\n\n/* Customize the Cytoscape.js styles */\n.cytoscape-container {\n  background-color: #f8f9fa;\n}\n\n/* Target Trump nodes specifically */\nnode[type=\"trump\"] {\n  background-color: #FFA500;\n  color: #000;\n  font-size: 24px;\n  text-outline-width: 0;\n}\n\n/* Target Russian nodes specifically */\nnode[type=\"russian\"] {\n  background-color: #FF0000;\n  color: #000;\n  font-size: 24px;\n  text-outline-width: 0;\n}\n\n/* Target intermediary nodes specifically */\nnode[type=\"intermediary\"] {\n  background-color: #FF6347;\n  color: #000;\n  font-size: 18px;\n  text-outline-width: 0;\n}\n\n/* Make sure arrows are visible */\nedge {\n  curve-style: bezier;\n  target-arrow-shape: triangle;\n  width: 2px;\n}\n", "",{"version":3,"sources":["webpack://./src/styles/network.css"],"names":[],"mappings":"AAAA,iCAAiC;;AAEjC,0CAA0C;AAC1C;EACE,yBAAyB;EACzB,gGAAgG;AAClG;;AAEA,oFAAoF;AACpF;EACE,oCAAoC,EAAE,WAAW;EACjD,4BAA4B;EAC5B,gCAAgC;EAChC,uBAAuB;EACvB,sBAAsB;EACtB,0BAA0B;EAC1B,4BAA4B;EAC5B,uBAAuB;EACvB,kDAAkD;EAClD,6BAA6B;EAC7B,uBAAuB;AACzB;;AAEA,mCAAmC;AACnC;EACE,oCAAoC;EACpC,+BAA+B;EAC/B,4BAA4B;EAC5B,gCAAgC;EAChC,2EAA2E;AAC7E;;AAEA;EACE,gCAAgC;EAChC,sBAAsB;AACxB;;AAEA,wCAAwC;AACxC;EACE,qBAAqB;EACrB,8BAA8B;EAC9B,sCAAsC;EACtC,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA,uBAAuB;AACvB;EACE,uBAAuB;EACvB,8BAA8B;EAC9B,sCAAsC;EACtC,8BAA8B;EAC9B,uBAAuB;AACzB;;AAEA,cAAc;AACd;EACE,WAAW;EACX,aAAa;EACb,yBAAyB;EACzB,kBAAkB;EAClB,wCAAwC;EACxC,gBAAgB;EAChB,kBAAkB;AACpB;;AAEA,gBAAgB;AAChB;EACE,eAAe;EACf,yBAAyB;AAC3B;;AAEA,mBAAmB;AACnB;EACE,oCAAoC,EAAE,WAAW;AACnD;;AAEA,qBAAqB;AACrB;EACE,oCAAoC,EAAE,QAAQ;AAChD;;AAEA,4BAA4B;AAC5B;EACE,oCAAoC,EAAE,WAAW;AACnD;;AAEA,gBAAgB;AAChB;EACE,YAAY;EACZ,6BAA6B;AAC/B;;AAEA,2BAA2B;AAC3B;EACE,wBAAwB;EACxB,6BAA6B;EAC7B,qBAAqB;EACrB,+BAA+B;AACjC;;AAEA,kCAAkC;AAClC;EACE,uBAAuB;AACzB;;AAEA,qBAAqB;AACrB;EACE,uBAAuB;AACzB;;AAEA,wCAAwC;AACxC;EACE,kBAAkB;EAClB,iBAAiB;EACjB,gBAAgB;EAChB,eAAe;AACjB;;AAEA,mDAAmD;AACnD;EACE,yBAAyB;EACzB,iBAAiB;AACnB;;AAEA,sCAAsC;AACtC;EACE,yBAAyB;AAC3B;;AAEA,oCAAoC;AACpC;EACE,yBAAyB;EACzB,WAAW;EACX,eAAe;EACf,qBAAqB;AACvB;;AAEA,sCAAsC;AACtC;EACE,yBAAyB;EACzB,WAAW;EACX,eAAe;EACf,qBAAqB;AACvB;;AAEA,2CAA2C;AAC3C;EACE,yBAAyB;EACzB,WAAW;EACX,eAAe;EACf,qBAAqB;AACvB;;AAEA,iCAAiC;AACjC;EACE,mBAAmB;EACnB,4BAA4B;EAC5B,UAAU;AACZ","sourcesContent":["/* Network Visualization Styles */\n\n/* Make the umbrella layout more obvious */\n#network-container {\n  background-color: #f9f9f9;\n  background-image: linear-gradient(to bottom, rgba(173, 216, 230, 0.2), rgba(255, 255, 255, 0.9));\n}\n\n/* Umbrella specific styles - Make Trump node more distinctive and fixed at bottom */\n.trump-node {\n  background-color: #FFA500 !important; /* Orange */\n  border-width: 4px !important;\n  border-color: #d93025 !important;\n  height: 35px !important;\n  width: 35px !important;\n  font-size: 16px !important;\n  font-weight: bold !important;\n  z-index: 100 !important;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5) !important;\n  position: absolute !important; \n  bottom: 50px !important;\n}\n\n/* Event nodes in umbrella layout */\n.event-node {\n  background-color: #3498db !important;\n  border-style: dashed !important;\n  border-width: 2px !important;\n  border-color: #2980b9 !important;\n  transition: opacity 0.3s ease-in-out, transform 0.2s ease-in-out !important;\n}\n\n.event-node:hover {\n  transform: scale(1.1) !important;\n  z-index: 10 !important;\n}\n\n/* Event connections (umbrella spokes) */\n.event-connection {\n  width: 2px !important;\n  line-color: #7f8c8d !important;\n  target-arrow-color: #7f8c8d !important;\n  curve-style: straight !important;\n  opacity: 0.7 !important;\n}\n\n/* Entity connections */\n.entity-connection {\n  width: 1.5px !important;\n  line-color: #95a5a6 !important;\n  target-arrow-color: #95a5a6 !important;\n  curve-style: bezier !important;\n  opacity: 0.6 !important;\n}\n\n/* Container */\n#network-container {\n  width: 100%;\n  height: 500px;\n  background-color: #f9f9f9;\n  border-radius: 5px;\n  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);\n  overflow: hidden;\n  position: relative;\n}\n\n/* Node Styles */\n.network-node {\n  cursor: pointer;\n  transition: all 0.2s ease;\n}\n\n/* Trump Node (T) */\n.trump-node {\n  background-color: #FFA500 !important; /* Orange */\n}\n\n/* Russian Node (R) */\n.russian-node {\n  background-color: #FF0000 !important; /* Red */\n}\n\n/* Intermediary Node (T/R) */\n.intermediary-node {\n  background-color: #FF6347 !important; /* Tomato */\n}\n\n/* Edge Styles */\n.network-edge {\n  opacity: 0.7;\n  transition: opacity 0.2s ease;\n}\n\n/* Hide filtered elements */\n.filtered {\n  display: none !important;\n  visibility: hidden !important;\n  opacity: 0 !important;\n  pointer-events: none !important;\n}\n\n/* Fade non-highlighted elements */\n.faded {\n  opacity: 0.2 !important;\n}\n\n/* Highlight styles */\n.highlighted {\n  z-index: 999 !important;\n}\n\n/* Add a label for the timeline bottom */\n.timeline-year-label {\n  text-align: center;\n  font-weight: bold;\n  margin-top: 10px;\n  font-size: 18px;\n}\n\n/* Custom style to make node labels more readable */\n.node-label {\n  text-shadow: 0 0 3px #000;\n  font-weight: bold;\n}\n\n/* Customize the Cytoscape.js styles */\n.cytoscape-container {\n  background-color: #f8f9fa;\n}\n\n/* Target Trump nodes specifically */\nnode[type=\"trump\"] {\n  background-color: #FFA500;\n  color: #000;\n  font-size: 24px;\n  text-outline-width: 0;\n}\n\n/* Target Russian nodes specifically */\nnode[type=\"russian\"] {\n  background-color: #FF0000;\n  color: #000;\n  font-size: 24px;\n  text-outline-width: 0;\n}\n\n/* Target intermediary nodes specifically */\nnode[type=\"intermediary\"] {\n  background-color: #FF6347;\n  color: #000;\n  font-size: 18px;\n  text-outline-width: 0;\n}\n\n/* Make sure arrows are visible */\nedge {\n  curve-style: bezier;\n  target-arrow-shape: triangle;\n  width: 2px;\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/timeline.css":
/*!***********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/timeline.css ***!
  \***********************************************************************/
/***/ (function(module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "/* \n * Trump-Russia Timeline Visualization\n * CSS for timeline component\n */\n\n/* Timeline container */\n.vis-timeline {\n  border: none;\n  font-family: var(--font-primary);\n  background-color: white;\n}\n\n/* Timeline contents */\n.vis-content {\n  background-color: white;\n}\n\n/* Timeline items */\n.vis-item {\n  border-color: transparent;\n  background-color: transparent;\n  font-size: var(--font-size-small);\n  color: white;\n  border-radius: var(--border-radius-sm);\n  z-index: 1;\n}\n\n.vis-item.vis-selected {\n  border-color: rgba(255, 255, 0, 0.5);\n  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);\n  z-index: 2;\n}\n\n.vis-item.vis-point {\n  cursor: pointer;\n}\n\n.vis-item.vis-range {\n  cursor: pointer;\n}\n\n/* Timeline groups */\n.vis-group {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.timeline-group {\n  font-weight: bold;\n  padding: var(--spacing-xs) var(--spacing-sm);\n}\n\n.timeline-group-label {\n  text-transform: uppercase;\n  font-size: var(--font-size-small);\n}\n\n/* Timeline vertical and horizontal lines */\n.vis-panel.vis-center,\n.vis-panel.vis-left,\n.vis-panel.vis-right {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n.vis-grid.vis-vertical {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n.vis-grid.vis-minor {\n  border-color: rgba(0, 0, 0, 0.02);\n}\n\n/* Timeline axis */\n.vis-time-axis {\n  font-size: var(--font-size-small);\n}\n\n.vis-time-axis .vis-text {\n  color: var(--color-secondary);\n  padding: 3px;\n}\n\n.vis-time-axis .vis-grid.vis-minor {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n.vis-time-axis .vis-grid.vis-major {\n  border-color: rgba(0, 0, 0, 0.1);\n}\n\n/* Timeline tooltip styling */\n.timeline-tooltip {\n  max-width: 300px;\n  padding: var(--spacing-sm);\n  background-color: white;\n  border-radius: var(--border-radius-sm);\n  box-shadow: var(--box-shadow);\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.timeline-tooltip-title {\n  font-weight: bold;\n  margin-bottom: var(--spacing-xs);\n  color: var(--color-primary);\n}\n\n.timeline-tooltip-date {\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n  margin-bottom: var(--spacing-xs);\n}\n\n.timeline-tooltip-description {\n  font-size: var(--font-size-small);\n  line-height: 1.4;\n  margin-bottom: var(--spacing-xs);\n}\n\n.timeline-tooltip-money {\n  font-size: var(--font-size-small);\n  background-color: rgba(39, 174, 96, 0.1);\n  padding: var(--spacing-xs);\n  border-radius: var(--border-radius-sm);\n  color: var(--color-financial);\n}\n\n/* Event details styling */\n.event-details {\n  padding: var(--spacing-md);\n  max-width: 100%;\n}\n\n.event-details h3 {\n  margin-top: 0;\n  margin-bottom: var(--spacing-xs);\n  color: var(--color-primary);\n}\n\n.event-date {\n  color: var(--color-secondary);\n  margin-bottom: var(--spacing-sm);\n  font-style: italic;\n}\n\n.event-categories {\n  display: flex;\n  flex-wrap: wrap;\n  margin-bottom: var(--spacing-sm);\n}\n\n.event-description {\n  line-height: 1.6;\n  margin-bottom: var(--spacing-md);\n}\n\n.event-money-flow {\n  background-color: rgba(39, 174, 96, 0.1);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  margin-bottom: var(--spacing-md);\n}\n\n.event-location {\n  background-color: rgba(52, 152, 219, 0.1);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  margin-bottom: var(--spacing-md);\n}\n\n.event-sources {\n  background-color: rgba(41, 128, 185, 0.05);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n}\n\n.event-sources h4 {\n  margin-top: 0;\n  margin-bottom: var(--spacing-xs);\n}\n\n.event-sources ul {\n  list-style-type: none;\n  padding-left: 0;\n}\n\n.event-sources li {\n  margin-bottom: var(--spacing-sm);\n}\n\n.event-sources blockquote {\n  border-left: 2px solid rgba(41, 128, 185, 0.2);\n  padding-left: var(--spacing-sm);\n  margin: var(--spacing-xs) 0;\n  font-style: italic;\n  color: var(--color-secondary);\n  font-size: var(--font-size-small);\n}\n\n/* Play controls */\n.timeline-play-controls {\n  display: flex;\n  align-items: center;\n  margin-bottom: var(--spacing-md);\n}\n\n.timeline-play-controls button {\n  margin-right: var(--spacing-xs);\n}\n\n.timeline-year-slider {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  margin-left: var(--spacing-md);\n}\n\n.timeline-year-slider span {\n  margin-left: var(--spacing-sm);\n  font-weight: bold;\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n  .event-categories {\n    margin-bottom: var(--spacing-sm);\n  }\n  \n  .event-money-flow,\n  .event-location,\n  .event-sources {\n    padding: var(--spacing-xs);\n  }\n}\n", "",{"version":3,"sources":["webpack://./src/styles/timeline.css"],"names":[],"mappings":"AAAA;;;EAGE;;AAEF,uBAAuB;AACvB;EACE,YAAY;EACZ,gCAAgC;EAChC,uBAAuB;AACzB;;AAEA,sBAAsB;AACtB;EACE,uBAAuB;AACzB;;AAEA,mBAAmB;AACnB;EACE,yBAAyB;EACzB,6BAA6B;EAC7B,iCAAiC;EACjC,YAAY;EACZ,sCAAsC;EACtC,UAAU;AACZ;;AAEA;EACE,oCAAoC;EACpC,2CAA2C;EAC3C,UAAU;AACZ;;AAEA;EACE,eAAe;AACjB;;AAEA;EACE,eAAe;AACjB;;AAEA,oBAAoB;AACpB;EACE,4CAA4C;AAC9C;;AAEA;EACE,iBAAiB;EACjB,4CAA4C;AAC9C;;AAEA;EACE,yBAAyB;EACzB,iCAAiC;AACnC;;AAEA,2CAA2C;AAC3C;;;EAGE,iCAAiC;AACnC;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,iCAAiC;AACnC;;AAEA,kBAAkB;AAClB;EACE,iCAAiC;AACnC;;AAEA;EACE,6BAA6B;EAC7B,YAAY;AACd;;AAEA;EACE,iCAAiC;AACnC;;AAEA;EACE,gCAAgC;AAClC;;AAEA,6BAA6B;AAC7B;EACE,gBAAgB;EAChB,0BAA0B;EAC1B,uBAAuB;EACvB,sCAAsC;EACtC,6BAA6B;EAC7B,oCAAoC;AACtC;;AAEA;EACE,iBAAiB;EACjB,gCAAgC;EAChC,2BAA2B;AAC7B;;AAEA;EACE,iCAAiC;EACjC,6BAA6B;EAC7B,gCAAgC;AAClC;;AAEA;EACE,iCAAiC;EACjC,gBAAgB;EAChB,gCAAgC;AAClC;;AAEA;EACE,iCAAiC;EACjC,wCAAwC;EACxC,0BAA0B;EAC1B,sCAAsC;EACtC,6BAA6B;AAC/B;;AAEA,0BAA0B;AAC1B;EACE,0BAA0B;EAC1B,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,gCAAgC;EAChC,2BAA2B;AAC7B;;AAEA;EACE,6BAA6B;EAC7B,gCAAgC;EAChC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,eAAe;EACf,gCAAgC;AAClC;;AAEA;EACE,gBAAgB;EAChB,gCAAgC;AAClC;;AAEA;EACE,wCAAwC;EACxC,0BAA0B;EAC1B,sCAAsC;EACtC,gCAAgC;AAClC;;AAEA;EACE,yCAAyC;EACzC,0BAA0B;EAC1B,sCAAsC;EACtC,gCAAgC;AAClC;;AAEA;EACE,0CAA0C;EAC1C,0BAA0B;EAC1B,sCAAsC;AACxC;;AAEA;EACE,aAAa;EACb,gCAAgC;AAClC;;AAEA;EACE,qBAAqB;EACrB,eAAe;AACjB;;AAEA;EACE,gCAAgC;AAClC;;AAEA;EACE,8CAA8C;EAC9C,+BAA+B;EAC/B,2BAA2B;EAC3B,kBAAkB;EAClB,6BAA6B;EAC7B,iCAAiC;AACnC;;AAEA,kBAAkB;AAClB;EACE,aAAa;EACb,mBAAmB;EACnB,gCAAgC;AAClC;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE,YAAY;EACZ,aAAa;EACb,mBAAmB;EACnB,8BAA8B;AAChC;;AAEA;EACE,8BAA8B;EAC9B,iBAAiB;AACnB;;AAEA,2BAA2B;AAC3B;EACE;IACE,gCAAgC;EAClC;;EAEA;;;IAGE,0BAA0B;EAC5B;AACF","sourcesContent":["/* \n * Trump-Russia Timeline Visualization\n * CSS for timeline component\n */\n\n/* Timeline container */\n.vis-timeline {\n  border: none;\n  font-family: var(--font-primary);\n  background-color: white;\n}\n\n/* Timeline contents */\n.vis-content {\n  background-color: white;\n}\n\n/* Timeline items */\n.vis-item {\n  border-color: transparent;\n  background-color: transparent;\n  font-size: var(--font-size-small);\n  color: white;\n  border-radius: var(--border-radius-sm);\n  z-index: 1;\n}\n\n.vis-item.vis-selected {\n  border-color: rgba(255, 255, 0, 0.5);\n  box-shadow: 0 0 10px rgba(255, 255, 0, 0.5);\n  z-index: 2;\n}\n\n.vis-item.vis-point {\n  cursor: pointer;\n}\n\n.vis-item.vis-range {\n  cursor: pointer;\n}\n\n/* Timeline groups */\n.vis-group {\n  border-bottom: 1px solid rgba(0, 0, 0, 0.05);\n}\n\n.timeline-group {\n  font-weight: bold;\n  padding: var(--spacing-xs) var(--spacing-sm);\n}\n\n.timeline-group-label {\n  text-transform: uppercase;\n  font-size: var(--font-size-small);\n}\n\n/* Timeline vertical and horizontal lines */\n.vis-panel.vis-center,\n.vis-panel.vis-left,\n.vis-panel.vis-right {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n.vis-grid.vis-vertical {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n.vis-grid.vis-minor {\n  border-color: rgba(0, 0, 0, 0.02);\n}\n\n/* Timeline axis */\n.vis-time-axis {\n  font-size: var(--font-size-small);\n}\n\n.vis-time-axis .vis-text {\n  color: var(--color-secondary);\n  padding: 3px;\n}\n\n.vis-time-axis .vis-grid.vis-minor {\n  border-color: rgba(0, 0, 0, 0.05);\n}\n\n.vis-time-axis .vis-grid.vis-major {\n  border-color: rgba(0, 0, 0, 0.1);\n}\n\n/* Timeline tooltip styling */\n.timeline-tooltip {\n  max-width: 300px;\n  padding: var(--spacing-sm);\n  background-color: white;\n  border-radius: var(--border-radius-sm);\n  box-shadow: var(--box-shadow);\n  border: 1px solid rgba(0, 0, 0, 0.1);\n}\n\n.timeline-tooltip-title {\n  font-weight: bold;\n  margin-bottom: var(--spacing-xs);\n  color: var(--color-primary);\n}\n\n.timeline-tooltip-date {\n  font-size: var(--font-size-small);\n  color: var(--color-secondary);\n  margin-bottom: var(--spacing-xs);\n}\n\n.timeline-tooltip-description {\n  font-size: var(--font-size-small);\n  line-height: 1.4;\n  margin-bottom: var(--spacing-xs);\n}\n\n.timeline-tooltip-money {\n  font-size: var(--font-size-small);\n  background-color: rgba(39, 174, 96, 0.1);\n  padding: var(--spacing-xs);\n  border-radius: var(--border-radius-sm);\n  color: var(--color-financial);\n}\n\n/* Event details styling */\n.event-details {\n  padding: var(--spacing-md);\n  max-width: 100%;\n}\n\n.event-details h3 {\n  margin-top: 0;\n  margin-bottom: var(--spacing-xs);\n  color: var(--color-primary);\n}\n\n.event-date {\n  color: var(--color-secondary);\n  margin-bottom: var(--spacing-sm);\n  font-style: italic;\n}\n\n.event-categories {\n  display: flex;\n  flex-wrap: wrap;\n  margin-bottom: var(--spacing-sm);\n}\n\n.event-description {\n  line-height: 1.6;\n  margin-bottom: var(--spacing-md);\n}\n\n.event-money-flow {\n  background-color: rgba(39, 174, 96, 0.1);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  margin-bottom: var(--spacing-md);\n}\n\n.event-location {\n  background-color: rgba(52, 152, 219, 0.1);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n  margin-bottom: var(--spacing-md);\n}\n\n.event-sources {\n  background-color: rgba(41, 128, 185, 0.05);\n  padding: var(--spacing-sm);\n  border-radius: var(--border-radius-sm);\n}\n\n.event-sources h4 {\n  margin-top: 0;\n  margin-bottom: var(--spacing-xs);\n}\n\n.event-sources ul {\n  list-style-type: none;\n  padding-left: 0;\n}\n\n.event-sources li {\n  margin-bottom: var(--spacing-sm);\n}\n\n.event-sources blockquote {\n  border-left: 2px solid rgba(41, 128, 185, 0.2);\n  padding-left: var(--spacing-sm);\n  margin: var(--spacing-xs) 0;\n  font-style: italic;\n  color: var(--color-secondary);\n  font-size: var(--font-size-small);\n}\n\n/* Play controls */\n.timeline-play-controls {\n  display: flex;\n  align-items: center;\n  margin-bottom: var(--spacing-md);\n}\n\n.timeline-play-controls button {\n  margin-right: var(--spacing-xs);\n}\n\n.timeline-year-slider {\n  flex-grow: 1;\n  display: flex;\n  align-items: center;\n  margin-left: var(--spacing-md);\n}\n\n.timeline-year-slider span {\n  margin-left: var(--spacing-sm);\n  font-weight: bold;\n}\n\n/* Responsive adjustments */\n@media (max-width: 768px) {\n  .event-categories {\n    margin-bottom: var(--spacing-sm);\n  }\n  \n  .event-money-flow,\n  .event-location,\n  .event-sources {\n    padding: var(--spacing-xs);\n  }\n}\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ __webpack_exports__["default"] = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ (function(module) {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ (function(module) {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ (function(module) {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ (function(module) {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ (function(module, __unused_webpack_exports, __webpack_require__) {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ (function(module) {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ "./src/components/moneyCounter.js":
/*!****************************************!*\
  !*** ./src/components/moneyCounter.js ***!
  \****************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ MoneyCounterVisualization; }
/* harmony export */ });
/* harmony import */ var _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dataLoader.js */ "./src/utils/dataLoader.js");
/* harmony import */ var _utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers.js */ "./src/utils/helpers.js");
/**
 * Money Counter (Piggy Bank) Visualization
 * 
 * Uses D3.js to create an animated visualization of financial transactions.
 * Displays a running total of money flows to/from Trump, with animated coin drops.
 */


class MoneyCounterVisualization {
  /**
   * @param {string} containerId - DOM element ID for the money counter container
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    this.options = {
      height: '300px',
      width: '100%',
      animationDuration: 2000,
      maxCoins: 20,
      // Maximum number of coins to show simultaneously
      coinColors: {
        toTrump: '#27ae60',
        // Green for incoming money
        fromTrump: '#e74c3c' // Red for outgoing money
      },
      startYear: 1977,
      endYear: new Date().getFullYear(),
      ...options
    };

    // Set container dimensions
    this.container.style.height = this.options.height;
    this.container.style.width = this.options.width;
    this.container.style.position = 'relative';
    this.svg = null;
    this.piggyBank = null;
    this.counterText = null;
    this.currentTotal = 0;
    this.transactions = [];
    this.isAnimating = false;
  }

  /**
   * Initialize the money counter visualization
   * @param {Object} filterOptions - Initial filter options
   * @returns {Promise<MoneyCounterVisualization>} This instance
   */
  async initialize(filterOptions = {}) {
    try {
      console.log('Initializing money counter visualization...');

      // Make sure data is loaded first
      await _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialize();

      // Get financial data from loader
      const financialData = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getFinancialData({
        startYear: this.options.startYear,
        endYear: this.options.endYear,
        ...filterOptions
      });
      this.transactions = financialData.transactions;
      this.currentTotal = 0; // Start at 0, will be updated during animations
      this.targetTotal = financialData.netFlow; // Total net flow (to Trump - from Trump)

      console.log(`Loaded ${this.transactions.length} financial transactions with net flow of ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(this.targetTotal)}`);

      // Create SVG
      this.createSvgContainer();

      // Create the piggy bank
      this.createPiggyBank();

      // Create the counter
      this.createCounter();

      // Optionally create summary stats
      this.createSummaryStats(financialData);
      console.log('Money counter visualization initialized successfully');
      return this;
    } catch (error) {
      console.error('Failed to initialize money counter visualization:', error);
      this.container.innerHTML = `<div class="error-message">
        <h3>Error Loading Money Counter</h3>
        <p>${error.message}</p>
      </div>`;
      throw error;
    }
  }

  /**
   * Create the SVG container
   */
  createSvgContainer() {
    // Calculate dimensions
    const width = this.container.clientWidth;
    const height = parseInt(this.options.height);

    // Create SVG element
    this.svg = d3.select(this.container).append('svg').attr('width', width).attr('height', height).attr('class', 'money-counter-svg');

    // Add a background with gradient
    const defs = this.svg.append('defs');

    // Create gradient
    const gradient = defs.append('linearGradient').attr('id', 'piggy-bank-bg').attr('x1', '0%').attr('y1', '0%').attr('x2', '0%').attr('y2', '100%');
    gradient.append('stop').attr('offset', '0%').attr('stop-color', '#f5f7fa');
    gradient.append('stop').attr('offset', '100%').attr('stop-color', '#c3cfe2');

    // Add background rect
    this.svg.append('rect').attr('width', width).attr('height', height).attr('fill', 'url(#piggy-bank-bg)').attr('rx', 10).attr('ry', 10);

    // Create a group for the piggy bank and counter
    this.mainGroup = this.svg.append('g').attr('class', 'money-counter-main').attr('transform', `translate(${width / 2}, ${height / 2})`);
  }

  /**
   * Create the piggy bank visualization
   */
  createPiggyBank() {
    // Create group for piggy bank
    this.piggyBank = this.mainGroup.append('g').attr('class', 'piggy-bank').attr('transform', 'translate(0, -40)');

    // Draw the piggy bank shape
    // Main body (ellipse)
    this.piggyBank.append('ellipse').attr('cx', 0).attr('cy', 0).attr('rx', 60).attr('ry', 40).attr('fill', '#f39c12').attr('stroke', '#e67e22').attr('stroke-width', 2);

    // Nose (small circle)
    this.piggyBank.append('circle').attr('cx', 55).attr('cy', -10).attr('r', 10).attr('fill', '#e74c3c').attr('stroke', '#c0392b').attr('stroke-width', 1);

    // Nostrils (two tiny circles)
    this.piggyBank.append('circle').attr('cx', 58).attr('cy', -13).attr('r', 2).attr('fill', '#c0392b');
    this.piggyBank.append('circle').attr('cx', 58).attr('cy', -7).attr('r', 2).attr('fill', '#c0392b');

    // Eyes (two small circles)
    this.piggyBank.append('circle').attr('cx', 35).attr('cy', -25).attr('r', 5).attr('fill', 'white').attr('stroke', '#c0392b').attr('stroke-width', 1);
    this.piggyBank.append('circle').attr('cx', 45).attr('cy', -25).attr('r', 5).attr('fill', 'white').attr('stroke', '#c0392b').attr('stroke-width', 1);

    // Pupils
    this.piggyBank.append('circle').attr('cx', 35).attr('cy', -25).attr('r', 2).attr('fill', 'black');
    this.piggyBank.append('circle').attr('cx', 45).attr('cy', -25).attr('r', 2).attr('fill', 'black');

    // Ears (two ellipses)
    this.piggyBank.append('ellipse').attr('cx', -15).attr('cy', -35).attr('rx', 15).attr('ry', 10).attr('fill', '#f39c12').attr('stroke', '#e67e22').attr('stroke-width', 1).attr('transform', 'rotate(-20)');
    this.piggyBank.append('ellipse').attr('cx', 15).attr('cy', -35).attr('rx', 15).attr('ry', 10).attr('fill', '#f39c12').attr('stroke', '#e67e22').attr('stroke-width', 1).attr('transform', 'rotate(20)');

    // Slot (money opening)
    this.piggyBank.append('ellipse').attr('cx', 0).attr('cy', -35).attr('rx', 25).attr('ry', 7).attr('fill', '#c0392b').attr('stroke', '#c0392b').attr('stroke-width', 1);
    this.piggyBank.append('rect').attr('x', -15).attr('y', -38).attr('width', 30).attr('height', 6).attr('fill', 'black').attr('rx', 2).attr('ry', 2);
  }

  /**
   * Create the money counter display
   */
  createCounter() {
    // Create counter text
    this.counterText = this.mainGroup.append('text').attr('class', 'money-counter-text').attr('x', 0).attr('y', 60).attr('text-anchor', 'middle').attr('font-size', '24px').attr('font-weight', 'bold').attr('fill', this.targetTotal >= 0 ? this.options.coinColors.toTrump : this.options.coinColors.fromTrump).text((0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(0));

    // Create counter label
    this.mainGroup.append('text').attr('class', 'money-counter-label').attr('x', 0).attr('y', 85).attr('text-anchor', 'middle').attr('font-size', '14px').attr('fill', '#333').text('NET FLOW');

    // Animate the counter from 0 to the target total
    this.animateCounter(0, this.targetTotal, this.options.animationDuration);
  }

  /**
   * Create summary statistics display
   * @param {Object} financialData - Financial data with totals
   */
  createSummaryStats(financialData) {
    const width = this.container.clientWidth;

    // Create stats group
    const statsGroup = this.svg.append('g').attr('class', 'money-counter-stats').attr('transform', `translate(${width - 20}, 20)`);

    // To Trump total
    statsGroup.append('text').attr('class', 'stats-to-trump').attr('x', 0).attr('y', 0).attr('text-anchor', 'end').attr('font-size', '12px').attr('fill', this.options.coinColors.toTrump).text(`To Trump: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(financialData.totalToTrump)}`);

    // From Trump total
    statsGroup.append('text').attr('class', 'stats-from-trump').attr('x', 0).attr('y', 20).attr('text-anchor', 'end').attr('font-size', '12px').attr('fill', this.options.coinColors.fromTrump).text(`From Trump: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(financialData.totalFromTrump)}`);

    // Transaction count
    statsGroup.append('text').attr('class', 'stats-count').attr('x', 0).attr('y', 40).attr('text-anchor', 'end').attr('font-size', '12px').attr('fill', '#333').text(`Transactions: ${this.transactions.length}`);
  }

  /**
   * Animate the counter from one value to another
   * @param {number} fromValue - Starting value
   * @param {number} toValue - Target value
   * @param {number} duration - Animation duration in ms
   */
  animateCounter(fromValue, toValue, duration = 2000) {
    // Create number formatter
    const formatNumber = d3.format('$,.0f');

    // Create transition
    const t = d3.transition().duration(duration).ease(d3.easeCubicInOut);

    // Update counter color based on whether it's positive or negative
    this.counterText.transition(t).attr('fill', toValue >= 0 ? this.options.coinColors.toTrump : this.options.coinColors.fromTrump);

    // Animate the counter value
    const interpolator = d3.interpolateNumber(fromValue, toValue);
    this.counterText.transition(t).textTween(() => {
      return t => {
        const value = interpolator(t);
        this.currentTotal = value;
        return formatNumber(value);
      };
    });
  }

  /**
   * Add a coin animation
   * @param {Object} transaction - Transaction data
   * @returns {Promise<void>} Animation completion
   */
  async addCoin(transaction) {
    if (!this.svg || !transaction) return;

    // Determine if the transaction is to or from Trump
    const isToTrump = transaction.parties?.receiver?.entity === "entity-001" || transaction.toEntity === "entity-001";

    // Calculate coin size based on amount (with limits)
    const amount = Math.abs(transaction.amount || 0);
    const minSize = 5;
    const maxSize = 25;
    const baseSize = Math.log10(amount + 1) * 3; // Logarithmic scale
    const size = Math.min(Math.max(minSize, baseSize), maxSize);

    // Determine coin color
    const coinColor = isToTrump ? this.options.coinColors.toTrump : this.options.coinColors.fromTrump;

    // Calculate random starting position at top of svg
    const width = this.container.clientWidth;
    const xPos = Math.random() * (width - 100) + 50;
    const yPos = -50; // Start above the visible area

    // Create coin element
    const coin = this.svg.append('g').attr('class', 'coin').attr('transform', `translate(${xPos}, ${yPos})`);

    // Add main circle
    coin.append('circle').attr('r', size).attr('fill', coinColor).attr('stroke', d3.color(coinColor).darker(0.5)).attr('stroke-width', 2).attr('opacity', 0.8);

    // Add dollar sign
    coin.append('text').attr('text-anchor', 'middle').attr('dominant-baseline', 'central').attr('fill', 'white').attr('font-size', size * 0.8).attr('font-weight', 'bold').text('$');

    // Calculate destination (slot in piggy bank)
    const dest = this.piggyBank.node().getBoundingClientRect();
    const containerRect = this.container.getBoundingClientRect();

    // Adjust for container position
    const destX = dest.left + dest.width / 2 - containerRect.left;
    const destY = dest.top + dest.height / 3 - containerRect.top;

    // Create animation path for the falling motion
    // Start with a random X offset within reason
    const endX = destX;
    const endY = destY;
    const controlX1 = xPos;
    const controlY1 = yPos + 50;
    const controlX2 = endX - 20 + Math.random() * 40; // Random variation near the end
    const controlY2 = endY - 50;

    // Create the path for the animation
    const path = d3.path();
    path.moveTo(xPos, yPos);
    path.bezierCurveTo(controlX1, controlY1, controlX2, controlY2, endX, endY);

    // Calculate animation duration based on amount (larger = slower)
    const animDuration = 1000 + Math.min(amount / 10000000, 1) * 2000;

    // Animate the coin along the path with rotation
    let animationComplete = false;
    let startTime = null;
    let rotation = 0;

    // Return a promise that resolves when the animation completes
    return new Promise(resolve => {
      function animate(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / animDuration, 1);

        // If we're at the end and already processed completion, stop
        if (progress >= 1 && animationComplete) {
          return;
        }

        // Get point along the path
        const x = d3.interpolate(xPos, endX)(progress);
        const y = d3.interpolate(yPos, endY)(progress);

        // Add rotation based on progress
        rotation = progress * 720; // Multiple full rotations

        // Update coin position and rotation
        coin.attr('transform', `translate(${x}, ${y}) rotate(${rotation})`);

        // If we're at the end, remove the coin and update counter
        if (progress >= 1 && !animationComplete) {
          animationComplete = true;

          // Shrink and fade out
          coin.transition().duration(300).attr('transform', `translate(${endX}, ${endY}) rotate(${rotation}) scale(0.1)`).style('opacity', 0).remove();

          // Resolve the promise after the remove transition
          setTimeout(resolve, 300);
          return;
        }

        // Continue animation
        requestAnimationFrame(animate);
      }

      // Start animation
      requestAnimationFrame(animate);
    });
  }

  /**
   * Play a sequence of transaction animations
   * @param {Object} options - Playback options
   * @returns {Promise<void>} Animation completion
   */
  async playTransactionSequence(options = {}) {
    const {
      startIndex = 0,
      speed = 1,
      onProgress = null
    } = options;
    if (this.isAnimating) return;
    this.isAnimating = true;

    // Reset counter if starting from the beginning
    if (startIndex === 0) {
      this.currentTotal = 0;
      this.counterText.text((0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(0));
    }
    try {
      // Get transactions in chronological order starting from startIndex
      const transactionsToPlay = this.transactions.slice(startIndex);

      // Play each transaction animation
      for (let i = 0; i < transactionsToPlay.length; i++) {
        const transaction = transactionsToPlay[i];
        const amount = transaction.amount || 0;

        // Determine if this transaction is to or from Trump
        const isToTrump = transaction.parties?.receiver?.entity === "entity-001" || transaction.toEntity === "entity-001";

        // Calculate new total
        const newTotal = this.currentTotal + (isToTrump ? amount : -amount);

        // Add coin animation
        await this.addCoin(transaction);

        // Update counter
        this.animateCounter(this.currentTotal, newTotal, 500);

        // Wait based on speed
        await new Promise(resolve => setTimeout(resolve, 500 / speed));

        // Call progress callback
        if (typeof onProgress === 'function') {
          onProgress({
            current: startIndex + i + 1,
            total: this.transactions.length,
            transaction
          });
        }
      }

      // Final update to ensure total is exactly right
      this.animateCounter(this.currentTotal, this.targetTotal, 1000);
    } finally {
      this.isAnimating = false;
    }
  }

  /**
   * Update the visualization with new filter options
   * @param {Object} filterOptions - Filter options
   * @returns {Promise<MoneyCounterVisualization>} This instance
   */
  async update(filterOptions = {}) {
    // Get new data based on filters
    const financialData = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getFinancialData({
      startYear: this.options.startYear,
      endYear: this.options.endYear,
      ...filterOptions
    });
    this.transactions = financialData.transactions;
    this.targetTotal = financialData.netFlow;

    // Update the counter
    this.animateCounter(this.currentTotal, this.targetTotal, this.options.animationDuration);

    // Update summary stats if they exist
    const statsToTrump = this.svg.select('.stats-to-trump');
    if (!statsToTrump.empty()) {
      statsToTrump.text(`To Trump: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(financialData.totalToTrump)}`);
    }
    const statsFromTrump = this.svg.select('.stats-from-trump');
    if (!statsFromTrump.empty()) {
      statsFromTrump.text(`From Trump: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatCurrency)(financialData.totalFromTrump)}`);
    }
    const statsCount = this.svg.select('.stats-count');
    if (!statsCount.empty()) {
      statsCount.text(`Transactions: ${this.transactions.length}`);
    }
    return this;
  }

  /**
   * Add a single transaction with animation
   * @param {Object} transaction - Transaction data
   * @returns {Promise<void>} Animation completion
   */
  async addTransaction(transaction) {
    if (!transaction) return;

    // Add to transactions array
    this.transactions.push(transaction);

    // Determine if this transaction is to or from Trump
    const isToTrump = transaction.parties?.receiver?.entity === "entity-001" || transaction.toEntity === "entity-001";

    // Calculate new total
    const amount = transaction.amount || 0;
    const newTotal = this.targetTotal + (isToTrump ? amount : -amount);
    this.targetTotal = newTotal;

    // Animate the transaction
    await this.addCoin(transaction);

    // Update counter
    this.animateCounter(this.currentTotal, this.targetTotal, 500);

    // Update summary stats
    await this.update();
  }

  /**
   * Reset the visualization to initial state
   * @returns {Promise<MoneyCounterVisualization>} This instance
   */
  async reset() {
    this.currentTotal = 0;

    // Animate counter back to 0
    this.animateCounter(this.currentTotal, 0, this.options.animationDuration);
    return this;
  }
}

/***/ }),

/***/ "./src/components/network.js":
/*!***********************************!*\
  !*** ./src/components/network.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ NetworkVisualization; }
/* harmony export */ });
/* harmony import */ var _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dataLoader.js */ "./src/utils/dataLoader.js");
/* harmony import */ var _utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers.js */ "./src/utils/helpers.js");
/**
 * Network Visualization Component
 * 
 * Uses Cytoscape.js to create an interactive network graph of entities and their relationships.
 * Displays people, organizations, properties, and other entities as nodes, with relationships as edges.
 */


class NetworkVisualization {
  /**
   * @param {string} containerId - DOM element ID for the network container
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    this.options = {
      height: '500px',
      minNodeSize: 20,
      maxNodeSize: 60,
      minEdgeWidth: 1,
      maxEdgeWidth: 8,
      animate: true,
      layout: 'concentric',
      // 'cose', 'concentric', 'breadthfirst', 'circle', etc.
      onNodeClick: null,
      onEdgeClick: null,
      ...options
    };
    this.network = null;
    this.data = null;

    // Set container height
    this.container.style.height = this.options.height;

    // Entity type settings for styling nodes
    this.entityTypeConfig = {
      person: {
        shape: 'ellipse',
        color: '#3498db',
        // Blue
        borderColor: '#2980b9'
      },
      organization: {
        shape: 'roundrectangle',
        color: '#e74c3c',
        // Red
        borderColor: '#c0392b'
      },
      property: {
        shape: 'hexagon',
        color: '#f39c12',
        // Orange
        borderColor: '#d35400'
      },
      'financial-institution': {
        shape: 'roundrectangle',
        color: '#27ae60',
        // Green
        borderColor: '#2ecc71'
      },
      // Special types for Trump and Russia
      'trump': {
        shape: 'ellipse',
        color: '#FFA500',
        // Orange for Trump
        borderColor: '#FF8C00'
      },
      'russian': {
        shape: 'ellipse',
        color: '#FF0000',
        // Red for Russian entities
        borderColor: '#CC0000'
      },
      'intermediary': {
        shape: 'ellipse',
        color: '#FF6347',
        // Tomato red for intermediaries
        borderColor: '#E54B38'
      }
    };

    // Relationship type settings for styling edges
    this.relationshipTypeConfig = {
      business: {
        color: '#3498db',
        // Blue
        style: 'solid'
      },
      financial: {
        color: '#27ae60',
        // Green
        style: 'solid'
      },
      intelligence: {
        color: '#8e44ad',
        // Purple
        style: 'dashed'
      },
      personal: {
        color: '#7f8c8d',
        // Gray
        style: 'dotted'
      },
      legal: {
        color: '#f39c12',
        // Orange
        style: 'solid'
      },
      political: {
        color: '#e74c3c',
        // Red
        style: 'solid'
      }
    };
  }

  /**
   * Initialize the network visualization
   * @param {Object} filterOptions - Initial filter options
   * @returns {Promise<NetworkVisualization>} This instance
   */
  async initialize(filterOptions = {}) {
    try {
      console.log('Initializing network visualization...');

      // Make sure data is loaded first
      await _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialize();

      // Get network data from loader
      this.data = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getNetworkData(filterOptions);
      console.log(`Loaded ${this.data.nodes.length} nodes and ${this.data.edges.length} edges for network`);

      // Initialize Cytoscape
      this.initializeCytoscape();
      console.log('Network visualization initialized successfully');
      return this;
    } catch (error) {
      console.error('Failed to initialize network visualization:', error);
      this.container.innerHTML = `<div class="error-message">
        <h3>Error Loading Network</h3>
        <p>${error.message}</p>
      </div>`;
      throw error;
    }
  }

  /**
   * Initialize Cytoscape with the loaded data
   */
  initializeCytoscape() {
    // Format nodes and edges for Cytoscape
    const elements = {
      nodes: this.formatNodesForCytoscape(),
      edges: this.formatEdgesForCytoscape()
    };

    // Configure Cytoscape
    this.network = cytoscape({
      container: this.container,
      elements: elements,
      style: this.getCytoscapeStyle(),
      layout: this.getCytoscapeLayout(),
      wheelSensitivity: 0.2,
      // Reduce zoom sensitivity
      minZoom: 0.1,
      maxZoom: 3,
      boxSelectionEnabled: true,
      autounselectify: false
    });

    // Add event listeners
    this.setupEventListeners();

    // Fit the graph to the viewport
    this.network.fit();

    // If 'Trump' entity exists, center on it
    const trumpNode = this.network.nodes('[id = "entity-001"]'); // DJT entity ID
    if (trumpNode.length > 0) {
      this.network.center(trumpNode);

      // Highlight Trump node
      trumpNode.addClass('highlighted');
    }
  }

  /**
   * Format nodes for Cytoscape
   * @returns {Array} Formatted nodes
   */
  formatNodesForCytoscape() {
    return this.data.nodes.map(node => {
      // Calculate node size based on significance
      const significance = node.value || 5; // Default medium significance

      // Determine special node types
      let entityType = node.group || 'person';

      // Check if it's Trump
      if (node.id === 'entity-001' || node.id === 'trump' || node.label && node.label.toLowerCase().includes('donald') && node.label.toLowerCase().includes('trump')) {
        entityType = 'trump';
      }
      // Check if it's a Russian entity
      else if (node.group === 'russian' || node.label && (node.label.toLowerCase().includes('russia') || node.label.toLowerCase().includes('soviet') || node.label.toLowerCase().includes('kgb'))) {
        entityType = 'russian';
      }
      // Check if it's an intermediary (special handling for intermediaries between Trump and Russia)
      else if (this.isIntermediary(node)) {
        entityType = 'intermediary';
      }

      // Get entity type config, or use default
      const typeConfig = this.entityTypeConfig[entityType] || this.entityTypeConfig.person;
      return {
        data: {
          id: node.id,
          label: node.label,
          type: entityType,
          significance: significance,
          color: typeConfig.color,
          borderColor: typeConfig.borderColor,
          shape: typeConfig.shape,
          description: node.title || '',
          // Add a custom ID for Trump and Russia to make layout easier
          isSpecial: entityType === 'trump' || entityType === 'russian'
        },
        position: {} // Will be set by layout
      };
    });
  }

  /**
   * Check if a node is an intermediary between Trump and Russia
   * @param {Object} node - Node to check
   * @returns {boolean} True if node is an intermediary
   */
  isIntermediary(node) {
    if (!this.data.edges) return false;

    // Check if node connects to both Trump and Russian entities
    const connections = this.data.edges.filter(edge => edge.from === node.id || edge.to === node.id);

    // Check for Trump connection
    const hasTrumpConnection = connections.some(edge => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const otherNode = this.data.nodes.find(n => n.id === otherId);
      return otherNode && otherNode.label && otherNode.label.toLowerCase().includes('trump');
    });

    // Check for Russian connection
    const hasRussianConnection = connections.some(edge => {
      const otherId = edge.from === node.id ? edge.to : edge.from;
      const otherNode = this.data.nodes.find(n => n.id === otherId);
      return otherNode && (otherNode.group === 'russian' || otherNode.label && (otherNode.label.toLowerCase().includes('russia') || otherNode.label.toLowerCase().includes('soviet')));
    });
    return hasTrumpConnection && hasRussianConnection;
  }

  /**
   * Format edges for Cytoscape
   * @returns {Array} Formatted edges
   */
  formatEdgesForCytoscape() {
    return this.data.edges.map(edge => {
      // Calculate edge width based on strength
      const strength = edge.value || 1;

      // Get relationship type config, or use default
      const relType = edge.label || 'business';
      const typeConfig = this.relationshipTypeConfig[relType] || this.relationshipTypeConfig.business;
      return {
        data: {
          id: `${edge.from}-${edge.to}`,
          source: edge.from,
          target: edge.to,
          type: relType,
          strength: strength,
          color: typeConfig.color,
          style: typeConfig.style,
          label: edge.label,
          description: edge.title || '',
          bidirectional: edge.arrows === 'to;from'
        }
      };
    });
  }

  /**
   * Get Cytoscape style
   * @returns {Array} Style array
   */
  getCytoscapeStyle() {
    return [
    // Node base style
    {
      selector: 'node',
      style: {
        'label': 'data(label)',
        'width': 'mapData(significance, 1, 10, 20, 60)',
        'height': 'mapData(significance, 1, 10, 20, 60)',
        'background-color': 'data(color)',
        'border-color': 'data(borderColor)',
        'border-width': 2,
        'text-valign': 'center',
        'text-halign': 'center',
        'font-size': '10px',
        'color': '#fff',
        'text-outline-width': 2,
        'text-outline-color': 'data(color)',
        'shape': 'data(shape)',
        'text-wrap': 'ellipsis',
        'text-max-width': '80px'
      }
    },
    // Trump node style
    {
      selector: 'node[type = "trump"]',
      style: {
        'label': 'T',
        'font-size': '24px',
        'text-valign': 'center',
        'text-halign': 'center',
        'color': '#000',
        'text-outline-width': 0
      }
    },
    // Russian entity style
    {
      selector: 'node[type = "russian"]',
      style: {
        'label': 'R',
        'font-size': '24px',
        'text-valign': 'center',
        'text-halign': 'center',
        'color': '#000',
        'text-outline-width': 0
      }
    },
    // Intermediary entity style
    {
      selector: 'node[type = "intermediary"]',
      style: {
        'label': 'T/R',
        'font-size': '18px',
        'text-valign': 'center',
        'text-halign': 'center',
        'color': '#000',
        'text-outline-width': 0
      }
    },
    // Node hover style
    {
      selector: 'node:hover',
      style: {
        'border-width': 4,
        'border-color': '#FFF',
        'font-size': '12px',
        'z-index': 999
      }
    },
    // Node selected style
    {
      selector: 'node:selected',
      style: {
        'border-width': 4,
        'border-color': '#FFFF00',
        'font-size': '14px',
        'z-index': 999
      }
    },
    // Node highlighted style
    {
      selector: 'node.highlighted',
      style: {
        'border-width': 4,
        'border-color': '#FFFF00',
        'background-color': 'data(color)',
        'z-index': 999
      }
    },
    // Filtered nodes (hidden)
    {
      selector: 'node.filtered',
      style: {
        'opacity': 0,
        'visibility': 'hidden',
        'display': 'none'
      }
    },
    // Filtered edges (hidden)
    {
      selector: 'edge.filtered',
      style: {
        'opacity': 0,
        'visibility': 'hidden',
        'display': 'none',
        'width': 0
      }
    },
    // Edge base style
    {
      selector: 'edge',
      style: {
        'width': 'mapData(strength, 1, 10, 1, 8)',
        'line-color': 'data(color)',
        'target-arrow-color': 'data(color)',
        'target-arrow-shape': 'triangle',
        'curve-style': 'bezier',
        'opacity': 0.7,
        'z-index': 1,
        'label': 'data(label)',
        'font-size': '9px',
        'color': '#fff',
        'text-outline-width': 2,
        'text-outline-color': 'data(color)',
        'text-rotation': 'autorotate',
        'text-margin-y': '-10px',
        'text-background-opacity': 1,
        'text-background-color': 'data(color)',
        'text-background-padding': '2px'
      }
    },
    // Filtered edges (hidden)
    {
      selector: 'edge.filtered',
      style: {
        'opacity': 0,
        'visibility': 'hidden'
      }
    },
    // Edge dotted style
    {
      selector: 'edge[style = "dotted"]',
      style: {
        'line-style': 'dotted'
      }
    },
    // Edge dashed style
    {
      selector: 'edge[style = "dashed"]',
      style: {
        'line-style': 'dashed'
      }
    },
    // Edge bidirectional style
    {
      selector: 'edge[bidirectional = true]',
      style: {
        'source-arrow-shape': 'triangle',
        'source-arrow-color': 'data(color)'
      }
    },
    // Edge hover style
    {
      selector: 'edge:hover',
      style: {
        'width': 'mapData(strength, 1, 10, 3, 10)',
        'opacity': 1,
        'z-index': 999,
        'font-size': '11px'
      }
    },
    // Edge selected style
    {
      selector: 'edge:selected',
      style: {
        'width': 'mapData(strength, 1, 10, 3, 10)',
        'opacity': 1,
        'z-index': 999,
        'line-color': '#FFFF00',
        'target-arrow-color': '#FFFF00',
        'source-arrow-color': '#FFFF00'
      }
    }];
  }

  /**
   * Get Cytoscape layout config
   * @returns {Object} Layout config
   */
  getCytoscapeLayout() {
    const self = this; // Store reference to use in callback functions
    const layouts = {
      cose: {
        name: 'cose',
        idealEdgeLength: 100,
        nodeOverlap: 20,
        refresh: 20,
        fit: true,
        padding: 30,
        randomize: false,
        componentSpacing: 100,
        nodeRepulsion: 400000,
        edgeElasticity: 100,
        nestingFactor: 5,
        gravity: 80,
        numIter: 1000,
        initialTemp: 200,
        coolingFactor: 0.95,
        minTemp: 1.0,
        animate: this.options.animate ? 'end' : false
      },
      concentric: {
        name: 'concentric',
        concentric: function (node) {
          // Check if it's Trump - position at bottom (higher value = outer rings)
          if (node.id() === 'entity-001' || node.id() === 'trump' || node.data('label').toLowerCase().includes('donald') && node.data('label').toLowerCase().includes('trump')) {
            return 20; // Place Trump on the outermost ring (bottom)
          }

          // Check if it's Russia - position at top (lower value = inner rings)
          if (node.data('type') === 'russian' || node.data('label').toLowerCase().includes('russia') || node.data('label').toLowerCase().includes('soviet')) {
            return 1; // Place Russian entities on the innermost ring (top)
          }

          // Position intermediaries in the middle
          // Use significance to determine exact position
          return 10 - (node.data('significance') || 5);
        },
        levelWidth: function () {
          return 1;
        },
        minNodeSpacing: 50,
        animate: this.options.animate ? true : false,
        // Ensure Trump is positioned at bottom
        transform: function (node, position) {
          // Flip the Y coordinates to have Trump at bottom and Russia at top
          // Only if positionTrumpAtBottom is enabled
          if (self.options.positionTrumpAtBottom) {
            return {
              x: position.x,
              y: self.container.clientHeight - position.y
            };
          }
          return position;
        }
      },
      breadthfirst: {
        name: 'breadthfirst',
        directed: true,
        roots: function (node) {
          // Use Trump node as the root for hierarchical layout
          return node.data('label').toLowerCase().includes('donald') && node.data('label').toLowerCase().includes('trump');
        },
        spacingFactor: 1.5,
        animate: this.options.animate ? true : false
      },
      hierarchical: {
        name: 'breadthfirst',
        directed: true,
        spacingFactor: 1.75,
        grid: true,
        // Identify roots (Trump nodes) for the layout
        roots: function (elem) {
          if (elem.data('label')?.toLowerCase().includes('trump') && elem.data('label')?.toLowerCase().includes('donald')) {
            return true;
          }
          return false;
        },
        // Use a transform to invert the Y axis to put Trump at bottom instead of top
        transform: function (node, position) {
          // Flip Y coordinates so Trump (root) is at bottom
          return {
            x: position.x,
            y: self.container.clientHeight - position.y
          };
        },
        animate: this.options.animate ? true : false
      },
      circle: {
        name: 'circle',
        animate: this.options.animate ? true : false
      }
    };

    // Default to hierarchical layout for the umbrella effect
    if (this.options.positionTrumpAtBottom && !layouts[this.options.layout]) {
      return layouts.hierarchical;
    }
    return layouts[this.options.layout] || layouts.cose;
  }

  /**
   * Set up event listeners for the network
   */
  setupEventListeners() {
    // Node click
    this.network.on('tap', 'node', event => {
      const node = event.target;
      const entityId = node.id();

      // Get full entity data
      const entity = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getEntity(entityId);
      if (typeof this.options.onNodeClick === 'function') {
        this.options.onNodeClick(entity);
      } else {
        // Default behavior: Show entity details
        this.showEntityDetails(entity);

        // Also highlight connected nodes and edges
        this.highlightConnections(node);
      }
    });

    // Edge click
    this.network.on('tap', 'edge', event => {
      const edge = event.target;
      const sourceId = edge.data('source');
      const targetId = edge.data('target');

      // Get relationship data
      const relationships = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].data.relationships.filter(rel => rel.source === sourceId && rel.target === targetId || rel.target === sourceId && rel.source === targetId);
      if (typeof this.options.onEdgeClick === 'function') {
        this.options.onEdgeClick(relationships[0]);
      } else {
        // Default behavior: Show relationship details
        this.showRelationshipDetails(relationships[0]);
      }
    });

    // Background click - reset highlights
    this.network.on('tap', event => {
      if (event.target === this.network) {
        this.resetHighlights();
      }
    });
  }

  /**
   * Show entity details in a panel
   * @param {Object} entity - Entity data
   */
  showEntityDetails(entity) {
    // Look for a details container
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer || !entity) return;

    // Build HTML for entity details
    let html = `
      <div class="entity-details">
        <h3>${entity.name}</h3>
        ${entity.aliases && entity.aliases.length > 0 ? `<div class="entity-aliases">Also known as: ${entity.aliases.join(', ')}</div>` : ''}
        
        <div class="entity-type-badge" style="background-color: ${this.entityTypeConfig[entity.type]?.color || '#95a5a6'}">
          ${entity.type}${entity.subtype ? ` - ${entity.subtype}` : ''}
        </div>
        
        <div class="entity-description">${entity.description || 'No description available.'}</div>
        
        ${entity.nationality ? `
          <div class="entity-nationality">
            <strong>Nationality:</strong> ${entity.nationality}
          </div>
        ` : ''}
        
        ${entity.roles && entity.roles.length > 0 ? `
          <div class="entity-roles">
            <strong>Roles:</strong> ${entity.roles.join(', ')}
          </div>
        ` : ''}
        
        ${entity.significance ? `
          <div class="entity-significance">
            <strong>Significance:</strong> ${entity.significance}/10
          </div>
        ` : ''}
        
        ${entity.firstAppearance ? `
          <div class="entity-appearance">
            <strong>First Appearance:</strong> ${entity.firstAppearance}
          </div>
        ` : ''}
        
        ${entity.intelligenceConnections && entity.intelligenceConnections.agency ? `
          <div class="intelligence-connections">
            <h4>Intelligence Connections</h4>
            <div><strong>Agency:</strong> ${entity.intelligenceConnections.agency}</div>
            <div><strong>Relationship:</strong> ${entity.intelligenceConnections.relationship}</div>
            <div><strong>Timeframe:</strong> ${entity.intelligenceConnections.timeframe}</div>
          </div>
        ` : ''}
        
        ${entity.financialData && (entity.financialData.estimatedWealth || entity.financialData.suspiciousActivity) ? `
          <div class="financial-data">
            <h4>Financial Information</h4>
            ${entity.financialData.estimatedWealth ? `<div><strong>Estimated Wealth:</strong> $${entity.financialData.estimatedWealth.toLocaleString()}</div>` : ''}
            ${entity.financialData.suspiciousActivity ? `<div><strong>Suspicious Activity:</strong> ${entity.financialData.suspiciousActivity}</div>` : ''}
          </div>
        ` : ''}
        
        ${entity.sources && entity.sources.length > 0 ? `
          <div class="entity-sources">
            <h4>Sources</h4>
            <ul>
              ${entity.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank">${source.description}</a>
                  ${source.citation ? `<blockquote>${source.citation}</blockquote>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${entity.notes ? `
          <div class="entity-notes">
            <h4>Notes</h4>
            <p>${entity.notes}</p>
          </div>
        ` : ''}
      </div>
    `;

    // Display the details
    detailsContainer.innerHTML = html;
    detailsContainer.scrollIntoView({
      behavior: 'smooth'
    });
  }

  /**
   * Show relationship details in a panel
   * @param {Object} relationship - Relationship data
   */
  showRelationshipDetails(relationship) {
    // Look for a details container
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer || !relationship) return;

    // Get entity names
    const sourceEntity = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getEntity(relationship.source);
    const targetEntity = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getEntity(relationship.target);
    if (!sourceEntity || !targetEntity) return;

    // Build HTML for relationship details
    let html = `
      <div class="relationship-details">
        <h3>Relationship</h3>
        
        <div class="relationship-entities">
          <div class="source-entity" style="background-color: ${this.entityTypeConfig[sourceEntity.type]?.color || '#95a5a6'}">
            ${sourceEntity.name}
          </div>
          
          <div class="relationship-arrow ${relationship.isBidirectional ? 'bidirectional' : ''}" style="
            color: ${this.relationshipTypeConfig[relationship.type]?.color || '#95a5a6'}
          ">
            ${relationship.isBidirectional ? '⟷' : '→'}
          </div>
          
          <div class="target-entity" style="background-color: ${this.entityTypeConfig[targetEntity.type]?.color || '#95a5a6'}">
            ${targetEntity.name}
          </div>
        </div>
        
        <div class="relationship-type-badge" style="background-color: ${this.relationshipTypeConfig[relationship.type]?.color || '#95a5a6'}">
          ${relationship.type}${relationship.subtype ? ` - ${relationship.subtype}` : ''}
        </div>
        
        <div class="relationship-description">${relationship.description || 'No description available.'}</div>
        
        ${relationship.strength ? `
          <div class="relationship-strength">
            <strong>Strength:</strong> ${relationship.strength}/10
          </div>
        ` : ''}
        
        ${relationship.startDate ? `
          <div class="relationship-dates">
            <strong>Period:</strong> ${relationship.startDate} to ${relationship.endDate || 'Present'}
          </div>
        ` : ''}
        
        ${relationship.evidenceStrength ? `
          <div class="relationship-evidence">
            <strong>Evidence:</strong> ${relationship.evidenceStrength}
          </div>
        ` : ''}
        
        ${relationship.sources && relationship.sources.length > 0 ? `
          <div class="relationship-sources">
            <h4>Sources</h4>
            <ul>
              ${relationship.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank">${source.description}</a>
                  ${source.citation ? `<blockquote>${source.citation}</blockquote>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
        
        ${relationship.notes ? `
          <div class="relationship-notes">
            <h4>Notes</h4>
            <p>${relationship.notes}</p>
          </div>
        ` : ''}
      </div>
    `;

    // Display the details
    detailsContainer.innerHTML = html;
    detailsContainer.scrollIntoView({
      behavior: 'smooth'
    });
  }

  /**
   * Highlight node and its connections
   * @param {Object} node - Cytoscape node
   */
  highlightConnections(node) {
    // Reset previous highlights
    this.resetHighlights();

    // Add highlighted class to the selected node
    node.addClass('highlighted');

    // Get connected nodes and edges
    const connectedEdges = node.connectedEdges();
    const connectedNodes = node.neighborhood('node');

    // Highlight connected nodes and edges
    connectedEdges.addClass('highlighted');
    connectedNodes.addClass('highlighted');

    // Fade out unconnected elements
    this.network.elements().difference(connectedEdges).difference(connectedNodes).difference(node).addClass('faded');
  }

  /**
   * Reset highlights
   */
  resetHighlights() {
    this.network.elements().removeClass('highlighted faded');
  }

  /**
   * Filter network by entity types
   * @param {Array<string>} types - Entity types to show
   */
  filterByEntityTypes(types) {
    if (!this.network) return;
    if (!types || types.length === 0) {
      // Show all nodes
      this.network.nodes().removeClass('filtered');
    } else {
      // Hide nodes not in the specified types
      this.network.nodes().forEach(node => {
        if (!types.includes(node.data('type'))) {
          node.addClass('filtered');
        } else {
          node.removeClass('filtered');
        }
      });
    }

    // Update visibility of edges
    this.network.edges().forEach(edge => {
      const source = this.network.getElementById(edge.data('source'));
      const target = this.network.getElementById(edge.data('target'));
      if (source.hasClass('filtered') || target.hasClass('filtered')) {
        edge.addClass('filtered');
      } else {
        edge.removeClass('filtered');
      }
    });
  }

  /**
   * Filter network by relationship types
   * @param {Array<string>} types - Relationship types to show
   */
  filterByRelationshipTypes(types) {
    if (!this.network) return;
    if (!types || types.length === 0) {
      // Show all edges
      this.network.edges().removeClass('filtered');
    } else {
      // Hide edges not in the specified types
      this.network.edges().forEach(edge => {
        if (!types.includes(edge.data('type'))) {
          edge.addClass('filtered');
        } else {
          edge.removeClass('filtered');
        }
      });
    }
  }

  /**
   * Search for entities in the network
   * @param {string} query - Search query
   * @returns {Array} Matching nodes
   */
  search(query) {
    if (!this.network || !query) return [];

    // Reset highlights
    this.resetHighlights();

    // Normalize query
    const normalizedQuery = query.toLowerCase().trim();

    // Find matching nodes
    const matchingNodes = this.network.nodes().filter(node => {
      const label = node.data('label').toLowerCase();
      const description = node.data('description').toLowerCase();
      return label.includes(normalizedQuery) || description.includes(normalizedQuery);
    });

    // Highlight matching nodes
    if (matchingNodes.length > 0) {
      matchingNodes.addClass('highlighted');

      // Center on the first match
      this.network.center(matchingNodes[0]);
      this.network.zoom({
        level: 1.5,
        position: matchingNodes[0].position()
      });
    }
    return matchingNodes;
  }

  /**
   * Change the layout of the network
   * @param {string} layoutName - Name of the layout ('cose', 'concentric', etc.)
   */
  changeLayout(layoutName) {
    if (!this.network) return;
    if (!layoutName || !['cose', 'concentric', 'breadthfirst', 'circle'].includes(layoutName)) {
      layoutName = 'cose';
    }
    this.options.layout = layoutName;

    // Apply the new layout
    const layout = this.network.layout(this.getCytoscapeLayout());
    layout.run();
  }

  /**
   * Filter the network to show only nodes and edges that existed at a specific date
   * @param {Date} date - Date to filter by
   */
  filterByDate(date) {
    if (!this.network) return;
    const dateObj = date instanceof Date ? date : new Date(date);
    console.log(`Filtering network for date: ${dateObj.toISOString().split('T')[0]}`);

    // Reset any previous filtering
    this.network.elements().removeClass('filtered');

    // Filter nodes based on date
    this.network.nodes().forEach(node => {
      const entityId = node.id();
      const entity = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getEntity(entityId);
      if (entity) {
        const firstDate = entity.firstAppearance ? new Date(entity.firstAppearance) : new Date(0);
        const lastDate = entity.lastAppearance ? new Date(entity.lastAppearance) : new Date(9999, 11, 31);

        // Hide node if it didn't exist at the specified date
        if (dateObj < firstDate || dateObj > lastDate) {
          node.addClass('filtered');

          // Also hide all connected edges
          const connectedEdges = node.connectedEdges();
          connectedEdges.addClass('filtered');
        }
      }
    });

    // Additional pass for edges - check relationship dates
    this.network.edges().filter(edge => !edge.hasClass('filtered')).forEach(edge => {
      const sourceId = edge.data('source');
      const targetId = edge.data('target');

      // Get relationship data
      const relationships = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].data.relationships.filter(rel => rel.source === sourceId && rel.target === targetId || rel.source === targetId && rel.target === sourceId);
      if (relationships && relationships.length > 0) {
        const relationship = relationships[0]; // Take the first relationship

        // Check if relationship existed at the filtered date
        if (relationship.startDate && dateObj < new Date(relationship.startDate)) {
          edge.addClass('filtered');
        }
        if (relationship.endDate && dateObj > new Date(relationship.endDate)) {
          edge.addClass('filtered');
        }
      }
    });

    // Apply CSS styles directly for better compatibility
    this.network.elements('.filtered').style({
      'display': 'none',
      'opacity': 0,
      'visibility': 'hidden'
    });
  }

  /**
   * Update the network with new filter options
   * @param {Object} filterOptions - Filter options
   * @returns {Promise<NetworkVisualization>} This instance
   */
  async update(filterOptions = {}) {
    console.log('Updating network with filter options:', filterOptions);

    // Update data based on filters
    this.data = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].getNetworkData(filterOptions);

    // Re-initialize the network with the new data
    // Preserve existing option settings
    this.initializeCytoscape();

    // If there's a specific date filter, apply it
    if (filterOptions.endYear) {
      const filterDate = new Date(filterOptions.endYear, 11, 31);
      this.filterByDate(filterDate);
    }
    return this;
  }
}

/***/ }),

/***/ "./src/components/timeline.js":
/*!************************************!*\
  !*** ./src/components/timeline.js ***!
  \************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ TimelineVisualization; }
/* harmony export */ });
/* harmony import */ var _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/dataLoader.js */ "./src/utils/dataLoader.js");
/* harmony import */ var _utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/helpers.js */ "./src/utils/helpers.js");
/**
 * Timeline Component
 * 
 * Uses vis-timeline to create an interactive timeline visualization of events.
 * Handles loading events from the data loader, formatting them for vis-timeline,
 * and providing interaction handlers.
 */


class TimelineVisualization {
  /**
   * @param {string} containerId - DOM element ID for the timeline container
   * @param {Object} options - Configuration options
   */
  constructor(containerId, options = {}) {
    this.container = document.getElementById(containerId);
    if (!this.container) {
      throw new Error(`Container element with ID "${containerId}" not found`);
    }
    this.options = {
      startYear: 1977,
      endYear: new Date().getFullYear(),
      height: '400px',
      showTooltips: true,
      onEventClick: null,
      ...options
    };
    this.timeline = null;
    this.events = [];
    this.timelineItems = null;
    this.timelineGroups = null;

    // Timeline configuration
    this.timelineOptions = {
      min: new Date(`${this.options.startYear}-01-01`),
      max: new Date(`${this.options.endYear}-12-31`),
      height: this.options.height,
      minHeight: '200px',
      maxHeight: '800px',
      zoomable: true,
      zoomMin: 1000 * 60 * 60 * 24 * 30,
      // One month
      zoomMax: 1000 * 60 * 60 * 24 * 365 * 10,
      // Ten years
      stack: true,
      stackSubgroups: true,
      showCurrentTime: false,
      format: {
        minorLabels: {
          year: 'YYYY',
          month: 'MMM',
          day: 'D'
        },
        majorLabels: {
          year: 'YYYY',
          month: 'YYYY',
          day: 'MMMM YYYY'
        }
      },
      tooltip: {
        followMouse: true,
        overflowMethod: 'cap'
      },
      groupTemplate: function (group) {
        return `<div class="timeline-group" style="color: ${group.color};">
                  <span class="timeline-group-label">${group.content}</span>
                </div>`;
      }
    };

    // Category definitions for groups
    this.categories = [{
      id: 'financial',
      content: 'Financial',
      color: (0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)('financial')
    }, {
      id: 'intelligence',
      content: 'Intelligence',
      color: (0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)('intelligence')
    }, {
      id: 'business',
      content: 'Business',
      color: (0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)('business')
    }, {
      id: 'political',
      content: 'Political',
      color: (0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)('political')
    }, {
      id: 'legal',
      content: 'Legal',
      color: (0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)('legal')
    }, {
      id: 'personal',
      content: 'Personal',
      color: (0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)('personal')
    }];
  }

  /**
   * Initialize the timeline visualization
   * @returns {Promise<TimelineVisualization>} This instance
   */
  async initialize() {
    try {
      console.log('Initializing timeline visualization...');

      // Make sure data is loaded first
      await _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].initialize();

      // Create groups based on categories
      this.timelineGroups = new vis.DataSet(this.categories);

      // Get events from the data loader
      this.events = _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_0__["default"].data.events;
      console.log(`Loaded ${this.events.length} events for timeline`);

      // Format events for vis-timeline
      const timelineItems = this.events.map(event => this.formatEventForTimeline(event));
      this.timelineItems = new vis.DataSet(timelineItems);

      // Create timeline
      this.timeline = new vis.Timeline(this.container, this.timelineItems, this.timelineGroups, this.timelineOptions);

      // Add event listeners
      this.setupEventListeners();
      console.log('Timeline visualization initialized successfully');
      return this;
    } catch (error) {
      console.error('Failed to initialize timeline visualization:', error);
      this.container.innerHTML = `<div class="error-message">
        <h3>Error Loading Timeline</h3>
        <p>${error.message}</p>
      </div>`;
      throw error;
    }
  }

  /**
   * Format an event for vis-timeline
   * @param {Object} event - Event data
   * @returns {Object} Formatted event for vis-timeline
   */
  formatEventForTimeline(event) {
    // Determine primary category for grouping
    const primaryCategory = event.categories && event.categories.length > 0 ? event.categories[0] : 'uncategorized';

    // Determine event type based on duration
    const hasEndDate = event.endDate && event.endDate !== event.date;

    // Format tooltip content
    let tooltipContent = '';
    if (this.options.showTooltips) {
      tooltipContent = `
        <div class="timeline-tooltip">
          <div class="timeline-tooltip-title">${event.title}</div>
          <div class="timeline-tooltip-date">${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(event.date, {
        format: 'short'
      })}</div>
          <div class="timeline-tooltip-description">${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.truncateText)(event.description, 200)}</div>
          ${event.moneyFlow?.amount ? `
            <div class="timeline-tooltip-money">
              Amount: $${event.moneyFlow.amount.toLocaleString()}
              (${event.moneyFlow.direction === 'to-trump' ? 'To' : 'From'} Trump)
            </div>
          ` : ''}
        </div>
      `;
    }

    // Calculate item styling based on importance
    const importance = event.importance || 5; // Default to medium importance
    const scaledSize = 10 + importance * 2; // Scale size based on importance

    // Create the timeline item
    return {
      id: event.id,
      content: event.title,
      start: event.date,
      end: hasEndDate ? event.endDate : undefined,
      group: primaryCategory,
      // Store reference to the original event data
      eventData: event,
      // Styling options
      type: hasEndDate ? 'range' : 'box',
      title: tooltipContent,
      style: `
        height: ${scaledSize}px;
        background-color: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)(primaryCategory)};
        border-color: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)(primaryCategory)};
        color: white;
        border-radius: 3px;
        font-size: 9px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      `
    };
  }

  /**
   * Set up event listeners for the timeline
   */
  setupEventListeners() {
    // Handle click on timeline item
    this.timeline.on('click', properties => {
      // Check if the click was on an item
      if (properties.item) {
        const clickedItem = this.timelineItems.get(properties.item);
        if (clickedItem && clickedItem.eventData) {
          // Call the event click handler if provided
          if (typeof this.options.onEventClick === 'function') {
            this.options.onEventClick(clickedItem.eventData);
          } else {
            // Default behavior: Show event details in a panel
            this.showEventDetails(clickedItem.eventData);
          }
        }
      }
    });

    // Handle timeline range change (zoom, pan)
    this.timeline.on('rangechanged', properties => {
      // Could trigger re-rendering of other components based on visible time range
      console.log('Timeline range changed:', properties);
    });
  }

  /**
   * Show event details in a panel
   * @param {Object} event - Event data
   */
  showEventDetails(event) {
    // Look for a details container
    const detailsContainer = document.getElementById('detailsContainer');
    if (!detailsContainer) return;

    // Build HTML for event details
    let html = `
      <div class="event-details">
        <h3>${event.title}</h3>
        <div class="event-date">${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.formatDate)(event.date, {
      format: 'long'
    })}</div>
        
        <div class="event-categories">
          ${event.categories.map(cat => `<span class="category-tag" style="background-color: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)(cat)}">
              ${cat.charAt(0).toUpperCase() + cat.slice(1)}
            </span>`).join('')}
        </div>
        
        <div class="event-description">${event.description}</div>
        
        ${event.moneyFlow?.amount ? `
          <div class="event-money-flow">
            <h4>Financial Transaction</h4>
            <div class="money-amount">Amount: $${event.moneyFlow.amount.toLocaleString()}</div>
            <div class="money-direction">Direction: ${event.moneyFlow.direction === 'to-trump' ? 'To' : 'From'} Trump</div>
            ${event.moneyFlow.description ? `<div class="money-description">${event.moneyFlow.description}</div>` : ''}
          </div>
        ` : ''}
        
        ${event.location?.city ? `
          <div class="event-location">
            <h4>Location</h4>
            <div>${event.location.city}, ${event.location.country}</div>
          </div>
        ` : ''}
        
        ${event.sources && event.sources.length > 0 ? `
          <div class="event-sources">
            <h4>Sources</h4>
            <ul>
              ${event.sources.map(source => `
                <li>
                  <a href="${source.url}" target="_blank">${source.description}</a>
                  ${source.citation ? `<blockquote>${source.citation}</blockquote>` : ''}
                </li>
              `).join('')}
            </ul>
          </div>
        ` : ''}
      </div>
    `;

    // Display the details
    detailsContainer.innerHTML = html;
    detailsContainer.scrollIntoView({
      behavior: 'smooth'
    });
  }

  /**
   * Filter events by category
   * @param {Array<string>} categories - Categories to show
   */
  filterByCategories(categories) {
    if (!this.timeline || !this.timelineItems) return;
    if (!categories || categories.length === 0) {
      // Show all events
      this.timelineItems.forEach(item => {
        item.visible = true;
        this.timelineItems.update(item);
      });
    } else {
      // Filter events by category
      this.timelineItems.forEach(item => {
        const event = item.eventData;
        const hasCategory = event.categories && event.categories.some(cat => categories.includes(cat));
        item.visible = hasCategory;
        this.timelineItems.update(item);
      });
    }
  }

  /**
   * Filter events by time range
   * @param {Date|string} startDate - Start date
   * @param {Date|string} endDate - End date
   */
  filterByTimeRange(startDate, endDate) {
    if (!this.timeline) return;
    const start = startDate ? new Date(startDate) : new Date(`${this.options.startYear}-01-01`);
    const end = endDate ? new Date(endDate) : new Date(`${this.options.endYear}-12-31`);
    this.timeline.setWindow(start, end, {
      animation: true
    });
  }

  /**
   * Move to a specific date
   * @param {Date|string} date - Target date
   */
  moveTo(date) {
    if (!this.timeline) return;
    this.timeline.moveTo(new Date(date), {
      animation: true
    });
  }

  /**
   * Highlight events by ID
   * @param {Array<string>} eventIds - IDs of events to highlight
   */
  highlightEvents(eventIds) {
    if (!this.timeline || !this.timelineItems) return;

    // Reset all events
    this.timelineItems.forEach(item => {
      const originalEvent = item.eventData;
      const primaryCategory = originalEvent.categories[0] || 'uncategorized';
      item.style = `
        height: ${10 + originalEvent.importance * 2}px;
        background-color: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)(primaryCategory)};
        border-color: ${(0,_utils_helpers_js__WEBPACK_IMPORTED_MODULE_1__.getCategoryColor)(primaryCategory)};
        color: white;
        border-radius: 3px;
        font-size: 9px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
      `;
      this.timelineItems.update(item);
    });

    // Highlight specific events
    if (eventIds && eventIds.length > 0) {
      eventIds.forEach(id => {
        const item = this.timelineItems.get(id);
        if (item) {
          item.style += `
            box-shadow: 0 0 10px 5px rgba(255, 255, 0, 0.5);
            z-index: 100;
            height: ${16 + item.eventData.importance * 2}px;
            font-weight: bold;
          `;
          this.timelineItems.update(item);
        }
      });
    }
  }

  /**
   * Play an animated sequence of events 
   * @param {Object} options - Animation options
   */
  async playSequence(options = {}) {
    if (!this.timeline || !this.timelineItems) return;
    const {
      startYear = this.options.startYear,
      endYear = this.options.endYear,
      speed = 1,
      onProgress = null
    } = options;

    // Get events in chronological order
    const sortedItems = this.timelineItems.get({
      filter: item => {
        const year = new Date(item.start).getFullYear();
        return year >= startYear && year <= endYear;
      }
    }).sort((a, b) => new Date(a.start) - new Date(b.start));
    if (sortedItems.length === 0) return;
    const firstDate = new Date(sortedItems[0].start);
    firstDate.setMonth(firstDate.getMonth() - 1); // Start a bit before first event

    // Move to the start
    this.timeline.setWindow(firstDate, new Date(firstDate.getFullYear() + 3, firstDate.getMonth(), firstDate.getDate()), {
      animation: true
    });

    // Play through events
    for (let i = 0; i < sortedItems.length; i++) {
      const item = sortedItems[i];

      // Wait for animation
      await new Promise(resolve => setTimeout(resolve, 2000 / speed));

      // Move to event
      this.timeline.moveTo(new Date(item.start), {
        animation: true
      });

      // Highlight the event
      this.highlightEvents([item.id]);

      // Show details
      this.showEventDetails(item.eventData);

      // Call progress callback
      if (typeof onProgress === 'function') {
        onProgress({
          current: i + 1,
          total: sortedItems.length,
          event: item.eventData
        });
      }
    }
  }
}

/***/ }),

/***/ "./src/css/main.css":
/*!**************************!*\
  !*** ./src/css/main.css ***!
  \**************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/css/network-effects.css":
/*!*************************************!*\
  !*** ./src/css/network-effects.css ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_network_effects_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./network-effects.css */ "./node_modules/css-loader/dist/cjs.js!./src/css/network-effects.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_network_effects_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_network_effects_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_network_effects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_network_effects_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/js/date-helpers.js":
/*!********************************!*\
  !*** ./src/js/date-helpers.js ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateDateProximityOpacity: function() { return /* binding */ calculateDateProximityOpacity; },
/* harmony export */   dateToSliderPosition: function() { return /* binding */ dateToSliderPosition; },
/* harmony export */   formatDate: function() { return /* binding */ formatDate; },
/* harmony export */   getOpacityClass: function() { return /* binding */ getOpacityClass; },
/* harmony export */   moveDateByDays: function() { return /* binding */ moveDateByDays; },
/* harmony export */   moveDateByMonths: function() { return /* binding */ moveDateByMonths; },
/* harmony export */   setDateRangeFromEvents: function() { return /* binding */ setDateRangeFromEvents; },
/* harmony export */   sliderPositionToDate: function() { return /* binding */ sliderPositionToDate; }
/* harmony export */ });
/**
 * Date helper functions for working with the timeline
 */

// Define the date range for the visualization
// This will be dynamically adjusted based on the actual event dates
let DATE_RANGE = {
  start: new Date('1970-01-01'),
  end: new Date('2025-01-01')
};

// Store the sorted array of actual event dates
let EVENT_DATES = [];

/**
 * Set the date range and event dates array based on actual events
 * @param {Array} events - Array of event objects with date properties
 */
function setDateRangeFromEvents(events) {
  if (!events || !events.length) return;
  try {
    // Filter events with valid dates
    const validEvents = events.filter(event => event && event.date);
    if (validEvents.length > 0) {
      // Create an array of all unique event dates
      const allDates = new Set();
      validEvents.forEach(event => {
        if (event.date) {
          allDates.add(new Date(event.date).toISOString().split('T')[0]);
        }
      });

      // Convert Set back to array of Date objects and sort
      EVENT_DATES = Array.from(allDates).map(dateStr => new Date(dateStr)).sort((a, b) => a.getTime() - b.getTime());

      // Set range based on the earliest and latest events
      DATE_RANGE.start = EVENT_DATES[0];
      DATE_RANGE.end = EVENT_DATES[EVENT_DATES.length - 1];
      console.log(`Set date range with ${EVENT_DATES.length} distinct event dates from`, formatDate(DATE_RANGE.start), 'to', formatDate(DATE_RANGE.end));
    }
  } catch (err) {
    console.error('Error setting date range from events:', err);
  }
}

/**
 * Calculate what percentage (0-100) a date is in our discrete event date array
 * @param {Date} date - Date to calculate position for
 * @returns {number} Percentage (0-100)
 */
function dateToSliderPosition(date) {
  if (EVENT_DATES.length === 0) {
    // Fallback to continuous range if no event dates are available
    const totalRange = DATE_RANGE.end.getTime() - DATE_RANGE.start.getTime();
    const datePosition = date.getTime() - DATE_RANGE.start.getTime();
    return Math.round(datePosition / totalRange * 100);
  }

  // Find the index of the closest event date
  const dateTime = date.getTime();
  let closestIndex = 0;
  let closestDiff = Math.abs(EVENT_DATES[0].getTime() - dateTime);
  for (let i = 1; i < EVENT_DATES.length; i++) {
    const diff = Math.abs(EVENT_DATES[i].getTime() - dateTime);
    if (diff < closestDiff) {
      closestDiff = diff;
      closestIndex = i;
    }
  }

  // Convert index to percentage position on slider
  return Math.round(closestIndex / Math.max(1, EVENT_DATES.length - 1) * 100);
}

/**
 * Convert a slider position (0-100) to the nearest event date
 * @param {number} position - Slider position (0-100)
 * @returns {Date} Corresponding date from the event dates array
 */
function sliderPositionToDate(position) {
  if (EVENT_DATES.length === 0) {
    // Fallback to continuous range if no event dates are available
    const totalRange = DATE_RANGE.end.getTime() - DATE_RANGE.start.getTime();
    const datePosition = position / 100 * totalRange;
    return new Date(DATE_RANGE.start.getTime() + datePosition);
  }

  // Convert percentage to index in the event dates array
  const index = Math.min(EVENT_DATES.length - 1, Math.round(position / 100 * (EVENT_DATES.length - 1)));
  return new Date(EVENT_DATES[index]);
}

/**
 * Format a date for display
 * @param {Date} date - Date to format
 * @returns {string} Formatted date string
 */
function formatDate(date) {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

/**
 * Calculate opacity (0-1) based on date proximity
 * @param {Date} eventDate - Event date to calculate opacity for
 * @param {Date} selectedDate - Currently selected date
 * @param {number} maxDaysRange - Maximum days range for calculation
 * @returns {number} Opacity value from 0 to 1
 */
function calculateDateProximityOpacity(eventDate, selectedDate, maxDaysRange = 365) {
  // Convert to timestamp for calculation
  const eventTime = new Date(eventDate).getTime();
  const selectedTime = new Date(selectedDate).getTime();

  // Calculate difference in days
  const diffTime = Math.abs(eventTime - selectedTime);
  const diffDays = diffTime / (1000 * 60 * 60 * 24);

  // Calculate opacity (1 for exact match, decreasing to 0.1 for dates maxDaysRange away)
  if (diffDays <= 0) return 1;
  if (diffDays >= maxDaysRange) return 0.1;

  // Linear interpolation between 1 and 0.1
  return 1 - diffDays / maxDaysRange * 0.9;
}

/**
 * Get opacity class name based on calculated opacity
 * @param {number} opacity - Calculated opacity (0-1)
 * @returns {string} CSS class name
 */
function getOpacityClass(opacity) {
  // Round to nearest 10%
  const opacityPercent = Math.round(opacity * 10) * 10;
  return `node-opacity-${opacityPercent}`;
}

/**
 * Move to the next event date
 * @param {Date} date - Current date
 * @returns {Date} Next event date
 */
function moveDateByDays(date, days) {
  if (EVENT_DATES.length === 0) {
    // Fallback to regular day movement if no event dates
    const newDate = new Date(date);
    newDate.setDate(newDate.getDate() + (days > 0 ? 1 : -1));
    return newDate;
  }

  // Find the current position in the event dates array
  const currentTime = date.getTime();
  let currentIndex = 0;

  // Find closest current position
  for (let i = 0; i < EVENT_DATES.length; i++) {
    if (Math.abs(EVENT_DATES[i].getTime() - currentTime) < Math.abs(EVENT_DATES[currentIndex].getTime() - currentTime)) {
      currentIndex = i;
    }
  }

  // Move to next or previous event date
  const newIndex = days > 0 ? Math.min(EVENT_DATES.length - 1, currentIndex + 1) : Math.max(0, currentIndex - 1);
  return EVENT_DATES[newIndex];
}

/**
 * Jump forward or backward multiple event dates
 * @param {Date} date - Current date
 * @param {number} months - Direction (positive = forward, negative = backward)
 * @returns {Date} New event date
 */
function moveDateByMonths(date, months) {
  if (EVENT_DATES.length === 0) {
    // Fallback to regular month movement if no event dates
    const newDate = new Date(date);
    newDate.setMonth(newDate.getMonth() + months);
    return newDate;
  }

  // Find the current position in the event dates array
  const currentTime = date.getTime();
  let currentIndex = 0;

  // Find closest current position
  for (let i = 0; i < EVENT_DATES.length; i++) {
    if (Math.abs(EVENT_DATES[i].getTime() - currentTime) < Math.abs(EVENT_DATES[currentIndex].getTime() - currentTime)) {
      currentIndex = i;
    }
  }

  // Jump by about 5 events in the specified direction
  const jump = months > 0 ? 5 : -5;
  const newIndex = Math.min(EVENT_DATES.length - 1, Math.max(0, currentIndex + jump));
  return EVENT_DATES[newIndex];
}

/***/ }),

/***/ "./src/js/debug.js":
/*!*************************!*\
  !*** ./src/js/debug.js ***!
  \*************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   validateNetworkData: function() { return /* binding */ validateNetworkData; }
/* harmony export */ });
/**
 * Debug helper for Trump-Russia Timeline visualization
 * This module adds debugging and data validation to help identify issues
 */

// Check entity and relationship data integrity
function validateNetworkData(entities, relationships) {
  console.log('--- VALIDATING NETWORK DATA ---');

  // Check entities
  console.log(`Total entities: ${Object.keys(entities).length}`);
  const entityTypes = {};
  const entityGroupCounts = {};
  const missingNames = [];

  // Check entity structure
  Object.entries(entities).forEach(([id, entity]) => {
    // Record entity types
    const type = entity.type || 'unknown';
    entityTypes[type] = (entityTypes[type] || 0) + 1;

    // Record conceptual grouping
    let group = 'other';
    if (entity.name?.toLowerCase().includes('trump') && entity.name?.toLowerCase().includes('donald')) {
      group = 'T';
    } else if (entity.type === 'russian' || entity.name?.toLowerCase().includes('russia') || entity.name?.toLowerCase().includes('soviet') || entity.name?.toLowerCase().includes('kgb')) {
      group = 'R';
    } else {
      group = 'T/R'; // Will be refined later based on connections
    }
    entityGroupCounts[group] = (entityGroupCounts[group] || 0) + 1;

    // Check for missing names
    if (!entity.name) {
      missingNames.push(id);
    }
  });

  // If we have no entities, add some placeholders
  if (Object.keys(entities).length === 0) {
    console.warn('No entities found! Adding placeholders for visualization.');
    entities['trump'] = {
      id: 'trump',
      name: 'Donald Trump',
      type: 'person',
      subtype: 'businessman',
      significance: 10
    };
    entities['russia'] = {
      id: 'russia',
      name: 'Russia/Soviet Union',
      type: 'russian',
      subtype: 'country',
      significance: 10
    };
    entities['intermediary1'] = {
      id: 'intermediary1',
      name: 'Trump-Russia Intermediary 1',
      type: 'person',
      significance: 7
    };
    entities['intermediary2'] = {
      id: 'intermediary2',
      name: 'Trump-Russia Intermediary 2',
      type: 'organization',
      significance: 6
    };
    console.log('Added placeholder entities:', Object.keys(entities));
  }

  // Check relationships
  console.log(`Total relationships: ${relationships.length}`);
  const relationshipTypes = {};
  const missingEndpoints = [];
  const selfReferences = [];

  // Check relationship structure
  relationships.forEach(rel => {
    // Record relationship types
    const type = rel.type || 'unknown';
    relationshipTypes[type] = (relationshipTypes[type] || 0) + 1;

    // Check for missing endpoints
    if (!rel.source || !rel.target) {
      missingEndpoints.push(rel);
    }

    // Check for self-references
    if (rel.source === rel.target) {
      selfReferences.push(rel);
    }
  });

  // If we have entities but no relationships, add placeholders
  if (Object.keys(entities).length > 0 && relationships.length === 0) {
    console.warn('No relationships found! Adding placeholders for visualization.');

    // Try to find Trump and Russia entities
    const trumpId = Object.keys(entities).find(id => entities[id].name?.toLowerCase().includes('trump') && entities[id].name?.toLowerCase().includes('donald')) || 'trump';
    const russiaId = Object.keys(entities).find(id => entities[id].type === 'russian' || entities[id].name?.toLowerCase().includes('russia') || entities[id].name?.toLowerCase().includes('soviet')) || 'russia';

    // Get some intermediary entities if possible
    let intermediaries = Object.keys(entities).filter(id => id !== trumpId && id !== russiaId).slice(0, 2);

    // Ensure we have intermediaries
    if (intermediaries.length === 0) {
      if (!entities['intermediary1']) {
        entities['intermediary1'] = {
          id: 'intermediary1',
          name: 'Trump-Russia Intermediary 1',
          type: 'person',
          significance: 7
        };
      }
      if (!entities['intermediary2']) {
        entities['intermediary2'] = {
          id: 'intermediary2',
          name: 'Trump-Russia Intermediary 2',
          type: 'organization',
          significance: 6
        };
      }
      intermediaries = ['intermediary1', 'intermediary2'];
    }

    // Add T → T/R connections
    intermediaries.forEach((id, index) => {
      relationships.push({
        source: trumpId,
        target: id,
        type: 'connection',
        strength: 7 - index
      });
    });

    // Add T/R → R connections
    intermediaries.forEach((id, index) => {
      relationships.push({
        source: id,
        target: russiaId,
        type: 'connection',
        strength: 7 - index
      });
    });
    console.log('Added placeholder relationships between:', trumpId, intermediaries, russiaId);
  }

  // Log summary
  console.log('Entity types:', entityTypes);
  console.log('Entity groups:', entityGroupCounts);
  console.log('Relationship types:', relationshipTypes);
  if (missingNames.length > 0) {
    console.warn('Entities missing names:', missingNames);
  }
  if (missingEndpoints.length > 0) {
    console.warn('Relationships with missing endpoints:', missingEndpoints);
  }
  if (selfReferences.length > 0) {
    console.warn('Self-referencing relationships:', selfReferences);
  }
  console.log('--- END VALIDATION ---');
  return {
    entities,
    relationships
  };
}

// Export helper functions
/* harmony default export */ __webpack_exports__["default"] = ({
  validateNetworkData
});

/***/ }),

/***/ "./src/js/event-connector.js":
/*!***********************************!*\
  !*** ./src/js/event-connector.js ***!
  \***********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   connectEventsToTrump: function() { return /* binding */ connectEventsToTrump; },
/* harmony export */   createEventInfoHTML: function() { return /* binding */ createEventInfoHTML; },
/* harmony export */   findTrumpNode: function() { return /* binding */ findTrumpNode; },
/* harmony export */   getRelevantEvents: function() { return /* binding */ getRelevantEvents; },
/* harmony export */   updateNodesTemporalOpacity: function() { return /* binding */ updateNodesTemporalOpacity; }
/* harmony export */ });
/**
 * Event connector module 
 * 
 * Handles creating connections between events, entities and Trump,
 * implementing the umbrella structure (Trump -> Events -> Entities -> People)
 * 
 * This module includes functions to reset, filter, and update the network visualization
 * based on specific dates.
 */

/**
 * Find the Trump node in the network
 * @param {Object} network - Cytoscape network instance
 * @returns {Object|null} - The Trump node if found, null otherwise
 */
function findTrumpNode(network) {
  if (!network) {
    console.warn('Missing network when finding Trump node');
    return null;
  }
  try {
    // Find the Trump node - try different possible IDs
    let trumpNode = null;
    if (network.getElementById('entity-001').length > 0) {
      trumpNode = network.getElementById('entity-001');
    } else if (network.getElementById('trump').length > 0) {
      trumpNode = network.getElementById('trump');
    } else {
      // As a fallback, look for any node with trump in the label
      const trumpNodeQuery = network.nodes().filter(node => {
        const label = node.data('label') || '';
        return label.toLowerCase().includes('trump');
      });
      if (trumpNodeQuery && trumpNodeQuery.length > 0) {
        trumpNode = trumpNodeQuery;
      }
    }
    return trumpNode && trumpNode.length > 0 ? trumpNode[0] : null;
  } catch (err) {
    console.error('Error finding Trump node:', err);
    return null;
  }
}

/**
 * Create connections between Trump, events, and entities
 * @param {Object} network - Cytoscape network instance
 * @param {Array} allEvents - Event data array
 * @param {Object} trumpNode - Trump node in the network
 */
function connectEventsToTrump(network, allEvents, trumpNode) {
  if (!network || !trumpNode || !allEvents || !allEvents.length) {
    console.warn('Missing data for connectEventsToTrump');
    return;
  }
  console.log(`Connecting ${allEvents.length} events to Trump node`);
  try {
    // Clear existing event nodes before adding new ones
    const existingEventNodes = network.nodes('[type="event"]');
    if (existingEventNodes.length > 0) {
      network.remove(existingEventNodes);
    }

    // Remove existing event connections
    network.edges('.event-connection').remove();

    // FIRST: Position Trump at bottom center and make it unmovable
    const centerX = network.width() / 2;
    const bottomY = network.height() * 0.9; // Place even lower

    trumpNode.position({
      x: centerX,
      y: bottomY
    });
    trumpNode.lock(); // Lock position

    // Give Trump node special styling
    trumpNode.addClass('trump-node');

    // Sort events by date and limit to a reasonable number
    const sortedEvents = [...allEvents].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()).slice(0, 7); // Limit to 7 events for a cleaner umbrella

    // SECOND: Position events in a perfect umbrella arc above Trump
    const eventCount = sortedEvents.length;
    const radius = Math.min(150, network.width() * 0.3); // Tighter radius
    const arcAngle = Math.PI * 0.8; // Wider arc for better umbrella shape
    const startAngle = Math.PI / 2 - arcAngle / 2; // Start from left side

    // Create a clean umbrella shape with events
    sortedEvents.forEach((event, index) => {
      if (!event.date) return;

      // Calculate exact position in arc
      const angle = startAngle + index / Math.max(1, eventCount - 1) * arcAngle;
      const x = centerX + radius * Math.cos(angle);
      const y = bottomY - radius * Math.sin(angle) * 0.8; // Flatter umbrella

      // Create event node with fixed position
      const eventNode = {
        group: 'nodes',
        data: {
          id: `event-${event.id}`,
          label: event.title,
          type: 'event',
          group: 'event',
          eventData: event,
          description: event.description,
          date: event.date
        },
        position: {
          x,
          y
        },
        // Fixed position
        classes: 'event-node'
      };

      // Add node to network
      network.add(eventNode);

      // Create direct connection from Trump to this event (umbrella spoke)
      const eventConnection = {
        group: 'edges',
        data: {
          id: `trump-to-${event.id}`,
          source: trumpNode.id(),
          target: `event-${event.id}`,
          type: 'event-connection'
        },
        classes: 'event-connection'
      };
      network.add(eventConnection);

      // Add entity connections
      if (event.entities && event.entities.length > 0) {
        event.entities.forEach(entityId => {
          const entityNode = network.getElementById(entityId);
          if (entityNode.length > 0) {
            // Connect event to entity
            const entityConnection = {
              group: 'edges',
              data: {
                id: `${event.id}-to-${entityId}`,
                source: `event-${event.id}`,
                target: entityId,
                type: 'entity-connection'
              },
              classes: 'entity-connection'
            };
            network.add(entityConnection);
          }
        });
      }
    });

    // Lock event nodes in place to maintain umbrella shape
    network.nodes('[type="event"]').forEach(node => {
      node.lock();
    });

    // THIRD: Arrange entity nodes above the events to complete umbrella
    // Create a proper "canopy" for the umbrella with entities
    const entityNodes = network.nodes().filter(n => n.id() !== trumpNode.id() && !n.hasClass('event-node'));

    // Position entities above their connected events, in the top part of umbrella
    entityNodes.forEach(entityNode => {
      // Find all connected event nodes
      const connectedEvents = entityNode.neighborhood('node.event-node');
      if (connectedEvents.length > 0) {
        // Calculate average position of connected events
        let avgX = 0,
          avgY = 0;
        connectedEvents.forEach(eventNode => {
          avgX += eventNode.position('x');
          avgY += eventNode.position('y');
        });
        avgX /= connectedEvents.length;
        avgY /= connectedEvents.length;

        // Position entity above connected events (higher up in umbrella)
        const entityY = Math.min(avgY - 80, bottomY - 200);
        entityNode.position({
          x: avgX + (Math.random() * 50 - 25),
          // Small random x offset
          y: entityY
        });
      }
    });

    // Disable automatic layout to keep umbrella shape
    trumpNode.position({
      x: centerX,
      y: bottomY
    });
    trumpNode.lock();
  } catch (err) {
    console.error('Error connecting events to Trump:', err);
  }
}

/**
 * Update the opacity of nodes based on exact date matching
 * @param {Object} network - Cytoscape network instance
 * @param {Array} allEvents - Array of all event objects
 * @param {Date} currentDate - Currently selected date
 */
function updateNodesTemporalOpacity(network, allEvents, currentDate) {
  if (!network || !allEvents || !currentDate) return;
  try {
    // Format the current date as YYYY-MM-DD for comparison
    const selectedDateStr = currentDate.toISOString().split('T')[0];
    console.log(`Updating opacity for specific date: ${selectedDateStr}`);

    // First, find the Trump node
    let trumpNode = findTrumpNode(network);
    if (!trumpNode) {
      console.error('Could not find Trump node');
      return;
    }

    // Find events for the exact date first
    const exactDateEvents = getRelevantEvents(allEvents, currentDate, 0);

    // If no exact matches, try same month events
    const eventsToShow = exactDateEvents.length > 0 ? exactDateEvents : getRelevantEvents(allEvents, currentDate, 30);
    if (eventsToShow.length === 0) {
      console.log('No events to show for date:', selectedDateStr);
      return;
    }
    console.log(`Showing ${eventsToShow.length} events for ${selectedDateStr}`);

    // Create event nodes and connect them to Trump
    connectEventsToTrump(network, eventsToShow, trumpNode);
  } catch (err) {
    console.error('Error updating opacity for date:', err);
  }
}

/**
 * Get events for the specific selected date from the JSON data
 * Improved to handle exact date matching and fallbacks consistently
 * @param {Array} allEvents - Array of all event objects
 * @param {Date} currentDate - Currently selected date
 * @param {number} maxDaysRange - Maximum days around the date to consider (0 = exact match only)
 * @returns {Array} Array of events for the specific date or range
 */
function getRelevantEvents(allEvents, currentDate, maxDaysRange = 0) {
  // Format the current date as YYYY-MM-DD for comparison
  const selectedDateStr = currentDate.toISOString().split('T')[0];
  console.log(`Finding events for specific date: ${selectedDateStr} (range: ${maxDaysRange} days)`);
  if (!allEvents || !currentDate) {
    console.warn('Missing data for getRelevantEvents:', {
      hasEvents: !!allEvents,
      hasDate: !!currentDate
    });
    return [];
  }

  // If maxDaysRange is 0, only get exact date matches
  if (maxDaysRange === 0) {
    // Filter events to include only those matching the exact date
    const exactDateEvents = allEvents.filter(event => {
      if (!event.date) {
        return false;
      }

      // Convert event date to YYYY-MM-DD format
      const eventDateObj = new Date(event.date);
      const eventDateStr = eventDateObj.toISOString().split('T')[0];

      // Only include events from the exact date
      return eventDateStr === selectedDateStr;
    });
    console.log(`Found ${exactDateEvents.length} events on exact date ${selectedDateStr}`);
    return exactDateEvents;
  }

  // Otherwise, get events within the specified range
  // Calculate the date range boundaries
  const startDate = new Date(currentDate);
  startDate.setDate(startDate.getDate() - maxDaysRange);
  const endDate = new Date(currentDate);
  endDate.setDate(endDate.getDate() + maxDaysRange);

  // Find events within the date range
  const rangeEvents = allEvents.filter(event => {
    if (!event.date) return false;
    const eventDate = new Date(event.date);
    return eventDate >= startDate && eventDate <= endDate;
  });

  // Sort events by proximity to the current date
  rangeEvents.sort((a, b) => {
    const dateA = new Date(a.date);
    const dateB = new Date(b.date);
    const diffA = Math.abs(dateA.getTime() - currentDate.getTime());
    const diffB = Math.abs(dateB.getTime() - currentDate.getTime());
    return diffA - diffB;
  });

  // If no events in range but we're looking for a month, use same month events
  if (rangeEvents.length === 0 && maxDaysRange >= 15) {
    const month = currentDate.getMonth();
    const year = currentDate.getFullYear();
    const sameMonthEvents = allEvents.filter(event => {
      if (!event.date) return false;
      const eventDate = new Date(event.date);
      return eventDate.getFullYear() === year && eventDate.getMonth() === month;
    });

    // Sort by day proximity within month
    sameMonthEvents.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      const diffA = Math.abs(dateA.getDate() - currentDate.getDate());
      const diffB = Math.abs(dateB.getDate() - currentDate.getDate());
      return diffA - diffB;
    });
    console.log(`No events in ${maxDaysRange}-day range, found ${sameMonthEvents.length} events in same month`);
    return sameMonthEvents;
  }
  console.log(`Found ${rangeEvents.length} events within ${maxDaysRange} days of ${selectedDateStr}`);
  return rangeEvents;
}

/**
 * Create HTML for displaying event information for the specific date
 * @param {Array} events - Array of event objects to display
 * @returns {string} HTML string
 */
function createEventInfoHTML(events) {
  if (!events || events.length === 0) {
    return '<div class="event-info">No events found for this date</div>';
  }
  const mainEvent = events[0];
  const otherEvents = events.slice(1, 3); // Show up to 3 more events

  // Extract date information
  const eventDate = new Date(mainEvent.date);
  const formattedDate = eventDate.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Determine if we're showing exact date or same-month events
  const isExactDate = otherEvents.length > 0 ? new Date(otherEvents[0].date).getDate() === eventDate.getDate() : true;
  let html = `
    <div class="event-info">
      <h3>${mainEvent.title}</h3>
      <div class="event-date">${formattedDate}</div>
      <p>${mainEvent.description}</p>
  `;
  if (otherEvents.length > 0) {
    const headerText = isExactDate ? `Other events on ${formattedDate}:` : `Other nearby events (${eventDate.toLocaleDateString('en-US', {
      month: 'long',
      year: 'numeric'
    })}):`;
    html += `<hr><h4>${headerText}</h4><ul>`;
    otherEvents.forEach(event => {
      html += `
        <li>
          <strong>${event.title}</strong>
          <span class="event-date">(${new Date(event.date).toLocaleDateString()})</span>
        </li>
      `;
    });
    html += '</ul>';
  }
  if (events.length > 4) {
    const remainingText = isExactDate ? `...and ${events.length - 4} more events on this date` : `...and ${events.length - 4} more events in this timeframe`;
    html += `<p>${remainingText}</p>`;
  }
  html += '</div>';
  return html;
}

/***/ }),

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_timeline__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/timeline */ "./src/components/timeline.js");
/* harmony import */ var _components_network__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/network */ "./src/components/network.js");
/* harmony import */ var _components_moneyCounter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/moneyCounter */ "./src/components/moneyCounter.js");
/* harmony import */ var _debug__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./debug */ "./src/js/debug.js");
/* harmony import */ var _utils_dataLoader__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/dataLoader */ "./src/utils/dataLoader.js");
/* harmony import */ var _date_helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./date-helpers */ "./src/js/date-helpers.js");
/* harmony import */ var _event_connector__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./event-connector */ "./src/js/event-connector.js");
/* harmony import */ var _css_main_css__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../css/main.css */ "./src/css/main.css");
/* harmony import */ var _css_network_effects_css__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../css/network-effects.css */ "./src/css/network-effects.css");
/* harmony import */ var _styles_network_css__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../styles/network.css */ "./src/styles/network.css");











// Main application entry point
// Use window object to store initialization state that persists across HMR updates
window.isAppInitialized = window.isAppInitialized || false;
console.log('Module loaded/reloaded, isAppInitialized =', window.isAppInitialized);

// Function to clean up existing visualizations
function cleanupVisualizations() {
  console.log('Cleaning up existing visualizations');

  // Remove existing SVG elements from containers
  const networkContainer = document.querySelector('#network-container');
  const moneyContainer = document.querySelector('#money-tracker');
  if (networkContainer) {
    const existingSvgs = networkContainer.querySelectorAll('svg');
    if (existingSvgs.length > 0) {
      console.log(`Removing ${existingSvgs.length} existing SVG(s) from network container`);
      existingSvgs.forEach(svg => svg.remove());
    }
  }
  if (moneyContainer) {
    const existingSvgs = moneyContainer.querySelectorAll('svg');
    if (existingSvgs.length > 0) {
      console.log(`Removing ${existingSvgs.length} existing SVG(s) from money container`);
      existingSvgs.forEach(svg => svg.remove());
    }
  }
}

/**
 * Update all visualizations for a specific date
 * @param {Date} date - Date to update visualizations for
 */
function updateVisualizationsForDate(date) {
  // Store globally
  window.appCurrentDate = date;

  // Get references to components
  const network = window.TrumpRussiaTimeline?.NetworkVisualization?.instance;
  const moneyCounter = window.TrumpRussiaTimeline?.MoneyCounterVisualization?.instance;

  // Update network visualization
  if (network && network.network) {
    try {
      console.log(`Updating visualizations for date: ${date.toISOString().split('T')[0]}`);

      // First make sure we have data
      if (!_utils_dataLoader__WEBPACK_IMPORTED_MODULE_4__["default"].data || !_utils_dataLoader__WEBPACK_IMPORTED_MODULE_4__["default"].data.events) {
        console.error('No event data available');
        return;
      }

      // Find the Trump node
      const trumpNode = (0,_event_connector__WEBPACK_IMPORTED_MODULE_6__.findTrumpNode)(network.network);
      if (!trumpNode) {
        console.error('Could not find Trump node');
        return;
      }

      // Find events for the exact date first
      const exactDateEvents = (0,_event_connector__WEBPACK_IMPORTED_MODULE_6__.getRelevantEvents)(_utils_dataLoader__WEBPACK_IMPORTED_MODULE_4__["default"].data.events, date, 0);

      // If no exact matches, try same month events
      const eventsToShow = exactDateEvents.length > 0 ? exactDateEvents : (0,_event_connector__WEBPACK_IMPORTED_MODULE_6__.getRelevantEvents)(_utils_dataLoader__WEBPACK_IMPORTED_MODULE_4__["default"].data.events, date, 30);

      // Connect events to Trump with the umbrella structure
      if (eventsToShow.length > 0) {
        (0,_event_connector__WEBPACK_IMPORTED_MODULE_6__.connectEventsToTrump)(network.network, eventsToShow, trumpNode);
      }

      // Update event info display
      const eventInfoContainer = document.getElementById('event-info-container');
      if (eventInfoContainer) {
        if (eventsToShow.length > 0) {
          eventInfoContainer.innerHTML = (0,_event_connector__WEBPACK_IMPORTED_MODULE_6__.createEventInfoHTML)(eventsToShow);
        } else {
          eventInfoContainer.innerHTML = '<div class="event-info">No events found near this date</div>';
        }
      }
    } catch (err) {
      console.error('Error updating network visualization for date:', err);
    }
  }

  // Update money counter
  if (moneyCounter) {
    updateMoneyCounterForDate(moneyCounter, date);
  }
}

/**
 * Update date controls to reflect current date
 */
function updateDateControls() {
  const dateSlider = document.getElementById('date-slider');
  const currentDateDisplay = document.getElementById('current-date');
  if (dateSlider && currentDateDisplay && window.appCurrentDate) {
    dateSlider.value = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.dateToSliderPosition)(window.appCurrentDate);
    currentDateDisplay.textContent = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.formatDate)(window.appCurrentDate);
  }
}

// Main initialization function
async function initializeApplication() {
  console.log('DOMContentLoaded fired, isAppInitialized =', window.isAppInitialized);

  // Prevent duplicate initialization which can happen in development mode 
  if (window.isAppInitialized) {
    console.log('Application already initialized, skipping duplicate initialization');
    return;
  }

  // Check if containers already have SVG elements (indicating previous initialization)
  const networkContainer = document.querySelector('#network-container');
  const moneyContainer = document.querySelector('#money-tracker');
  if (networkContainer && networkContainer.querySelector('svg')) {
    console.warn('Network container already has SVG element! This suggests duplicate initialization.');
  }
  if (moneyContainer && moneyContainer.querySelector('svg')) {
    console.warn('Money tracker container already has SVG element! This suggests duplicate initialization.');
  }

  // Clean up any existing visualizations before initializing
  cleanupVisualizations();
  window.isAppInitialized = true;
  console.log('Setting isAppInitialized to true');
  try {
    // Load data from by-year folder
    // First, get the list of years
    const years = ['1971', '1972', '1973', '1975', '1977', '1978', '1979', '1980', '1981', '1982', '1983', '1984', '1985', '1986', '1987', '1988', '1989', '1990', '1991', '1992', '1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012', '2013', '2014', '2015'];

    // Load and merge all year files
    const timelineEvents = [];
    const allEntities = {};
    const allRelationships = [];
    const allTransactions = [];
    const allIntelligenceActivities = [];

    // Load each year file and merge the data
    for (const year of years) {
      try {
        console.log(`Trying to load data for year ${year}...`);
        const response = await fetch(`data/processed/by-year/${year}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load data for year ${year}: ${response.status} ${response.statusText}`);
        }
        const yearData = await response.json();
        console.log(`Successfully loaded data for year ${year}`);

        // Add events from this year
        if (yearData.events) {
          timelineEvents.push(...yearData.events);
        }

        // Merge entities
        if (yearData.entities) {
          Object.assign(allEntities, yearData.entities);
        }

        // Add relationships
        if (yearData.relationships) {
          allRelationships.push(...yearData.relationships);
        }

        // Add financial transactions
        if (yearData.transactions) {
          allTransactions.push(...yearData.transactions);
        }

        // Add intelligence activities
        if (yearData.intelligenceActivities) {
          allIntelligenceActivities.push(...yearData.intelligenceActivities);
        }
      } catch (error) {
        console.warn(`Could not load data for year ${year}:`, error);
      }
    }

    // Validate network data before processing
    console.log('Validating network data...');
    const validatedData = (0,_debug__WEBPACK_IMPORTED_MODULE_3__.validateNetworkData)(allEntities, allRelationships);

    // Prepare network data format expected by NetworkGraph component
    console.log('Processing network data');

    // First create a map of all valid entity IDs to ensure relationships only include valid entities
    const validEntityIds = new Map();
    Object.entries(allEntities).forEach(([id, entity]) => {
      validEntityIds.set(id, true);
    });

    // Convert entities to nodes format expected by D3
    const nodes = Object.values(allEntities).map(entity => ({
      id: entity.id,
      label: entity.name || entity.id,
      group: entity.type || 'other',
      type: entity.subtype || entity.type || 'other',
      startDate: new Date(entity.firstAppearance || '1970-01-01'),
      endDate: new Date(entity.lastAppearance || '2025-01-01'),
      value: entity.significance || 1
    }));

    // Create a special node for Trump if one doesn't already exist
    if (!validEntityIds.has('trump') && !validEntityIds.has('entity-001')) {
      const trumpNode = {
        id: 'trump',
        label: 'Donald J. Trump',
        group: 'trump',
        type: 'person',
        startDate: new Date('1970-01-01'),
        endDate: new Date('2025-01-01'),
        value: 10
      };
      nodes.push(trumpNode);
      validEntityIds.set('trump', true);
      console.log('Added Trump node since it was missing');
    }

    // Check for any missing entities referenced in relationships and create placeholder nodes
    console.log('Checking for missing entities referenced in relationships');
    allRelationships.forEach(rel => {
      if (!validEntityIds.has(rel.source)) {
        console.log(`Creating placeholder for missing entity: ${rel.source}`);
        const placeholderNode = {
          id: rel.source,
          label: rel.source.replace('entity-', 'Entity '),
          group: 'other',
          type: 'other',
          startDate: new Date('1970-01-01'),
          endDate: new Date('2025-01-01'),
          value: 1
        };
        nodes.push(placeholderNode);
        validEntityIds.set(rel.source, true);
      }
      if (!validEntityIds.has(rel.target)) {
        console.log(`Creating placeholder for missing entity: ${rel.target}`);
        const placeholderNode = {
          id: rel.target,
          label: rel.target,
          group: 'other',
          type: 'other',
          startDate: new Date('1970-01-01'),
          endDate: new Date('2025-01-01'),
          value: 1
        };
        nodes.push(placeholderNode);
        validEntityIds.set(rel.target, true);
      }
    });

    // All relationships should be valid now since we've created placeholder nodes
    const validRelationships = allRelationships;

    // Convert relationships to links format expected by D3
    const links = validRelationships.map(rel => ({
      source: rel.source,
      target: rel.target,
      type: rel.type || 'other',
      value: rel.strength || 1,
      startDate: new Date(rel.startDate || '1970-01-01'),
      endDate: new Date(rel.endDate || '2025-01-01')
    }));

    // Final network data structure
    // Convert from nodes/links format to nodes/edges format expected by NetworkVisualization
    const networkData = {
      nodes,
      edges: links.map(link => ({
        from: link.source,
        to: link.target,
        label: link.type,
        value: link.value,
        arrows: 'to'
      }))
    };
    console.log(`Network data processed: ${nodes.length} nodes, ${networkData.edges.length} edges`);

    // Prepare financial data for MoneyCounter
    const financialData = allTransactions.map(transaction => ({
      date: new Date(transaction.date),
      amount: transaction.amount,
      direction: transaction.direction || 'to-trump',
      description: transaction.description || ''
    }));

    // Initialize components with data options
    let timeline, network, moneyCounter;

    // Set date range from actual event data
    (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.setDateRangeFromEvents)(timelineEvents);

    // Find an interesting starting date (mid-range by default)
    let initialDate = new Date('1987-01-01'); // Fallback default

    // Try to find an event around 1987 as a starting point (interesting era)
    if (timelineEvents && timelineEvents.length > 0) {
      // Sort events by date for finding interesting events
      const sortedEvents = [...timelineEvents].filter(e => e.date).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
      if (sortedEvents.length > 0) {
        // Look for events in 1987 (interesting period)
        const events1987 = sortedEvents.filter(e => new Date(e.date).getFullYear() === 1987);
        if (events1987.length > 0) {
          // Use first event from 1987
          initialDate = new Date(events1987[0].date);
        } else {
          // Otherwise use a date roughly in the middle of the timeline
          const middleIndex = Math.floor(sortedEvents.length / 2);
          initialDate = new Date(sortedEvents[middleIndex].date);
        }
      }
    }

    // Set global date state
    window.appCurrentDate = initialDate;
    console.log('Setting initial date to:', (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.formatDate)(window.appCurrentDate));
    try {
      console.log('Initializing network with', networkData.nodes.length, 'nodes and', networkData.edges.length, 'edges');
      network = new _components_network__WEBPACK_IMPORTED_MODULE_1__["default"]('network-container', {
        width: document.getElementById('network-container')?.clientWidth || 600,
        height: 500,
        nodeRadius: 20,
        // Larger nodes for better visibility
        linkDistance: 150,
        // Increased for better spacing
        charge: -500,
        // Stronger repulsion
        centerForce: 0.1,
        // Add center gravity
        layout: 'hierarchical',
        // Use hierarchical layout for the umbrella effect
        positionTrumpAtBottom: true // Position Trump at bottom
      });

      // Create network data option for initialization
      const networkFilterOptions = {
        startYear: 1970,
        endYear: new Date(window.appCurrentDate).getFullYear()
      };

      // Call initialize with the data
      await network.initialize(networkFilterOptions);
      console.log('Network initialized successfully');

      // Store instance for later reference
      if (!window.TrumpRussiaTimeline) window.TrumpRussiaTimeline = {};
      if (!window.TrumpRussiaTimeline.NetworkVisualization) window.TrumpRussiaTimeline.NetworkVisualization = {};
      window.TrumpRussiaTimeline.NetworkVisualization.instance = network;
    } catch (err) {
      console.error('Failed to initialize network:', err);
    }
    try {
      console.log('Initializing money counter with', financialData.length, 'transactions');
      moneyCounter = new _components_moneyCounter__WEBPACK_IMPORTED_MODULE_2__["default"]('money-tracker', {
        width: document.getElementById('money-tracker')?.clientWidth || 200,
        height: 300,
        maxAmount: 1000000000,
        // 1 billion
        startYear: 1970,
        endYear: new Date(window.appCurrentDate).getFullYear()
      });

      // Call initialize after creating the component
      await moneyCounter.initialize();
      console.log('Money counter initialized successfully');

      // Store instance for later reference
      if (!window.TrumpRussiaTimeline) window.TrumpRussiaTimeline = {};
      if (!window.TrumpRussiaTimeline.MoneyCounterVisualization) window.TrumpRussiaTimeline.MoneyCounterVisualization = {};
      window.TrumpRussiaTimeline.MoneyCounterVisualization.instance = moneyCounter;
    } catch (err) {
      console.error('Failed to initialize money counter:', err);
    }

    // Connect components
    let componentsInitialized = false;

    // Setup initial state - only if both network and money counter are available
    if (network && moneyCounter) {
      componentsInitialized = true;

      // Initial update with the start date
      updateVisualizationsForDate(window.appCurrentDate);

      // Setup any component specific event handlers
      if (typeof network.on === 'function') {
        network.on('nodeSelected', nodeData => {
          console.log('Node selected:', nodeData);
          // Could highlight or display node details
        });
      }
    } else {
      console.warn('Some components failed to initialize');
    }

    // Set up UI controls
    const dateSlider = document.getElementById('date-slider');
    const currentDateDisplay = document.getElementById('current-date');
    const prevDayBtn = document.getElementById('prev-day-btn');
    const nextDayBtn = document.getElementById('next-day-btn');
    const prevMonthBtn = document.getElementById('prev-month-btn');
    const nextMonthBtn = document.getElementById('next-month-btn');
    const categoryFilters = document.querySelectorAll('.category-filters input[type="checkbox"]');
    const searchInput = document.getElementById('search-input');
    const searchButton = document.getElementById('search-button');

    // Create container for event info display if it doesn't exist
    let eventInfoContainer = document.getElementById('event-info-container');
    if (!eventInfoContainer) {
      eventInfoContainer = document.createElement('div');
      eventInfoContainer.id = 'event-info-container';
      networkContainer.appendChild(eventInfoContainer);
    }

    // Setup date controls
    if (dateSlider && currentDateDisplay) {
      // Initial setup
      currentDateDisplay.textContent = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.formatDate)(window.appCurrentDate);
      dateSlider.value = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.dateToSliderPosition)(window.appCurrentDate);

      // Update visualizations on slider change
      dateSlider.addEventListener('input', () => {
        const sliderPosition = parseInt(dateSlider.value);
        window.appCurrentDate = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.sliderPositionToDate)(sliderPosition);
        currentDateDisplay.textContent = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.formatDate)(window.appCurrentDate);

        // Debounce the update to improve performance
        if (window.networkUpdateTimeout) {
          clearTimeout(window.networkUpdateTimeout);
        }
        window.networkUpdateTimeout = setTimeout(() => {
          updateVisualizationsForDate(window.appCurrentDate);
        }, 100); // Short delay for smoother performance
      });

      // Setup navigation buttons
      if (prevDayBtn) {
        prevDayBtn.addEventListener('click', () => {
          window.appCurrentDate = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.moveDateByDays)(window.appCurrentDate, -1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      if (nextDayBtn) {
        nextDayBtn.addEventListener('click', () => {
          window.appCurrentDate = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.moveDateByDays)(window.appCurrentDate, 1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      if (prevMonthBtn) {
        prevMonthBtn.addEventListener('click', () => {
          window.appCurrentDate = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.moveDateByMonths)(window.appCurrentDate, -1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }
      if (nextMonthBtn) {
        nextMonthBtn.addEventListener('click', () => {
          window.appCurrentDate = (0,_date_helpers__WEBPACK_IMPORTED_MODULE_5__.moveDateByMonths)(window.appCurrentDate, 1);
          updateDateControls();
          updateVisualizationsForDate(window.appCurrentDate);
        });
      }

      // Initial update with the selected date
      updateVisualizationsForDate(window.appCurrentDate);
    }

    // Set up filters
    if (categoryFilters && categoryFilters.length > 0) {
      categoryFilters.forEach(filter => {
        filter.addEventListener('change', () => {
          // Get all checked categories
          const enabledCategories = Array.from(categoryFilters).filter(checkbox => checkbox.checked).map(checkbox => checkbox.dataset.category);

          // Filter events based on enabled categories
          const filteredEvents = timelineEvents.filter(event => {
            const eventCategories = Array.isArray(event.categories) ? event.categories : [event.category || 'other'];
            return eventCategories.some(cat => enabledCategories.includes(cat));
          });

          // Update timeline with filtered events
          // Note: In a real implementation, you'd need to reinitialize or update the timeline
          console.log('Filtered to categories:', enabledCategories);
          console.log('Filtered events count:', filteredEvents.length);
        });
      });
    }

    // Set up search
    if (searchInput && searchButton) {
      searchButton.addEventListener('click', () => {
        const searchTerm = searchInput.value.toLowerCase().trim();
        if (searchTerm) {
          // Search in events, entities, relationships
          const matchingEvents = timelineEvents.filter(event => event.title.toLowerCase().includes(searchTerm) || event.description.toLowerCase().includes(searchTerm));
          const matchingEntities = Object.values(allEntities).filter(entity => entity.name.toLowerCase().includes(searchTerm) || entity.description && entity.description.toLowerCase().includes(searchTerm));
          console.log('Search results - Events:', matchingEvents.length);
          console.log('Search results - Entities:', matchingEntities.length);

          // Update details panel with search results
          const detailsContainer = document.getElementById('detailsContainer');
          if (detailsContainer) {
            detailsContainer.innerHTML = `
              <h3>Search Results for "${searchTerm}"</h3>
              <p>Found ${matchingEvents.length} events and ${matchingEntities.length} entities.</p>
              <div class="search-results-list">
                ${matchingEvents.slice(0, 5).map(event => `
                  <div class="search-result-item">
                    <strong>${event.title}</strong> (${new Date(event.date).toLocaleDateString()})
                    <p>${event.description.substring(0, 100)}...</p>
                  </div>
                `).join('')}
                ${matchingEvents.length > 5 ? '<p>...and more</p>' : ''}
              </div>
            `;
          }
        }
      });

      // Allow search on Enter key
      searchInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
          searchButton.click();
        }
      });
    }
  } catch (error) {
    console.error('Error initializing application:', error);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', initializeApplication);

// The updateNetworkForDate function is no longer needed as we now use
// the improved updateNodesTemporalOpacity function from event-connector.js

/**
 * Adapter function to update money counter for a specific date
 * @param {MoneyCounterVisualization} moneyCounter - Money counter visualization instance
 * @param {Date} date - Date to filter to
 */
function updateMoneyCounterForDate(moneyCounter, date) {
  if (!moneyCounter) {
    console.warn('Money counter is not initialized');
    return;
  }
  try {
    const dateObj = new Date(date);
    const year = dateObj.getFullYear();
    console.log(`Updating money counter for year: ${year}`);

    // Update with transactions up to this date
    const filterOptions = {
      startYear: 1970,
      endYear: year
    };
    if (typeof moneyCounter.update === 'function') {
      console.log('Using money counter update method');
      moneyCounter.update(filterOptions).catch(err => console.error('Error updating money counter:', err));
    } else if (typeof moneyCounter.filterByDate === 'function') {
      console.log('Using money counter filterByDate method');
      moneyCounter.filterByDate(dateObj);
    } else {
      console.warn('Money counter does not have any update methods available');

      // Try direct manipulation if we have access to the underlying visualization
      if (moneyCounter.transactions) {
        const filteredTransactions = moneyCounter.transactions.filter(t => {
          const transactionYear = new Date(t.date).getFullYear();
          return transactionYear <= year;
        });
        console.log(`Filtered transactions to ${filteredTransactions.length} items`);

        // If the moneyCounter has a render method, try to use it
        if (typeof moneyCounter.render === 'function') {
          moneyCounter.render(filteredTransactions);
        }
      }
    }
  } catch (err) {
    console.error('Error updating money counter:', err);
  }
}

// Handle Hot Module Replacement
if (false) {}

/***/ }),

/***/ "./src/styles/main.css":
/*!*****************************!*\
  !*** ./src/styles/main.css ***!
  \*****************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./main.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/main.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_main_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/moneyCounter.css":
/*!*************************************!*\
  !*** ./src/styles/moneyCounter.css ***!
  \*************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_moneyCounter_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./moneyCounter.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/moneyCounter.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_moneyCounter_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_moneyCounter_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_moneyCounter_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_moneyCounter_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/network.css":
/*!********************************!*\
  !*** ./src/styles/network.css ***!
  \********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_network_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./network.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/network.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_network_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_network_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_network_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_network_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/styles/timeline.css":
/*!*********************************!*\
  !*** ./src/styles/timeline.css ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_timeline_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../node_modules/css-loader/dist/cjs.js!./timeline.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/timeline.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_timeline_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ __webpack_exports__["default"] = (_node_modules_css_loader_dist_cjs_js_timeline_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_timeline_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_timeline_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/utils/dataLoader.js":
/*!*********************************!*\
  !*** ./src/utils/dataLoader.js ***!
  \*********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/**
 * DataLoader - Unified data loading system for Trump-Russia visualization
 * Handles merging year-by-year data files and providing indexed access
 */
class DataLoader {
  constructor() {
    this.initialized = false;
    this.data = {
      events: [],
      entities: {},
      relationships: [],
      transactions: [],
      intelligenceActivities: [],
      eras: []
    };
    this.indices = {};
  }

  /**
   * Initialize the data loader by fetching and processing all data files
   * @returns {Promise<Object>} The consolidated dataset
   */
  async initialize() {
    if (this.initialized) return this.data;
    try {
      // Load and merge all year files
      await this.loadYearlyData();

      // Build indices for fast lookup
      this.buildIndices();
      this.initialized = true;
      console.log('Data loader initialized successfully');
      return this.data;
    } catch (error) {
      console.error('Failed to initialize data loader:', error);
      throw error;
    }
  }

  /**
   * Load and merge data from year-by-year JSON files
   * @returns {Promise<void>}
   */
  async loadYearlyData() {
    // Start with a range of years from 1971 to current
    const startYear = 1971;
    const endYear = new Date().getFullYear();
    let loadedAnyData = false;

    // First try to load the complete dataset if it exists
    try {
      const completeResponse = await fetch('data/processed/complete_dataset.json');
      if (completeResponse.ok) {
        const completeData = await completeResponse.json();
        this.mergeYearData(completeData);
        console.log('Loaded complete dataset');
        loadedAnyData = true;
        return; // We have all the data, no need to load individual years
      }
    } catch (error) {
      console.warn('No complete dataset found, falling back to year-by-year loading');
    }

    // Try loading from the JSON schema file
    try {
      const schemaResponse = await fetch('data/processed/json_schema.json');
      if (schemaResponse.ok) {
        const schemaData = await schemaResponse.json();
        if (schemaData.example) {
          // If there's example data in the schema, use it for testing
          this.mergeYearData(schemaData.example);
          console.log('Loaded example data from schema file');
          loadedAnyData = true;
        }
      }
    } catch (error) {
      console.warn('No schema example data found, continuing with year-by-year loading');
    }

    // Fall back to loading individual year files
    for (let year = startYear; year <= endYear; year++) {
      try {
        // Fetch the year's data file
        const response = await fetch(`data/processed/by-year/${year}.json`);

        // Skip if file doesn't exist
        if (!response.ok) {
          console.log(`No data file found for year ${year}`);
          continue;
        }
        const yearData = await response.json();

        // Merge into consolidated dataset
        this.mergeYearData(yearData);
        console.log(`Loaded data for year ${year}`);
        loadedAnyData = true;
      } catch (error) {
        console.warn(`Could not load data for year ${year}:`, error);
        // Continue with other years even if one fails
      }
    }

    // If we couldn't load any data, create some dummy data for testing
    if (!loadedAnyData) {
      console.warn('Could not load any data files. Creating minimal test data.');
      this.createDummyData();
    }
  }

  /**
   * Merge a year's data into the consolidated dataset
   * @param {Object} yearData - Data from a single year JSON file
   */
  mergeYearData(yearData) {
    // Merge events (as array)
    if (yearData.events && Array.isArray(yearData.events)) {
      this.data.events = [...this.data.events, ...yearData.events];
    }

    // Merge entities (as object with ID keys)
    if (yearData.entities) {
      this.data.entities = {
        ...this.data.entities,
        ...yearData.entities
      };
    }

    // Merge relationships (as array)
    if (yearData.relationships && Array.isArray(yearData.relationships)) {
      this.data.relationships = [...this.data.relationships, ...yearData.relationships];
    }

    // Merge transactions (as array)
    if (yearData.transactions && Array.isArray(yearData.transactions)) {
      this.data.transactions = [...this.data.transactions, ...yearData.transactions];
    }

    // Merge intelligence activities (as array)
    if (yearData.intelligenceActivities && Array.isArray(yearData.intelligenceActivities)) {
      this.data.intelligenceActivities = [...this.data.intelligenceActivities, ...yearData.intelligenceActivities];
    }

    // Merge eras (as array)
    if (yearData.eras && Array.isArray(yearData.eras)) {
      this.data.eras = [...this.data.eras, ...yearData.eras];
    }
  }

  /**
   * Build indices for fast data lookup
   */
  buildIndices() {
    console.log('Building data indices...');

    // Events by ID
    this.indices.eventsById = {};
    this.data.events.forEach(event => {
      this.indices.eventsById[event.id] = event;
    });

    // Events by category
    this.indices.eventsByCategory = {};
    this.data.events.forEach(event => {
      if (event.categories && Array.isArray(event.categories)) {
        event.categories.forEach(category => {
          if (!this.indices.eventsByCategory[category]) {
            this.indices.eventsByCategory[category] = [];
          }
          this.indices.eventsByCategory[category].push(event);
        });
      }
    });

    // Events by year (for timeline filtering)
    this.indices.eventsByYear = {};
    this.data.events.forEach(event => {
      if (event.date) {
        const year = event.date.substring(0, 4);
        if (!this.indices.eventsByYear[year]) {
          this.indices.eventsByYear[year] = [];
        }
        this.indices.eventsByYear[year].push(event);
      }
    });

    // Entities by type
    this.indices.entitiesByType = {};
    Object.values(this.data.entities).forEach(entity => {
      if (entity.type) {
        if (!this.indices.entitiesByType[entity.type]) {
          this.indices.entitiesByType[entity.type] = [];
        }
        this.indices.entitiesByType[entity.type].push(entity);
      }
    });

    // Relationships by entity
    this.indices.relationshipsByEntity = {};
    this.data.relationships.forEach(rel => {
      // Source entity relationships
      if (!this.indices.relationshipsByEntity[rel.source]) {
        this.indices.relationshipsByEntity[rel.source] = [];
      }
      this.indices.relationshipsByEntity[rel.source].push(rel);

      // Target entity relationships
      if (!this.indices.relationshipsByEntity[rel.target]) {
        this.indices.relationshipsByEntity[rel.target] = [];
      }
      this.indices.relationshipsByEntity[rel.target].push(rel);
    });

    // Financial transactions for piggy bank feature
    this.indices.financialTransactions = {
      toTrump: this.data.transactions.filter(t => t.parties?.receiver?.entity === "entity-001" || t.toEntity === "entity-001"),
      fromTrump: this.data.transactions.filter(t => t.parties?.sender?.entity === "entity-001" || t.fromEntity === "entity-001"),
      byYear: {}
    };

    // Index transactions by year
    this.data.transactions.forEach(transaction => {
      if (transaction.date) {
        const year = transaction.date.substring(0, 4);
        if (!this.indices.financialTransactions.byYear[year]) {
          this.indices.financialTransactions.byYear[year] = [];
        }
        this.indices.financialTransactions.byYear[year].push(transaction);
      }
    });

    // Sort events chronologically
    this.data.events.sort((a, b) => {
      return new Date(a.date) - new Date(b.date);
    });
    console.log('Indices built successfully');
  }

  /**
   * Get events by category
   * @param {string} category - Category to filter by
   * @returns {Array} Filtered events
   */
  getEventsByCategory(category) {
    return this.indices.eventsByCategory[category] || [];
  }

  /**
   * Get events within a time range
   * @param {string|Date} startDate - Start date
   * @param {string|Date} endDate - End date
   * @returns {Array} Events within range
   */
  getEventsInTimeRange(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    return this.data.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= start && eventDate <= end;
    });
  }

  /**
   * Get entity by ID
   * @param {string} entityId - Entity ID
   * @returns {Object|null} Entity or null if not found
   */
  getEntity(entityId) {
    return this.data.entities[entityId] || null;
  }

  /**
   * Get relationships for an entity
   * @param {string} entityId - Entity ID
   * @returns {Array} Relationships
   */
  getEntityRelationships(entityId) {
    return this.indices.relationshipsByEntity[entityId] || [];
  }

  /**
   * Get network data for visualization
   * @param {Object} options - Filter options
   * @returns {Object} Network data formatted for visualization
   */
  getNetworkData(options = {}) {
    // Extract the nodes (entities) and edges (relationships)
    const nodes = [];
    const edges = [];

    // Filter entities based on options
    Object.values(this.data.entities).forEach(entity => {
      // Apply filters if needed
      if (options.entityType && entity.type !== options.entityType) return;
      nodes.push({
        id: entity.id,
        label: entity.name,
        title: entity.description,
        group: entity.type,
        value: entity.significance || 1 // For node size
        // Additional properties for visualization
      });
    });

    // Add relationships as edges
    this.data.relationships.forEach(rel => {
      // Only include relationships between nodes that are in our filtered set
      const sourceExists = nodes.some(n => n.id === rel.source);
      const targetExists = nodes.some(n => n.id === rel.target);
      if (sourceExists && targetExists) {
        edges.push({
          from: rel.source,
          to: rel.target,
          label: rel.type,
          title: rel.description,
          value: rel.strength || 1,
          // For edge thickness
          arrows: rel.isBidirectional ? 'to;from' : 'to'
          // Additional properties for visualization
        });
      }
    });
    return {
      nodes,
      edges
    };
  }

  /**
   * Get financial data for the piggy bank visualization
   * @param {Object} options - Filter options
   * @returns {Object} Financial data formatted for visualization
   */
  getFinancialData(options = {}) {
    let transactions = this.data.transactions;

    // Apply filters if needed
    if (options.startYear) {
      transactions = transactions.filter(t => {
        const year = t.date.substring(0, 4);
        return parseInt(year) >= parseInt(options.startYear);
      });
    }
    if (options.endYear) {
      transactions = transactions.filter(t => {
        const year = t.date.substring(0, 4);
        return parseInt(year) <= parseInt(options.endYear);
      });
    }

    // Calculate totals and metrics
    const totalToTrump = transactions.filter(t => t.parties?.receiver?.entity === "entity-001" || t.toEntity === "entity-001").reduce((sum, t) => sum + (t.amount || 0), 0);
    const totalFromTrump = transactions.filter(t => t.parties?.sender?.entity === "entity-001" || t.fromEntity === "entity-001").reduce((sum, t) => sum + (t.amount || 0), 0);

    // Get transactions chronologically for animation
    const chronologicalTransactions = [...transactions].sort((a, b) => new Date(a.date) - new Date(b.date));
    return {
      transactions: chronologicalTransactions,
      totalToTrump,
      totalFromTrump,
      netFlow: totalToTrump - totalFromTrump
    };
  }

  /**
   * Search across all data types
   * @param {string} query - Search query
   * @returns {Object} Search results grouped by type
   */
  search(query) {
    if (!query || typeof query !== 'string') return {};
    const lowercaseQuery = query.toLowerCase();
    return {
      events: this.data.events.filter(e => e.title?.toLowerCase().includes(lowercaseQuery) || e.description?.toLowerCase().includes(lowercaseQuery)),
      entities: Object.values(this.data.entities).filter(e => e.name?.toLowerCase().includes(lowercaseQuery) || e.description?.toLowerCase().includes(lowercaseQuery) || e.aliases?.some(a => a.toLowerCase().includes(lowercaseQuery))),
      relationships: this.data.relationships.filter(r => r.description?.toLowerCase().includes(lowercaseQuery)),
      transactions: this.data.transactions.filter(t => t.description?.toLowerCase().includes(lowercaseQuery))
    };
  }
}

// Export a singleton instance of DataLoader
/* harmony default export */ __webpack_exports__["default"] = (new DataLoader());

/***/ }),

/***/ "./src/utils/helpers.js":
/*!******************************!*\
  !*** ./src/utils/helpers.js ***!
  \******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   calculateTimePeriod: function() { return /* binding */ calculateTimePeriod; },
/* harmony export */   createElement: function() { return /* binding */ createElement; },
/* harmony export */   createUniqueId: function() { return /* binding */ createUniqueId; },
/* harmony export */   debounce: function() { return /* binding */ debounce; },
/* harmony export */   formatCurrency: function() { return /* binding */ formatCurrency; },
/* harmony export */   formatDate: function() { return /* binding */ formatDate; },
/* harmony export */   getCategoryColor: function() { return /* binding */ getCategoryColor; },
/* harmony export */   getNestedProperty: function() { return /* binding */ getNestedProperty; },
/* harmony export */   getYearFromDate: function() { return /* binding */ getYearFromDate; },
/* harmony export */   truncateText: function() { return /* binding */ truncateText; }
/* harmony export */ });
/**
 * Helper utilities for Trump-Russia timeline visualization
 */

/**
 * Format a date string as a more human-readable date
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @param {Object} options - Formatting options
 * @returns {string} Formatted date
 */
function formatDate(dateString, options = {}) {
  if (!dateString) return 'Unknown date';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  const format = options.format || 'long';
  switch (format) {
    case 'short':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      });
    case 'year':
      return date.getFullYear().toString();
    case 'month-year':
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
    case 'long':
    default:
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
      });
  }
}

/**
 * Format a currency amount with dollar sign and commas
 * @param {number} amount - The amount to format
 * @param {Object} options - Formatting options
 * @returns {string} Formatted amount
 */
function formatCurrency(amount, options = {}) {
  if (amount === undefined || amount === null) return '$0';
  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: options.fractionDigits !== undefined ? options.fractionDigits : 0,
    maximumFractionDigits: options.fractionDigits !== undefined ? options.fractionDigits : 0
  });
  return formatter.format(amount);
}

/**
 * Get a color for a category
 * @param {string} category - Category name
 * @returns {string} HEX color code
 */
function getCategoryColor(category) {
  const colorMap = {
    financial: '#27ae60',
    // Green
    intelligence: '#8e44ad',
    // Purple
    business: '#3498db',
    // Blue
    political: '#e74c3c',
    // Red
    legal: '#f39c12',
    // Orange
    personal: '#7f8c8d' // Gray
  };
  return colorMap[category] || '#95a5a6'; // Default gray
}

/**
 * Debounce a function to limit how often it gets called
 * @param {Function} func - The function to debounce
 * @param {number} wait - Milliseconds to wait between calls
 * @returns {Function} Debounced function
 */
function debounce(func, wait = 300) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Create a unique ID
 * @returns {string} Unique ID
 */
function createUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

/**
 * Create a DOM element with attributes and children
 * @param {string} tagName - The tag name of the element
 * @param {Object} attributes - Attributes to set on the element
 * @param {Array|Node|string} children - Child elements or text
 * @returns {HTMLElement} The created element
 */
function createElement(tagName, attributes = {}, children = []) {
  const element = document.createElement(tagName);

  // Set attributes
  Object.entries(attributes).forEach(([key, value]) => {
    if (key === 'className') {
      element.className = value;
    } else if (key === 'style' && typeof value === 'object') {
      Object.entries(value).forEach(([property, propertyValue]) => {
        element.style[property] = propertyValue;
      });
    } else if (key.startsWith('on') && typeof value === 'function') {
      element.addEventListener(key.substring(2).toLowerCase(), value);
    } else {
      element.setAttribute(key, value);
    }
  });

  // Add children
  if (children) {
    if (Array.isArray(children)) {
      children.forEach(child => {
        if (child instanceof Node) {
          element.appendChild(child);
        } else if (child !== undefined && child !== null) {
          element.appendChild(document.createTextNode(child.toString()));
        }
      });
    } else if (children instanceof Node) {
      element.appendChild(children);
    } else if (children !== undefined && children !== null) {
      element.appendChild(document.createTextNode(children.toString()));
    }
  }
  return element;
}

/**
 * Extract the year from a date string
 * @param {string} dateString - ISO date string (YYYY-MM-DD)
 * @returns {number} Year as a number
 */
function getYearFromDate(dateString) {
  if (!dateString) return null;

  // Try to extract year from ISO format
  const match = dateString.match(/^(\d{4})/);
  if (match) {
    return parseInt(match[1], 10);
  }

  // Fallback to Date object
  const date = new Date(dateString);
  if (!isNaN(date.getTime())) {
    return date.getFullYear();
  }
  return null;
}

/**
 * Safely get a nested object property without errors
 * @param {Object} obj - The object to extract from
 * @param {string} path - Dot notation path to the property
 * @param {*} defaultValue - Default value if property not found
 * @returns {*} The property value or default
 */
function getNestedProperty(obj, path, defaultValue = null) {
  if (!obj || !path) return defaultValue;
  const parts = path.split('.');
  let current = obj;
  for (const part of parts) {
    if (current === null || current === undefined || typeof current !== 'object') {
      return defaultValue;
    }
    current = current[part];
  }
  return current !== undefined ? current : defaultValue;
}

/**
 * Format and truncate text to a specific length
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
function truncateText(text, maxLength = 100) {
  if (!text || text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
}

/**
 * Calculate time period between two dates
 * @param {string} startDate - Start date string
 * @param {string} endDate - End date string
 * @returns {string} Human readable time period
 */
function calculateTimePeriod(startDate, endDate) {
  if (!startDate || !endDate) return '';
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (isNaN(start.getTime()) || isNaN(end.getTime())) return '';
  const diffYears = end.getFullYear() - start.getFullYear();
  const diffMonths = end.getMonth() - start.getMonth() + diffYears * 12;
  if (diffYears > 1) {
    return `${diffYears} years`;
  } else if (diffMonths > 1) {
    return `${diffMonths} months`;
  } else {
    const diffDays = Math.round((end - start) / (1000 * 60 * 60 * 24));
    return `${diffDays} days`;
  }
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	!function() {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = function(module) {
/******/ 			var getter = module && module.__esModule ?
/******/ 				function() { return module['default']; } :
/******/ 				function() { return module; };
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	!function() {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
!function() {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_main_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/main.css */ "./src/styles/main.css");
/* harmony import */ var _styles_timeline_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./styles/timeline.css */ "./src/styles/timeline.css");
/* harmony import */ var _styles_network_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./styles/network.css */ "./src/styles/network.css");
/* harmony import */ var _styles_moneyCounter_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/moneyCounter.css */ "./src/styles/moneyCounter.css");
/* harmony import */ var _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/dataLoader.js */ "./src/utils/dataLoader.js");
/* harmony import */ var _utils_helpers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/helpers.js */ "./src/utils/helpers.js");
/* harmony import */ var _components_timeline_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./components/timeline.js */ "./src/components/timeline.js");
/* harmony import */ var _components_network_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./components/network.js */ "./src/components/network.js");
/* harmony import */ var _components_moneyCounter_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./components/moneyCounter.js */ "./src/components/moneyCounter.js");
/* harmony import */ var _js_main_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./js/main.js */ "./src/js/main.js");
/**
 * Trump-Russia Timeline Visualization
 * Main entry file for the application
 */

// Import styles





// Import core modules






// Make modules available globally for debugging
window.TrumpRussiaTimeline = {
  dataLoader: _utils_dataLoader_js__WEBPACK_IMPORTED_MODULE_4__["default"],
  helpers: _utils_helpers_js__WEBPACK_IMPORTED_MODULE_5__,
  TimelineVisualization: _components_timeline_js__WEBPACK_IMPORTED_MODULE_6__["default"],
  NetworkVisualization: _components_network_js__WEBPACK_IMPORTED_MODULE_7__["default"],
  MoneyCounterVisualization: _components_moneyCounter_js__WEBPACK_IMPORTED_MODULE_8__["default"]
};

// Log initialization
console.log('Trump-Russia Timeline Visualization initialized');
console.log('App version: 1.0.0');
console.log('Data timespan: 1977-Present');

// Import and execute the main initialization code

}();
/******/ })()
;
//# sourceMappingURL=bundle.js.map