$(".form").on('click', function(){
  $(this).addClass('active');
});

$(".ok_message").on('click', function() {
  $(this).removeClass("active");
  $(".form").removeClass("active").show();
});

$(".submit").on('click', function() {
  var form = document.getElementById('form');
  $(this).parent().parent().hide(300);
  $(".ok_message").addClass("active");
  setTimeout(function(){
  	form.submit();
  }, 3000);
});