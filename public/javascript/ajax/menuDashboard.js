$(getEndpoint(0));

function getEndpoint(id) {
    var API = "";
    if (id == 0) {
        API = "/core/api/v1/endpoints/fetch/users/1";
        $.getJSON(API, function(data) {

            $.each(data.Result, function() {

                $('.nav-tabs').append('\
                <li class="menu-db">\
                    <a onclick="getEndpoint(' + this.ID + ')" >' + this.name + '</a>\
                </li>\
            ');

            });

            // add menu endpoints

            $(".menu-db").click(function(e) {
                $(".menu-db").removeClass("active");
                $(this).addClass("active");
            });

        });
    } else {
        // API = "/core/api/v1/devices/fetch/"+id;
        API = "/core/api/v1/devices/fetch/";

        $.getJSON(API, function(data) {
            // console.log(data);

            $.each(data.Result, function() {
                $('#dashboard').html("");

                $('#dashboard').append('\
                    <div class="row">\
                        <div class="col-lg-12">\
                            <div class="panel panel-default">\
                                <div class="panel-heading">' + this.DeviceName + '</div>\
                                <div class="panel-body">\
                                    <div class="canvas-wrapper">\
                                        <div id="device' + this.IdDevice + '" style="min-width: 310px; height: 400px; margin: 0 auto"></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                ');
            });
        });
    }
}