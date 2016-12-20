$(function (){

  $.getJSON( "http://localhost:8082/core/api/v1/devices/fetch", function( data ) {

    $.each(data.Result, function(){
      $('.list-box').append('\
        <li>\
          <div class="list-content">\
            <h4>\
              <a href="/device/detail">'+ this.DeviceName +'</a>\
            </h4>\
            <p>' + this.Description + '</p>\
          </div>\
          <div class="list-footer"></div>\
          <span class="pull-left buttons">\
            <a href="/device/detail" class="btn btn-sm btn-primary">\
              <i class="fa fa-eye"></i> Hiển thị chi tiết\
            </a>\
            <a href="/device/edit" class="btn btn-sm btn-primary">\
              <i class="fa fa-pencil-square-o"></i> Chỉnh sửa\
            </a>\
          </span>\
          <span class="pull-right">\
            <p>' + this.IdDevice + '</p>\
          </span>\
        </li>\
        ');
    });

  });
});