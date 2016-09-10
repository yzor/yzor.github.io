console.clear();
var svgFolder = "//googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/";

//fileUrl(url)
//xmlParser(xml)








///////////////////////
//ТЕСТОВЫЙ ЧЕКБОКС
////
$('input[type=checkbox]').change(function(){//получение файла из инпута
  if($("#cbox").prop('checked')) {
    //$("body").addClass("scheme").removeClass("waiting");
    metamorphose();
  }else{
    $("body").addClass("waiting").removeClass("scheme").removeClass("qwe");//включить обратно
  }
});

/*
<!--  waiting  -->
<!--  scheme  -->
*/
////////////////////////
//АНИМАЦИЯ ШИТОРКИ
////////
$('#header').hover(function(){//при наведении на шторку
  //if($("#header").is(":hover")){console.log("1 Наведён и должен");}
  //else{                        console.log("2 Не наведён но должен");}
  $(this).queue("fx", []);//очистка очереди
  $(this).delay(100).queue(function() {//вытаскивание шторки с задежкой
    $(this).addClass("header_show").removeClass("header_hide");
    //console.log( $(this).queue("fx").length+" - навёл");
    $(this).dequeue();
  });
}, function(){
  //if($("#header").is(":hover")){console.log("3 Наведён но не должен");}
  //else{                        console.log("4 Не наведён и должен");}
  $(this).queue("fx", []);//очистка очереди
  $(this).delay(550).queue(function() {
    $(this).addClass("header_hide").removeClass("header_show");
    //console.log( $(this).queue("fx").length+" - убрал");
    $(this).dequeue();
  });
});

////////////////////////
//МЕТАМОРФОЗ
////////
function metamorphose(){
  $("body").addClass("qwe");
  $(this).delay(480).queue(function() {
    $("body").addClass("scheme").removeClass("waiting");
    $("#header").removeClass("header_show header_hide");
    $(this).dequeue();
  });
}



//function defaults(){//действие по умолчанию
//  fileUrl(svgFolder+'10.svg');
//}defaults();



/////////////
//ВЫБОР по номеру
////////
function nimEdit(n){//изменение кнопками
  $t = $("#number");
  $z = $t.val()*1+n;
  $t.val($z);
    $t.addClass("impulse");
    $(this).delay(110).queue(function() {
      $t.removeClass("impulse");
    $(this).dequeue();
  });
  nimLaunch($z);
}
$( "#number" ).change(function() {//отлов ручного изменения
  nimLaunch($( this ).val()*1);
});
function nimLaunch(n){//создание ссылки
  // console.log("../"+n+'.svg');
  fileUrl(svgFolder+n+'.svg');
  /*объеденить fileUrl и nimLaunch*/
}

////////////////////////////////////
//ВЫБОР Drag-and-drop
var dropZone = $('body')[0];//элемент принимающий перетаскивание
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

function handleFileSelect(evt) {//перетаскивание в окно браузера
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


/////////////////////////////////
//ВЫБОР С ДИСКА
/////////
// document.getElementById('files').addEventListener('change', fileOpen, false);//вызов функции
$("#file_box").click(function(){
    $("input[type='file'").trigger('click');
});
$('input[type=file]').change(function(){//получение файла из инпута
  var files = this.files;
  fileOpen(files[0]);

});



function fileOpen(file){//получение текста из файла
  console.clear();
  var reader = new FileReader();
  reader.onload = function(event) {
    if (!file.type.match('.svg')){//проверка типа файла
      alert("Это не файл редактора схем\nфайл редктора схем имеет расширение .svg");
      return;//остановка скрипта если не .svg
    }
    var contents = $.parseXML(event.target.result);
    xmlParser(contents);//отправляем свг на разбор

        // fileSelect(url2);
    // fileSelect(contents);


  };
  reader.onerror = function(event) {
    console.error("Файл не может быть прочитан! код " + event.target.error.code);
  };
  reader.readAsText(file);
}




function fileOpen23(evt){/*????????????????????*/
  console.clear();
  console.log(evt);
  var file = evt.target.files[0]; // FileList object
  var reader = new FileReader();
  reader.onload = function(event) {
    if (!file.type.match('.svg')){//проверка типа файла
      alert("Это не файл редактора схем\nфайл редктора схем имеер расширение .svg");
      return;//остановка скрипта если не .svg
    }
    var contents = $.parseXML(event.target.result);
    xmlParser(contents);//отправляем свг на разбор
  };
  reader.onerror = function(event) {
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


