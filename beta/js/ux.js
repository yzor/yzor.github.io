/* jshint -W117 */
/* jshint -W098 */



//смена темы



//ЗАКЛАДКИ



//закладка при клике на элемент
//$(document).on("click", "#description .box", function () {
$(document).on("mousedown", "#description .box", function () {
  if ($(this).hasClass("mark")) {
    $(this).removeClass("mark");
  } else {
    $(".mark").removeClass("mark");
    $(this).addClass("mark");
  }
});

//закладка при клике на номер ряда
$(document).on("click", "#description b", function () {
  var $elm = $(this).parent();
  if ($elm.hasClass("mark-row")) {
    $elm.removeClass("mark-row");
  } else {
    $(".mark-row").removeClass("mark-row");
    $elm.addClass("mark-row");
  }
});

$(document).on({ //наведение на номер ряда"1-й ряд:"...
  mouseenter: function () {
    $(this).parent().addClass('hover-rap');
    //stuff to do on mouse enter
    //    console.log("++");
  },
  mouseleave: function () {
    $(this).parent().removeClass('hover-rap');
    //    console.log("--");
    //stuff to do on mouse leave
  }
}, "#description b"); //pass the element as an argument to .on


//выделение рапорта в текущем ряду при клике на звезду
$(document).on("click", ".star, .star2", function () {
  $(this).closest("p").find(".rapo").toggleClass("mark-rap");
});


//двойной клик на звезду - выделяем всерапорты
$(document).on("dblclick", ".star, .star2", function () {
  //$(".rapo").toggleClass("mark");
  if ($(this).closest("p").find(".rapo").hasClass("mark-rap")) {
    $(".rapo").removeClass("mark-rap");
  } else {
    $(".rapo").addClass("mark-rap");
  }
});


//

$(function () {});


//наведение на основную звёздочку - выделяем обе
$(document).on({
  mouseenter: function () {
    $(this).closest("p").find(".star").addClass("act");
  },
  mouseleave: function () {
    $(".star").removeClass("act");
  }
}, ".star");







$(document).on({ //Наведение на вторичные звёздочки - выделяем основную
  mouseenter: function () {
    if ($(this).hasClass("a")) {
      $(this).closest("p").find(".star").eq(1).addClass("act");
    } else {
      $(this).closest("p").find(".star").eq(0).addClass("act");
    }
  },
  mouseleave: function () {
    $(".star").removeClass("act");
  }
}, ".star2");



//при наведении на рапорт запускать такую безбашеную хрень как мелькание всех петель по очереди
