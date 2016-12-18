$( document ).ready(function() {
  $('#password-repeat').on('keyup', function() {
      if ($(this).val() == $('#password').val()) {
          $('#message').html('Ok').css('color', 'green');
      } else $('#message').html('Mật khẩu nhập lại không khớp').css('color', 'red');
  });
});