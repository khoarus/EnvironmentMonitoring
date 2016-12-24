
var id_endpoint = 0 ;

$(getEndpoint(id_endpoint));

setInterval(function(){ 
    getEndpoint(id_endpoint);

 }, 20000);

// 20 giay se goi mot lan


function getEndpoint(id) {
    var API = "";
    if (id == 0) {
        API = "/core/api/v1/endpoints/fetch/users/1";
        var firsttab = true;
        $.getJSON(API, function(data) {

            $.each(data.Result, function() {
                if(firsttab)
                {
                    $('.nav-tabs').append('\
                    <li class="menu-db active">\
                        <a onclick="getEndpoint(' + this.ID + ')" >' + this.name + '</a>\
                    </li>\
                   ');
                   getEndpoint(this.ID);
                   firsttab = false;
                }else{
                    $('.nav-tabs').append('\
                    <li class="menu-db ">\
                        <a onclick="getEndpoint(' + this.ID + ')" >' + this.name + '</a>\
                    </li>\
                   ');
                }

            });

            // add menu endpoints

            $(".menu-db").click(function(e) {
                $(".menu-db").removeClass("active");
                $(this).addClass("active");
            });

        });
    } else {
        id_endpoint = id;
        // API = "/core/api/v1/devices/fetch/"+id;
        API = "core/api/v1/devices/fetchAll?endpointcode=" + id_endpoint;

        $.getJSON(API, function(data) {
            // codansole.log(data);            
            $.each(data.Result, function() {
                $('#dashboard').html("");
                 if(this.value === null) {
                   $('#dashboard').html("");
                   $('#dashboard').append('<span>Thiết bị chưa có dữ liệu...</span>');
                  }
                $('#dashboard').append('\
                    <div class="row">\
                        <div class="col-lg-12">\
                            <div class="panel panel-default">\
                                <div class="panel-body">\
                                    <div class="canvas-wrapper">\
                                        <div id="container" style="min-width: 310px; height: 400px; margin: 0 auto"></div>\
                                    </div>\
                                </div>\
                            </div>\
                        </div>\
                    </div>\
                ');
                fetchValueByDeviceId(this.id_device,id_endpoint);
            });
            
        });
    }
}