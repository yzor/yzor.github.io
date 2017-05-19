/* jshint -W117 */
/* jshint -W098 */










var nameLS = "MAXmark"+window.location.pathname;//имя для данной страницы
if(localStorage.getItem(nameLS)){
  NOW=localStorage.getItem(nameLS).split(',');
  mark( NOW[0],NOW[1]);
}else{
  console.error("lkjlkj");
}


//pathname - строка пути

var memory=[];
var NOW=[0,2];
// if(localStorage.getItem("NOW")){
//   NOW=localStorage.getItem("NOW").split(',');
//   // console.error(NOW);
//  mark( NOW[0],NOW[1]);
// }


// var nameLS = "MAXmark"+window.location.pathname;//имя для данной страницы
// if(localStorage.getItem(nameLS)){
//   NOW=localStorage.getItem(nameLS).split(',');
//   mark( NOW[0],NOW[1]);
// }else{
//   console.error("lkjlkj");
// }





 $('body').keydown(function (e) {//стрелки
       console.warn(e.which);
    if (e.which == 37||e.which == 65) { //лево
      // jump("L","selected");
      markL();
      return false;
    }
    if (e.which == 38||e.which == 87) { //верх
      // jump("U","selected");
      markU();
      return false;
    }
    if (e.which == 39||e.which == 68||e.which == 32||e.which == 13) { //право
      // jump("R","selected");
      //пробел 32
      //интер 13
      markR();
      return false;
    }
    if (e.which == 40||e.which == 83) { //низ
      // jump("D","selected");
      markD();
      return false;
    }
  });














var $setRow = $('#d .row');
$(document).on("mousedown", "#d .box", function () {
  if ($(this).hasClass("mark")) {
    $(this).removeClass("mark");
  } else {
    // $(".mark").removeClass("mark");
    // $(this).addClass("mark");
    var $setBox= $(this).closest(".row").find(".box");//список боксов в текущем ряду
    var box=$setBox.index( $(this) );//номер бокса
    var row=$setRow.index($(this).closest(".row")/*["0"]*/);//ряд
    // NOW=[row,box];
    // localStorage.setItem("NOW",row+","+box);
    mark(row, box);
  }



});


function focus(elm){
  var Xscroll = $(document).scrollTop();//прокручено
  var Xh = $(window).height();//высота экрана
  var Xposition = $(elm).offset().top;//позиция элемента
  var XhElm = $(elm).outerHeight();//.height();//высота элемента
  if (
    //прокручено - позиция элемента + 15%высоты окна < 0
    Xscroll - Xposition + Xh*15/100 < 0 &&//верхний край
    //прокручено - высота элемента + 85%высоты окна  > позиция элемента
    Xscroll - XhElm + Xh*85/100 > Xposition //нижний край
  ){
  }else{
  $('html, body').animate({ scrollTop: Xposition - Xh*15/100|0 }, { queue:false, duration:450 }
 /*450*/);
  //div.animate          ({ top: '-=100px' }, 600, 'имя функции', function () { … })
  }
}






function mark(row, column){
  // console.clear();
  // row--;
  // column--;

  $('.mark').removeClass("mark");//удаляем старую отметку
  $('.red').removeClass("red");//удаляем тестовй класс если ставили
  $('#d .row').eq(row).find(".box").eq(column).addClass("mark");//выделяем
  focus($('#d .row').eq(row).find(".box").eq(column));


  //если нету символа вывести ошибку
  if(!$('#d .row').eq(row).find(".box").eq(column).is('.box')){
  console.error("нет такого символа>"+row+":"+column);
  $('.row').addClass("red");
  }
  NOW=[row,column];
  localStorage.setItem(nameLS,row+","+column);



  //////INFO
  console.log(NOW);
  // console.log(
    // $('#d p').eq(row).find(".box").length+"^"+
     // $('#d p').length
  // );


}

function markL(){
  if(NOW[1]===0){//если первый бокс
    NOW[1]=$('#d .row').eq(NOW[0]-1).find(".box").length;
    rowT();
  }
  NOW[1]--;
  mark(NOW[0],NOW[1]);
}
function markR(){
  NOW[1]++;
  if(NOW[1]==$('#d .row').eq(NOW[0]).find(".box").length){//последний бокс
    NOW[1]=0;
    rowB();
  }
  mark( NOW[0],NOW[1]);
}


function markU(){
  // console.error(NOW[0]);
  rowT();
  mark(NOW[0],0);
}
function markD(){
  rowB();
  mark(NOW[0],0);
}

function rowT(){//следующий ряд
  if(NOW[0]===0){//если первый ряд
    NOW[0]=$('#d .row').length-1;
  }else{
    NOW[0]--;
  }
}
function rowB(){//предыдущий ряд
  if(NOW[0]==$('#d .row').length-1){//если последний ряд
    NOW[0]=0;
  }else{
    NOW[0]++;
  }
}




 $('#arrow-buttons').on('click', '#UP', function ()   {markU();});
 $('#arrow-buttons').on('click', '#DOWN', function ()  {markD();});
 $('#arrow-buttons').on('click', '#LEFT', function ()  {markL();});
 $('#arrow-buttons').on('click', '#RIGHT', function () {markR();});







//смена темы



//ЗАКЛАДКИ


/*
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
*/
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
