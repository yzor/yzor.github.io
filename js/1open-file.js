/*global $, alert, console*/ //JSLinT error - '$' was used....
/*jslint sloppy: true*/ //JSLinT error - Missing...
/*jslint indent: 2 */ //2 пробела
/*jslint white: true */ //отключение проверки пробелов
//#TODO вытаскивать из файла имя и дату редактирования

//var svgFolder = "//googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/";
// var svgFolder = "https://googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/";
var svgFolder = "/SVG/";



/////////////
//ВЫБОР по номеру
////////
function numEdit(n) { //jshint ignore:line
  //изменение кнопками
  var $tag = $("#number");
  var $znach = $tag.val() * 1 + n;
  $tag.val($znach);
  $tag.addClass("impulse");
  $(this).delay(110).queue(function () {
    $tag.removeClass("impulse");
    $(this).dequeue();
  });
  numLaunch($znach);
}
$("#number").change(function () { //отлов ручного изменения
  numLaunch($(this).val() * 1);
});

function numLaunch(n) { //создание ссылки
  console.log(svgFolder + n + '.svg');
  fileUrl3(svgFolder + n + '.svg'); //jshint ignore:line
  //#TODO объеденить fileUrl и numLaunch
}
//ajax
function fileUrl(url) {
  //#FIXME сделать обработку 404 ошибки, т.е. если файла нет
  $.ajax({
    url: url,
    dataType: "xml",
    success: xmlParser //jshint ignore:line
  });
}

function fileUrl2(url) {
  /*
    //#FIXME сделать обработку 404 ошибки, т.е. если файла нет
    $.ajax({
      url: url,
      dataType: "xml",
      success: function (a, b, c) {
          console.log(a.lastModified);
          console.log(c.responseXML.lastModified);
          console.log(a);
          console.log(b);
          console.log(c);


          success: function (response) {
            alert("Data is " + response.data + ", last modified: " + xhr.getResponseHeader("Last-Modified"));
          }


        }
        //jshint ignore:line
    });
  */
}
var url1 = "https://pp.vk.me/c636419/v636419262/26b57/bS8l83sO1Ho.jpg";
var url2 = "https://yzor.github.io/image/cat.png";
var url3 = "https://googledrive.com/host/0B0zTgDj4fTXrYzlyamxXMWtMN0E";
var url4 = "/SVG/1.svg";

//https://pp.vk.me/c11451/u31905868/e_8a4a408e.jpg

function fileUrl3(url, dataT) {
//  dataT2 = dataT;
//  urlll = url;
  //#FIXME сделать обработку 404 ошибки, т.е. если файла нет
  $.ajax({
    url: url,
    dataType: dataT,
    //    dataType: "html",
    success: methodName //jshint ignore:line
  });
function methodName(p1, p2, p3) {
  console.info("type-" + dataT + " url-" + url)
    //  console.log(p1);
    //  console.warn("###################################");
    //  console.log(p2);
    //  console.warn("###################################");
//  console.log(p3);
  //  console.log(p3.setRequestHeader());

  /*
    try{console.log("p1 ALL - ", p1.getAllResponseHeaders());}catch(err){}
//  console.warn("#######");
    try{console.log("p2 ALL - ", p2.getAllResponseHeaders());}catch(err){}
//  console.warn("#######");
    try{console.log("p3 ALL - ", p3.getAllResponseHeaders());}catch(err){}
  console.error("#########");

    try{console.log("p1 ДАТА - ", p1.getResponseHeader("date"));}catch(err){}
//  console.warn("#######");
    try{console.log("p2 ДАТА - ", p2.getResponseHeader("date"));}catch(err){}
//  console.warn("#######");
    try{console.log("p3 ДАТА - ", p3.getResponseHeader("date"));}catch(err){}
  console.error("#########");
  */
try{console.log("p1 ластМодиф - ", p1.getResponseHeader("Last-Modified"));}catch(err){}
//  console.warn("#######");
try{console.log("p2 ластМодиф - ", p2.getResponseHeader("Last-Modified"));}catch(err){}
//  console.warn("#######");
try{console.log("p3 ластМодиф - ", p3.getResponseHeader("Last-Modified"));}catch(err){}
  console.error("#########");





  //  console.error("###################################");

}
}
fileUrl3(url4, "html");
//fileUrl3(url2, "html");
//fileUrl3(url3, "html");
//fileUrl3(url4, "html");









////////////////////////////////////
//ВЫБОР Drag-and-drop
/////////
$(function () {
  var dropZone = $('body')[0]; //элемент принимающий перетаскивание
  //события
  dropZone.addEventListener('dragover', handleDragOver, false);
  dropZone.addEventListener('drop', handleFileSelect, false);
  //dragStart: пользователь начинает перетаскивание элемента.
  //dragEnter: перетаскиваемый элемент достигает конечного элемента.
  //dragOver: курсор мыши наведен на элемент при перетаскивании.
  //dragLeave: курсор мыши покидает пределы перетаскиваемого элемента.
  //drag: курсор двигается при перетаскивании.
  //drop: происходит drop элемента.
  //dragEnd: пользователь отпускает курсор мыши в процессе перетаскивания.
});

function handleFileSelect(evt) { //перетаскивание в окно браузера
  evt.stopPropagation();
  evt.preventDefault();
  var files = evt.dataTransfer.files; // FileList object.
  fileOpen(files[0]);
  //console.log(files[0].name,'дата - '+files[0].lastModifiedDate.toLocaleDateString());
}

function handleDragOver(evt) {
  evt.stopPropagation();
  evt.preventDefault();
  evt.dataTransfer.dropEffect = 'copy'; // Explicitly show this is a copy.
}


/////////////////////////////////
//ВЫБОР С ДИСКА
/////////
// document.getElementById('files').addEventListener('change', fileOpen, false);//вызов функции
$(function () {
  $("#file_box").click(function () {
    console.log("qwerrr");
    $("input[type='file'").trigger('click');
  });
  $('input[type=file]').change(function () { //получение файла из инпута
    var files = this.files;
    fileOpen(files[0]);
  });
});


function fileOpen(file) { //получение текста из файла


    console.log(
      file.name + " Имя ",
      file.size + " Байт",
      file.lastModifiedDate.toLocaleDateString() +
      " - дата ");

  console.log(file);



  var reader = new FileReader(); //jshint ignore:line
  reader.onload = function (event) {
    if (!file.type.match('.svg')) { //проверка типа файла
      alert("Это не файл редактора схем\nфайл редктора схем имеет расширение .svg");
      return; //остановка скрипта если не .svg
    }
    var contents = $.parseXML(event.target.result);
    //отправляем свг на разбор
    xmlParser(contents); //jshint ignore:line

    // fileSelect(url2);
    // fileSelect(contents);
  };
  reader.onerror = function (event) {
    console.error("Файл не может быть прочитан! код " + event.target.error.code);
  };
  reader.readAsText(file);
}









// function handleDrop(e) {
//   e.stopPropagation(); // Останавливает некоторые браузеры от перенаправления.
//   e.preventDefault();
//
//   var files = e.dataTransfer.files;
//   for (var i = 0, f; f = files[i]; i++) {
//     // Read the File objects in this FileList.
//   }
// }

//
// if (Modernizr.draganddrop) {
// console.log("тут");
//   // Browser supports HTML5 DnD.
// } else {
//   // Fallback to a library solution.
//   console.log("тута");
// }



/*
 function fileOpen23(evt) { //jshint ignore:line
   console.clear();
   console.log(evt);
   var file = evt.target.files[0]; // FileList object
   var reader = new FileReader(); //jshint ignore:line
   reader.onload = function (event) {
     if (!file.type.match('.svg')) { //проверка типа файла
       alert("Это не файл редактора схем\nфайл редктора схем имеер расширение .svg");
       return; //остановка скрипта если не .svg
     }
     var contents = $.parseXML(event.target.result);
     //отправляем свг на разбор
     xmlParser(contents); //jshint ignore:line
   };
   reader.onerror = function (event) {
     console.error("Файл не может быть прочитан! код " + event.target.error.code);
   };
   reader.readAsText(file);
 }




 /*
 fileSelect();
 xmlParser("ldfj");
 */




/*

function xmlParser(xml) {
  var SVG ={};
  $f = $( xml ).find( "svg" );
  SVG.viewBox=$f.attr('viewBox');
  SVG.id=$f.attr('id');
  console.log(SVG);
}
*/
