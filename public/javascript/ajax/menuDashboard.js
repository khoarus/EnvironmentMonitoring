$(getEndpoint(0));

function getEndpoint(id) {
    var API = "";
    if (id==0) 
    {
         API = "/core/api/v1/endpoints/fetch";
         $.getJSON(API, function(data) {

            $.each(data.Result, function() {
                $('.nav-tabs').append('\
                <li class="menu-db">\
                    <a onclick="getEndpoint('+ this.ID +')" >' + this.name + '</a>\
                </li>\
            ');
            });

            // add menu endpoints
            
            $(".menu-db").click(function(e) {
                $(".menu-db").removeClass("active");
                $(this).addClass("active");
            });

        });
    } 
    else 
    {
        API = "/core/api/v1/endpoints/fetch/"+id;

        $.getJSON(API, function(data) {
            // console.log(data);

            $.each(data.Result, function(){
                $('').append('\
                    <div class="row">\
                    </div>\
                ');
            });
        });
    }
}


