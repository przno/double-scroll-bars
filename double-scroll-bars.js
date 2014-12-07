/* 
 * AngularJS directives for double scroll bars
 * Author: przno
 * Homepage: https://github.com/przno/double-scroll-bars
 * License: MIT
 */

(function(angular) {
	'use strict';

	angular.module('doubleScrollBars', [])

	.directive('doubleScrollBarHorizontal', ['$timeout', 'scrollStorage', 'scrollBarNativeThickness',
		function($timeout, scrollStorage, scrollBarNativeThickness) {

			return {

				// usage:
				// <div data-double-scroll-bar-horizontal> {{content}} or static content </div>
				// or with input value:
				// <div data-double-scroll-bar-horizontal="always"> {{content}} or static content </div>
				restrict: 'A',

				// transclude the content
				transclude: true,

				// isolate scope
				scope: {
					doubleScrollBarHorizontal: '@', // if equals 'always' will display inactive scroll bars even if there is nothing to scroll; otherwise show them only when content overflows display area
					id: '@' // optional id
				},

				// HTML template
				template: '' +
					'<div>' +
					' <div style="overflow-y: hidden;" data-ng-style="{\'overflow-x\': doubleScrollBarHorizontal == \'always\' ? \'scroll\' : \'auto\', height: nativeScrollBarHeight}">' +
					'  <div data-ng-style="{width: wrapper2scrollWidth, height: nativeScrollBarHeight}"></div>' +
					' </div>' +
					' <div data-ng-style="{\'overflow-x\': doubleScrollBarHorizontal == \'always\' ? \'scroll\' : \'auto\'}">' +
					'  <div data-ng-transclude></div>' +
					' </div>' +
					'</div>',

				// link function with the logic
				link: function($scope, iElm, iAttrs, controller) {
					$scope.nativeScrollBarHeight = scrollBarNativeThickness.get() + 'px';

					// scroll width of the wrapper2 div, width of div inside wrapper1 will be set to the same value
					$scope.wrapper2scrollWidth = '0px';

					// angular.element representation od the root <div> of this directive
					var rootDiv = iElm.children().eq(0);

					// angular.element object for the first div in the root // <div style="overflow-y: hidden;" data-ng-style="{\'overflow-x\': doubleScrollBarHorizontal == \'always\' ? \'scroll\' : \'auto\', height: nativeScrollBarHeight}">
					// the 'virtual' top scroll bar will be here
					var wrapper1 = rootDiv.children().eq(0);

					// angular.element object for the second div in the root // <div data-ng-style="{\'overflow-x\': doubleScrollBarHorizontal == \'always\' ? \'scroll\' : \'auto\'}">
					// the 'real' bottom scroll bar will be here
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

					var firstTime = true;

					// watch for a change of the width (e.g. transcluded content changed and so changed its width)
					$scope.$watch(function() {
						return ($scope.wrapper2scrollWidth = wrapper2dom.scrollWidth + 'px');
					}, function(newValue, oldValue) {
						// run $apply one more time so the scroll bars are in sync
						// $timeout to run it on next $digest cycle, otherwise angular will complain of '$digest already in process'
						$timeout(function() {
							$scope.$apply();

							// first time after recompiled and width set (width set in $apply())
							if (firstTime) {
								// initial values for scroll position - zero if this directive is compiled very first time or if no id provided, otherwise use last scroll position (from service)
								wrapper1dom.scrollLeft = scrollStorage.get($scope.id) || 0;
								wrapper2dom.scrollLeft = scrollStorage.get($scope.id) || 0;
								firstTime = false;
							}

						});
					});

					// save the scroll position for future (if id was specified)
					$scope.$on('$destroy', function() {
						if ($scope.id !== undefined)
							scrollStorage.set($scope.id, wrapper1dom.scrollLeft);
					});

				}
			};
		}
	])

	.directive('doubleScrollBarVertical', ['$timeout', 'scrollStorage', 'scrollBarNativeThickness', '$log',
		function($timeout, scrollStorage, scrollBarNativeThickness, $log) {

			return {
				restrict: 'A',
				transclude: true,
				scope: {
					doubleScrollBarVertical: '@',
					id: '@'
				},

				template: '' +
					'<div >' +
					' <div style="overflow-x: hidden; float: left" data-ng-style="{\'overflow-y\': doubleScrollBarVertical == \'always\' ? \'scroll\' : \'auto\', width: nativeScrollBarWidth, height: origHeight}">' +
					'  <div data-ng-style="{height: wrapper2scrollHeight, width: nativeScrollBarWidth}"></div>' +
					' </div>' +
					' <div data-ng-style="{\'overflow-y\': doubleScrollBarVertical == \'always\' ? \'scroll\' : \'auto\', height: origHeight}" data-ng-transclude></div>' +
					'</div>',
				link: function($scope, iElm, iAttrs, controller) {

					// $log.log('directive');

					$scope.nativeScrollBarWidth = scrollBarNativeThickness.get() + 'px';
					$scope.wrapper2scrollHeight = '0px';

					// $log.log('$scope.nativeScrollBarWidth', $scope.nativeScrollBarWidth);
					// $log.log('$scope.wrapper2scrollHeight', $scope.wrapper2scrollHeight);



					var rootDiv = iElm.children().eq(0);
					var wrapper1 = rootDiv.children().eq(0);
					var wrapper2 = rootDiv.children().eq(1);
					var wrapper1dom = wrapper1[0];
					var wrapper2dom = wrapper2[0];

					// $log.log('rootDiv', rootDiv);
					// $log.log('wrapper1', wrapper1);
					// $log.log('wrapper2', wrapper2);
					// $log.log('wrapper1dom', wrapper1dom);
					$log.log('wrapper2dom', wrapper2dom);

					// $scope.origHeight = iElm[0].style.height;
					// $log.log('$scope.origHeight', $scope.origHeight);

					$scope.$watch(function() {
						return iElm[0].style.height;
					}, function(newValue, oldValue) {
						$scope.origHeight = newValue;
						$log.log('watch $scope.origHeight', $scope.origHeight);
					});

					// $scope.$watch(function() {
					// 	return wrapper2dom.scrollHeight;
					// }, function(newValue, oldValue) {
					// 	$scope.wrapper2ScrollHeight = newValue;
					// 	$log.log('watch $scope.wrapper2ScrollHeight', $scope.wrapper2ScrollHeight);
					// });

					wrapper1.on('scroll', function() {
						$log.log('on scroll wrapper1');
						wrapper2dom.scrollTop = wrapper1dom.scrollTop;
					});

					wrapper2.on('scroll', function() {
						$log.log('on scroll wrapper2');
						wrapper1dom.scrollTop = wrapper2dom.scrollTop;
					});

					var firstTime = true;

					// this does not work properly
					$scope.$watch(function() {
						$log.log('wrapper2dom', wrapper2dom);
						$log.log('watch wrapper2dom.scrollHeight', wrapper2dom.scrollHeight);
						return ($scope.wrapper2scrollHeight = wrapper2dom.scrollHeight + 'px');
					}, function(newValue, oldValue) {
						$log.log('newValue', newValue);
						$timeout(function() {
							$scope.$apply();
							if (firstTime) {
								wrapper1dom.scrollTop = scrollStorage.get($scope.id) || 0;
								wrapper2dom.scrollTop = scrollStorage.get($scope.id) || 0;
								firstTime = false;
							}

						});
					});
					$scope.$on('$destroy', function() {
						if ($scope.id !== undefined)
							scrollStorage.set($scope.id, wrapper1dom.scrollTop);
					});

				}
			};
		}
	])

	// keeps the last scroll position for a directive specified by its id (in case the directive has been recompiled)
	.service('scrollStorage', function() {
		var storage = {};

		return {
			get: function(id) {
				return storage[id];
			},
			set: function(id, value) {
				storage[id] = value;
			}
		};
	})

	// calculate scroll bar's width/height (in pixels) as it differs between various browsers and systems
	// e.g. FF on Win7 17px, FF on Ubuntu 15px, FF on Xubuntu 13px
	.service('scrollBarNativeThickness', function() {

		function getWidth() {
			// dang! DOM manipulation outside Angular's directives. But the element only lives for a glympse of time, I remove it immediatelly...
			var inner = document.createElement('div');
			var outer = document.createElement('div');

			inner.style.width = '100%';
			inner.style.height = '200px';

			outer.style.width = '200px';
			outer.style.height = '150px';
			outer.style.position = 'absolute';
			outer.style.top = '0';
			outer.style.left = '0';
			outer.style.visibility = 'hidden';
			outer.style.overflow = 'hidden';
			outer.appendChild(inner);

			document.body.appendChild(outer);
			var width1 = inner.offsetWidth;
			outer.style.overflow = 'scroll';
			var width2 = outer.clientWidth;
			document.body.removeChild(outer);
			return (width1 - width2);
		}

		var width;

		return {
			get: function() {
				width = width || getWidth();
				return width;
			}
		};
	});

})(angular);