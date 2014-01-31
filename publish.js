/* jshint node:true */

'use strict';

var fs = require('fs');
var path = require('path');

module.exports = function() {

  var js_dependencies =[
    'bower_components/jquery-ui/ui/jquery-ui.js'
  ];

  var css_dependencies = [
    'bower_components/jquery-ui/themes/smoothness/jquery-ui.css'
  ];

  function putThemInVendorDir (filepath) {
    return 'vendor/' + path.basename(filepath);
  }

  return {
    humaName : 'UI.Droppable',
    repoName : 'ui-droppable',
    css: css_dependencies.map(putThemInVendorDir),
    js : js_dependencies.map(putThemInVendorDir).concat(['dist/droppable.js']),
    tocopy : css_dependencies.concat(js_dependencies)
  };
};
