const pdfBuilder = require('./pdfBuilder');
const { DIRS } = require('./constants');

pdfBuilder.build(DIRS.getNotes());