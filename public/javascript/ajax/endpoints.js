$(document).ready(function() {

    var API = "core/api/v1/endpoints/fetch/users/";

    $.getJSON(API, function(data) {

        $.each(data.Result, function() {
            $('.list-box').append('\
        <li>\
          <div class="list-content">\
            <h4>\
              <a href="/endpoint/detail/' + this.ID + '">' + this.name + '</a>\
            </h4>\
            <p>' + this.Description + '</p>\
          </div>\
          <div class="list-footer"></div>\
          <span class="pull-left buttons">\
            <a href="/endpoint/detail/' + this.ID + '" class="btn btn-sm btn-primary">\
              <i class="fa fa-eye"></i> Hiển thị chi tiết\
            </a>\
            <a href="/endpoint/edit/' + this.ID + '" class="btn btn-sm btn-default">\
              <i class="fa fa-pencil-square-o"></i> Chỉnh sửa\
            </a>\
          </span>\
          <span class="pull-right">\
            <p>#' + this.ID + '</p>\
          </span>\
        </li>\
      ');
        });
    });
});