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

//
