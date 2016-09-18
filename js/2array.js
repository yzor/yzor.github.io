/*global $*/ //JSLinT error - '$' was used....
/*jslint sloppy: true*/ //JSLinT error - Missing...
/*jslint indent: 2 */ //2 пробела
/*jslint white: true */ //отключение проверки пробелов

//#TODO Включить холст(если холста нет то считать холстом всё изображение)
//#TODO С ректа #Рапорт взять x y ширину и высоту затем высчитывать по ним ЗВЁЗДОЧКИ
//#TODO[x]  С ректа #Холст  взять x y ширину и высоту . Это  и есть холст, остальное поле не учитывать


//console.clear();
var SVG; //чтоб js lint не ругался



/*
https://drive.google.com/folderview?id=0B0zTgDj4fTXrYzZIdXE4cjhWbFE&usp=sharing
0B0zTgDj4fTXrYzZIdXE4cjhWbFE*/
//googledrive.com/host/0B0zTgDj4fTXrYzZIdXE4cjhWbFE/AJAX/SVG/1.svg
//cоздание
/*
var url2;
var url3 = "//output.jsbin.com/ziqico.svg"; //ok rect path
url2 = "//googledrive.com/host/0B0zTgDj4fTXrclc3dGlpUUVnVjA/AJAX/SVG/1.svg";
url2 = "//output.jsbin.com/qiviqe.svg"; //ok
url2 = "//output.jsbin.com/henaka.svg"; //ок
url2 = "//output.jsbin.com/dovoreg.svg"; //u
url2 = "//output.jsbin.com/juwenif.svg"; //ok
/*

    var files;

// Вешаем функцию на событие
// Получим данные файлов и добавим их в переменную

$('input[type=file]').change(function(){
    files = this.files;
  console.log("OLOLO");
  file2(files);
});
function file2(p){
//   console.log(p);
  $f = $(p).find("#холст");
  console.log($f);
}
*/
// fileUrl(url2);//test
// fileUrl(2);








/////////////////////////
//Парсинг текстового содержимого файла
//////////
function xmlParser(xml, date, name) { //jshint ignore:line
  //  console.log(date);
  //  console.log(name);
  //    console.log(xml);
  SVG = {
    RAP: [],
    date: date, //дата
    name: name, //имя файла
    LINE: {}, //отлов дубликатов
    L: "", //отлов дубликатов
    TILES: {},
    LIST: [],
    GRID2: [],
    D: ""
  };
  //парсим параметры тега <svg>
  var $f = $(xml).find("svg");
  SVG.height = calk("height");
  SVG.width = calk("width");
  SVG.viewBox = $f.attr('viewBox');

  $f = $(xml).find("#Рапорт"); //координаты рапорта
  SVG.raport = {};
  SVG.raport.X = calk("x");
  SVG.raport.Y = calk("y");
  SVG.raport.W = calk("width");
  SVG.raport.H = calk("height");

  $f = $(xml).find("#Холст"); //координаты холста
  SVG.holst = {};
  SVG.holst.X = calk("x");
  SVG.holst.Y = calk("y");
  SVG.holst.W = calk("width");
  SVG.holst.H = calk("height");
  //#TODOесли нет холста то указать ему размеры из viewBox?

  $f = $(xml).find("text"); //тип нумерации
  if ($f.is("#Справа1_3_5") && $f.is("#Слева2_4_6")) {
    SVG.nymberType = 1;
  } else if ($f.is("#Справа135")) {
    SVG.nymberType = 2;
  } else if ($f.is("#Справа123")) {
    SVG.nymberType = 3;
  }

  $(xml).find("#Раскраски>rect, #Раскраски>path").each(function () { //перебор патчей и ректов в раскраске
    PathConvertor2($(this), SVG.LIST);
  });
  $(xml).find("#Рапорт").each(function () { //создание масива рапорта
    PathConvertor2($(this), SVG.RAP, 1);
  });

  function calk(p) { //делим результат на 20, если нет данных то подставляем 0
    return ($f.attr(p) > 0) ? $f.attr(p) / 20 : 0;
  }
  console.warn(SVG);
  //  console.warn(SVG.LIST);

  // console.log(SVG.LIST);
  // $('#description').html(SVG.LIST);
  //  console.log(SVG.RAP);

  //запуск описания
  descrip(); //jshint ignore:line
  //вывод имени и даты
  uiNameData(); //jshint ignore:line
}









function PathConvertor2(t, LINK, name) { //t-this, link-ссылка для сохранения массива, name
  /////////////////////
  // рисуем в канвасе изображение
  /////
  var canvas = document.getElementById('CANVA'); //выбираем html элемент канваса
  var ctx = canvas.getContext('2d');
  var canvas2 = document.getElementById('CANVA2'); //выбираем второй html элемент канваса
  var ctx2 = canvas2.getContext('2d');
  ctx.clearRect(0, 0, SVG.width * 20, SVG.height * 20); //очистка предыдущего слоя
  var p;
  if (t[0].nodeName == "path") { //если патч
    p = new Path2D(t.attr('d')); //Нарисовать патч
  } else if (t[0].nodeName == "rect") { //если рект
    p = new Path2D();
    p.rect(attr(t, 'x'), attr(t, 'y'), attr(t, 'width'), attr(t, 'height')); //нарисовать рект
  }

  function attr(t, p) { //получаем параметры тега, недостающие заменяем на 0//t -teg p-param
    var param = t.attr(p);
    if (param === undefined) {
      param = 0;
    }
    return param;
  }
  ctx.fill(p); //заливка патча
  //ctx.fillStyle = "rgba(255,0,0,1)";//з/аливка крсным
  ctx.fill();
  $("#CANVA2").attr({
    "width": SVG.holst.W * 20,
    "height": SVG.holst.H * 20
  }); //подгоняем размер канваса под свг
  ctx2.drawImage(canvas, //sx, sy, sw, sh, dx, dy, dw, dh
    SVG.holst.X * 20, //20,//вырез прямоугольника x
    SVG.holst.Y * 20, //0,//вырез прямоугольника y
    SVG.holst.W * 20, //140,//вырез прямоугольника w
    SVG.holst.H * 20, //100,//вырез прямоугольника h
    0, //координаты x
    0, //координаты y
    SVG.holst.W, //7,//масштаб W
    SVG.holst.H //5 //масштаб h
  );
  /////////////////////
  // Записываем в масив пиксели
  /////
  //var Pixel = ctx2.getImageData(0,0,SVG.height,SVG.width); //получаем пиксели в массив
  var Pixel = ctx2.getImageData(0, 0, SVG.holst.W, SVG.holst.H); //получаем пиксели в массив
  $(Pixel.data).each(function (i) { //перебираем пиксели выбирая непрозрачные
    //         var tileX = (i+1)%SVGx;       //высчитываем номер столбца(текущее значение делим на ширину)
    //         if(0===tileX){tileX=SVGx;}    //восстанавливаем последнее значение в строке
    //         var tileY=(i+1-tileX)/SVGx+1; //высчитываем номер строки
    //         Tiles[i]=[tileX,tileY];       //вписываем в масив координаты
    if (Pixel.data[(i + 1) * 4 - 1] > 0) { //если пиксель не прозрачен, то записываем класс
      //      console.log(name);
      if (name) {
        LINK[i] = name; //если есть name, то ложить в атрибут его, а не id
      } else {
        LINK[i] = t.attr('id'); //отправляем в объект id
      }
      //Tiles[i].push(SVGid);//DEL
    }
    return (Pixel.data.length / 4 - 1 != i); //закончить перебор на четверти масива
  });
  //return Tiles;//возвращаем набор тайлов//DEL
}









//}//END FILE ##########################################################################################
/**-/
var xml = '<div class="qwe qwe1"><span class="qwe qwe2"></span><div class="qwe qwe3"></div><div class="qwe qwe4"></div></div>',
xmlDoc = $.parseXML( xml ),
$xml = $( xmlDoc ),
$title = $xml.find( "div" );
$($title).each(function(i){
    console.log($(this).attr("class"));
    //heights.push($(element).height());
});
$title = $xml.find( "span" );
//console.log($title.text());//содержимое тега тест
//console.log($title.html());//содержимое тега код
//console.log($title.attr("class")); //атрибут тега
/**/









//$( "body" ).append( $title.text() );
// var Tiles = [];//пустой масив для сбора значений
// var SVGx = 4;
// var SVGy = 4;
// var SVGid = "Q";

//типа получили патч в переменную
// var PATH = "M20,10L20,20L10,20L10,30L20,30L20,50L30,40L30,30L40,30L40,20L30,20L30,00";//крест со скосами
//     PATH = "M80,0h20V20H80V0ZM60,20H80V40H60V20ZM80,40h20V60H80V40Z";                 //танчик
//     PATH = "M2,1L2,2L1,2L1,3L2,3L2,5L3,4L3,3L4,3L4,2L3,2L3,0";                        //миникрест со скосами
//     PATH = "M0,0H40V20H0V0ZM20,40H60V60H20V40ZM40,80H80v20H40V80Z";                   //лесенка
//     PATH = "M40,0H60V20H40V0ZM0,20H20V40H0V20ZM60,40H80V60H60V40ZM20,60H40V80H20V60Z";//точки
//     PATH = "M40,20H60V40H80V60H60V80H40V60H20V40H40V20Z";                             //крест
//     PATH = "M20,20H80V80H20V20ZM40,40V60H60V40H40Z";                                  //отверстие



/*

function PathConvertor(SVGx, SVGy, PATH, SVGid, rectX, rectY, rectH, rectW){
    /////////////////////
    // рисуем в канвасе изображение
    /////
  var canvas = document.getElementById('CANVA'); //выбираем html элемент канваса
  var ctx = canvas.getContext('2d');
  var canvas2 = document.getElementById('CANVA2'); //выбираем второй html элемент канваса
  var ctx2 = canvas2.getContext('2d');
  ctx.clearRect(0, 0, SVGx*20, SVGy*20);//очистка предыдущего слоя



  var p = new Path2D(PATH);//рисуем патч из переменной
//     ctx.rect(10, 10, 40, 40);//тестовый квадрат




    ctx.fill(p);//заливка патча
//     ctx.fillStyle = "rgba(255,0,0,1)";//заливка крсным
    ctx.fill();
    $("#CANVA2").attr({"width":SVGx, "height":SVGy});//подгоняем размер канваса под свг
    ctx2.drawImage(canvas, 0, 0, 100, 100, 0, 0, 05, 05);//перерисовка во 2 канвасе с уменьшиным размером

    /////////////////////
    // Записываем в масив пиксели
    /////
    var Pixel = ctx2.getImageData(0,0,SVGx,SVGy); //получаем пиксели в массив
    $(Pixel.data).each(function(i){   //перебираем пиксели выбирая непрозрачные
//         var tileX = (i+1)%SVGx;       //высчитываем номер столбца(текущее значение делим на ширину)
//         if(0===tileX){tileX=SVGx;}    //восстанавливаем последнее значение в строке
//         var tileY=(i+1-tileX)/SVGx+1; //высчитываем номер строки
//         Tiles[i]=[tileX,tileY];       //вписываем в масив координаты
        if(Pixel.data[(i+1)*4-1]>0){      //если пиксель не прозрачен, то записываем класс
//             console.log(i+1+" - залит - "+ SVGid);
            SVG.LIST[i]=SVGid;
//             Tiles[i].push(SVGid);
        }return (Pixel.data.length/4-1 != i);//закончить перебор на четверти масива
    });
//     return Tiles;//возвращаем набор тайлов
}*/
