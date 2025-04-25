(function () {

	'use strict';
	
	angular.module('MenuApp')
	.component('categoryList', {
		templateUrl: 'src/menuapp/templates/categories.component.template.html',
		bindings: {
			categories: '<'
		}		
	});	

})();