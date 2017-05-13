/* jshint -W117 */
/* jshint -W098 */
var N = 23;
// $("#t1").val("//lorempixel.com/70/350/sports/947/");
// $("#t3").val("/");

$(function () {
  // Обработчик для .ready()
  $("#t1").val("https://yzorrykodelie.ru/узор-спицами-№");
  $("#t2").val(N);
   next();


  // $('.txt').on('input keyup', function(e) {
  $('#t2').on('input', function (e) {
    N = $(this).val();
    next1();
  });

  $("#before").mousedown(function () {
    if (window.event.ctrlKey) {
      //ctrl was held down during the click
      N = N - 9;
    }

    N--;
    next2();
  });
  $("#after").mousedown(function () {
    if (window.event.ctrlKey) {
      //ctrl was held down during the click
      N = N + 9;
    }
    N++;
    next();
  });
  $("#go").mousedown(function () {

    //    next();  $("iframe").contents().find("body").html()
  });






  function next1() {
    $("#num").text(N);
    $("#num").removeClass("act");
    setTimeout(function () {
      $("#num").addClass("act");
    }, 0); // время в мс
    var b = $("#t1").val();
    var a = $("#t3").val();
    $("#ribbon").text(N);
    $("#t2").val(N);
    $('iframe').attr('src', b + N + a);
  }



  function next() {next2();}
  function next2() {
    $("#num").text(N);
    $("#num").removeClass("act");
    setTimeout(function () {
      $("#num").addClass("act");
    }, 0); // время в мс
    var b = $("#t1").val();
    var a = $("#t3").val();
    $("#ribbon").text(N);
    $("#t2").val(N);
    //    $('iframe').attr('src', b + N + a);
    $('iframe').addClass("old");
    $("#conteiner").append('<iframe src="' + b + N + a + '"></iframe>');
    setTimeout(function () {
      $(".old").remove();
    }, 1000); // время в мс

  }

});
