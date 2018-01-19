const angular = require('angular')
const app = angular.module('app', []);
app.controller('four', ['$scope', '$http', function($scope, $http) {
	$scope.province = undefined;
	$scope.city = undefined;
	$scope.district = undefined;
	$scope.street = undefined;

	$scope.http = function(value) {
		$http({
			method: 'GET',
			url: 'http://restapi.amap.com/v3/config/district',
			params: {
				subdistrict: 1,
				showbiz: false,
				extensions: 'base',
				s: 'rsv3',
				output: 'json',
				keywords: value,
				platform: 'JS',
				logversion: '2.0',
				sdkversion: '1.4.3',
				appname: 'http://lbs.amap.com/api/javascript-api/example/district-search/city-drop-down-list',
				csid: '9DEA5E3F-D87F-4567-BBEE-6B926B690E62',
				key: 'a25af5e0fc9ba9404924728550c15fd0'
			}
		}).then(function(data) {
			if (data.data.districts[0].districts.length !== 0) {
				var zoom = data.data.districts[0].districts[0].level;
				$scope[zoom] = data.data.districts[0].districts;
			}
		})
	}
	$scope.http(100000);
}]);
app.directive('change', function() {
	return {
		scope: '@',
		restrict: 'A',
		require: "ngModel",
		link: function($scope, ele, attr, ctrl) {
			ele.on('change', function(e) {
				if (ctrl.$modelValue !== null) {
					$scope.street = undefined;
					switch (ctrl.$modelValue.level) {
						case 'province':
							$scope.city = undefined;
							$scope.district = undefined;
							break;
						case 'city':
							$scope.district = undefined;
							break;
					}
					$scope.http(ctrl.$modelValue.adcode)
				}
			})
		}
	};
});