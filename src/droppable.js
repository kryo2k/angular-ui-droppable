'use strict';

angular.module('ui.droppable', [])

  /*
   jQuery UI Draggable plugin wrapper

   @param [ui-draggable] {object} Options to pass to $.fn.draggable() merged onto ui.config
  */
  .value('uiDraggableConfig',{})
  .directive('uiDraggable', [
    'uiDraggableConfig',
    '$log',
    function (uiDraggableConfig, log) {
      return {
        link: function(scope, element, attrs) {
          element.draggable(uiDraggableConfig);
          scope.$watch(attrs.uiDraggable, function(newVal){
            angular.forEach(newVal, function(value, key){
              element.draggable('option', key, value);
            });
          }, true);
        }
      }
    }
  ])

  /*
   jQuery UI Droppable plugin wrapper

   @param [ui-droppable] {object} Options to pass to $.fn.droppable() merged onto ui.config
  */
  .value('uiDroppableConfig',{})
  .directive('uiDroppable', [
    'uiDroppableConfig',
    '$log',
    function (uiDroppableConfig, log) {
      return {
        link: function(scope, element, attrs) {
          element.droppable(uiDroppableConfig);
          scope.$watch(attrs.uiDroppable, function(newVal){
            angular.forEach(newVal, function(value, key) {
              element.droppable('option', key, value);
            });
          }, true);
        }
      }
    }
  ]);
