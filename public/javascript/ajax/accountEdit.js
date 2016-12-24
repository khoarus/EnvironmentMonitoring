$(function() {

    var url = window.location.pathname;
    var id = url.substring(url.lastIndexOf('/') + 1);

    var API = "/core/api/v1/users" + id;

    alert(id);

    function editForm(){

        var users = {
            lastName : $("lastName").val,
            firstName : $("firstName").val,
            username : $("username").val,
            password : $("password").val,
            passwordRepeat : $("password-repeat").val,
        }


        $.ajax({
            type: "POST",
            url:  "update",
            data: users,
            success: function(result) {
                $('')
            }
        });
    }
});