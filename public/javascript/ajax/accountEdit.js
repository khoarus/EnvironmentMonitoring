$(function() {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var API = "/core/api/v1/users" + id;

    alert(id);
});