/* 
 * AngularJS directives for double horizontal and double vertical scroll bar
 * Author: przno
 * Version: 0.1.0
 * License: MIT
 */

(function(angular) {
	'use strict';

	angular.module('doubleScrollBars', [])

	.directive('doubleScrollBarHorizontal', ['$timeout',
		function($timeout) {

			return {

				// usage: <double-scroll-bar-horizontal> {{content}} or static content </double-scroll-bar-horizontal>
				// or with input value: <div data-double-scroll-bar-horizontal="always"> {{content}} or static content </div>
				restrict: 'A',

				// transclude the content
				transclude: true,

				// isolate scope
				scope: {
					doubleScrollBarHorizontal: '@' // if equals 'always' will display the scroll bars even if there is nothing to scroll; otherwise show them only when content overflows display area
				},

				// HTML template
				// 20px is the standard height of horizontal scroll bar on most systems, TODO calculate this value automatically, TODO do not consume height if bar not displayed
				template: '' +
					'<div>' +
					' <div style="overflow-y: hidden; height: 20px;" data-ng-style="{\'overflow-x\': doubleScrollBarHorizontal == \'always\' ? \'scroll\' : \'auto\'}">' +
					'   <div style="height: 20px;" data-ng-style="{width: wrapper2scrollWidth}"></div>' +
					' </div>' +
					' <div data-ng-style="{\'overflow-x\': doubleScrollBarHorizontal == \'always\' ? \'scroll\' : \'auto\'}">' +
					'   <div data-ng-transclude></div>' +
					' </div>' +
					'</div>',

				// link function with the logic
				link: function($scope, iElm, iAttrs, controller) {

					// scroll width of the wrapper2 div, width of div inside wrapper1 will be set to the same value
					$scope.wrapper2scrollWidth = '0px';

					// angular.element representation od the root <div> of this directive
					var rootDiv = iElm.children().eq(0);

					// angular.element object for the first div in the root // <div style="overflow-x: auto; overflow-y: hidden; height: 20px;">
					// the 'virtual' scroll bar will be here
					var wrapper1 = rootDiv.children().eq(0);

					// angular.element object for the first div in the root // <div style="overflow-x: auto;">
					// the 'real' scroll bar will be here
					var wrapper2 = rootDiv.children().eq(1);

					// get native DOM element from angular.element
					var wrapper1dom = wrapper1[0];
					var wrapper2dom = wrapper2[0];

					// if scrolling one ruler, scroll also the other one
					wrapper1.on('scroll', function() {
						wrapper2dom.scrollLeft = wrapper1dom.scrollLeft;
					});

					wrapper2.on('scroll', function() {
						wrapper1dom.scrollLeft = wrapper2dom.scrollLeft;
					});

					// watch for a change of the width (e.g. transcluded content changed and so changed its width)
					$scope.$watch(function() {
						return ($scope.wrapper2scrollWidth = wrapper2dom.scrollWidth + 'px');
					}, function(newValue, oldValue) {
						// run $apply one more time so the scroll bars are in sync
						// $timeout to run it on next $digest cycle, otherwise angular will complain of '$digest already in process'
						$timeout(function() {
							$scope.$apply();
						});
					});

				}
			};
		}
	]);

})(angular);