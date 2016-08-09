(function () {

	'use strict'

	function yaSuggestView ($parse, mapApiLoad, yaSubscriber) {
		return {
			restrict: 'A'
			require: [ 'ngModel' ]
			scope: {}
			link: function (scope, element, attributes, controllers) {
				mapApiLoad(function () {
					var suggestView = new ymaps.SuggestView(element[0]);
					for (var key in attributes) {
						var value = attributes[key];
						if (key.indexOf('yaEvent') === 0) {
							var eventHandler = $parse(value);
							yaSubscriber.subscribe(suggestView, eventHandler, key, scope);
						}
					}
				});
			}
		};
	}

	yaSuggestView.$inject = [ '$parse', 'mapApiLoad', 'yaSubscriber' ];

	angular.module('yaMap').directive('yaSuggestView', yaSuggestView);

})();