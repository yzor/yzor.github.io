/*global $, console*/ //JSLinT error - '$' was used....
/*jslint sloppy: true*/ //JSLinT error - Missing...
/*jslint indent: 2 */ //2 пробела
/*jslint white: true */ //отключение проверки пробелов
var SVG;
console.clear();


////////////////////////
//ВЫВОД ДАТЫ И ВРЕМЕНИ
////////
function uiNameData() { //jshint ignore:line
  //вывод имени
  var name = SVG.name;
  if (name * 1) {
    name = "№" + name;
  }
  $("#futer_header>span").text(name); //вывод

  //вывод даты
  var txt;
  var date = SVG.date; //дата редактирования
  var now = new Date(); //сегодня
  var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()); //00:00 сегодя
  if (date >= today) { //если сегодня
    var mm = date.getMinutes();
    if (mm < 10) {
      mm = '0' + mm;
    }
    txt = "сегодня в " + date.getHours() + ":" + mm;
  } else if (date < today) { //если давно
    var mes = ["Января", "Февраля", "Марта", "Апеля", "Мая", "Июня", "Июля", "Августа", "Сентября", "Октября", "Ноября", "Декабря"];
    txt = date.getDate() + " " + mes[date.getMonth()] + " " + date.getFullYear() + "г.";
  }
  $("#date").text("Дата создания файла: " + txt); //вывод
}



////////////////////////
//МЕТАМОРФОЗ
////////
function metamorphose() {
  //#FIXME бага когда шторка уже спрятана и вызывается метаморфоз - она прыгает
  console.info("metamorphose");
  $("body").addClass("qwe");
  $(this).delay(480).queue(function () {
    $("body").addClass("scheme").removeClass("waiting");
    $("#header").removeClass("header_show header_hide");
    $(this).queue("fx", []); //очистка очереди
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
      console.info($(this).queue("fx").length + " - навёл");
      $(this).dequeue();
    });
  }, function () {
    //if($("#header").is(":hover")){console.log("3 Наведён но не должен");}
    //else{                        console.log("4 Не наведён и должен");}
    $(this).queue("fx", []); //очистка очереди
    $(this).delay(550).queue(function () {
      $(this).addClass("header_hide").removeClass("header_show light");
      console.info($(this).queue("fx").length + " - убрал");
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






/////////////////////////////
//нажатие/наведение
////

$(document).on({ //наведение на "1-й ряд:"...
  mouseenter: function () {
    $(this).parent().addClass('illumination-hover');
    //stuff to do on mouse enter
    //    console.log("++");
  },
  mouseleave: function () {
    $(this).parent().removeClass('illumination-hover');
    //    console.log("--");
    //stuff to do on mouse leave
  }
}, "#description b"); //pass the element as an argument to .on
/**/

/*
$(document).on({
  mouseenter: function () {
    $(this).parent().addClass('illumination-hover');
    console.error("qwe");
    console.log($(this).text());
    //stuff to do on mouse enter
  },
  mouseleave: function () {
    console.log("-");
    //stuff to do on mouse leave
  }
}, "#description b");
*/



$("body").on("mouseout", "#description b", function () {}, function () {});
/*
$('b').hover( // при наведении на1-йряд: - подсвечивать весь ряд
  function () {
    $(this).parent().addClass('illumination-hover');
  },
  function () {
    $(this).parent().removeClass('illumination-hover');
  }
);
*/


$(document).on("click", "#description li", function () { /*закладка при клике на элемент*/
  if ($(this).hasClass("marker")) {
    $(this).removeClass("marker");
  } else {
    $(".marker").removeClass("marker");
    $(this).addClass("marker");
  }
});


$(document).on("click", "#description b", function () {
  var $elm = $(this).parent();
  if ($elm.hasClass("illumination")) {
    $elm.removeClass("illumination");
  } else {
    $(".illumination").removeClass("illumination");
    $elm.addClass("illumination");
  }
});


function uiShowScheme(xml, name) { //выводить SVG, пока для тестов
  $("#show_SVG").attr("href", "http://yzorrykodelie.ru/узор-спицами-№" + name);
  var html = $(xml)["0"].documentElement.outerHTML;
  $("#show_SVG").html(html);
}


/*
#container li.marker i{/* цифра в закладке* /background: orange;}
#container .illumination li{background: pink;}
  */
