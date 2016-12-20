$(document).ready(function() {
    "use strict";

    function getDevices() {
        $.getJSON("/core/api/v1/devices/fetch/", data,
            function(data) {
                var item = [];
                $.each(data, function(key, val) {
                    item.push(key + ": " + val);
                });
            }
        );
    }
});