/*global $, jQuery, alert, console*/ //JSLinT error - '$' was used....
/*jslint sloppy: true*/ //JSLinT error - Missing...
/*jslint indent: 2 */ //2 пробела
/*jslint white: true */ //отключение проверки пробелов
console.clear();






////////////////////////
//МЕТАМОРФОЗ
////////
function metamorphose() {
  //#FIXME бага когда шторка уже спрятана и вызывается метаморфоз - она прыгает
  console.log("metamorphose");
  $("body").addClass("qwe");
  $(this).delay(480).queue(function () {
    $("body").addClass("scheme").removeClass("waiting");
    $("#header").removeClass("header_show header_hide");
    $(this).dequeue();
  });
}
$(function () { //$$$$$$$$$$$$$$$$$$$$$$$$$;
  ////////////////////////
  //АНИМАЦИЯ ШТОРКИ
  ////////
  $('#header').hover(function () { //при наведении на шторку
    //if($("#header").is(":hover")){console.log("1 Наведён и должен");}
    //else{                        console.log("2 Не наведён но должен");}
    $(this).queue("fx", []); //очистка очереди
    $(this).delay(100).queue(function () { //вытаскивание шторки с задежкой
      $(this).addClass("header_show").removeClass("header_hide");
      //console.log( $(this).queue("fx").length+" - навёл");
      $(this).dequeue();
    });
  }, function () {
    //if($("#header").is(":hover")){console.log("3 Наведён но не должен");}
    //else{                        console.log("4 Не наведён и должен");}
    $(this).queue("fx", []); //очистка очереди
    $(this).delay(550).queue(function () {
      $(this).addClass("header_hide").removeClass("header_show");
      //console.log( $(this).queue("fx").length+" - убрал");
      $(this).dequeue();
    });
  });
  ///////////////////////
  //ТЕСТОВЫЙ ЧЕКБОКС
  ////
  $('input[type=checkbox]').change(function () { //получение файла из инпута
    if ($("#cbox").prop('checked')) {
      //$("body").addClass("scheme").removeClass("waiting");
      metamorphose();
    } else {
      $("body").addClass("waiting").removeClass("scheme").removeClass("qwe"); //включить обратно
    }
  });









}); //$$$$$$$$$$$$$$$$END



//df
