/*global $, alert, console*/ //JSLinT error - '$' was used....
/*jslint sloppy: true*/ //JSLinT error - Missing...
/*jslint indent: 2 */ //2 пробела
/*jslint white: true */ //отключение проверки пробелов

//var svgFolder = "//googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/";
// var svgFolder = "https://googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/";
var svgFolder = "SVG/";



/////////////
//ВЫБОР по номеру
////////
function numEdit(n) { //jshint ignore:line
  //изменение кнопками
  var $tag = $("#number");
  var $znach = $tag.val() * 1 + n; //увеличиваем/уменьшаем значение
  $tag.val($znach);
  $tag.addClass("impulse"); //анимация инпута указывающего номер схемы
  $(this).delay(110).queue(function () {
    $tag.removeClass("impulse");
    $(this).dequeue();
  });
  fileUrl($znach);
}


$(function () {

  $('body').keydown(function (e) { //стрелками на клавиатуре
    //    console.warn(e.which);
    if (e.which == 37) {
      var $tag = $("#number");
      var $znach = $tag.val() * 1 - 1;
      $tag.val($znach);
      fileUrl($znach);
      console.log("влево");
    } else if (e.which == 39) {
      console.log("вправо");
      var $tag = $("#number");
      var $znach = $tag.val() * 1 + 1;
      $tag.val($znach);
      fileUrl($znach);
    }
  });

  $("#number").change(function () { //отлов ручного изменения
    console.info("ручное изменение");
    fileUrl($(this).val() * 1);
  });

});

//function numLaunch(n) { //создание ссылки
//  console.log(svgFolder + n + '.svg');
//  fileUrl(svgFolder + n + '.svg');
//  //#TODO объеденить fileUrl и numLaunch
//}
//ajax
function fileUrl(name) {
  var url = svgFolder + name + ".svg";
  //#[x]FIXME сделать обработку 404 ошибки, т.е. если файла нет
  $.ajax({
    url: url,
    dataType: "xml",
    success: ajaxTrue, //обработка файла
    error: ajaxFalse //функция если файла нет
  });

  function ajaxTrue(data, textStatus, request) {
    //извлекаем дату
    var date = new Date(request.getResponseHeader("Last-Modified")); //дата редактирования
    $("#number").removeClass("impulseError"); //убрать класс ошибки

    xmlParser(data, date, name); //jshint ignore:line
  }

  function ajaxFalse() {
    $("#number").addClass("impulseError");
    console.error("Нет такого файла!!!");
  }

}
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
    $("input[type='file'").trigger('click');
  });
  $('input[type=file]').change(function () { //получение файла из инпута
    var files = this.files;
    fileOpen(files[0]);
  });
});


function fileOpen(file) { //получение текста из файла
  var date = file.lastModifiedDate;
  var name = file.name;
  name = name.substring(0, name.length - 4);
  var reader = new FileReader(); //jshint ignore:line
  reader.onload = function (event) {
    if (!file.type.match('.svg')) { //проверка типа файла
      alert("Это не файл редактора схем\nфайл редктора схем имеет расширение .svg");
      return; //остановка скрипта если не .svg
    }
    var contents = $.parseXML(event.target.result);
    //отправляем свг на разбор
    xmlParser(contents, date, name); //jshint ignore:line

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
