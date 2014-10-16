"use strict";

angular.module("ui.pwgen", []).directive("pwgen", function($timeout) {
	return {
		scope: {
			model: "=ngModel",
			length: "@"
		},
		require: "ngModel",
		restrict: "E",
		replace: "true",
		template: "" + 
			"<div                  class=\"             angular-bootstrap-pwgen            \">" +
				"<div              class=\"input-group                                     \">" + 
					"<input        class=\"form-control                                    \" ng-model=\"password\" ng-class=\"{'angular-bootstrap-pwgen-fixed-font': passwordNotNull}\" placeholder=\"Enter Password\">" + 
					"<span         class=\"input-group-btn                                 \">" + 
						"<button   class=\"btn btn-default                                 \" type=\"button\" ng-click=\"generatePasswordStart()\">" + 
							"<span class=\"glyphicon glyphicon-random                      \"></span>" + 
						"</button>" + 
					"</span>" + 
				"</div>" +
				"<div              class=\"progress     angular-bootstrap-pwgen-progress-div\" ng-show=\"progressDivShow\">" + 
					"<div          class=\"progress-bar angular-bootstrap-pwgen-progress-bar\" ng-style=\"progressWidth\">" + 
					"</div>" + 
				"</div>" + 
			"</div>",
		link: function(scope, elem, attrs, modelCtrl) {
			scope.$watch("model", function () {
				scope.password = scope.model;
			});
			
			scope.passwordNotNull = false;
			scope.$watch("password", function () {
				scope.model = scope.password;
				if(scope.password !== null && scope.password !== "") {
					scope.passwordNotNull = true;
				} else {
					scope.passwordNotNull = false;
				}
			});
			
			scope.progressDivShow = false;
			scope.generatePasswordStart = function() {
				scope.progressDivShow = true;
				scope.progressValue = 0;
				scope.progressWidth = {"width": scope.progressValue + "%"};
				scope.generatePasswordProgress();
			};
			scope.generatePasswordProgress = function() {
				$timeout(function() {
					if(scope.progressValue < 100) {
						scope.password = scope.generatePassword(scope.length, false);
						scope.progressValue += 1;
						scope.progressWidth = {"width": scope.progressValue + "%"};
						scope.generatePasswordProgress();
					} else {
						scope.progressDivShow = false;
					}
				}, 10);
			};
			
			
			scope.vowel = /[aeiouAEIOU]$/;
			scope.consonant = /[bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ]$/;
			scope.generatePassword = function (length, memorable, pattern, prefix) {
				var char, n;
				if (length == null) {
					length = 10;
				}
				if (memorable == null) {
					memorable = true;
				}
				if (pattern == null) {
					pattern = /[a-zA-Z0-9]/;
				}
				if (prefix == null) {
					prefix = '';
				}
				if (prefix.length >= length) {
					return prefix;
				}
				if (memorable) {
					if (prefix.match(scope.consonant)) {
						pattern = scope.vowel;
					} else {
						pattern = scope.consonant;
					}
				}
				n = (Math.floor(Math.random() * 100) % 94) + 33;
				char = String.fromCharCode(n);
				if (memorable) {
					char = char.toLowerCase();
				}
				if (!char.match(pattern)) {
					return scope.generatePassword(length, memorable, pattern, prefix);
				}
				return scope.generatePassword(length, memorable, pattern, "" + prefix + char);
			};
		}
	};
});
