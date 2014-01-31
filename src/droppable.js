'use strict';

(function(angular){

  function combineCallbacks(first,second){
    if( second && (typeof second === 'function') ){
      return function(e,ui){
        first(e,ui);
        second(e,ui);
      };
    }
    return first;
  }

  function InjectAngularProp(props, callback) {
    return function (evt, ui) {
      if(!ui.helper) {
        ui.helper = {};
      }

      ui.helper.dragdrop = props;

      (callback||function(){})(evt, ui, props);
    };
  }

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
          require: '?ngModel',
          link: function(scope, element, attrs, ngModel) {
            var
            injectProps = {
              element: element
            },
            events = {
              create: new InjectAngularProp(injectProps),
              drag:   new InjectAngularProp(injectProps),
              start:  new InjectAngularProp(injectProps),
              stop:   new InjectAngularProp(injectProps)
            };

            if (ngModel) {
              ngModel.$render = function() {
                injectProps.model = ngModel.$modelValue;
              };
            }

            angular.extend(opts, uiDraggableConfig);
            angular.forEach(events, function(val, key) {
              opts[key] = combineCallbacks(val, opts[key]);
            });

            element.draggable(opts);

            scope.$watch(attrs.uiDraggable, function(newVal){
              angular.forEach(newVal, function(value, key){
                if(events[key]) {
                  value = combineCallbacks(events[key], value);
                }
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
          require: '?ngModel',
          link: function(scope, element, attrs, ngModel) {
            var
            opts = {},
            injectProps = {
              element: element
            },
            events = {
              activate:   new InjectAngularProp(injectProps),
              create:     new InjectAngularProp(injectProps),
              deactivate: new InjectAngularProp(injectProps),
              drop:       new InjectAngularProp(injectProps),
              out:        new InjectAngularProp(injectProps),
              over:       new InjectAngularProp(injectProps)
            };

            if (ngModel) {
              ngModel.$render = function() {
                injectProps.model = ngModel.$modelValue;
              };
            }

            angular.extend(opts, uiDroppableConfig);
            angular.forEach(events, function(val, key) {
              opts[key] = combineCallbacks(val, opts[key]);
            });

            element.droppable(opts);

            scope.$watch(attrs.uiDroppable, function(newVal){
              angular.forEach(newVal, function(value, key) {
                if(events[key]) {
                  value = combineCallbacks(events[key], value);
                }
                element.droppable('option', key, value);
              });
            }, true);
          }
        }
      }
    ]);

})(angular);