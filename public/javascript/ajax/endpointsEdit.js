$(function() {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var API = "/core/api/v1/endpoints/fetch/users/" + id;

    alert(API);

    $.getJSON(API, function(data){
        // alert(JSON.stringify(data));
        var lastName    = data.Result[0].LastName;
        var firstName   = data.Result[0].FirstName;
        var username    = data.Result[0].Username;

        $("#lastName").val(lastName);
        $("#firstName").val(firstName);
        $("#username").val(username);
    });
});