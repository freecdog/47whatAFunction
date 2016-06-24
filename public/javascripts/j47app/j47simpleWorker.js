/**
 * Created by jaric on 21.06.2016.
 */

(function (){
    'use strict';

    self.addEventListener('message', function(e) {
        console.log("going to send message from worker, event:", e.data);
        e.data.asd++;

        var url = e.data.url;
        var addressArr = url.split("/");
        var requestUrl = "/api/a";
        ajaxWrapper('GET', {}, addressArr[0] + "//" + addressArr[2] + requestUrl, function(status, responseText){
            var responseObj = JSON.parse(responseText);
            console.warn("Chrome has an issue with console.log(Object), probably because of closed thread");
            console.log("GET from", addressArr[2], requestUrl, "status code:", status, "server message:", responseObj );

            e.data.responseObj = responseObj;
            self.postMessage(e.data);

            self.close(); // close Worker
        });
    });

    function ajaxWrapper(mode, theJson, toUrl, callback){
        var xmlhttp = new XMLHttpRequest();
        xmlhttp.open(mode, toUrl, true);
        xmlhttp.setRequestHeader("Content-type", "application/json");
        xmlhttp.onreadystatechange = function () { //Call a function when the state changes.
            if (xmlhttp.readyState == 4) { // && xmlhttp.status == 200) {
                //console.log(xmlhttp.responseText);
                callback(xmlhttp.status, xmlhttp.responseText);
            }else {
                //console.log("xmlhttp.readyState:", xmlhttp.readyState == 4, "status:", xmlhttp.status);
                //callback(xmlhttp.status); // here we had several callbacks fired while we need only one
            }
        };
        var parameters = JSON.stringify(theJson);
        xmlhttp.send(parameters);
    }

})();