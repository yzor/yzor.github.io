/* jshint -W117 */
/* jshint -W098 */
var copyTxt = "(••)";

//var clipboard;
$(function () {
  //инициализировать после загрузки, иначене сработает
  //параметр заглушка, чтобы можно было вызывать откуда угодно
  copyTest("on");
});


$(function () { //ready
//  $('#description').on('mousedown', function (e) {
//    setTimeout(function () {
//      copyTest();
//      // тут можно написать еще чего-нить что надо сделать тоже чере 3 секунды
//      //alert(1001);
//    }, 1000);
//
//
//
//  });
}); //ready


function copyTest(p) {
  if (p == "on") {
    $('.copy').on('mousedown', function (e) {
      $(".copy").trigger("click"); //дабы сразу при нажатии срабатывало
    });
    var clipboard = new Clipboard('.copy', {
      text: function () {
        return copyTxt;
      }
    });
    clipboard.on('success', function (e) {
      //      $(".copy").toggleClass("done");
      $(".copy").addClass("done");
    });
    clipboard.on('error', function (e) {
      $(".copy").removeClass("done");
      // console.error('Action:', e.action);
      // console.error('Trigger:', e.trigger);
      console.error(" copy ERROR :c");
      //      alert(" copy ERROR :c");
    });
    //console.log("+++1");
  } else {
    $(".copy").trigger("click");
    //console.log("+++2");
  }
}





/////////////////
// var clipboard = new Clipboard('.btn');
