/* jshint -W117 */
/* jshint -W098 */



//смена темы



//ЗАКЛАДКИ

//закладка при клике на элемент
$(document).on("click", "#description .box", function () {
  if ($(this).hasClass("marker")) {
    $(this).removeClass("marker");
  } else {
    $(".marker").removeClass("marker");
    $(this).addClass("marker");
  }
});

//закладка при клике на номер ряда
$(document).on("click", "#description b", function () {
  var $elm = $(this).parent();
  if ($elm.hasClass("illumination")) {
    $elm.removeClass("illumination");
  } else {
    $(".illumination").removeClass("illumination");
    $elm.addClass("illumination");
  }
});

$(document).on({ //наведение на номер ряда"1-й ряд:"...
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


//выделение рапорта в одном ряду
$(document).on("click", ".star, .star2", function () {
  $(this).closest("p").find(".rapo").toggleClass("mark");
});



$(document).on("dblclick", ".star, .star2", function () {
//  $(this).closest("p").find(".rapo").toggleClass("mark");
//  alert("lkj");
    $(".rapo").toggleClass("mark");

});
//$( ".star" ).dblclick(function() {
//  alert( "Handler for .dblclick() called." );
//});



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
