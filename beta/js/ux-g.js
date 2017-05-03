//
//var txtForCopy = "(••)";
//// $('.txt').on('input keyup', function(e) {
////$('.txt').on('input', function (e) {
////  txtForCopy = $(this).val();
////  $(".copy").trigger("click"); //плагин ебаный не вызывается, вызываем кликом
////  $('.txt').focus(); //плагин пиздит фокус, возвращаем
////  $('.txt2').val(txtForCopy); //выводим что в буфере
////  // console.log(txtForCopy);
////});
//$(document).on("click", ".copy", function () {
// console.log("копи");
//});
//
//
//new Clipboard('.copy', {
//  text: function () {
//    return txtForCopy;
//  }
//});


//https://clipboardjs.com/
console.clear();
var txtForCopy="ебаный плагин для копирования";
// $('.txt').on('input keyup', function(e) {
$('.txt').on('input', function(e) {
  txtForCopy=$(this).val();
  $( ".copy" ).trigger( "click" );//плагин ебаный не вызывается, вызываем кликом
  $('.txt').focus();//плагин пиздит фокус, возвращаем
  $('.txt2').val(txtForCopy);//выводим что в буфере
  // console.log(txtForCopy);
});


new Clipboard('.copy', {
  text: function() {
    return txtForCopy;
  }
});
