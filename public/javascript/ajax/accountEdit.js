$(function() {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var API = "/core/api/v1/users" + id;

    $.getJSON(API, function(data) {

        $.each(data.Result, function() {
            $('.table tbody').append('\
        <tr>\
          <td>' + this.ID + '</td>\
          <td>' + this.LastName + '</td>\
          <td>' + this.FirstName + '</td>\
          <td>' + this.Username + '</td>\
          <td>' + this.Role + '</td>\
          <td>\
            <a href="/account/detail/' + this.ID + '" class="table-link">\
              <span class="fa-stack">\
                <i class="fa fa-square fa-stack-2x"></i>\
                <i class="fa fa-search-plus fa-stack-1x fa-inverse"></i>\
              </span>\
            </a>\
            <a href="/account/edit/' + this.ID + '" class="table-link">\
              <span class="fa-stack">\
                <i class="fa fa-square fa-stack-2x"></i>\
                <i class="fa fa-pencil fa-stack-1x fa-inverse"></i>\
              </span>\
            </a>\
            <a href="/account/delete/' + this.ID + '" class="table-link">\
              <span class="fa-stack">\
                <i class="fa fa-square fa-stack-2x"></i>\
                <i class="fa fa-trash-o fa-stack-1x fa-inverse"></i>\
              </span>\
            </a>\
          </td>\
        </tr>\
      ');
        });

    });
});