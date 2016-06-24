/**
 * Created by jaric on 20.06.2016.
 */

requirejs.config({
    paths: {
        angular: 'angular',
        j47app: 'j47app',
        j47controllers: 'j47controllers'
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'j47app': {
            deps:['angular']
        },
        'j47controllers': {
            deps: ['j47app']
        }
    }
});

requirejs(['angular', 'j47app', 'j47controllers'], function(angular, j47app, j47controllers) {
    console.log("require and angular bootstrap is here", angular, j47app, j47controllers);

    // init angular application (instead of ng-app directive in view)
    angular.element(document).ready(function() {
        angular.bootstrap(document, [j47app.name]);
    });

});