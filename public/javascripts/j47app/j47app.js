/**
 * Created by jaric on 20.06.2016.
 */

define(["angular"], function(angular){
    "use strict";

    console.log("angular is here:", angular);

    var j47app = angular.module('j47app', [
        "j47controllers"
    ]).config([function(){
        // app configuration goes here
    }]);
    console.log("j47app", j47app);

    return j47app;
});
