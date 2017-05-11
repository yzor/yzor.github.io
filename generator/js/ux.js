/* jshint -W117 */
/* jshint -W098 */



//смена темы



//ЗАКЛАДКИ



//закладка при клике на элемент
//$(document).on("click", "#d .box", function () {
$(document).on("mousedown", "#d .box", function () {
  if ($(this).hasClass("mark")) {
    $(this).removeClass("mark");
  } else {
    $(".mark").removeClass("mark");
    $(this).addClass("mark");
  }
});

//закладка при клике на номер ряда
$(document).on("click", "#d b", function () {
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
    $(this).parent().addClass('hover-row');
    //stuff to do on mouse enter
    //    console.log("++");
  },
  mouseleave: function () {
    $(this).parent().removeClass('hover-row');
    //    console.log("--");
    //stuff to do on mouse leave
  }
}, "#d b"); //pass the element as an argument to .on


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






$(function () { //readyTest

  //выделение нескольких элементов, подобно выделению текста
  var markStart;
  $(document).on("mousedown", ".box", function () { //мыш нажата
    console.log("mousedown" + $(this).index(".box"));
    $(document).on("mouseover", ".box", markText); //ставим обработчик на наведение
    $(document).on("mouseup", "", markTextEnd); //ставим обработчик отжатие клавиши
    var n = $(this).index(".box");
    markStart = n;
  });

  function markText() { //пометить текст
    var n;
    var n2 = $(this).index(".box");
    if (n2 > markStart) {
      n = markStart;
    } else {
      n = n2;
      n2 = markStart;
    }
    n2++;
    $(".mark").removeClass("mark");
    $(".box").slice(n, n2).addClass("mark"); //выделяем от n до n2
    // console.log("markStart "+ n +" "+ n2);
    $("#d").addClass("no-select"); //убрать визуальное выделение текста
    clearSelection(); //снять выделение
  }

  function markTextEnd() {
    console.warn("markTextEnd");
    $(document).off("mouseover", ".box", markText); //убираем обработчик наведения
    $(document).off("mouseup", "", markTextEnd);
    $("#d").removeClass("no-select"); //отменить невыделяемость текста
    clearSelection();
  }

  function clearSelection() {

    if (window.getSelection) {
      window.getSelection().removeAllRanges();
    } else { // старый IE
      document.selection.empty();
    }
  }

}); //readyTest




//при наведении на рапорт запускать такую безбашеную хрень как мелькание всех петель по очереди
