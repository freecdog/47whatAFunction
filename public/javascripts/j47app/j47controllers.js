/**
 * Created by jaric on 20.06.2016.
 */

(function (angular, window){

    "use strict";

    console.log("j47controllers", angular);

    var j47controllers = angular.module('j47controllers', []);

    j47controllers.controller('j47mainController', ['$scope', '$window', '$http', 'workersMind', function($scope, $window, $http, workersMind) {
        var self = this;
        init();

        function init(){
            console.log("j47mainController init");

            self.message = "";

            self.mainClass = "invisible";

//            testRequest();
            workersMind.testWorker();
        }

        function testRequest(){
            $http({
                method: 'GET',
                url: '/api/b'
            }).then(function successCallback(a) {
                self.message = a.data.value;
                self.ready = true;
                self.mainClass = "";
                self.headerLabelClass = "";
            }, function errorCallback(response) {
                var errorStr = response.status.toString() + ", " + response.statusText;
                self.message = errorStr;
                console.error(errorStr);
            });
        }



    }]);

    j47controllers.factory('workersMind', ['$http', '$rootScope', function ($http, $rootScope) {
        // helpful link http://stackoverflow.com/a/21920241

        init();

        function init(){
            console.log("workersMind is here");
        }

        function testWorker(){
            console.log("test worker is here");

            var worker = new Worker('javascripts/j47app/j47simpleWorker.js');
            var dataToSend = { asd: 321, url: window.location.href};
            worker.onmessage = function(e){
                console.log("processing data from worker, data:", e.data, dataToSend);
            };
            worker.postMessage(dataToSend);
        }
        this.testWorker = testWorker;

        return this;
    }]);

})(angular, window);