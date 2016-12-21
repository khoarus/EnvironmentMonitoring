$(function() {

    var API = "/core/api/v1/endpoints/fetch";

    $.getJSON(API, function(data) {

        $.each(data.Result, function() {
            $('.nav-tabs').append('\
              <li>\
                <a href="' + this.ID + '">' + this.name + '</a>\
              </li>\
            ');
        });

    });
});