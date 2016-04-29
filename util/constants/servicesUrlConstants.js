(function(){
	var amex = angular.module('util');
	//var path = window.location.protocol+"//"+window.location.host+window.location.pathname;
	
	amex.constant("serviceUrls",{
		//"path" : path,
		"getLabels" : '/AMEX/app/model/labelConstants.json',
		"isContactID" : '/AMEX/app/model/contact.json',
		"getUserDetails" : "/AMEX/app/model/userdetails.json",
		"postDetails" : "storeDetails"
	});
})();