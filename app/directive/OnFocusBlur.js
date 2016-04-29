(function(){
	var amex = angular.module('amex');
	amex.directive('onFocusBlur',function() {
	    return {
	        restrict : 'A', 
	        link : function($scope,$element,$attr) {
	            $element.bind('focus',function() {
	                //$scope[$attr.onFocusBlur] = true;
	            	var inputBox = $(this).closest('.amex_input_box');
	            	inputBox.removeClass('box_error').addClass('blue_focus');
	            });
	            $element.bind('blur',function() {
	               // $scope[$attr.onFocusBlur] = false;
	            	var inputBox = $(this).closest('.amex_input_box');
	            	inputBox.removeClass('blue_focus');
	            });
	        }
	    }
	});
})();