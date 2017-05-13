/* jshint -W117 */
/* jshint -W098 */
var N = 33;
// $("#t1").val("//lorempixel.com/70/350/sports/947/");
// $("#t3").val("/");


$(function () {
  //убираем анимацию при загрузке
  setTimeout(function () {
    $(".fast").removeClass("fast");
  }, 500); // время в мс



  //если в url есть значения после #, то используем их, иначе 33 схема
  var urlHash = location.hash;
  if (urlHash) {
    urlHash = urlHash.slice(1).split("⚡");
    $("#t1").val(urlHash[0]);
    N = urlHash[1];
    $("#t3").val(urlHash[2]);
    //N=urlHash.replace(/\D+/g,"")
    //  console.error(urlHash.replace(/\D+/g,""));
  } else {
    $("#t1").val("https://yzorrykodelie.ru/узор-спицами-№");
    $("#t2").val(N);
  }

  next1();




  // $('.txt').on('input keyup', function(e) {
  $('#t2').on('input', function (e) {
    N = $(this).val();
    next1();
  });

  $("#before").mousedown(function () {
    if (window.event.shiftKey) {
      N = N - 100;
    } else if (window.event.ctrlKey) {
      //ctrl was held down during the click
      N = N - 10;
    } else {
      N--;
    }
    next2();
  });
  $("#after").mousedown(function () {
    if (window.event.shiftKey) {
      N = N + 100;
    } else if (window.event.ctrlKey) {
      //ctrl was held down during the click
      N = N + 10;
    } else {
      N++;
    }
    next();
  });
  $("#go").mousedown(function () {

    next();
    //    $("iframe").contents().find("body").html()
  });






  function next() {
    next2();
  }

  function next1() {
    document.title = "№" + N;
    $("#num").text(N);
    $("#num").removeClass("act");
    setTimeout(function () {
      $("#num").addClass("act");
    }, 0); // время в мс
    var b = $("#t1").val();
    var a = $("#t3").val();
    location.hash = b + '⚡' + N + '⚡' + a;
    $("#ribbon").text(N);
    $("#t2").val(N);
    $('iframe').attr('src', b + N + a);
    console.info("№ " + N);

  }

  function next2() {
    document.title = "№" + N;
    $("#num").text(N);
    $("#num").removeClass("act");
    setTimeout(function () {
      $("#num").addClass("act");
    }, 0); // время в мс
    var b = $("#t1").val();
    var a = $("#t3").val();
    location.hash = b + '⚡' + N + '⚡' + a;
    $("#ribbon").text(N);
    $("#t2").val(N);
    $('iframe').addClass("old");
    $("#conteiner").append('<iframe src="' + b + N + a + '"></iframe>');
    console.info("№ " + N);
    setTimeout(function () {
      $(".old").remove();
    }, 1000); // время в мс
  }

});
//#mark5:4
