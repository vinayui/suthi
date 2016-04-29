(function(){
	var amex = angular.module('amex');
	amex.controller('VerificationController', ['$scope', '$location', 'registService', 'globalSrv', 'serviceUrls', '$window',
	    function($scope, $location, registService,globalSrv, serviceUrls, $window) {		
		
		//$scope.labelTxt = globalSrv.getValues();
		$scope.steps = ['Verify', 'Create Profile', 'Welcome to @Work'];
		$scope.contractError = "";
		$scope.userDetails = {"contactId" : "", "employyeId":""};
		$scope.stepActive = 1;
		$scope.saveNnext = function(){
			if($scope.stepActive == 1)$scope.verifivation();
			else if($scope.stepActive == 2)$scope.saveUserDetails();
			//else if($scope.stepActive == 3)$scope.stepActive++;
		}
		
		$scope.saveUserDetails = function(){
			var userDet = $scope.userDetails;
			if(userDet.userId && userDet.password 
					&& userDet.confirmPassword && userDet.securityQuestion 
						&& userDet.answer){
				
				//$scope.userResponce.
				var list = $scope.userResponce.payload.claimList;
				for(var i=0; i < list.length; i++){
					if(list[i].claim.type == "CredentialData"){
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push(userDet.userId);
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push(userDet.password);
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push($scope.questions[userDet.securityQuestion-1].name);
						$scope.userResponce.payload.claimList[i].claim.claimData.valueList.push(userDet.answer);
					}
				}
				
				registService.ajaxPost(serviceUrls.postDetails,$scope.userResponce).then(function(responce){
					if(!responce.success){
						$scope.showError();
						$scope.contractError = responce.data;
					}else{
						$scope.stepActive++;
					}
				});
			}else{
				$scope.showError();
			}
		};
		$scope.verifivation = function(){
			if(!$scope.userDetails.contactId){
				$scope.showError();
			}else{
				registService.ajaxGet(serviceUrls.getUserDetails).then(function(responce){
					if(!responce.success){
						$scope.showError();
						$scope.contractError = responce.data;
					}else{
						$scope.stepActive++;
						$scope.userResponce = responce.data;
					}
				});
			}
		};
		
		
		$scope.showError = function(){
			$('.contact_field').addClass('box_error');
			$('.emp_field').addClass('box_error');
		};
		
		$scope.print = function(){
			$window.print();
		}
		
		//if(!globalSrv.getValues().AMEX_Verify_Heading)
		registService.getLabelData().then(function(responce){
			globalSrv.setValues(responce.data);
			$scope.labelTxt = responce.data;
		});
		
		$scope.questions = [
		                 {id:1, name:'What is your favorite hobby?'},
		                 {id:2, name:'Your childhood pet\'s name?'},
		                 {id:3, name:'Where was your mother born?'},
		                 {id:4, name:'Your mother\'s maiden name?'},
		                 {id:5, name:'Who was your favorite teacher?'},
		                 {id:6, name:'What was your first school?'},
		                 {id:7, name:'Where were you born?'},
		                 {id:8, name:'What is your date of birth?'},
		                 {id:9, name:'What is your favorite city or place?'}
		               ];
		$scope.questionsSelected = 0;
		
		
		$scope.months = [{id:1, name:'Jan'}, {id:2, name:'Feb'}, {id:3, name:'Mar'},{id:4, name:'Apr'},
			             {id:5, name:'May'},{id:6, name:'Jun'},{id:7, name:'Jul'},{id:8, name:'Aug'},
			             {id:9, name:'Sep'},{id:9, name:'Oct'},{id:9, name:'Nov'},{id:9, name:'Dec'}];
		$scope.monthSelected = 0;
		
		$scope.dates = [];
		$scope.dateSelected = 0;
		for(var i = 0; i< 30 ;i++){
			$scope.dates.push({id:i+1, name:i+1+''});
		}
		
		$scope.change = function(value) {
			$scope.userDetails['securityQuestion'] = value;
		}
		
	}]);
})();